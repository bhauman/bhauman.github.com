---
layout: default
title: "Clojurescript Core.Async Todos"
published: true
category: 
tags: []
---

## Clojurescript Core.Async and Todos

Clojurescript was already a tool which brings unprecedented power and
expressiveness to programming the browser. Now with the introduction
of Go like channels and blocks to Clojurescript we are now able to
radically rethink how we program in the browser.

In fact, we can pretty much wrestle the state of web based app
into complete docility.

This is not a tutorial on how to program in Clojurescript. It is an
exploration of different programming patterns that are made possible
by core.async.

## Initial channel and go block usage

First let's turn click events into a channel.

{% highlight clojure %}
(defn click-chan [selector msg-name]
  (let [rc (chan)]
    (on ($ "body") :click selector {}
        (fn [e]
          (jq/prevent e)
          (put! rc [msg-name (data-from-event e)])))
    rc))
{% endhighlight %}

This function turns a css selector into a channel of click
messages. The <code>chan</code> function creats a channel and when a
click event get's fired to the provided selector we use the async
<code>put!</code> function to put the a message into the channel. You
can put what ever value you want into a channel. We are just using a
vector as an expedient format for a message and it's attached
data. After wiring it up we return the newly created channel to the
consumer of the function.

Now let's use this:

{% highlight clojure %}
(defn example1-loop [start-state]
  (let [ new-todo-click         (click-chan "a.new-todo"        :new-todo)
         cancel-new-form-click  (click-chan "a.cancel-new-todo" :cancel-new-form)]
    (go
     (loop [state start-state]
       (ex1-render-page state)
       (<! new-todo-click) ;; <<-- BLOCKS!!!
       (ex1-render-page (assoc state :mode :add-todo-form))
       (<! cancel-new-form-click) ;; <<-- BLOCKS!!!
       (recur (dissoc state :mode))))))
{% endhighlight %}

This loop code blocks and waits for a click on the **a.new-todo**
element and then creates a new state in which the mode is now one
where a todo form is showing. It then blocks again waiting for the
cancel button to get clicked.

This is pretty freaking cool. The code is written sequentially and
captures the behavior of the program explicitly without callbacks.

There is a running example below. Go ahead and open and close the form
as many times as you want.

<style>
.example {
 padding: 2em;
 background-color: #333;
 color: #ddd;
 min-height: 200px;
 margin-bottom: 1.75em;
 border-radius: 5px;
 box-shadow: 0px 0px 5px #000 inset;
 position: relative;
}

.example a {
  color: #fc0;
  text-decoration: none;
  transition: all .25s;
   -moz-transition: all .25s;
   -webkit-transition: all .25s;
}

.example a:hover {
  color: #f90;
}

.example .modal-form {
  background-color: #666;
  position: absolute;
  padding-left: 2em;
  padding-right: 2em;
  top: 63px;
  left: 173px;
  min-width: 220px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #000;
    
}

.example a.btn {
 color: #888;
}
.example h4 {
 color: #ddd;
}
.example .btn {
 margin-right: 1em;
}

.example a.btn-primary {
 color: #fff;
}

</style>


<div id="example1" class="example">
</div>

Now if you played with it a bit you may have noticed a serious bug. To
see the bug click the **add task** button to open the modal form and then
continue clicking it 5 more times.  Now **cancel** the form and you will
notice that you have to cancel it 6 times before the form goes
away.

Take a moment to reflect on this and the code that caused it.

While this is a disconcerting bug it demonstrates further how channels
behave. Messages stack up in a queue like buffer. Notice that for each
**form open** signal you can't execute another one until there is a
**cancel** signal.  

To me it is amazing that you can express this level of control over
execution order so effortlessly.  Its basically an implicit state
machine.

## Semantics of the modal

> a **modal window** is a child window that requires users to interact
> with it before they can return to operating the parent application
> - wikipedia

A modal window is commonly implemented using a screen to cover all
the event bound elements below it. This reveals how common javascript
practices ignore complexity with hacks. The event's below the screen
are still live and if the dom screen doesn't work or doesn't resize
because of a browser bug or the modal code didn't keep pace with the
current crop of mobile browsers then users are going to be able to
operate on those events.

However, isn't a modal window really stating that this application
will not respond to any other event's except the ones that are
explicitely defined in the pop-over itself?  Well shouldn't we code it
that way?

First we will create a couple of channel operations to help us:

{% highlight clojure %}
(defn merge-chans [& chans]
  (let [rc (chan)]
    (go
     (loop []
       (put! rc (first (alts! chans)))
       (recur)))
    rc))

(defn filter-chan [pred channel]
  (let [rc (chan)]
    (go (loop []
          (let [val (<! channel)]
            (if (pred val) (put! rc val))
            (recur))
          ))
    rc))
{% endhighlight %}

The <code>merge-chans</code> function merges the signal values from
all the channels passed to it into a single channel. The
<code>filter-chan</code> creates a channel that only passes on signals
that meet the condition of the predicate.

With these tools we can easily filter out all the events that we don't want
to respond to. Essentially eating any unwanted signals.

{% highlight clojure %}
(defn example2-loop [start-state]
  (let [ new-todo-click         (click-chan "a.new-todo" :new-task)
         cancel-new-form-click  (click-chan "a.cancel-new-todo" :cancel-new-form)
         input-chan             (merge-chans new-todo-click cancel-new-form-click)]
    (go
     (loop [state start-state]
       (ex2-render-page state)
       (<! new-todo-click)
       (ex2-render-page (assoc state :mode :add-todo-form))
       (<! (filter-chan (comp #{:cancel-new-form} first)
                        input-chan))
       (recur (dissoc state :mode))))))
{% endhighlight %}

Now things should work as we would would expect. 

<div id="example2" class="example">
</div>

To test this, click on the **add task** button as many tims as you want
and then click the cancel button. All those extra add task events are
ignored.

Now think about your Javascript programs and ask yourself what you
would have to do to disable all the events except for the one's you
are interested in? Hard right? One of the reasons this is difficult is
that you don't have control over the implicit event queue in the
Javascript environment.  Here we have our own queue/channel and have
no problems bending it to our whim.

Now that we have accurate modal semantics let's add that task.

## Let's add that task already

Alright let's create a channel that handles form submissions:

{% highlight clojure %}
(defn form-submit-chan [form-selector ev-name fields]
  (let [rc (chan)]
    (on ($ "body") :submit form-selector {}
        (fn [e]
          (jq/prevent e)
          (put! rc [ev-name (fields-value-map form-selector fields)])))
    rc))
{% endhighlight %}

That should do it.  Now let's use it:

{% highlight clojure %}
(defn example3-loop [start-state]
  (let [ new-todo-click         (click-chan "a.new-todo" :new-task)
         cancel-new-form-click  (click-chan "a.cancel-new-todo" :cancel-new-form)
         task-form-submit (form-submit-chan ".new-task-form"
                                            :task-form-submit [:content])        
         input-chan             (merge-chans new-todo-click
                                             cancel-new-form-click
                                             task-form-submit)]
    (go
     (loop [state start-state]
       (ex3-render-page state)
       (<! new-todo-click)
       (ex3-render-page (assoc state :mode :add-todo-form))
       (let [[msg-name msg-data] (<! (filter-chan (comp #{:cancel-new-form
                                                          :task-form-submit}
                                                        first)
                                                  input-chan))]
         (recur
          (condp = msg-name
           :cancel-new-form  (dissoc state :mode)
           :task-form-submit (-> state
                                 (add-task msg-data)
                                 (dissoc :mode))
           )))))))
{% endhighlight %}

Here we add a new **task form submit** channel and merge it into
<code>input-chan</code>.  We also add it to the filter so that when
the modal is open we only get submit and cancel messages.

Again try the example.

<div id="example3" class="example">
</div>

## Completing todos

<script src="/assets/js/todos-async.js"></script>


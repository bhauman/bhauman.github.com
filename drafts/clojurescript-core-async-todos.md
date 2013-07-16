---
layout: default
title: "Clojurescript Core.Async Todos"
published: true
category: 
tags: []
---

## Clojurescript Core.Async and Todos

Clojurescript was already a tool which brings a great deal of power
and expressiveness to the browser. Now with the introduction of
Go-like channels and blocks to Clojurescript we are now able to
fundamentally change our approach to how we program in the browser.

In fact, we can pretty much wrestle the state of web based app
into complete docility. 

This is not a tutorial on how to program in Clojurescript. It is an
exploration of different programming patterns that are made possible
by core.async.

## Initial channel and go block usage

First create a function that directs click events into a channel.

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
messages. The <code>chan</code> function creates a channel.  When an
element with the provided selector get's clicked we use the async
<code>put!</code> function to put a message into the channel. 

You can put any value you want into a channel. We are just using a
vector as an expedient format for a message and it's attached
data.

After wiring it up we return the newly created channel.

Now let's use this function to create a couple of channels:

{% highlight clojure %}
(defn example1-loop [start-state]
  (let [ new-todo-click         (click-chan "a.new-todo" :new-todo)
         cancel-new-form-click  (click-chan "a.cancel-new-todo" 
                                            :cancel-new-form)]
    (go
     (loop [state start-state]
       (render-templates state)
       (<! new-todo-click) ;; <<-- BLOCKS!!!
       (render-templates (assoc state :mode :add-todo-form))
       (<! cancel-new-form-click) ;; <<-- BLOCKS!!!
       (recur (dissoc state :mode))))))
{% endhighlight %}

Above both the <code>new-todo-click</code> and the
<code>cancel-new-form-click</code> channels contain the signals that
will be fired when a user clicks on the respective elements.

The <code>go</code> block creates a context in which we can make blocking
calls.  In this case we are going to use <code>&lt;!</code> which blocks
the execution from continuing until we receive a value from that channel.

The loop renders the current state and then blocks and waits for a
click on the **a.new-todo** element.  When it recieves a click on that
element we then render a new state in where a todo form is showing. It
then blocks again waiting for the **a.cancel-new-todo** element to get
clicked.

The code is written sequentially and captures the behavior of the
program explicitly without callbacks.

Here is a running example below. Give it a try by opening and closing
the form as many times as you want.

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

.example li span {
  padding-left: 10px;
}
.example span.completed {
  text-decoration: line-through;
  color: #777;
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
behave. Messages stack up in a queue like buffer. Note that once we
have recieved a **new-todo-click** signal another one doesn't get
executed until there is a **cancel-new-form-click** signal.

To me it is amazing that you can express this level of control over
execution order and program state so effortlessly. It is basically an
implicit state machine.

## Semantics of the modal

> a **modal window** is a child window that requires users to interact
> with it before they can return to operating the parent application
> - wikipedia

A modal window is commonly implemented using a screen to cover all the
event bound elements below it. This reveals how common Javascript
practices ignore complexity with ... well ... hacks. 

The event's below the dom screen are still live and if the dom screen
doesn't resize because of a browser bug or the modal code didn't keep
pace with the current crop of mobile browsers then users are going to
be able to operate on those event bound elements.

If modal means 'I will respond to no other events except the ones that
are explicitely defined in the modal itself', well then ... shouldn't we
code it that way?

We will create a couple of channel operations to help us:

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
all the channel args passed to it into a single channel. The
<code>filter-chan</code> creates a channel that only passes on signals
that meet the condition of a predicate.

With these tools we can easily filter out all the message values that
we don't want to respond to. Essentially eating any unwanted signals.

{% highlight clojure %}
(defn example2-loop [start-state]
  (let [ new-todo-click         (click-chan "a.new-todo" :new-task)
         cancel-new-form-click  (click-chan "a.cancel-new-todo" :cancel-new-form)
         input-chan             (merge-chans new-todo-click cancel-new-form-click)]
    (go
     (loop [state start-state]
       (render-templates state)
       (<! new-todo-click)
       (render-templates (assoc state :mode :add-todo-form))
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
are interested in? Not trivial? One of the things that make this
difficult is that we don't have control over the implicit event queue
in the Javascript environment.  Here we have our own queue in the form
of a channel and which allows us to maniputate it.

Now that we have accurate modal semantics let's finally add a task.

## Let's add that task already

Alright let's create a channel that handles form submissions:

{% highlight clojure %}
(defn form-submit-chan [form-selector msg-name fields]
  (let [rc (chan)]
    (on ($ "body") :submit form-selector {}
        (fn [e]
          (jq/prevent e)
          (put! rc [msg-name (fields-value-map form-selector fields)])))
    rc))
{% endhighlight %}

That should do it.  This is very similar to the
<code>click-chan</code> function except that it responds to form
submit events.

{% highlight clojure %}
(defn example3-loop [start-state]
  (let [ new-todo-click         (click-chan "a.new-todo" :new-task)
         cancel-new-form-click  (click-chan "a.cancel-new-todo" 
                                             :cancel-new-form)
         task-form-submit (form-submit-chan ".new-task-form"
                                            :task-form-submit 
                                            [:content])        
         input-chan             (merge-chans new-todo-click
                                             cancel-new-form-click
                                             task-form-submit)]
    (go
     (loop [state start-state]
       (ex3-render-page state)
       (<! new-todo-click)
       (ex3-render-page (assoc state :mode :add-todo-form))
       (let [[msg-name msg-data] 
             (<! (filter-chan (comp #{:cancel-new-form
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

Here we add a new <code>task-form-submit</code> channel and merge it into
<code>input-chan</code>.  We also add it to the filter so that when
the modal is open we only get *submit* and *cancel* messages.  We then
switch on the message name and operate on the state depending on which message we get.

Again try the example.

<div id="example3" class="example">
</div>

## Completing todos

Now we are adding the feature to complete individual todos.  This
gives us a good opportunity to break out the modal functionality into
a separate function.

{% highlight clojure %}
(defn filter-msg [msg-names input-chan]
  (filter-chan (comp msg-names first) input-chan))

(defn user-inputs []
  (merge-chans
   (click-chan "a.new-todo" :new-task)
   (click-chan "a.complete-todo" :complete-todo)
   (click-chan "a.cancel-new-todo" :cancel-new-form)
   (form-submit-chan ".new-task-form"
                     :task-form-submit [:content])))

(defn add-task-modal [state input-chan]
  (go
   (render-templates (assoc state :mode :add-todo-form))
   (let [[msg-name msg-data] (<! (filter-msg #{:cancel-new-form
                                               :task-form-submit}
                                             input-chan))]
     (condp = msg-name
       :cancel-new-form  state
       :task-form-submit (-> state
                             (add-task msg-data)
                             (dissoc :mode))
       ))))

(defn main-app [start-state input-chan]
  (go
     (loop [state start-state]
       (render-templates state)
       (let [[msg-name msg-data] (<! (filter-msg #{:new-task 
                                                   :complete-todo}
                                                 input-chan))]
         (recur
          (condp = msg-name
            :complete-todo (complete-task state (:taskIndex msg-data))
            :new-task      (<! (add-task-modal state input-chan))
           ))))))

(defn app-loop [start-state]
  (main-app start-state (user-inputs)))
{% endhighlight %}

So we refactored things a bit. We moved the creation of the input
channels to its own function and now we have two functions that
represent two contexts for user interaction. The <code>main-app</code>
and the <code>add-task-modal</code> functions both take the current
state and a channel of input messages.

This is an extremely interesting discovery. The input-chan is passed
from context to context.  Each context defines the meaning and
availablility of a user action.  Imagine a more complex set of user
interactions where you dive from one context down into another and
then coming back up through them. You could move from subcontext into
subcontext and back out with precise control over the users
exprerience and with no record and keep a trail of where your user has
been or where they ar going.

<div id="example4" class="example">
</div>

## State 

In these examples you will notice I am not using global mutable state
anywhere. There is no central data object or set of objects that is
globally mutated. In each example as actions are taken a new version
of state is created from the current state and then that state is
passed on to the next part of the program that needs to operate on it.

This is a departure from the seeming neccesity in callback based
javascript land to have our set of central data objects. The callbacks
themselves require us to have a handle on something that we can mutate.

You might notice that the cancel action merely returns the state that
was passed into the <code>add-task-modal</code> function. Reseting
merely means returning to the state we were in before the changes we
have currently made to it.

## Conclusion

The core.async library in Clojurescript literally turns development in
Javascript land on it's head. The possibilty for absolute control over
the state of an app is mindblowing!

<script src="/assets/js/todos-async.js"></script>


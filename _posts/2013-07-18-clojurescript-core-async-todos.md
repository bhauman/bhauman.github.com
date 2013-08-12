---
layout: post
title: "ClojureScript Core.Async Todos"
published: true
category: 
tags: []
---

ClojureScript was already an incredible platform for experimenting
with different approaches to writing browser based applications.
However, things have changed dramatically for the better. The new
[core.async](http://clojure.com/blog/2013/06/28/clojure-core-async-channels.html)
library introduces Go-like channels and blocks to ClojureScript. With
this new library we can write blocking code and control the flow of
state in a program with a great deal of precision.

This is not a tutorial on how to program in ClojureScript. It is an
exploration of different programming patterns that are made possible
by core.async.

If you are new to Clojure this
[cheatsheet](http://clojure.org/cheatsheet) may help.

## Initial channel and go block usage

First we'll create a function that captures click events and directs
them into a channel.

{% highlight clojure %}
(defn click-chan [selector msg-name]
  (let [rc (chan)]
    (on ($ "body") :click selector {}
        (fn [e]
          (jq/prevent e)
          (put! rc [msg-name (data-from-event e)])))
    rc))
{% endhighlight %}

This function turns a CSS selector into a channel of click
messages. The <code>chan</code> function creates a channel.  When an
element with the provided selector gets clicked we use the async
<code>put!</code> function to put a message value into the
channel. After wiring it up we return the newly created channel.

You can put any value you want into a channel. We are using a vector
as an expedient format for a message and its attached data.

Let's use this function to create some click channels:

{% highlight clojure %}
(defn app-loop [start-state]
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

Both <code>new-todo-click</code> and the
<code>cancel-new-form-click</code> are channels which will produce
message values when a user clicks on their respective elements.

The <code>go</code> block creates a context in which we can make
blocking calls.  In this case, we are going to use the <code>&lt;!</code>
function which blocks execution from continuing until a value is
available on the provided channel.

The loop renders the current state and then blocks and waits for a
click on the **a.new-todo** element.  When the element is clicked the
<code>(&lt;! new-todo-click)</code> call unblocks returning a value
(which we ignore). We then render a new state where a todo form modal
is displayed by the template renderer. The loop then blocks again
waiting for the **a.cancel-new-todo** element to get clicked.

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

@media (max-width: 480px) {
  .example .modal-form {
    left: 10px;
    width: 192px;
    min-width: 192px;
  }
  .example .modal-form input[type=text] {
    width: 180px;
  }
  .clojure {
    font-size: 12px;
  }
  .highlight pre {
    word-break: normal;
    word-wrap: normal;
    overflow-x: scroll;
  }
  .highlight pre code {
    white-space: pre;
  }
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
[full source for example](https://github.com/bhauman/bhauman.github.com/blob/master/assets/cljs/todos-async/ex1.cljs)

There is a serious bug in this code. To see the bug, click the **add
task** button to open the modal form and then continue clicking it 5
more times.  Now **cancel** the form and you will notice that you have
to cancel it 6 times before the form goes away.

Take a moment to reflect on this and the code that caused it.

While this is a disconcerting bug it demonstrates further how channels
behave. Channels stack up the signals in a queue like buffer. Note
that once we have received a value from the **new-todo-click** channel another one
doesn't get pulled out of the channel until there is a value is
received from the **cancel-new-form-click**.

To me it is amazing that you can express this level of control over
execution order and program state in such a straight forward
manner. It is basically an implicit state machine.

## Semantics of the modal

> a **modal window** is a child window that requires users to interact
> with it before they can return to operating the parent application
> - wikipedia

A modal window is commonly implemented using a screen to cover all the
event bound elements below it. This reveals how common JavaScript
practices ignore complexity with ... well ... hacks. 

The event producing elements below the dom screen are still
operable. If the dom screen doesn't size properly because of a CSS
conflict or the modal code didn't keep pace with the current crop of
mobile browsers then users are going to be able to operate on those
event bound elements. That's not what we are intending.

If modal means 'I will respond to no other events except the ones that
are explicitely defined in the modal itself', well then ... shouldn't we
code it that way?

Let's create a couple of channel operations to help:

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

The <code>merge-chans</code> function merges the values from all the
channel args passed to it into a single channel. It does this by using
the <code>alts!</code> function which blocks on a group of channels
waiting for a value to become available on one of them. (If there is a
tie it picks one randomly.)

The <code>filter-chan</code> creates a channel that only passes on values
that meet the condition of a predicate. All other values are discarded.

With these tools we can easily filter out all the message values that
we don't want to respond to. Essentially eating any unwanted user actions.

{% highlight clojure %}
(defn example2-loop [start-state]
  (let [ new-todo-click         (click-chan "a.new-todo" :new-task)
         cancel-new-form-click  (click-chan "a.cancel-new-todo" 
                                            :cancel-new-form)
         input-chan             (merge-chans new-todo-click 
                                             cancel-new-form-click)]
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
[full source for example](https://github.com/bhauman/bhauman.github.com/blob/master/assets/cljs/todos-async/ex2.cljs)

To test this, click on the **add task** button as many times as you want
and then click the cancel button. All those extra add task clicks are
ignored.

Now think about your JavaScript programs and ask yourself what you
would have to do to disable all the events except for the ones you
are interested in? Not trivial? One of the things that make this
difficult is that we don't have control over the implicit event queue
in the JavaScript environment. Here we have our own queue, thus we
have control over how we respond to messages in a given context.

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
       (render-templates state)
       (<! new-todo-click)
       (render-templates (assoc state :mode :add-todo-form))
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

Here we add a new <code>task-form-submit</code> channel and merge it
into <code>input-chan</code>.  We also add it to the filter so that
when the modal is open we only get *submit* and *cancel* messages.  We
then switch on the message name and operate on the state depending on
which message we get.

Again try the example.

<div id="example3" class="example">
</div>
[full source for example](https://github.com/bhauman/bhauman.github.com/blob/master/assets/cljs/todos-async/ex3.cljs)

## Completing todos

Now we are adding the feature to complete individual todos.  This
gives us a good opportunity to break out the modal functionality into
a separate function and refactor a little.

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

This is an extremely interesting discovery. The
<code>input-chan</code> is passed from context to context.  Each
context defines the meaning and availablility of a user action.
Imagine a more complex set of user interactions where you dive from
one context down into another and then coming back up through
them. This gives you precise control over the users experience and
with no need to manually record a trail of where your user has been.

<div id="example4" class="example">
</div>
[full source for example](https://github.com/bhauman/bhauman.github.com/blob/master/assets/cljs/todos-async/ex4.cljs)

## State 

In these examples you will notice that the program state is neither
global or mutable. There is no set of central objects that we access
and change from various callbacks. In each example as actions are
taken a new version of state is created from the current state and
then that state is passed on to the next part of the program that
needs to operate on it. State is completely contained and local to
its particular process.

This is a departure from the seeming neccesity in callback based
JavaScript land to have our set of central data objects. The callbacks
themselves require us to have a handle on something that we can
mutate. This makes it expedient for us to create mutable objects that
have "globalish" accessibility. In JavaScript, an alternative is to
create a message queue and state machine so that we can pass forward
the current state.  Not really a common pattern.

You might notice that the **cancel** action merely returns the state that
was passed into the <code>add-task-modal</code> function. Reseting
merely means returning to the state we were in before any changes were
made.

Being able to handle state like this is in JavaScript land is a
welcome change.

## Conclusion

The core.async library in ClojureScript literally turns development in
JavaScript land on its head. The possibilty for absolute control over
the state of an app is mind blowing!

With core.async you can take what would have previously been very
complex and turn it into something easily managed. Parallax? No
problem and no library neccessary. Drawing progam? So much
simpler. Story telling animations become absolutely straight
forward. Did someone say Tetris?

If you are new to Clojure/ClojureScript keep in mind that core.async
is simply icing on a pretty sweet cake.

I have tried to pique your interest in ClojureScript, core.async and
new ways of thinking about developing where you have much more
certainty about the state of your program at any given moment.

Resources:

* [Core.async announcement post](http://clojure.com/blog/2013/06/28/clojure-core-async-channels.html)
* [Core.async documentation](http://clojure.github.io/core.async/)
* [Communicating Sequential Processes](http://swannodette.github.io/2013/07/12/communicating-sequential-processes/)
* [Introduction to ClojureScript programming](https://github.com/magomimmo/modern-cljs)
* [ClojureScript Up and Running book](http://shop.oreilly.com/product/0636920025139.do)
* [Rich Hickey's recent core.async talk (podcast)](http://thinkrelevance.com/blog/2013/07/10/rich-hickey-and-core-async-podcast-episode-035)
* [David Nolen's core.async examples](https://github.com/swannodette/async-tests)
* [Core.async git repository examples](https://github.com/clojure/core.async/tree/master/examples)
* [A more fully featured todo list](https://github.com/bhauman/async-explore/blob/master/src/todos_first/core.cljs)

Special thanks to reviewers:

* [Brandon Bloom](http://www.brandonbloom.name/)
* [David Nolen](http://swannodette.github.io/)
* [Sean Grove](https://github.com/sgrove)

<script src="/assets/js/todos-async.js">
</script>

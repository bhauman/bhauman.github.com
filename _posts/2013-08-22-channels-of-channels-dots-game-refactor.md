---
layout: post
title: "Channel of Channels: Dots Game Refactor"
published: true
category: 
tags: []
---

In my [last post](/2013/08/12/clojurescript-core-async-dots-game.html)
I built a "straight forward" implementation of the Dots game using
ClojureScript and core.async.  My intention was not to get to clever
or respond the endless array of *shoulds* that normally interrupt my
programming.

It's time to reevaluate the result and see what can be
improved. During this exploration we are going to look at using
channels of channels and functional reactive programming.

This post is assuming a familitarity with Clojure's new [core.async](http://clojure.github.io/core.async/)
library.  You may find my last two posts helpful in learning more
about core.async: [core.async
todos](/2013/07/18/clojurescript-core-async-todos.html) and
[core.async dots
game](/2013/08/12/clojurescript-core-async-dots-game.html).

We are going to use drawing code similar to the last post: 

{% highlight clojure %}

(defn xy-message [ch msg-name xy-obj]
  (put! ch [msg-name {:x (.-pageX xy-obj) :y (.-pageY xy-obj)}]))

(defn touch-xy-message [ch msg-name xy-obj]
  (xy-message ch msg-name
              (aget (.-touches (.-originalEvent xy-obj)) 0)))

(defn mousemove-handler [out-chan jqevent]
  (if (pos? (.-which jqevent))
    (xy-message out-chan :draw jqevent)
    (put! out-chan [:drawend])))

(defn draw-event-capture [selector]
  (let [out-chan (chan)
        end-handler (fn [_] (put! out-chan [:drawend]))]
    (bind ($ selector) "mousemove" #(mousemove-handler out-chan %))
    (bind ($ selector) "mousedown" #(xy-message out-chan :draw %))
    (bind ($ selector) "mouseup"   end-handler)
    (bind ($ selector) "touchmove" #(touch-xy-message out-chan :draw %))
    (bind ($ selector) "touchend"  end-handler)
    out))

{% endhighlight %}

<style>
@media (max-width: 480px) {
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
  .dots-game-container {
    margin-left: -21px;
  }
}
</style>

The above code simply gathers the low level event sources into a
channel of messages that represent the act of drawing.

This code does not account for the full complexity of drawing across
different browsers. [See the example
source](https://github.com/bhauman/bhauman.github.com/blob/master/assets/cljs/dots-game-2/ex1.cljs)
for a more complete example.

## What isn't working

To provide context, in my last couple of posts I have been using
channels as message queues. For example if we evaluate
<code>(draw-event-capture "body")</code> from the above code, it will produce a single
channel of messages. The stream of messages from the channel is
continuous and looks like this:

{% highlight clojure %}

[:drawend]
[:drawend]
[:drawend]
[:drawend]
[:draw {:x 105 :y 150}]
[:draw {:x 106 :y 150}]
[:draw {:x 107 :y 150}]
[:draw {:x 108 :y 150}]
[:drawend]
[:drawend]
[:drawend]
[:drawend]
[:draw {:x 113 :y 150}]
[:draw {:x 114 :y 150}]
[:draw {:x 115 :y 150}]
[:drawend]

{% endhighlight %}

This stream is still pretty raw and we'd like to eliminate all of
those extra **:drawend** events. Let's filter the stream using the
following code.

{% highlight clojure %}

(defn get-drawing [input-chan out-chan]
  (go (loop [msg (<! input-chan)]
        (put! out-chan msg)
        (when (= (first msg) :draw)
          (recur (<! input-chan))))))

(defn draw-chan [selector]
  (let [input-chan (draw-event-capture selector)
        out-chan   (chan)]
    (go (loop [[msg-name _ :as msg] (<! input-chan)]
          (when (= msg-name :draw)
            (put! out-chan msg)
            (<! (get-drawing input-chan out-chan)))
          (recur (<! input-chan))))
    out-chan))

{% endhighlight %}

This code above is a state machine.  It has two states "drawing" and
"not drawing". Both states have different behavior. The loop in
<code>draw-chan</code> bleeds off all the unneeded
**:drawend** messages and waits for the first **:draw** message at
which time it switches into the "drawing" state by calling
<code>get-drawing</code>. The loop in <code>get-drawing</code> pushes
all **:draw** messages onto the output channel until there is a
message that isn't a **:draw** message and we switch back to the "not
drawing" behavior/state.

This does a great job of cleaning up the message stream. We now get
a stream of messages where there is only one **:drawend** terminating
each series of **:draw** messages. Much better.

This approach works and is very flexible. It's very easy to expand
this state machine to handle more complex state progressions.

However, there are some problems with this approach. The first being
that consumers of the <code>draw-chan</code> message channel are
likely going to have to implement their own state machine that mirrors
the one above.  You can see this in my previous post.
You can see it in the <code>dot-chan</code> and
<code>collect-dots</code> functions
[here](http://rigsomelight.com/2013/08/12/clojurescript-core-async-dots-game.html#code-example-4)
and the <code>dot-chain-getter</code> and <code>get-dot-chain</code>
functions
[here](http://rigsomelight.com/2013/08/12/clojurescript-core-async-dots-game.html#code-example-4). Consumers
are required to divide this stream of events into separate actions.

The second problem is that the starting **:draw** message contains data
that we want to use. As a result I found myself mucking around with the first
message. You could introduce a **:drawstart** message into the stream
but that gets ... complex.

The third problem happens when you are in the middle of handling a
series of **:draw** messages and you want to ignore the rest of the
drawing action before consuming the final **:drawend** message.  You
will be leaving several **:draw** messages in the channel. If you are
sharing one main message channel with other contexts you will have to
do some channel management and consume those extra messages before
moving on.

## Channels as Structured Data. Channels of channels!

A solution to these problems came as quite a suprise to me.  It seems
that we can think of channels the similar way as we think of other
data structures. We can nest channels within each other to represent
structured events the same as we nest lists or maps within each other
to represent structured data.

Consider a channel with the following messages in it.

{% highlight clojure %}

;; Where channel-of-draw-messages looks like [:draw xy] [:draw xy] etc. 

[:draw-action channel-of-draw-messages]
[:draw-action channel-of-draw-messages]
[:draw-action channel-of-draw-messages]
[:draw-action channel-of-draw-messages]
[:draw-action channel-of-draw-messages]

{% endhighlight %}

This is a channel of channels. Let's look at it with and expanded view:

{% highlight clojure %}

;; Where [... ...] expresses a channel. This is only a notation 

[... [:draw-action [... [:draw {:x 2 :y 6}] 
                        [:draw {:x 2 :y 7}]  ...] ]
     [:draw-action [... [:draw {:x 2 :y 34}] 
                        [:draw {:x 2 :y 37}]  ...] ]
     [:draw-action [... [:draw {:x 2 :y 55}] 
                        [:draw {:x 2 :y 54}]  ...] ]
     [:draw-action [... [:draw {:x 2 :y 86}] 
                        [:draw {:x 2 :y 75}]  ...] ]
     [:draw-action [... [:draw {:x 2 :y 66}] 
                        [:draw {:x 2 :y 55}]  ...] ]
     [:draw-action [... [:draw {:x 2 :y 55}] 
                        [:draw {:x 2 :y 57}]  ...] ] ...]

{% endhighlight %}

Looks like structured data eh? The series of **:draw** messages are
contained in an enclosing **:draw-action** message.

This pattern solves all the problems above and fits the semantics of
the situation better.  A drawing action is an individual stream of
events just like a channel.

The consumers of a channel of **:draw-action** messages don't have to
do as much work. They can simply hand off the
<code>channel-of-draw-messages</code> to a handler. The handler itself
doesn't have to handle some custom end event.  It only needs to stop
processing when it reaches the **nil** value a channel emits when it is
closed.

The **:draw-action** message itself gets rid of the ambiguity of a
message signaling the start of an action which also contains data
needed for the action.  The **:draw-action** message is itself the
initiating message.

If the handler needs to terminate before the end of the draw messages
this does not leave unconsumed messages in the parent channel that
need to be bled off.

We are effectively moving messages into their hierarchal
position. Much like moving files into a sub directory or data into a
child element in an XML or JSON document.

We are going to refactor the above <code>draw-chan</code> to return
a channel of draw-action messages.

{% highlight clojure %}

(defn put-all-draw-messages [input-chan out-chan]
  (go (loop []
        (if-let [msg (<! input-chan)]
          (do
            (put! out-chan msg)
            (if (= :draw (first msg))
              (recur)
              msg))))))

(defn draw-chan [selector]
  (let [input-chan (draw-event-capture selector)
        out (chan)]
    (go
     (loop []
       (if-let [msg (<! input-chan)]
         (if (= :draw (first msg))
           (let [draw-action-chan (chan)]
             (>! out [:draw-action draw-action-chan])
             (>! draw-action-chan msg)
             (<! (put-all-draw-messages input-chan draw-action-chan))
             (close! draw-action-chan)))
         (close! out))
       (recur)))
    out))

{% endhighlight %}

The code above does what we want it to.  It creates and
returns a channel of **:draw-action** messages.  Each message having
its own channel of **:draw** messages.  The code appears to be a tad
more complex but I would argue that this is because we are handling
complexity that would otherwise have been handled downstream.

If you look at the <code>put-all-draw-messages</code> it's simply
putting all the messages from one channel into another until a certain
condition is met. This seems like a generic utility that we can reuse.
Let's extract it.

{% highlight clojure %}

(defn tap-until [end-pred in out]
    (go (loop []
          (if-let [v (<! in)]
            (do
              (put! out v)
              (if (end-pred v)
                v
                (recur)))))))

{% endhighlight %}

The <code>tap-until</code> utility function moves messages from one
channel to another as long as the end predicate is not met. It also
returns a channel created by the <code>go</code> expression. Channels
created by a <code>go</code> expression return the last value of the
expression. This allows us to block on a call to
<code>tap-until</code> and wait for it to forward all the messages
until the end predicate is met.

Next we'll change the <code>draw-chan</code> function to use
<code>tap-until</code> utility below.

{% highlight clojure %}

(defn draw-chan [selector]
  (let [input-chan (draw-event-capture selector)
        out (chan)]
    (go
     (loop []
       (if-let [msg (<! input-chan)]
         (if (= :draw (first msg))
           (let [draw-action-chan (chan)]
             (>! out [:draw-action draw-action-chan])
             (>! draw-action-chan msg)
             (<! (tap-until #(not= :draw (first %)) 
                            input-chan draw-action-chan))
             (close! draw-action-chan)))
         (close! out))
       (recur)))
    out))

{% endhighlight %}

That works but looking at <code>draw-chan</code> I am seeing another
familiar pattern that looks vaguely similar to Clojure's
[partition-by](http://clojuredocs.org/clojure_core/clojure.core/partition-by). 

I am going to factor out this pattern of splitting a channel into a
channel of channels.

{% highlight clojure %}

(defn partition-chan
  ([start-pred in] (partition-chan start-pred (complement start-pred) in))
  ([start-pred end-pred in]
     (let [out (chan)]
       (go
        (loop []
          (if-let [val (<! in)]
            (do
              (if (start-pred val)
                (let [next-chan (chan)]
                  (>! out next-chan)
                  (>! next-chan val) ;; capture the first message
                  (<! (tap-until end-pred in next-chan))
                  (close! next-chan)))
              (recur))
            (close! out))))
       out)))

{% endhighlight %}

That does it. This leaves us with a <code>draw-chan</code> function
that looks like this:

{% highlight clojure %}

(defn draw-chan [selector]
   (partition-chan #(= draw (first %)) (draw-event-capture selector)))

{% endhighlight %}

This looks pretty good.  This refactored <code>draw-chan</code>
function does have one major difference from the original one
though. It emits a channel of raw channels and omits containing each
freshly split channel within a **:draw-action** message vector.

It's debatable whether the **:draw-action** message container is needed
but let's add it back to demonstrate that we haven't lost anything in
translation.

To add it back we will use a workhorse of functional reactive
programming: <code>map-chan</code>. 

{% highlight clojure %}

(defn map-chan [func in]
  (let [out (chan)]
    (go (loop []
          (if-let [v (<! in)]
            (do
              (if-let [out-v (func v)] (>! out out-v)) ;; no nils in channel
              (recur))
            (close! out))
          ))
    out))

(defn draw-chan [selector]
   (map-chan (fn [ch] [:draw-action ch])
     (partition-chan #(= draw (first %)) (draw-event-capture selector))))

{% endhighlight %}

The <code>map-chan</code> function like **map** is the Swiss Army
knife of working with channels. It simply maps the function over each
value emitted by a channel returning a new channel of the values that
result from the application of the provided function.

The resulting <code>draw-chan</code> function represents a higher
level of expression and thinking about channels. The
<code>draw-chan</code> function does not have any of core.async
library functions in it. Channels are now values that we are
manipulating with a generic set of functions. In addition, channels
are also being used as values inside of channels and it all seems to
make sense.

The drawing example below uses the refactored <code>draw-chan</code>
function.

<style>

#example-1 .point { background-image: none; }
.point.blue {   background-color: rgba(118,172,255, 0.6);  }
.point.green {  background-color: rgba(128,230,121, 0.6);  }
.point.purple { background-color: rgba(131, 70,169, 0.6); }
.point.yellow { background-color: rgba(226,214,  0, 0.6);  }
.point.red {    background-color: rgba(227, 73, 50, 0.6);  }

#example-1, #example-1-1 {
 position: relative;
 height: 200px;

 background-color: #333;
}
.point {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
}

</style>

<div id="example-1" class="no-scroll">
</div>
[full source for example](https://github.com/bhauman/bhauman.github.com/blob/master/assets/cljs/dots-game/ex1.cljs)

Each act of drawing is separate and represented by a different color.

## Consuming a channel of channels

Now that we have straightened out our event source let's revisit some
of the code examples from the last post.

In the last post we took a channel of draw messages and converted it
to a channel of dot position messages because we wanted our main
application loop to react to the dots that have been drawn over and
not the raw draw events themselves.

The code looked like this:

{% highlight clojure %}

;; this is the code from the last post

(defn collect-dots [draw-input out-chan board-offset init-msg]
  (go
   (loop [last-pos nil
          msg init-msg]
     (when (= :draw (first msg))
       (let [cur-pos (coord->dot-pos board-offset (last msg))]
         (if (and (not (nil? cur-pos)) (not= cur-pos last-pos))
           (put! out-chan [:dot-pos cur-pos]))
         (recur (or cur-pos last-pos) (<! draw-input)))))))

(defn dot-chan [selector]
  (let [draw-input (draw-chan selector)
        board-offset ((juxt :left :top) (offset ($ selector)))
        out-chan (chan)
        dot-collector (partial collect-dots 
                               draw-input out-chan board-offset)]
    (go
     (loop [msg (<! draw-input)]
       (when (= (first msg) :draw)
         (<! (dot-collector msg))
         (put! out-chan [:end-dots]))
       (recur (<! draw-input))))
    out-chan))

{% endhighlight %}

Again, this code suffers from having to do its own channel
partitioning. This code again follows the familiar pattern of waiting
for an initiating **:draw** message in the <code>dot-chan</code>
function and then changes context to the <code>dot-collector</code>
loop. It also futzes with the initial message by forwarding it into
the <code>dot-collector</code>.

The above <code>dot-chan</code> function again continues the practice
forwarding partitioning a channel and the creating a channel that
requires partitioning by the next consumer.

Moving our attention to the <code>dot-collector</code> function, we
can see that part of its responsibility is to remove duplicate dot
position messages from the channel by comparing the previous dot
position with the current one. This elimination of duplicate messages
seems like another generic operation that we can extract into a
utility function.

{% highlight clojure %}

(defn remove-sequential-duplicates [in]
  (let [out (chan)]
    (go
     (loop [last-v nil]
       (if-let [v (<! in)]
         (do
           (if (not= v last-v) (>! out v))
           (recur v))
         (close! out))))
    out))

{% endhighlight %}

With this new utility the <code>dot-chan</code> code above refactors
into this:

{% highlight clojure %}

(defn dots-action [board-offset draw-action-chan]
  (remove-sequential-duplicates
   (map-chan #(coord->dot-pos board-offset (last %))
    draw-action-chan)))

(defn dot-chan [selector]
  (let [board-offset ((juxt :left :top) (offset ($ selector)))]
    (map-chan #(dots-action board-offset %) (draw-chan selector))))

{% endhighlight %}

I don't know about you, but I really prefer the code above to the
previous version. The new <code>dot-chan</code> function and its
<code>dots-action</code> helper represent the familiar pattern of
nested iteration. 

This calls out another nice property of channels of channels.  They
are very easy to conceptualize and process as two dimensional
structures.

It's important to remember that the channel that <code>dot-chan</code>
is creating is a yet another channel of channels.

This new <code>dot-chan</code> function again represents a higher
order of expression. We are treating streams of messages (channels) as
values and apply general operations to them.  

You can see the above refactored code in action if you use your mouse
to swipe over the dots below.

<style>
.logger {
  font-size: 10px;
}
#example-3-log {
  position: absolute;
  left: 90px;
  width: 100px;
  height: 295px;
  overflow: auto;
}
</style>

<style>
.boardy .dot {
   position: absolute;
   width: 22px;
   height: 22px;
 
}

.blue {
   background: transparent url(/assets/images/geo_sprite.png) no-repeat -48px -1px;
}

.green {
   background: transparent url(/assets/images/geo_sprite.png) no-repeat -24px -1px;
}

.purple {
   background: transparent url(/assets/images/geo_sprite.png) no-repeat -96px -1px;
}

.yellow {
   background: transparent url(/assets/images/geo_sprite.png) no-repeat 0px -1px;
}

.red {
   background: transparent url(/assets/images/geo_sprite.png) no-repeat -72px -1px;
}

@media only screen and (-webkit-min-device-pixel-ratio: 2) {
.blue {
   background: transparent url(/assets/images/geo_sprite@2x.png) no-repeat -48px -1px;
   background-size: 118px;
}

.green {
   background: transparent url(/assets/images/geo_sprite@2x.png) no-repeat -24px -1px;
   background-size: 118px;
}

.purple {
   background: transparent url(/assets/images/geo_sprite@2x.png) no-repeat -96px -1px;
   background-size: 118px;
}

.yellow {
   background: transparent url(/assets/images/geo_sprite@2x.png) no-repeat 0px -1px;
   background-size: 118px;
}

.red {
   background: transparent url(/assets/images/geo_sprite@2x.png) no-repeat -72px -1px;
   background-size: 118px;
}
}
.log-msg {
  color: white;
  background-color: rgb(227, 73, 50);
  padding-left: 10px;
}
.boardy { 
  position: relative; 
  height: 295px;
  width: 70px;
  border: 1px solid #f0f0f0;
  -webkit-touch-callout: none; 
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: moz-none;
  -ms-user-select: none; 
  background-color: #444;
}
</style>


<div id="example-3" class="boardy no-scroll">
<div id="example-3-log" class="logger">
</div>
</div>
[full source for example](https://github.com/bhauman/bhauman.github.com/blob/master/assets/cljs/dots-game-2/ex3.cljs)

## Conclusion

In this post I refactored part of the Dots game from my last post.  In
doing this I discovered that it can be helpful to think of channels as
structured data.

I also explored creating generic functions that operate on channels in
a manner similar to how core Clojure functions operate on sequences.
  
I feel like I am witnessing a confluence of very powerful
paradigms. Functional programming, functional reactive programming,
communicating sequential processes, and all the beauties of Clojure
that allow us to be very plastic about how we approach and solve a
problem.  It's really remarkable.

Resources:

* [Core.async documentation](http://clojure.github.io/core.async/)
* [Introduction to ClojureScript programming](https://github.com/magomimmo/modern-cljs)
* [ClojureScript Up and Running book](http://shop.oreilly.com/product/0636920025139.do)
* [David Nolen's core.async examples](https://github.com/swannodette/async-tests)
* [Core.async git repository examples](https://github.com/clojure/core.async/tree/master/examples)
* [Full Dots game source](https://github.com/bhauman/dotsters)

<script src="/assets/js/dots-game-2.js">
</script>


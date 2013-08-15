---
layout: default
title: "Channel of Channels: Dots Game Refactor"
published: true
category: 
tags: []
---
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
.alert { font-size:0.8em; }
</style>

## Refactoring the Dots Game

In my last post I went for a straight forward implementation of the
Dots game.  My intention was not to get to meta or respond the
endless array of shoulds that come into my head while I'm programming.

Now it's time to re-evaluate.

I am going to display drawing code similar to the last post because
this is going to be the event source for this post.

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

This simply gathers the low level event sources into a channel of
messages that capture the act of drawing with the mouse or on a touch
screen.

This does not account for the full complexity of drawing across
different browsers. [See the full example
source](https://github.com/bhauman/bhauman.github.com/blob/master/assets/cljs/dots-game-2/ex1.cljs) for a more complete example.

## A channel of channels

Points
* implicit action start event
* keeps composed events out of higher level streams
* makes it easier for consumers. They can rely on a univeral nil
* valueto end processing. 

When I first heard the idea of a channel of channels, my initial
response was a bit incredulous. I thought going meta with channels
would only be of value as mental exercise.  It turns out channels of
channels have a very practical use.

To be clear in my last couple of posts I have been using channels as
message queues. For example if we evaluate
<code>(draw-event-capture "body")</code> it will produce a single
channel of messages.  The stream of messages from the channel never
terminates and the messages look like this:

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
those extra **:drawend** events. So we to filter the stream we do the
following.

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
draw-chan represents the bleeds off all the unneeded **:drawend**
messages and waits for the first **:draw** message at which time it
switches into the "drawing" state by calling get drawing. The loop in
get-drawing pushes all **:draw** messages onto the output channel
until there is a message that isn't a **:draw** message and we switch
back to the "not drawing" behavior/state.

This does a great job of cleaning up the message stream we now get
a stream of messages where there is only one **:drawend** terminating
each series of **:draw** messages. Much better.

This approach works and is very flexible. It's very easy to expand
this state machine to handle more complex event streams.

However, there is are some problems with this approach. The first
being that consumers of the draw-chan message channel are more than
likely going to have to implement their own state machine to mirror
the one above.  You see this over and over again in my previous post
[here](http://google.com) and [here](http://google.com).

<style>
.blue {   background-color: rgb(118,172,255);  }
.green {  background-color: rgb(128,230,121);  }
.purple { background-color: rgb(131, 70,169); }
.yellow { background-color: rgb(226,214,  0);  }
.red {    background-color: rgb(227, 73, 50);  }

#example-1 {
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

As you can see, each act of drawing is distinct and has its own
color.

 

## A single column

The animations and actions are more easily explored using one column
of the game. To start we will work on rendering a list of dots. Below
we have a set of functions that will help us render a board of random
colored dots.

{% highlight clojure %}

(def grid-unit 45)
(def dot-size  20)
(def board-size 6)
(def dot-colors [:blue :green :yellow :purple :red])

(let [number-colors (count dot-colors)]
  (defn rand-color []
    (get dot-colors (rand-int number-colors))))

(defn get-rand-colors [number]
  (map (fn [x] (rand-color)) (range number)))

(defn dot-pos-to-corner-position [dot-pos]
  [(+ 25 (* grid-unit (- (dec board-size) dot-pos))) 25])

(defn dot-templ [i color]
  (let [[top left] (dot-pos-to-corner-position i)
        class (str "dot " (name color))
        style (str "top:" top "px; left: " left "px;")]
    [:div {:class class :style style}]))

(defn create-dot [i color]
  {:color color :pos i :elem (crate/html (dot-templ i color))})

(defn render-state [selector board]
  (mapv #(append ($ selector) (:elem %)) board))

(defn example-2 [selector]
  (render-state selector
                (map-indexed create-dot (get-rand-colors board-size))))

{% endhighlight %}

And the resulting board is here:

<style>
.boardy .dot {
   position: absolute;
   width: 20px;
   height: 20px;
   border-radius: 10px;
}
.blue {   background-color: rgb(118,172,255); }
.green {  background-color: rgb(128,230,121); }
.purple { background-color: rgb(131, 70, 169); }
.yellow { background-color: rgb(226, 214, 0); }
.red { background-color: rgb(227, 73, 50); }
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
}
</style>

<div id="example-2" class="boardy no-scroll" ondragstart="return false;" ondrop="return false;">
</div>
[full source for example](https://github.com/bhauman/bhauman.github.com/blob/master/assets/cljs/dots-game/ex2.cljs)

## Gestures to dots

The main action of the game is to remove dots from the board by
connecting them.  Let's make it easier on our main game loop by
turning draw gestures into dot positions.

{% highlight clojure %}

(def reverse-board-position (partial - (dec board-size)))

(defn coord->dot-pos [offset {:keys [x y]}]
  (let [[x y] (map - [x y] offset [13 13])]
    (when (and (< 12 x (+ 12 grid-unit))
               (< 12 y (* board-size grid-unit)))
      (reverse-board-position (int (/ y grid-unit))))))

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

This code follows the same pattern used above to create the draw
channel. It maps the mouse position coordinates to dot positions and
prevents duplicate messages for individual dots. We will probably
receive several messages for each dot as we swipe over them. It is
better to eliminate these extra messages and provide as nice clean
stream of draw actions to the channels consumers.

You can see this code in action if you use your mouse to
swipe over the dots below.

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

<div id="example-3" class="boardy no-scroll">
<div id="example-3-log" class="logger">
</div>
</div>
[full source for example](https://github.com/bhauman/bhauman.github.com/blob/master/assets/cljs/dots-game/ex3.cljs)

What's happening here is we are emitting a series of messages that
represent the dots that have been touched in a single draw gesture and
ending the gesture with an **:end-dots** message.

## Using queues and messages

> It's critical that the currency of event coordination be at higher
> level than concrete events sources like key presses and mouse 
> movement - this will allow our system to be responsive. 
> - [David Nolen](http://swannodette.github.io/2013/07/31/extracting-processes/)

It's important to call out this pattern of decoupling event sources
and main application actors.  The common practice in JavaScript land
is to put actions directly into event callbacks. The approach that we
have taken here is to have callbacks insert messages into a message
queue.

A message queue effectively decouples the events from the actions
being taken. With a message queue in place, we can easily create new
event sources without rewriting our application code. For instance, we
can easily create a separate input channel for testing purposes or
even an automated player.

Having a message queue also allows us to filter, repeat and otherwise
morph the queue as we are above

This is a powerful pattern that I am going to take with me when I
write JavaScript from now on.

## Putting together a game loop

Now that we've turned low level events into a high level game
information stream, it is time to consume that stream.

{% highlight clojure %}

(def create-dots #(map-indexed create-dot (get-rand-colors %)))

(defn add-dots-to-board [selector dots]
  (mapv #(append ($ selector) (:elem %)) dots))

(def render-updates identity) ;; this is just a place holder

(defn get-dot-chain [state dot-ch first-dot-msg]
  (go
   (loop [dot-chain []
          msg first-dot-msg]
     (if (not= :dot-pos (first msg))
       dot-chain
       (recur (conj dot-chain (last msg)) (<! dot-ch))))))

(defn dot-chain-getter [state dot-ch]
  (go
   (loop [dot-msg (<! dot-ch)]
     (if (= :dot-pos (first dot-msg))
       (<! (get-dot-chain state dot-ch dot-msg))
       (recur (<! dot-ch))))))

(defn game-loop [selector init-state]
  (let [dot-ch (dot-chan selector)]
    (add-dots-to-board selector (init-state :board))
    (go
     (loop [state init-state]
       (let [state (assoc state :dot-chain 
                          (<! (dot-chain-getter state dot-ch)))]
         (recur (render-updates state)))))))

{% endhighlight %}

The <code>game-loop</code> creates the dot channel and passes it to
the <code>dot-chain-getter</code>.  The code blocks and waits for the
<code>dot-chain-getter</code> to return a chain of dots selected by
the player.  The returned dot-chain gets added to the state and
then rendered.

The <code>dot-chain-getter</code> and <code>get-dot-chains</code>
functions follow the established pattern for filtering a message
queue. They collect a vector of **dot** messages until we get to the
**:end-dots** message and then return a vector of dot positions.

## Removing dots and using timeout

Now let's look at rendering the removal of the dots.

{% highlight clojure %}

(defn add-dots-to-board [selector dots]
  (mapv #(append ($ selector) (:elem %)) dots))

(defn move-dot-to-pos [dot i]
  (let [[top left] (dot-pos-to-corner-position i)]
    (css ($ (dot :elem)) {:top top :left left})))

(defn move-dots-to-new-positions [board]
  (go
   (loop [i 0 [dot & xdots] board]
     (when (not (nil? dot))
       (when (not= (dot :pos) i)
         (move-dot-to-pos dot i)
         (<! (timeout 100)))
       (recur (inc i) xdots)))))

(defn update-positions [board]
  (vec (map-indexed #(assoc %2 :pos %1) board)))

(defn remove-dots-from-dom [dots-to-remove]
  (doseq [dot dots-to-remove]
    (go
     (let [$elem ($ (dot :elem))]
       (.addClass $elem "scale-out")
       (<! (timeout 150))
       (.remove $elem)))))

(defn remove-dots [{:keys [dot-chain] :as state}]
  (let [pos-set        (set dot-chain)
        dots-to-remove (keep-indexed #(if (pos-set %1) %2) (state :board))
        next-board     (keep-indexed #(if (not (pos-set %1)) %2) 
                                          (state :board))]
    (remove-dots-from-dom dots-to-remove)
    (move-dots-to-new-positions next-board)
    (assoc state :board (update-positions next-board) :dot-chain [])))

(defn render-updates [state]
  (if (pos? (count (state :dot-chain)))
    (remove-dots state)
    state))

{% endhighlight %}

The <code>render-upates</code> function checks to see if we have a
dot-chain in our state and if so calls <code>remove-dots</code>.
<code>remove-dots</code> takes the **dot-chain** and uses it to get
the dots that are to be kept and removed.

The <code>remove-dots-from-dom</code> function deserves some attention
because of its sequential use of the blocking call <code>(&lt;!
(timeout 150))</code> . The <code>timeout</code> function produces a
channel that sends a message at the end of the timeout.  This allows
us to do a scale out animation on an dot and then remove the dot from
the DOM after the animation has run.

The <code>remove-dots-from-dom</code> function also uses a **go**
block for the removal of each individual block. It's helpful to
consider a **go** as a separate asynchronous process that is getting
launched. So each "dot removal" is running in "parallel".  It's not
really running in parallel but conceptually it is.  The effect is that
all the selected dots shrink and disappear at the same time.

Here the use of a blocking timeout is a small win over doing a
callback based timeout.  It's simply less typing. The blocking timeout
becomes a much bigger win when the things that occur after the timeout
become more complex. Sequences such as timeout -> action -> timeout ->
action become much more easy to understand and adjust as sequential
instructions. When a timeout is a blocking call it's easy to change
its position in a chain of actions.

You can see a sequential use of timeout in the
<code>move-dots-to-new-positions</code> function.  This function
alters the absolute positions of the dots to bring them in line with
their actual position in the board. The loop that iterates over the
dots in the board is inside the **go** block.  This means that the
blocking 100ms timeouts will happen sequentially. The result is that
each dot falls down to position one *after* the other. This is a bigger
win for a blocking timeout and IMHO is a very straight forward
expression of the desired action.

Go ahead and swipe over the dots below. Swipe over the dots on the
bottom of the column to see the animation of the dots falling downward
one at a time. To reset it reload the page ;-).

<style>
.boardy .dot {
  -ms-transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  transition: all 0.2s;  
  -webkit-transform: translate3d(0,0,0);
}
.boardy .scale-out {
  -ms-transform: scale(0.1,0.1);
  -webkit-transform: scale3d(0.1,0.1,0.1);
  -moz-transform: scale(0.1,0.1);
  transform: scale3d(0.1,0.1,0.1);
}
</style>


<div id="example-4" class="boardy no-scroll" ondragstart="return false;" ondrop="return false;">
</div>
[full source for example](https://github.com/bhauman/bhauman.github.com/blob/master/assets/cljs/dots-game/ex4.cljs)

## Adding new dots

Now that we have removed the dots, we need to add some back.  This is
relatively easy given the functions that we have created already.

{% highlight clojure %}

(defn add-dots [state]
  (let [number-to-add (- board-size (count (state :board)))
        new-dots (map create-dot (repeat 8) (get-rand-colors number-to-add))
        next-board (concat (state :board) new-dots)]
    (add-dots-to-board (state :selector) new-dots)
    (go
     (<! (timeout 500))
     (move-dots-to-new-positions next-board))
    (assoc state :board (update-positions next-board))))

(defn render-updates [state]
  (if (pos? (count (state :dot-chain)))
    (add-dots (remove-dots state))
     state))

{% endhighlight %}

The <code>add-dots</code> function simply creates some new dots and adds them to
the board.  In order to support animating these dots into the scene
correctly we will add them at an off screen position and then use the
<code>move-dots-to-new-positions</code> function to move the new dots down to their
proper positions.

Furthermore we use a **go** block and a 500ms **timeout** to delay the
rendering of the new dots to give the existing displaced dots a chance
to fall into place before moving the new ones into view.

Here is the code working below.

<style>
.hide-overflow {
  overflow: hidden;
}
</style>

<div id="example-5" class="boardy hide-overflow no-scroll" ondragstart="return false;" ondrop="return false;">
</div>
[full source for example](https://github.com/bhauman/bhauman.github.com/blob/master/assets/cljs/dots-game/ex5.cljs)

## Selecting dots of the same color

For the game to work we to restrict the selection of dots to a single
color that matches the first selected dot.

{% highlight clojure %}

(defn dot-follows? [{:keys [board]} prev-dot cur-dot]
  (let [prev-color (-> board (get prev-dot) :color)
        cur-color (-> board (get cur-dot) :color)]
    (or (nil? prev-dot)
        (and (= prev-color cur-color)
             (or (= cur-dot (inc prev-dot))
                 (= cur-dot (dec prev-dot)))))))

(defn get-dot-chain [state dot-ch first-dot-msg]
  (go
   (loop [dot-chain []
          msg first-dot-msg]
     (if (not= :dot-pos (first msg))
       dot-chain
       (recur (if (dot-follows? state (last dot-chain) (last msg))
                (conj dot-chain (last msg))
                dot-chain)
              (<! dot-ch))))))

{% endhighlight %}

Here we only append a dot to the dot-chain if the next dot is of the
same color and is right next to the previous dot. I left it so that
dot-chains of length one will still get removed to make single column
interaction easier for the time being.  It's easy enough to require it
be at least two dots long later.

Give it a try:

<div id="example-6" class="boardy hide-overflow no-scroll" ondragstart="return false;" ondrop="return false;">
</div>
[full source for example](https://github.com/bhauman/bhauman.github.com/blob/master/assets/cljs/dots-game/ex6.cljs)

## Drawing feedback

We are going to finally give some feedback to our players so they know
which dots they are selecting.

{% highlight clojure %}

(defn dot-pos-to-center-position [dot-pos]
  (vec (map (partial + 10) (dot-pos-to-corner-position dot-pos))))

(defn render-chain-element [last-pos pos color]
  (let [[top1 left] (dot-pos-to-center-position last-pos)
        [top2 _] (dot-pos-to-center-position pos)
        style (str "width: 5px; height: 50px; top:"
                   (if (< top1 top2) top1 top2) 
                   "px; left: " ( - left 2) "px;")]
    [:div {:style style :class (str "line " (name (or color :blue)))}]))

(defn dot-highlight-templ [pos color]
  (let [[top left] (dot-pos-to-corner-position pos)
        style (str "top:" top "px; left: " left "px;")]
    [:div {:style style :class (str "dot-highlight " 
                                    (name (or color :blue)))}]))

(defn render-dot-chain [state dot-chain]
  (let [color (-> state :board
                  (get (first dot-chain))
                  :color)
        rends (map render-chain-element
                   (butlast dot-chain)
                   (rest dot-chain)
                   (repeat color))]
    (when (pos? (count dot-chain))
      (inner ($ (str (state :selector) " .dot-chain-holder"))
             (crate/html (concat [:div] rends)))
      (append ($ (str (state :selector) " .dot-highlights"))
              (crate/html (dot-highlight-templ (last dot-chain) color))))
    dot-chain))

(defn erase-dot-chain [state]
  (inner ($ (str (state :selector) " .dot-chain-holder")) "")
  (inner ($ (str (state :selector) " .dot-highlights")) ""))

(defn get-dot-chain [state dot-ch first-dot-msg]
  (go
   (loop [dot-chain []
          msg first-dot-msg]
     (if (not= :dot-pos (first msg))
       (do (erase-dot-chain state) dot-chain)
       (recur (if (dot-follows? state (last dot-chain) (last msg))
                (render-dot-chain state (conj dot-chain (last msg)))
                dot-chain)
              (<! dot-ch))))))

{% endhighlight %}

Here we simply insert <code>render-dot-chain</code> and
<code>erase-dot-chain</code> calls into our previously defined
<code>get-dot-chain</code> function.

The code is pretty straight forward and if you have followed along up
until now you should be able to parse it. 

Again try out the highlighting below.

<style>
.dot-chain-holder {
  position: absolute;                       
}

.line {
  position: absolute;
}

.dot-highlight {
   position: absolute;
   width: 20px;
   height: 20px;
   opacity: 0.0;
   border-radius: 10px;
   -webkit-animation-name: expander;
   -webkit-animation-duration: 0.7s;
   -webkit-animation-iteration-count: 1;
   -webkit-transform: translate3d(0,0,0) scale3d(2.8,2.8,0);
   -moz-animation-name: expander-moz;
   -moz-animation-duration: 0.7s;
   -moz-animation-iteration-count: 1;
   -moz-transform: scale(2.8,2.8);
}

@-webkit-keyframes expander {
  0% {
     -webkit-transform: scale3d(1.0,1.0,0);
     opacity: 0.8;
  }
  100% {
     -webkit-transform: scale3d(2.8,2.8,0);
     opacity: 0.0;
  }
}

@-moz-keyframes expander-moz {
  0% {
     -moz-transform: scale(1.0,1.0);
     opacity: 0.8;
  }
  100% {
     -moz-transform: scale(2.8,2.8);
     opacity: 0.0;
  }
}

</style>

<div id="example-7" class="boardy hide-overflow no-scroll" ondragstart="return false;" ondrop="return false;">
<div class="dot-chain-holder">
</div>
<div class="dot-highlights">
</div>
</div>
[full source for example](https://github.com/bhauman/bhauman.github.com/blob/master/assets/cljs/dots-game/ex7.cljs)

## Conclusion

Well, that was a walk through of the major parts of the Dots game.  Go
ahead and browse the actual code for the game
[here](https://github.com/bhauman/dotsters)
especially this
[file](https://github.com/bhauman/dotsters/blob/master/src/dots/core.cljs).

You can write a pretty responsive game using ClojureScript, Core.Async
and very basic DOM manipulation.  This was a surprise to
me. JavaScript engines are freaking fast.

ClojureScript core.async code is concise and expresses intent with
very little noise that is normally introduced by the constant
necessity for callbacks. As you can see, there is not a whole bunch of
code on this page.

While the code is side effect ridden it seems to be the result of
necessity (i.e. the phrasing of the animations) and is always directed
towards the DOM. I treat the application state purely and never mutate
it.

Features to explore:
* make the game more accessible for color blind people
* add a real time multi player element with cooperative scoring
* solve performance problems on other platforms
* decouple rendering and communicate with it over a channel
* create a canvas renderer


Resources:

* [Core.async documentation](http://clojure.github.io/core.async/)
* [Introduction to ClojureScript programming](https://github.com/magomimmo/modern-cljs)
* [ClojureScript Up and Running book](http://shop.oreilly.com/product/0636920025139.do)
* [David Nolen's core.async examples](https://github.com/swannodette/async-tests)
* [Core.async git repository examples](https://github.com/clojure/core.async/tree/master/examples)
* [Full game source](https://github.com/bhauman/dotsters).

<script src="/assets/js/dots-game-2.js">
</script>


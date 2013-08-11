---
layout: default
title: "ClojureScript Dots Game"
published: true
category: 
tags: []
---

<link rel="stylesheet" href="/assets/css/dots2.css">
</link>
<link rel="stylesheet" href="/assets/css/anim2.css">
</link>

## ClojureScript Core.Async Dots Game

First go ahead and play the game by connecting dots of the same color
to each other. (best played in Chrome or in Safari on the iPhone)

<style>
.dots-game-container {
  overflow: hidden;
  border: 1px solid #f6f6f6;
  width: 320px;
}
.dots-game .marq {
  line-height: 20px;
}

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

<div class="dots-game-container no-scroll" ondragstart="return false;" ondrop="return false;">
</div>

<script src="/assets/js/dots2.js">
</script>

To play the game in a separate window click [here](http://rigsomelight.com/dotsters).

The code for the game can be found [here](https://github.com/bhauman/dotsters/blob/master/src/dots/core.cljs).


This game was developed in Chrome on OSX and on an IPhone 4Gs. If your
browser doesn't support hardware acceleration for CSS 3d transforms,
the game isn't going to perform very well.

The game is derived from the iPhone game
[Dots](https://itunes.apple.com/us/app/dots-a-game-about-connecting/id632285588?mt=8).
The game isn't a complete copy of the original but it is enough to
play well.  This version is written in ClojureScript using the
**core.async** library and weighs in around 390 lines of code.

The game is drawn with DOM elements and uses CSS 3d transforms for
animation.

## Why? ... "Out of Book"

"Out of book" is a term used in Chess.  It refers to the point in the
game where the players leave the well documented opening moves and
enter into new territory. The players are no longer playing by route
memory, but addressing a new board position that more than likely has
never existed before.

In the process of programming applications this point occurs when we
move out of our tried and true patterns for accomplishing the task at
hand. Todos programs are often composed of "book moves".  Writing
games however takes us "out of book" pretty darn quickly, and this can
help us evaluate and improve our tools and process.

Personally, I am finding that the "out of book" experience is helping
me rediscover my childhood fascination with programming.  Something
I almost forgot I had.

## Building the Game

Using Core.async I was able to build the game in a fairly straight
forward manner. Addressing each part of the game sequentially as it
came up.  I made no real effort to be clever.  There are side effects
everywhere. There are very few pure functions.

Writing this game is another exercise to help me learn more about
Clojure and core.async, so take my Clojure idioms with a grain of salt.

That being said, I think this is a very reasonable way to write the
game and as a bonus it works.

This post is intended follow my [last
post](http://rigsomelight.com/2013/07/18/clojurescript-core-async-todos.html). The
code in this post uses the same channel manipulation pattern
introduced in that post. The last post also introduces the
core.async library and provides helpful links for learning
Clojure/ClojureScript.

## Composing events

Gestures are a composition of events. Drawing on a screen normally
commences after an initiating event like a click or a touch. A
**mousemove** event means something different depending if the mouse
button is down or not. A gesture is over once the mouse button is
released or your finger leaves the touch screen.  

What we would like to do, is bottle all of these raw input events up
and emit a stream of messages that capture drawing actions at a higher
level. Thus keeping the lower level details out of our main
application loop.

Here are some functions to help us gather the events we need into
a channel.

If you are new to Clojure this
[cheetsheet](http://clojure.org/cheatsheet) may help.

{% highlight clojure %}

(defn xy-message [ch msg-name xy-obj]
  (put! ch [msg-name {:x (.-pageX xy-obj) :y (.-pageY xy-obj)}]))

(defn touch-xy-message [ch msg-name xy-obj]
  (xy-message ch msg-name
              (aget (.-touches (.-originalEvent xy-obj)) 0)))

(defn mousemove-handler [in-chan jqevent]
  (if (pos? (.-which jqevent))
    (xy-message in-chan :draw jqevent)
    (put! in-chan [:drawend])))

(defn draw-event-capture [in-chan selector]
  (let [end-handler (fn [_] (put! in-chan [:drawend]))]
    (bind ($ selector) "mousemove" #(mousemove-handler in-chan %))
    (bind ($ selector) "mousedown" #(xy-message in-chan :draw %))
    (bind ($ selector) "mouseup"   end-handler)
    (bind ($ selector) "touchmove" #(touch-xy-message in-chan :draw %))
    (bind ($ selector) "touchend"  end-handler)))

{% endhighlight %}

The <code>draw-event-capture</code> method directs the different touch
and mouse events into the supplied input channel. We are capturing
both mouse events and touch events so the resulting draw channel will
work on both platforms.

Let's take these helpers and compose a stream of events that capture
the act of drawing.

{% highlight clojure %}

(defn get-drawing [input-chan out-chan]
  (go (loop [msg (<! input-chan)]
        (put! out-chan msg)
        (when (= (first msg) :draw)
          (recur (<! input-chan))))))

(defn draw-chan [selector]
  (let [input-chan (chan)
        out-chan   (chan)]
    (draw-event-capture input-chan selector)
    (go (loop [[msg-name _ :as msg] (<! input-chan)]
          (when (= msg-name :draw)
            (put! out-chan msg)
            (<! (get-drawing input-chan out-chan)))
          (recur (<! input-chan))))
    out-chan))

{% endhighlight %}

We are using the **core.async** library here to build a channel which
will behave as a blocking message queue.  We can create a channel with
the <code>chan</code> function and we can block on input from the
channel inside of a **go** block with the <code>&lt;!</code>
function. You can use the <code>put!</code> function to asynchronously
put messages into a channel.

Given a CSS selector the <code>draw-chan</code> function will compose
and return a channel that emits drawing events relevant to the
selected DOM elements. It emits <code>[:draw {:x - :y -}]</code>
messages while a draw action is occurring and ends a complete drawing
action with one <code>[:drawend]</code> message.

When the loop in <code>draw-chan</code> receives a **:draw** message
it passes the composed <code>input-chan</code> to the
<code>get-drawing</code> loop. <code>get-drawing</code> will only emit
**:draw** messages until it receives a message that isn't a **:draw**
message and then control flow returns to the context of the
<code>draw-chan</code> loop and waits for the next drawing action to
start.

An interesting thing to notice is that I'm not setting a flag to
indicate when we are in "drawing mode".  We flow into and out of a
drawing context.

This cleans up the act of drawing from a set of separate events into a
single act.

Go ahead and draw in the window below:

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
    (get peice-colors (rand-int number-colors))))

(defn get-rand-colors [number]
  (map (fn [x] (rand-color)) (range number)))

(defn dot-pos-to-corner-position [dot-pos]
  [(+ 25 (* grid-unit (- (dec board-size) dot-pos))) 25])

(defn dot [i color]
  (let [[top left] (dot-pos-to-corner-position i)
        class (str "dot " (name color))
        style (str "top:" top "px; left: " left "px;")]
    [:div {:class class :style style}]))

(defn create-dot [i color]
  {:color color :elem (crate/html (dot i color))})

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
  (let [[x y] (map - [x y] offset [13 86])]
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
channel. It maps the mouse position coordinated to dot positions and
prevents duplicate messages for individual dots. We will probably
receive several messages for each dot as we swipe over them. It is
better to eliminate these extra messages and provide as nice clean
stream of draw actions to the channels consumers.

By the way, I keep using this pattern repeatedly and thus its starting
to ask for a higher level abstraction. This case probably calls for a
macro, but that's for another time.

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

This effectively decouples the events from the actions being taken.
Following this pattern we can easily create new event sources without
rewriting our application code. For instance, we can simply write a
separate input channel for testing purposes or an automated player.

Having a message queue also allows us to filter, repeat and otherwise
morph the queue as we are above. We took a series of drawing messages
and turned it into a series of dot messages.

The queue of messages is a powerful pattern that should be included in
our considerations when writing JavaScript programs.

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
**:end-dots** message returning the vector of dot positions.

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
callback based timeout.  It's simply less typing. As the things that
occur after the timeout become more complex it becomes a much bigger
win. Sequences such as timeout -> action -> timeout -> action become
more easy to understand and adjust. When a timeout is a blocking call
it's easy to change its position in a chain of actions.

You can see a sequential use of timeout in the
<code>move-dots-to-new-positions</code> function.  This function
alters the absolute positions of the dots to bring them in line with
their actual position in the board. The loop that iterates over the
dots in the board is inside the *go* block.  This means that the
blocking 100ms timeouts will happen sequentially. The result is that
each dot falls down to position one after the other. This is a bigger
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
especially this [file](https://github.com/bhauman/dotsters/blob/master/src/dots/core.cljs).

You can write a pretty responsive game using ClojureScript, Core.Async
and very basic DOM manipulation.  This was a surprise to
me. JavaScript engines are freaking fast.

ClojureScript core.async code is concise and expresses intent with
very little noise that is normally introduced by the constant
necessity for callbacks.

While the code is side effect ridden it seems to be the result of
necessity (i.e. the phrasing of the animations) and is always directed
towards the DOM. I treat the application state purely and never mutate
it.

There are many directions to explore from here.  Decoupling the
renderer would be very interesting.

Features to explore:
* make the game more accessible for color blind people
* add a multi player element with cooperative scoring
* solve performance problems on other platforms

Resources:

* [Core.async documentation](http://clojure.github.io/core.async/)
* [Introduction to ClojureScript programming](https://github.com/magomimmo/modern-cljs)
* [ClojureScript Up and Running book](http://shop.oreilly.com/product/0636920025139.do)
* [David Nolen's core.async examples](https://github.com/swannodette/async-tests)
* [Core.async git repository examples](https://github.com/clojure/core.async/tree/master/examples)
* [Full game source](https://github.com/bhauman/dotsters).

<script src="/assets/js/dots-game.js">
</script>


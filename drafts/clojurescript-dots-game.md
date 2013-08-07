---
layout: default
title: "ClojureScript Dots Game"
published: true
category: 
tags: []
---

## ClojureScript Core.Async Dots Game

First go ahead and play the finished game:




The game is a copy of the iPhone game.  It isn't feature complete but
it plays pretty well.  This version is written in ClojureScript and
weighs in around 390 lines of code. It could have been less code but I
wanted it to be straight forward and approachable to newcomers.

It's rendered with DOM elements and uses CSS transforms for animation.  

Caveat this game was developed in Chrome on OSX and on an IPhone
4Gs. If your phone doesn't have hardware acceleration for CSS 3d
transforms, it's probably not going to perform very well.

Writing the game using core.async was really an amazing experience. 
During my development I expected to encounter major performance
problems.  This never happened. I never had to optimize code to make
the game run faster.

## Building the Game

We are going to walk through building the game and show how Core.async
straightens out what would normally be some sharp corners.

## Composing events

Gestures are a composition of events. Drawing on a screen normally
commences after an initiating event like a click or a touch. A
mousemove event means something different depending if the mouse
button is down or not. A gesture is over once the mouse button is
released or your finger leaves the touch screen.  

What we would like to do is bottle all of these input events up
and emit a stream of that capture drawing correctly so that we
aren't handling it in our main application code.

I also have the constraint that I would like to respond to touch
events as well as mouse events. 

First create some functions to help us gather the events we need into
a channel.

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

The draw-event-capture method directs events into the supplied input
channel. We are capturing both mouse events and touch events so the
resulting draw channel will work on both platforms.

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

Given a selector draw-chan will compose a channel that emits drawing
events.  It only emit's :draw messages and ends a :draw action with
one :drawend message.

When the loop in draw-chan receives a :draws message it passes the
composite input-chan to the get-drawing loop. get-drawing
will only emit :draw messages until it receives a message that isn't 
a :draw message and then control flow returns to the context of the
draw-chan loop and waits for the next :draw message.

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

<div id="example-1">
</div>

As you can see each act of drawing is separate and has it's own
color. 

## A single column game

Let's create a dots game that is just one column. To start we
will work on rendering a list of dots. Below we have a set of
functions that will help us render a board of random dots.

{% highlight clojure %}

(def grid-unit 45)
(def dot-size  20)
(def board-size 6)
(def peice-colors [:blue :green :yellow :purple :red])

(let [number-colors (count peice-colors)]
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
.dot {
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
.board { 
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

<div id="example-2" class="board">
</div>

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
        dot-collector (partial collect-dots draw-input out-chan board-offset)]
    (go
     (loop [msg (<! draw-input)]
       (when (= (first msg) :draw)
         (<! (dot-collector msg))
         (put! out-chan [:end-dots]))
       (recur (<! draw-input))))
    out-chan))

{% endhighlight %}

You can see this code in action if you use your mouse to swipe over
the dots below.

<style>
.logger {
  font-size: 10px;
}
#example-3-log {
  position: absolute;
  left: 90px;
  width: 300px;
  height: 295px;
  overflow: auto;
}
</style>

<div id="example-3" class="board">
<div id="example-3-log" class="logger">
</div>
</div>

What's happening here is we are emitting a series of messages that
represent dots that have been touched in a single draw gesture and
ending the gesture with an :end-dots message.

## Putting together a game loop

Now that we've turned low level events into a high level game
information stream let's consume that stream.

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

The game loop creates the dot-channel and passes it to the
dot-chain-getter.  The dot-chain-getter returns a chain of dot's
selected by the player.  The returned dot-chain get's added to the
state and rendered. 

The rest of the code follows the same pattern collecting dots until
we get to the :end-dots message.

So now let's look at rendering the removal of the dots.

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

render-upates checks to see if we have a dot-chain in our state and if
so calls remove-dots.  remove-dots takes the dot-chain and uses it to
get the dots that are to be kept and removed.  It then deletes the
dots form the DOM. After removing the dots from the DOM it goes on to
move the remaining displaced dots into position.  

As it updates the remaining dots it first checks to see if they are in
the correct position and if not it updates their top and left
properties. It does the updates in a staggered fashion updating one
and waiting 100ms and then updating another. That way we get a
staggered animation where one dot drops and then another.

Go ahead and swipe over the dots below. Swipe over the dots on the
bottom of the column to see the animation of the dots being relocated.

<style>
.dot {
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  transition: all 0.2s;  
  -webkit-transform: translate3d(0,0,0);
}
.scale-out {
  -webkit-transform: scale3d(0.1,0.1,0.1);
}
</style>


<div id="example-4" class="board">
</div>

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

The add-dots function simply takes creates some new dots and adds them
to the board.  In order to support animating these dots into the scene
correctly we will add them at an off screen position and then use the
move-dots-to-new-positions function to move the new dots down to their
proper positions.

Furthermore the we wait 500ms before rendering the new dots into place.

Here is the code working below.

<style>
.hide-overflow {
  overflow: hidden;
}
</style>

<div id="example-5" class="board hide-overflow">
</div>

## Selecting dots of the same color

For the game to work we need to only be able to select chains of dots
where they are all the same color.

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
dot-chains of length one will still get removed to make interaction
easier for the time being.  It's easy enough to require it be at least
two dots long later.

<div id="example-6" class="board hide-overflow">
</div>

## Drawing feedback

We are going to finally give some feedback to our players so they now
what dot's they are selecting.

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

</style>

<div id="example-7" class="board hide-overflow">
<div class="dot-chain-holder">
</div>
<div class="dot-highlights">
</div>
</div>





<script src="/assets/js/dots-game.js">
</script>


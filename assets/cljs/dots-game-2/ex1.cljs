(ns dots-game-2.ex1
  (:require
   [cljs.core.async :as async
    :refer [<! >! chan close! sliding-buffer put! alts! timeout]]
   [jayq.core :refer [$ append ajax inner css $deferred
                      when done resolve pipe on bind attr
                      offset] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   [dots-game-2.utils :refer [tap-until take-until filter-chan map-chan
                              tap-into siphon siphon-off logger-chan
                              go-iterate-chan go-iterate-state
                              apply-to-chan]])
  (:require-macros [cljs.core.async.macros :as m :refer [go]]))

(defn is-bad-ie? []
  (let [browser (.-browser js/$)]
    (and (.-msie browser)
         (> 10 (.-version browser)))))

(defn xy-message [ch msg-name xy-obj]
  (put! ch [msg-name {:x (.-pageX xy-obj) :y (.-pageY xy-obj)}]))

(defn touch-xy-message [ch msg-name xy-obj]
  (xy-message ch msg-name
              (aget (.-touches (.-originalEvent xy-obj)) 0)))

(defn mousemove-handler [in-chan jqevent]
  (if (pos? (if (nil? (.-buttons jqevent))
              (.-which jqevent)
              (.-buttons jqevent)))
    (xy-message in-chan :draw jqevent)
    (put! in-chan [:drawend])))

(defn nice-mouse-event-capture [in-chan selector end-handler]
  (bind ($ selector) "mousemove" #(mousemove-handler in-chan %))
  (bind ($ selector) "mousedown" #(xy-message in-chan :draw %))
  (bind ($ selector) "mouseup"   end-handler))

(defn ie-mouse-event-capture [in-chan selector end-handler]
  (bind ($ selector) "mousemove" #(xy-message in-chan :draw %))
  (bind ($ "body") "mousedown" #(xy-message in-chan :drawstart %))
  (bind ($ "body") "mouseup"   end-handler))

(defn draw-event-capture
  ([selector] (draw-event-capture (chan) selector))
  ([in-chan selector]
     (let [end-handler (fn [_] (put! in-chan [:drawend]))]
       (if (is-bad-ie?)
         (ie-mouse-event-capture in-chan selector end-handler)
         (nice-mouse-event-capture in-chan selector end-handler))
       (bind ($ selector) "touchmove" #(touch-xy-message in-chan :draw %))
       (bind ($ selector) "touchend"  end-handler)
       in-chan)))

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

(defn draw-chan [selector]
  (let [input-chan (draw-event-capture selector)
        start-message (if (is-bad-ie?) :drawstart :draw)]
    (partition-chan #(= start-message (first %))
                    #(not= :draw (first %))
                    input-chan)))

(defn draw-point [selector color coord {:keys [top left]}]
  (append ($ selector)
          (crate/html [:div {:class (str "point " (name color))
                             :style (str "top: " (- (coord :y) top 5) "px;"
                                         "left: " (- (coord :x) left 5) "px;")}])))

(defn within-element-predicate [selector]
  (let [offset   (offset ($ selector))
        width    (+ (.width ($ selector)) (offset :left))
        height   (+ (.height ($ selector)) (offset :top))
        in-range #(and (< (offset :top) (% :y) height)
                       (< (offset :left) (% :x) width))]
    (fn [[msg-name xy-obj]]
      (and xy-obj (in-range xy-obj)))))

(defn drawing-loop [selector]
  (let [in-range-pred (within-element-predicate selector)
        offset   (offset ($ selector))
        get-color #(get [:red :green :blue] (mod % 3))
        drawing-chan (draw-chan selector)]
    (go
     (loop [color-i 0]
       (let [draw-action-chan (<! drawing-chan)]
         (<! (apply-to-chan
              #(when (in-range-pred %)
                 (draw-point selector (get-color color-i) (last %) offset))
              draw-action-chan))
         (recur (inc color-i)))))))

(defn example-1 [selector]
  (drawing-loop selector))

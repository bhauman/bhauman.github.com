(ns dots-game.ex3
  (:require
   [cljs.core.async :as async
    :refer [<! >! chan close! sliding-buffer put! alts! timeout]]
   [jayq.core :refer [$ append ajax inner css $deferred
                      when done resolve pipe on bind attr
                      offset] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   [dots-game.ex1 :refer [draw-chan]]
   [dots-game.ex2 :refer [render-example-board grid-unit board-size] :as board])
  (:require-macros [cljs.core.async.macros :as m :refer [go]]))

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
        dot-collector (partial collect-dots draw-input out-chan board-offset)]
    (go
     (loop [msg (<! draw-input)]
       (when (= (first msg) :draw)
         (<! (dot-collector msg))
         (put! out-chan [:end-dots]))
       (recur (<! draw-input))))
    out-chan))

(defn log-loop [selector]
  (let [dot-ch (dot-chan selector)]
    (render-example-board selector)
    (go
     (loop []
       (.prepend ($ (str selector "-log"))
               (crate/html [:div (prn-str (<! dot-ch))]))
       (recur)))))

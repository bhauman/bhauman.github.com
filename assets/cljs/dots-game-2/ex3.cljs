(ns dots-game-2.ex3
  (:require
   [cljs.core.async :as async
    :refer [<! >! chan close! sliding-buffer put! alts! timeout]]
   [jayq.core :refer [$ append ajax inner css $deferred
                      when done resolve pipe on bind attr
                      offset] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   [dots-game-2.utils :refer [map-chan apply-to-chan remove-sequential-duplicates]]   
   [dots-game-2.ex1 :refer [draw-chan]]
   [dots-game-2.ex2 :refer [render-example-board grid-unit board-size] :as board])
  (:require-macros [cljs.core.async.macros :as m :refer [go]]))

(def reverse-board-position (partial - (dec board-size)))

(defn coord->dot-pos [offset {:keys [x y]}]
  (let [[x y] (map - [x y] offset [13 13])]
    (when (and (< 12 x (+ 12 grid-unit))
               (< 12 y (* board-size grid-unit)))
      (reverse-board-position (int (/ y grid-unit))))))

(defn draw-action-msg [board-offset draw-action-chan]
  (remove-sequential-duplicates
    (map-chan
     #(if-let [cur-pos (coord->dot-pos board-offset (last %))] cur-pos)
     draw-action-chan)))

(defn dot-chan [selector]
  (let [board-offset ((juxt :left :top) (offset ($ selector)))]
    (map-chan #(draw-action-msg board-offset %) (draw-chan selector))))

(defn log-it [selector in-chan]
  (let [log-func (fn [x] (.prepend ($ (str selector "-log"))
                                  (crate/html x)))]
    (apply-to-chan log-func in-chan)))

(defn log-loop [selector]
  (let [dot-ch (dot-chan selector)]
    (render-example-board selector)
    (go
     (loop [dot-input-ch (<! dot-ch)]
       (<! (log-it selector (map-chan (fn [msg] [:div (prn-str msg)]) dot-input-ch)))
       (<! (log-it selector (go [:div.log-msg " end of channel "])))
       (recur (<! dot-ch))))))

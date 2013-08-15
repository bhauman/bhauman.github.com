(ns dots-game-2.ex4
  (:require
   [cljs.core.async :as async
    :refer [<! >! chan close! sliding-buffer put! alts! timeout]]
   [jayq.core :refer [$ append ajax inner css $deferred
                      when done resolve pipe on bind attr
                      offset] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   [dots-game-2.ex1 :refer [draw-chan]]
   [dots-game-2.ex2 :refer [render-example-board grid-unit board-size
                          create-dot get-rand-colors
                          dot-pos-to-corner-position] :as board]
   [dots-game-2.ex3 :refer [dot-chan]]
   [dots-game-2.utils :refer [siphon]]
   )
  (:require-macros [cljs.core.async.macros :as m :refer [go]]))

(def create-dots #(map-indexed create-dot (get-rand-colors %)))

(defn initial-state [selector]
  {:board (create-dots board-size)
   :dot-chain []})

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
        next-board     (keep-indexed #(if (not (pos-set %1)) %2) (state :board))]
    (remove-dots-from-dom dots-to-remove)
    (move-dots-to-new-positions next-board)
    (assoc state :board (update-positions next-board) :dot-chain [])))

(defn render-updates [state]
  (if (pos? (count (state :dot-chain)))
    (remove-dots state)
    state))

(defn game-loop [selector init-state]
  (let [dot-ch (dot-chan selector)]
    (add-dots-to-board selector (init-state :board))
    (go
     (loop [state init-state]
       (let [next-state (assoc state :dot-chain (<! (siphon (<! dot-ch))))
             state (render-updates next-state)]
         (recur state))))))

(defn example-4 [selector]
  (game-loop selector (initial-state selector)))

(ns dots-game.ex5
  (:require
   [cljs.core.async :as async
    :refer [<! >! chan close! sliding-buffer put! alts! timeout]]
   [jayq.core :refer [$ append ajax inner css $deferred
                      when done resolve pipe on bind attr
                      offset] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   [dots-game.ex1 :refer [draw-chan]]
   [dots-game.ex2 :refer [render-example-board grid-unit board-size
                          create-dot get-rand-colors
                          dot-pos-to-corner-position] :as board]
   [dots-game.ex3 :refer [dot-chan]])
  (:require-macros [cljs.core.async.macros :as m :refer [go]]))

(def create-dots #(map-indexed create-dot (get-rand-colors %)))

(defn initial-state [selector]
  {:board (create-dots board-size)
   :dot-chain []
   :selector selector})

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

(defn get-dot-chain [dot-ch first-dot-msg]
  (go
   (loop [dot-chain []
          msg first-dot-msg]
     (if (not= :dot-pos (first msg))
       dot-chain
       (recur (conj dot-chain (last msg)) (<! dot-ch))))))

(defn dot-chain-getter [dot-ch]
  (go
   (loop [dot-msg (<! dot-ch)]
     (if (= :dot-pos (first dot-msg))
       (<! (get-dot-chain dot-ch dot-msg))
       (recur (<! dot-ch))))))

(defn game-loop [selector init-state]
  (let [dot-ch (dot-chan selector)]
    (add-dots-to-board selector (init-state :board))
    (go
     (loop [state init-state]
       (let [next-state (assoc state :dot-chain (<! (dot-chain-getter dot-ch)))
             state (render-updates next-state)]
         (recur state))))))

(defn example-5 [selector]
  (game-loop selector (initial-state selector)))

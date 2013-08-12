(ns dots-game.ex7
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
  {:board (vec (create-dots board-size))
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

(defn dot-pos-to-center-position [dot-pos]
  (vec (map (partial + 10) (dot-pos-to-corner-position dot-pos))))

(defn render-chain-element [last-pos pos color]
  (let [[top1 left] (dot-pos-to-center-position last-pos)
        [top2 _] (dot-pos-to-center-position pos)
        style (str "width: 5px; height: 50px; top:"
                   (if (< top1 top2) top1 top2) "px; left: " ( - left 2) "px;")]
    [:div {:style style :class (str "line " (name (or color :blue)))}]))

(defn dot-highlight-templ [pos color]
  (let [[top left] (dot-pos-to-corner-position pos)
        style (str "top:" top "px; left: " left "px;")]
    [:div {:style style :class (str "dot-highlight " (name (or color :blue)))}]))

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
       (do (erase-dot-chain state) dot-chain)
       (recur (if (dot-follows? state (last dot-chain) (last msg))
                (render-dot-chain state (conj dot-chain (last msg)))
                dot-chain)
              (<! dot-ch))))))

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
       (let [next-state (assoc state :dot-chain
                               (<! (dot-chain-getter state dot-ch)))
             state (render-updates next-state)]
         (recur state))))))

(defn example-7 [selector]
  (game-loop selector (initial-state selector)))

(ns dots-game.ex8
  (:require
   [cljs.core.async :as async
    :refer [<! >! chan close! sliding-buffer put! alts! timeout]]
   [jayq.core :refer [$ append ajax html css $deferred
                      done resolve pipe on bind attr
                      offset] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   [dots-game.ex1 :refer [draw-chan]]
   [dots-game.ex2 :refer [render-example-board grid-unit board-size
                          create-dot get-rand-colors] :as board])
  (:require-macros [cljs.core.async.macros :as m :refer [go]]))

(def reverse-board-position (partial - (dec board-size)))

(defn dot-pos-to-corner-position [[xpos ypos]]
  (mapv #(+ 25 (* grid-unit %)) [(reverse-board-position ypos) xpos]))

(defn coord->dot-pos [offset {:keys [x y]}]
  (let [[x y] (map - [x y] offset [13 13])]
    (when (and (< 12 x (* board-size grid-unit))
               (< 12 y (* board-size grid-unit)))
      [(int (/ x grid-unit)) (reverse-board-position (int (/ y grid-unit)))])))

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
  (log selector)
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

(def create-dots #(map-indexed create-dot (get-rand-colors %)))

(defn initial-state [selector]
  {:board (mapv (fn [_] (vec (create-dots board-size))) 
                (range board-size)) 
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
  (log "board" (prn-str board))
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

(defn chain-element-templ [last-pos pos color]
  (let [[top1 left1] (dot-pos-to-center-position last-pos)
        [top2 left2] (dot-pos-to-center-position pos)
        [width height] (if (= left1 left2) [5 grid-unit] [grid-unit 5])
        style (str "width: " width "px;"
                   "height: " height "px;" 
                   "top: " (- (min top1 top2) 2) "px;"
                   "left: " (- (min left1 left2) 2) "px;")]
    [:div {:style style :class (str "line " (name (or color :blue)))}]))

(defn dot-highlight-templ [pos color]
  (let [[top left] (dot-pos-to-corner-position pos)
        style (str "top:" top "px; left: " left "px;")]
    [:div {:style style :class (str "dot-highlight " (name color))}]))

(defn dot-color [{:keys [board]} dot-pos]
  (-> board (get-in dot-pos) :color))

(defn render-dot-chain-update [last-dot-chain dot-chain state]
  (let [last-chain-length (count last-dot-chain)
        chain-length      (count dot-chain)
        selector (state :selector)]
    (log (prn-str dot-chain))
    (when (and (not= last-chain-length chain-length) (pos? chain-length))
      (let [color (dot-color state (first dot-chain))
            length-diff            (- chain-length last-chain-length)]
        (if (< 1 chain-length)
          (if (pos? length-diff)
            (append ($ (str selector " .dot-chain-holder"))
                    (crate/html (chain-element-templ
                                 (last (butlast dot-chain))
                                 (last dot-chain)
                                 color)))
            (.remove (.last ($ (str selector " .dot-chain-holder .line")))))
          (html ($ (str selector " .dot-chain-holder")) ""))
        (append ($ (str selector " .dot-highlights"))
                (crate/html (dot-highlight-templ (last dot-chain) color)))))
    dot-chain))

(defn erase-dot-chain [state]
  (html ($ (str (state :selector) " .chain-line")) "")
  (html ($ (str (state :selector) " .dot-highlights")) ""))


(def abs #(.abs js/Math %))

(defn dot-follows? [state prev-dot cur-dot]
  (log (prn-str [prev-dot cur-dot]))
  (and (not= prev-dot cur-dot)
       (or (nil? prev-dot)
           (and
            (= (dot-color state prev-dot) (dot-color state cur-dot))
            (= 1 (apply + (mapv (comp abs -) cur-dot prev-dot)))))))

(defn get-dot-chain [state dot-ch first-dot-msg]
  (go
   (loop [dot-chain []
          msg first-dot-msg]
     (if (not= :dot-pos (first msg))
       (do (erase-dot-chain state) dot-chain)
       (recur (if (dot-follows? state (last dot-chain) (last msg))
                (render-dot-chain-update dot-chain
                                         (conj dot-chain (last msg))
                                         state)
                dot-chain)
              (<! dot-ch))))))

(defn dot-chain-getter [state dot-ch]
  (go
   (loop [dot-msg (<! dot-ch)]
     (if (= :dot-pos (first dot-msg))
       (<! (get-dot-chain state dot-ch dot-msg))
       (recur (<! dot-ch))))))

(defn column-selectors [selector]
     (map-indexed #(str %2 " .column-" %1) (repeat selector)))

(defn add-dots-to-columns [selector board]
  (mapv add-dots-to-board
        (column-selectors selector)
        board))

(defn duplex-updates [state]
  (let [dot-chains (map (fn [[k v]] [k (map last v)])
                        (group-by first (state :dot-chain)))
        init-board (state :board)
        selectors (column-selectors (state :selector))]
    (loop [board init-board
           [dot-group & xdot-chain] dot-chains]
      (if (nil? dot-group)
        (assoc state :board board :dot-chain []) 
        (let [[col-index dot-chain] dot-group]
          (recur
           (assoc board col-index
                  (:board (render-updates {:board (get board col-index)
                                           :selector (get selectors col-index)}))) 
           xdot-chain))))))

(defn game-loop [selector init-state]
  (let [dot-ch (dot-chan selector)]
    (add-dots-to-columns selector (init-state :board))
    (go
     (loop [state init-state]
       (let [next-state (assoc state :dot-chain
                               (<! (dot-chain-getter state dot-ch)))
             state (render-updates next-state)]
         (log (prn-str state))
         (recur state))))))

(defn example-8 [selector]
  (game-loop selector (initial-state selector)))

(ns dots-game.ex2
  (:require
   [cljs.core.async :as async
    :refer [<! >! chan close! sliding-buffer put! alts! timeout]]
   [jayq.core :refer [$ append ajax inner css $deferred
                      when done resolve pipe on bind attr
                      offset] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate])
  (:require-macros [cljs.core.async.macros :as m :refer [go]]))

(def grid-unit 45)
(def board-size 6)
(def peice-colors [:blue :green :yellow :purple :red])

(let [number-colors (count peice-colors)]
  (defn rand-color []
    (get peice-colors (rand-int number-colors))))

(defn get-rand-colors [number]
  (map (fn [x] (rand-color)) (range number)))

(defn dot-pos-to-corner-position [dot-pos]
  [(+ 23 (* grid-unit (- (dec board-size) dot-pos))) 23])

(defn dot-templ [i color]
  (let [[top left] (dot-pos-to-corner-position i)
        class (str "dot " (name color))
        style (str "top:" top "px; left: " left "px;")]
    [:div {:class class :style style}]))

(defn create-dot [i color]
  {:color color :pos i :elem (crate/html (dot-templ i color))})

(defn render-state [selector board]
  (mapv #(append ($ selector) (:elem %)) board))

(defn render-example-board [selector]
  (render-state selector
                (map-indexed create-dot (get-rand-colors board-size))))

(def example-2 render-example-board)

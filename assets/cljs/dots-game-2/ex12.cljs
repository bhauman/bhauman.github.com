(ns dots-game-2.ex11
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

(defn chan-logger [ch]
  (go (loop []
        (if-let [msg (<! ch)]
          (do (print (prn-str msg)) (recur))))))

(defn send-draw-messages [ch times]
  (dotimes [_ times]
    (mapv (fn [x y] (put! ch [:draw x y])) (range 4) (range 4))
    (put! ch [:drawend])))

(defn trans-inner-state [state _] (inc state))
(defn trans-outer-state [state]   (inc state))

(comment "The pattern below is the one I have been using/abusing.")

(defn binary-state-machine [ch]
  (go
   (loop [state 0
          msg (<! ch)]
     (if (= :draw (first msg))
       (let [next-state (loop [state state
                               msg msg]
                          (if (not= :draw (first msg))
                            state
                            (recur (trans-inner-state state msg) (<! ch))))]
         (recur (trans-outer-state next-state) (<! ch)))
       (recur state (<! ch))))))

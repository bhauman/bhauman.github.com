(ns dots-game-2.core
  (:require
   [cljs.core.async :as async
    :refer [<! >! chan close! sliding-buffer put! alts! timeout]]
   [jayq.core :refer [$ append ajax css $deferred
                      done resolve pipe on bind attr
                      offset] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   
   [dots-game-2.ex1 :refer [example-1]]
   [dots-game-2.ex2 :refer [example-2]]
   [dots-game-2.ex3 :refer [log-loop]]

   )
  (:require-macros [cljs.core.async.macros :as m :refer [go]]))

(defn no-scroll-on-touch [selector]
  (bind ($ selector) "touchstart" (fn [e] (jq/prevent e)))
  (bind ($ selector) "dragstart" (fn [e] (jq/prevent e)))
  (bind ($ selector) "drop" (fn [e] (jq/prevent e))))

 ($ (fn []
      (go
       (<! (timeout 2000))
       (example-1 "#example-1")
       (log-loop "#example-3")
       (no-scroll-on-touch ".no-scroll"))
     ))

(ns dots-game-2.core
  (:require
   [cljs.core.async :as async
    :refer [<! >! chan close! sliding-buffer put! alts! timeout]]
   [jayq.core :refer [$ append ajax inner css $deferred
                      when done resolve pipe on bind attr
                      offset] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   
   [dots-game-2.ex1 :refer [example-1]]
   #_[dots-game-2.ex11 :refer [example-1-1]]   
   [dots-game-2.ex2 :refer [example-2]]
   [dots-game-2.ex3 :refer [log-loop]]
   [dots-game-2.ex4 :refer [example-4]]
   [dots-game-2.ex5 :refer [example-5]]
   #_[dots-game-2.ex6 :refer [example-6]]
   #_[dots-game-2.ex7 :refer [example-7]]
   )
  (:require-macros [cljs.core.async.macros :as m :refer [go]]))

(defn no-scroll-on-touch [selector]
  (bind ($ selector) "touchstart" (fn [e] (jq/prevent e)))
  (bind ($ selector) "dragstart" (fn [e] (jq/prevent e)))
  (bind ($ selector) "drop" (fn [e] (jq/prevent e))))

 ($ (fn []
      (go
       (<! (timeout 2000))
       #_(example-1-1 "#example-1-1")       
       (example-1 "#example-1")
       #_(example-2 "#example-2")
       (log-loop "#example-3")
       (example-4 "#example-4")
       (example-5 "#example-5")
       #_(example-6 "#example-6")       
       (comment
         (example-7 "#example-7"))

       (no-scroll-on-touch ".no-scroll"))
     ))

(ns todos-async.core
  (:require
   [cljs.core.async :as async
             :refer [<! >! chan close! sliding-buffer put! alts!]]
   [jayq.core :refer [$ append ajax inner $deferred when done resolve pipe on] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   [clojure.string :refer [join blank?]]
   [todos-async.ex1 :as ex1]
   [todos-async.ex2 :as ex2]
   [todos-async.ex3 :as ex3]
   [todos-async.ex4 :as ex4])
  (:require-macros [cljs.core.async.macros :as m :refer [go alt!]]))

(ex1/app-loop { :todo-list [{:content "buy milk"}
                            {:content "buy cheese"}]})

(ex2/app-loop { :todo-list [{:content "buy carrots"}
                            {:content "buy arugula"}]})

(ex3/app-loop { :todo-list [{:content "buy flowers"}
                            {:content "buy chocolate"}]})

(ex4/app-loop { :todo-list [{:content "buy a new car"}]})


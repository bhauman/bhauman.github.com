(ns todos-async.ex2
  (:require
   [cljs.core.async :as async
             :refer [<! >! chan close! sliding-buffer put! alts!]]
   [jayq.core :refer [$ append ajax inner $deferred when done resolve pipe on] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   [clojure.string :refer [join blank?]]
   [todos-async.chan-utils :refer [click-chan merge-chans filter-chan]]
   [todos-async.ex1 :refer [todo-list]])
  (:require-macros [cljs.core.async.macros :as m :refer [go alt!]]))

(defn render-templates [state]
  (-> ($ "#example2")
      (inner (crate/html (todo-list state)))))

(defn app-loop [start-state]
  (let [ new-todo-click         (click-chan "#example2 a.new-todo" :new-task)
         cancel-new-form-click  (click-chan "#example2 a.cancel-new-todo" :cancel-new-form)
         input-chan             (merge-chans new-todo-click cancel-new-form-click)]
    (go
     (loop [state start-state]
       (render-templates state)
       (<! new-todo-click)
       (render-templates (assoc state :mode :add-todo-form))
       (<! (filter-chan (comp #{:cancel-new-form} first)
                        input-chan))
       (recur (dissoc state :mode))))))

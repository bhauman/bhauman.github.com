(ns todos-async.ex2
  (:require
   [cljs.core.async :as async
             :refer [<! >! chan close! sliding-buffer put! alts!]]
   [jayq.core :refer [$ append ajax inner html $deferred $when done resolve pipe on] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   [clojure.string :refer [join blank?]]
   [todos-async.chan-utils :refer [click-chan form-submit-chan get-next-message]]
   [todos-async.ex1 :refer [todo-list]])
  (:require-macros [cljs.core.async.macros :as m :refer [go alt!]]))

(defn render-templates [state]
  (-> ($ "#example2")
      (html (crate/html (todo-list state)))))

(defn app-loop [start-state]
  (form-submit-chan "#example2 .new-task-form" :ignore []) ;; ignore form
  (let [ new-todo-click         (click-chan "#example2 a.new-todo" :new-task)
         cancel-new-form-click  (click-chan "#example2 a.cancel-new-todo" :cancel-new-form)
         input-chan             (async/merge [new-todo-click cancel-new-form-click])]
    (go
     (loop [state start-state]
       (render-templates state)
       (<! (get-next-message #{:new-task} input-chan))
       (render-templates (assoc state :mode :add-todo-form))
       (<! (get-next-message #{:cancel-new-form} input-chan))
       (recur (dissoc state :mode))))))

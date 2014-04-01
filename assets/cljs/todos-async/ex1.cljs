(ns todos-async.ex1
  (:require
   [cljs.core.async :as async
             :refer [<! >! chan close! sliding-buffer put! alts!]]
   [jayq.core :refer [$ append ajax inner html $deferred when done resolve pipe on] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   [clojure.string :refer [join blank?]]
   [todos-async.chan-utils :refer [click-chan form-submit-chan]])
  (:require-macros [cljs.core.async.macros :as m :refer [go alt!]]))

(defn modal-form [{:keys [mode task-form] :as state}]
  (if mode
    [:div.modal-form
     [:h4 "Add Task"]
     [:form.new-task-form
      [:input.form-control.new-task-name  {:type "text"
                              :value (:content task-form)
                              :name "content"
                              :placeholder "New Task"}]
      [:p
       [:a {:href "#" :class " cancel-new-todo btn-default"} "cancel"]]]]))

(defn todo-task [idx task]
    [:li (:content task)])

(defn todo-list [{:keys [todo-list] :as state}]
  [:div
   [:p
    [:a {:href "#" :class "new-todo btn btn-primary"} "Add task"]]
   [:ul {:class "todo-list list-unstyled"}
    (map-indexed todo-task todo-list)]
   (modal-form state)])

(defn render-templates [state]
  (-> ($ "#example1")
      (html (crate/html (todo-list state)))))

(defn app-loop [start-state]
  (form-submit-chan "#example1 .new-task-form" :ignore [])
  (let [ new-todo-click         (click-chan "#example1 a.new-todo"        :new-todo)
         cancel-new-form-click  (click-chan "#example1 a.cancel-new-todo" :cancel-new-form)]
    (go
     (loop [state start-state]
       (render-templates state)
       (<! new-todo-click) 
       (render-templates (assoc state :mode :add-todo-form))
       (<! cancel-new-form-click)
       (recur (dissoc state :mode))))))

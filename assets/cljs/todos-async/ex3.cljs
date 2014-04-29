(ns todos-async.ex3
  (:require
   [cljs.core.async :as async
             :refer [<! >! chan close! sliding-buffer put! alts!]]
   [jayq.core :refer [$ append ajax html $deferred when done resolve pipe on] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   [clojure.string :refer [join blank?]]
   [todos-async.chan-utils :refer [click-chan form-submit-chan async-some get-next-message]])
  (:require-macros [cljs.core.async.macros :as m :refer [go alt!]]))

(defn modal-form [{:keys [mode task-form] :as state}]
  (if mode
    [:div.modal-form
     [:h4 "Add Task"]
     [:form.new-task-form
      [:input.new-task-name.form-control  {:type "text"
                                           :value (:content task-form)
                                           :name "content"
                                           :placeholder "New Task"}]
      [:p
       [:input {:type "submit" :value "Save" :class "btn btn-primary"}]
       [:a {:href "#" :class " cancel-new-todo btn btn-default"} "cancel"]]]]))

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
  (-> ($ "#example3")
      (html (crate/html (todo-list state)))))

(defn add-task [{:keys [todo-list] :as state} task]
  (assoc state :todo-list (conj todo-list task)))

(defn app-loop [start-state]
  (let [ new-todo-click         (click-chan "#example3 a.new-todo" :new-task)
         cancel-new-form-click  (click-chan "#example3 a.cancel-new-todo" :cancel-new-form)
         task-form-submit (form-submit-chan "#example3 .new-task-form"
                                            :task-form-submit [:content])        
         input-chan             (async/merge [new-todo-click
                                              cancel-new-form-click
                                              task-form-submit])]
    (go
     (loop [state start-state]
       (render-templates state)
       (<! (get-next-message #{:new-task} input-chan))
       (render-templates (assoc state :mode :add-todo-form))
       (let [[msg-name msg-data] (<! (get-next-message #{:task-form-submit :cancel-new-form}
                                                       input-chan))]
         (recur
          (condp = msg-name
           :cancel-new-form  (dissoc state :mode)
           :task-form-submit (-> state
                                 (add-task msg-data)
                                 (dissoc :mode))
           )))))))


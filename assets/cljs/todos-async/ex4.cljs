(ns todos-async.ex4
  (:require
   [cljs.core.async :as async
             :refer [<! >! chan close! sliding-buffer put! alts!]]
   [jayq.core :refer [$ append ajax html $deferred $when done resolve pipe on] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   [clojure.string :refer [join blank?]]
   [todos-async.chan-utils :refer [click-chan form-submit-chan merge-chans filter-chan get-next-message]]
   [todos-async.ex3 :refer [modal-form]])
  (:require-macros [cljs.core.async.macros :as m :refer [go alt!]]))


(defn todo-task [idx {:keys [completed] :as task}]
  (let [control (if completed
                  [:span {:class "glyphicon glyphicon-ok-sign"}]
                  [:a.complete-todo {:href "#" :data-task-index idx}
                   [:span {:class "glyphicon glyphicon-ok-circle"}]])]
    
    [:li
     control
     " "
     [:span {:class (if completed "completed")}
      (:content task)]]
    ))

(defn todo-list [{:keys [todo-list] :as state}]
  [:div
   [:p
    [:a {:href "#" :class "new-todo btn btn-primary"} "Add task"]]
   [:ul {:class "todo-list list-unstyled"}
    (map-indexed todo-task todo-list)]
   (modal-form state)])

(defn render-templates [state]
  (-> ($ "#example4")
      (html (crate/html (todo-list state)))))

(defn add-task [{:keys [todo-list] :as state} task]
  (assoc state :todo-list (conj todo-list task)))

(defn complete-task [state task-index]
  (assoc-in state [:todo-list task-index :completed] true))

(defn user-inputs []
  (async/merge
   [(click-chan "#example4 a.new-todo" :new-task)
    (click-chan "#example4 a.complete-todo" :complete-todo)
    (click-chan "#example4  a.cancel-new-todo" :cancel-new-form)
    (form-submit-chan "#example4 .new-task-form"
                      :task-form-submit [:content])]))

(defn add-task-modal [state input-chan]
  (go
   (render-templates (assoc state :mode :add-todo-form))
   (let [[msg-name msg-data] (<! (get-next-message #{:cancel-new-form
                                                     :task-form-submit}
                                                   input-chan))]
     (condp = msg-name
       :cancel-new-form  state
       :task-form-submit (-> state
                             (add-task msg-data)
                             (dissoc :mode))
       ))))

(defn main-app [start-state input-chan]
  (go
     (loop [state start-state]
       (render-templates state)
       (let [[msg-name msg-data] (<! (get-next-message #{:new-task :complete-todo}
                                                       input-chan))]
         (recur
          (condp = msg-name
            :complete-todo (complete-task state (:taskIndex msg-data))
            :new-task  (<! (add-task-modal state input-chan))
           ))))))

(defn app-loop [start-state]
  (main-app start-state (user-inputs)))

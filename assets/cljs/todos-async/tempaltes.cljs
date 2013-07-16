(ns todos-async.templates)

(defn modal-form [{:keys [mode task-form] :as state}]
  (if mode
    [:div.modal-form
     [:h4 "Add Task"]
     [:form.new-task-form
      #_(if (< 0 (count (:errors task-form)))
          (form-errors-view (:errors task-form)))
      [:input.new-task-name  {:type "text"
                              :value (:content task-form)
                              :name "content"
                              :placeholder "New Task"}]
      [:p
       [:input {:type "submit" :value "Save" :class "btn btn-primary"}]
       [:a {:href "#" :class " cancel-new-todo btn"} "cancel"]]]]))

(defn todo-task [idx {:keys [completed] :as task}]
  (let [control (if completed
                  [:i {:class "icon-ok-sign icon-white"}]
                  [:a {:href "#" :data-task-index idx}
                   [:i {:class "icon-ok-circle icon-white"}]])]
    [:li
     control
     [:span {:class (if completed "completed")}
      (:content task)]]
    ))

(defn todo-list [{:keys [todo-list] :as state}]
  [:div
   [:p
    [:a {:href "#" :class "new-todo btn btn-primary"} "Add task"]]
   [:ul {:class "todo-list unstyled"}
    (map-indexed todo-task todo-list)]
   (modal-form state)])


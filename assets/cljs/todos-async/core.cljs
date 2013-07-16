(ns todos-async.core
  (:require
   [cljs.core.async :as async
             :refer [<! >! chan close! sliding-buffer put! alts!]]
   [jayq.core :refer [$ append ajax inner $deferred when done resolve pipe on] :as jq]
   [jayq.util :refer [log]]
   [crate.core :as crate]
   [clojure.string :refer [join blank?]])
  (:require-macros [cljs.core.async.macros :as m :refer [go alt!]]))

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

(defn data-from-event [event]
  (-> event .-currentTarget $ .data (js->clj :keywordize-keys true)))

(defn click-chan [selector msg-name]
  (let [rc (chan)]
    (on ($ "body") :click selector {}
        (fn [e]
          (jq/prevent e)
          (put! rc [msg-name (data-from-event e)])))
    rc))

(defn fields-value-map [form-selector fields]
  (into {} (map
            (fn [fld]
              (log (str form-selector " input[name=" (name fld) "]"))
              (log (jq/val ($ (str form-selector " input[name=" (name fld) "]"))))
              [fld (jq/val ($ (str form-selector " input[name=" (name fld) "]")))] )
            fields)))

(defn form-submit-chan [form-selector msg-name fields]
  (let [rc (chan)]
    (on ($ "body") :submit form-selector {}
        (fn [e]
          (jq/prevent e)
          (put! rc [msg-name (fields-value-map form-selector fields)])))
    rc))

(defn render-example [selector state]
  (-> ($ selector)
      (inner (crate/html (todo-list state)))))

(defn ex1-render-page [state]
  (render-example "#example1" state))

(defn ex2-render-page [state]
  (render-example "#example2" state))

(defn ex3-render-page [state]
  (render-example "#example3" state))

(defn example1-loop [start-state]
  (let [ new-todo-click         (click-chan "#example1 a.new-todo"        :new-todo)
         cancel-new-form-click  (click-chan "#example1 a.cancel-new-todo" :cancel-new-form)]
    (go
     (loop [state start-state]
       (ex1-render-page state)
       (<! new-todo-click) 
       (ex1-render-page (assoc state :mode :add-todo-form))
       (<! cancel-new-form-click)
       (recur (dissoc state :mode))))))

(defn merge-chans [& chans]
  (let [rc (chan)]
    (go
     (loop []
       (put! rc (first (alts! chans)))
       (recur)))
    rc))

(defn filter-chan [pred channel]
  (let [rc (chan)]
    (go (loop []
          (let [val (<! channel)]
            (if (pred val) (put! rc val))
            (recur))
          ))
    rc))

(defn example2-loop [start-state]
  (let [ new-todo-click         (click-chan "#example2 a.new-todo" :new-task)
         cancel-new-form-click  (click-chan "#example2 a.cancel-new-todo" :cancel-new-form)
         input-chan            (merge-chans new-todo-click cancel-new-form-click)]
    (go
     (loop [state start-state]
       (ex2-render-page state)
       (<! new-todo-click)
       (ex2-render-page (assoc state :mode :add-todo-form))
       (<! (filter-chan (comp #{:cancel-new-form} first)
                        input-chan))
       (recur (dissoc state :mode))))))

(defn add-task [{:keys [todo-list] :as state} task]
  (assoc state :todo-list (conj todo-list task)))

(defn example3-loop [start-state]
  (let [ new-todo-click         (click-chan "#example3 a.new-todo" :new-task)
         cancel-new-form-click  (click-chan "#example3 a.cancel-new-todo" :cancel-new-form)
         task-form-submit (form-submit-chan "#example3 .new-task-form"
                                            :task-form-submit [:content])        
         input-chan             (merge-chans new-todo-click
                                             cancel-new-form-click
                                             task-form-submit)]
    (go
     (loop [state start-state]
       (ex3-render-page state)
       (<! new-todo-click)
       (ex3-render-page (assoc state :mode :add-todo-form))
       (let [[msg-name msg-data] (<! (filter-chan (comp #{:cancel-new-form
                                                          :task-form-submit}
                                                        first)
                                                  input-chan))]
         (recur
          (condp = msg-name
           :cancel-new-form  (dissoc state :mode)
           :task-form-submit (-> state
                                 (add-task msg-data)
                                 (dissoc :mode))
           )))))))

(defn example3-loop [start-state]
  (let [ new-todo-click         (click-chan "#example3 a.new-todo" :new-task)
         cancel-new-form-click  (click-chan "#example3 a.cancel-new-todo"
                                           :cancel-new-form)
         task-form-submit (form-submit-chan "#example3 .new-task-form"
                                            :task-form-submit [:content])        
         input-chan             (merge-chans new-todo-click
                                             cancel-new-form-click
                                             task-form-submit)]
    (go
     (loop [state start-state]
       (ex3-render-page state)
       (<! new-todo-click)
       (ex3-render-page (assoc state :mode :add-todo-form))
       (let [[msg-name msg-data] (<! (filter-chan (comp #{:cancel-new-form
                                                          :task-form-submit}
                                                        first)
                                                  input-chan))]
         (recur
          (condp = msg-name
           :cancel-new-form  (dissoc state :mode)
           :task-form-submit (-> state
                                 (add-task msg-data)
                                 (dissoc :mode))
           )))))))

(defn example4-loop [start-state]
  (let [ new-todo-click         (click-chan "#example3 a.new-todo" :new-task)
         cancel-new-form-click  (click-chan "#example3 a.cancel-new-todo"
                                            :cancel-new-form)
         task-form-submit (form-submit-chan "#example3 .new-task-form"
                                            :task-form-submit [:content])        
         input-chan             (merge-chans new-todo-click
                                             cancel-new-form-click
                                             task-form-submit)]
    (go
     (loop [state start-state]
       (ex3-render-page state)
       (<! new-todo-click)
       (ex3-render-page (assoc state :mode :add-todo-form))
       (let [[msg-name msg-data] (<! (filter-chan (comp #{:cancel-new-form
                                                          :task-form-submit}
                                                        first)
                                                  input-chan))]
         (recur
          (condp = msg-name
           :cancel-new-form  (dissoc state :mode)
           :task-form-submit (-> state
                                 (add-task msg-data)
                                 (dissoc :mode))
           )))))))


(example1-loop {:todo-list [{:content "buy milk"}
                            {:content "buy lettuce"}]})

(example2-loop {:todo-list [{:content "buy milk"}
                            {:content "buy lettuce"}]})

(example3-loop {:todo-list [{:content "buy milk"}
                            {:content "buy lettuce"}]})

(.log js/console "Hey")


(ns frontier.example.components
  (:require
   [frontier.core :refer [iInputFilter
                                 iPluginInit
                                 iTransform
                                 iEffect
                                 iDerive
                                 add-effects]]
   [cljs.core.async :as async :refer [put!]]   
   [jayq.util :refer [log]]))

(defmulti count-trans identity)

(defmethod count-trans :default [_ system data] system)

(defmethod count-trans :inc [_ system data]
  (assoc system :count
         (inc (:count system))))

(defmethod count-trans :dec [_ system data]
  (assoc system :count
         (dec (:count system))))

(defrecord ExampleCounter []
  iInputFilter
  (-filter-input [_ [name data] system]
    [name data])
  iPluginInit
  (-initialize [o system event-chan]
    (log "initializing counter"))
  iTransform
  (-transform [o msg system]
    (count-trans (first msg) system (last msg)))
  iDerive
  (-derive [o system]
    (if (:count system)
      (assoc system :double (* 2 (:count system)))
      system))
  iEffect
  (-effect [o msg system event-chan effect-chan]
    (log "affecting")
    )
  )

(defmulti todo-trans identity)

(defmethod todo-trans :default [_ system data] system)

(defmethod todo-trans :create-todo [_ system data]
  (-> system
      (add-effects [:store-changes data])
      (update-in [:todos]
                 (fn [todos]
                   (vec (conj todos data))))))

(defmethod todo-trans :delete-todo [_ system data]
  (update-in system
             [:todos]
             (fn [todos]
               (filter #(not= (:id %) (:id data))
                       todos))))

(defmulti todo-eff identity)

(defmethod todo-eff :default [_ system data event-chan])

(defmethod todo-eff :store-changes [_ system data event-chan]
  (put! event-chan [:inc {}])
  (log "storing changes"))

(defrecord ExampleTodos []
  iInputFilter
  (-filter-input [_ [name data] system]
    (if (= name :create-todo)
      [name (assoc data :id (rand-int 10000000))]
      [name data]))
  iPluginInit
  (-initialize [o system event-chan]
    (log "initializing todos"))
  iTransform
  (-transform [o msg system]
    (todo-trans (first msg) system (last msg)))
  iEffect
  (-effect [o [name data] system event-chan effect-chan]
    (todo-eff name system data event-chan)
    (log "affecting 2")
    ))

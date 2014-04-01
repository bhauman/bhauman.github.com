(ns frontier.example.core
  (:require
   [frontier.core :refer [component-group]]
   [frontier.dev-tools :refer [managed-system
                               managed-renderer
                               input-controls-renderer]]   
   
   [frontier.example.components :refer [ExampleCounter
                                        ExampleTodos]]
   [jayq.core :refer [$ html]]
   [jayq.util :refer [log]]))

(defn create-test-divs [parent-sel count]
  (mapv
   (fn [x]
     (.append ($ parent-sel) (str "<div id='test" x "'></div>" )))
   (range count)))

(defn run-example [target-sel]

  (create-test-divs target-sel 2)
  
  (managed-system {}
                  (component-group
                   (ExampleCounter.)
                   (ExampleTodos.))
                  (managed-renderer "test0"
                                    (input-controls-renderer
                                     [[:create-todo {:content "helloby"}]
                                      [:create-todo {:content "goodbyer"}]
                                      [:create-todo {:content "hellero"}]]))
                  [[:create-todo {:content "hello"}]
                   [:create-todo {:content "goodbye"}]
                   [:create-todo {:content "heller"}]])
  
  (managed-system {}
                  (component-group
                   (ExampleCounter.)
                   (ExampleTodos.))
                  (managed-renderer "test1"
                                    (input-controls-renderer
                                     [[:create-todo {:content "helloby"}]
                                      [:create-todo {:content "goodbyer"}]
                                      [:create-todo {:content "hellero"}]]))
                  [[:create-todo {:id 1 :content "hello"}]
                   [:create-todo {:id 2 :content "goodbye"}]
                   [:create-todo {:id 3 :content "heller"}]]))

#_(log "here we are")

(run-example "#cmsnew")


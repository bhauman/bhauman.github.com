(defproject bhauman-blog "0.1.0-SNAPSHOT"
  :description "Exploring dev models for async.core"
  :url ""
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2202"]
                 [org.clojure/core.async "0.1.278.0-76b25b-alpha"]
                 [org.clojure/core.logic "0.8.7"]
                 [devcards "0.1.0-SNAPSHOT"]]

  #_:repositories #_{"sonatype-oss-public" "https://oss.sonatype.org/content/groups/public/"}
  
  :plugins [[lein-cljsbuild "1.0.3"]
            [lein-figwheel "0.1.3-SNAPSHOT"]]

  :cljsbuild {
              :builds [{:id "card-examples-dev"
                        :source-paths ["assets/cljs/devcard-examples"]
                        :compiler {:output-to "resources/public/devcards/js/devcard-examples.js"
                                   :output-dir "resources/public/devcards/js/out"
                                   :externs ["assets/js/externs/jquery-1.9.js"]
                                   :optimizations :none
                                   :source-map true}}
                       {:id "card-examples-prod"
                        :source-paths ["assets/cljs/devcard-examples"]
                        :compiler {:output-to "resources/public/devcards/js/devcard-examples-prod.js"
                                   :externs ["assets/js/externs/jquery-1.9.js"]
                                   :optimizations :simple}}
                       #_{:id "eight-queens"
                        :source-paths ["assets/cljs/eight-queens"
                                       "assets/cljs/libsrc"]
                        :compiler {:output-to "assets/js/eight-queens/eight-queens.js"
                                   :output-dir "assets/js/eight-queens/out"
                                   :externs ["assets/js/externs/jquery-1.9.js"]
                                   :optimizations :none
                                   :source-map true}}
                       #_{:id "todos-async"
                          :source-paths ["assets/cljs/todos-async"]
                          :compiler {:output-to "assets/js/todos-async.js"
                                   :externs ["assets/js/externs/jquery-1.9.js"]
                                   :optimizations :simple
                                   :pretty-print true}}
                       #_{:id "dots-game"
                        :source-paths ["assets/cljs/dots-game"]
                        :compiler {:output-to "assets/js/dots-game.js"
                                   :externs ["assets/js/externs/jquery-1.9.js"]
                                   :optimizations :simple
                                   :pretty-print true}}
                       #_{:id "dots-game-2"
                        :source-paths ["assets/cljs/dots-game-2"]
                        :compiler {:output-to "assets/js/dots-game-2.js"
                                   :externs ["assets/js/externs/jquery-1.9.js"]
                                   :optimizations :simple
                                   :pretty-print true}}]})

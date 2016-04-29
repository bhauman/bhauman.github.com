(defproject bhauman-blog "0.1.0-SNAPSHOT"
  :description "Exploring dev models for async.core"
  :url ""
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.7.228"]
                 [org.clojure/core.async "0.2.374"]
                 ;; for todos async
                 [jayq "2.4.0"]
                 [crate "0.2.5"]
                 #_[org.clojure/core.logic "0.8.7"]
                 #_[devcards "0.1.0-SNAPSHOT"]]

  #_:repositories #_{"sonatype-oss-public" "https://oss.sonatype.org/content/groups/public/"}
  
  :plugins [[lein-cljsbuild "1.1.3"]
            [lein-figwheel "0.5.2"]]

  :cljsbuild {
              :builds [#_{:id "card-examples-dev"
                        :source-paths ["assets/cljs/devcard-examples"]
                        :compiler {:output-to "resources/public/devcards/js/devcard-examples.js"
                                   :output-dir "resources/public/devcards/js/out"
                                   :externs ["assets/js/externs/jquery-1.9.js"]
                                   :optimizations :none
                                   :source-map true}}
                       #_{:id "card-examples-prod"
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
                       {:id "todos-async"
                        :source-paths ["assets/cljs/todos-async"]
                        :compiler {:output-to "assets/js/todos-async.js"
                                   :externs ["assets/js/externs/jquery-1.9.js"]
                                   :optimizations :advanced
                                   ; :pretty-print true
                                   }}
                       {:id "dots-game"
                        :source-paths ["assets/cljs/dots-game"]
                        :compiler {:main "dots-game.core"
                                   :asset-path "/assets/js/dotsout"
                                   :output-to "assets/js/dots-game.js"
                                   :output-dir "assets/js/dotsout"
                                   :externs ["assets/js/externs/jquery-1.9.js"]
                                   :optimizations :none
                                   :source-map true
                                   :pretty-print true}}
                       ;; have to clean up references to names before advanced compilation works
                       ;; user :pseudo-names true to find the names
                       {:id "dots-game-prod"
                        :source-paths ["assets/cljs/dots-game"]
                        :compiler {
                                   :output-to "assets/js/dots-game.js"
                                   :output-dir "assets/js/dotsoutprod"
                                   :externs ["assets/js/externs/jquery-1.9.js"]
                                   :optimizations :simple
                                   ; :source-map "assets/js/dots-game-prod.map"
                                   ; :pseudo-names true
                                   ; :pretty-print true
                                   }}                       
                       #_{:id "dots-game-2"
                        :source-paths ["assets/cljs/dots-game-2"]
                        :compiler {:output-to "assets/js/dots-game-2.js"
                                   :externs ["assets/js/externs/jquery-1.9.js"]
                                   :optimizations :simple
                                   :pretty-print true}}]})

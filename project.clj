(defproject bhauman-blog "0.1.0-SNAPSHOT"
  :description "Exploring dev models for async.core"
  :url ""
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/clojurescript "0.0-2138"]
                 [org.clojure/core.async "0.1.256.0-1bf8cf-alpha"]
                 [org.clojure/core.logic "0.8.7"]
                 [sablono "0.1.5"]               
                 [crate "0.2.4"]
                 [jayq "2.4.0"]]
  :repositories {"sonatype-oss-public" "https://oss.sonatype.org/content/groups/public/"}
  :plugins [[lein-cljsbuild "0.3.2"]]
  :cljsbuild {
              :builds [{:id "eight-queens"
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

(ns devcard-examples.core
  (:require
   [devcards.core :as dc :include-macros true]
   [sablono.core :as sab :include-macros true]
   [devcard-examples.two-zero :as tz])
  (:require-macros
   [devcards.core :refer [defcard are= are-not= is]]))

(enable-console-print!)

(def host (.-host js/location))

(def path (.-pathname js/location))

(def dev-host? (partial = "localhost:3449"))

(def dev-blog-host? (partial = "localhost:4000"))

(def prod-host? (partial = "rigsomelight.com"))

(print (dev-blog-host? host))
(print "Yeahaw")

(when (dev-host? host)
  (dc/start-devcard-ui!)
  (dc/start-figwheel-reloader!))

(when (dev-blog-host? host)
  (dc/start-single-card-ui!)
  (dc/start-figwheel-reloader! { :websocket-url "ws://localhost:3449/figwheel-ws"})

  (dc/render-single-card [:devcard_examples.two_zero :board-state-1] (js/$ "#tz-board-1"))
  (dc/render-single-card [:devcard_examples.two_zero :board-state-2] (js/$ "#tz-board-2"))
  (dc/render-single-card [:devcard_examples.two_zero :board-state-3] (js/$ "#tz-board-3")))

(when (prod-host? host)
  (dc/start-single-card-ui!)
  
  (dc/render-single-card [:devcard_examples.two_zero :board-state-1] (js/$ "#tz-board-1"))
  (dc/render-single-card [:devcard_examples.two_zero :board-state-2] (js/$ "#tz-board-2"))
  (dc/render-single-card [:devcard_examples.two_zero :board-state-3] (js/$ "#tz-board-3")))


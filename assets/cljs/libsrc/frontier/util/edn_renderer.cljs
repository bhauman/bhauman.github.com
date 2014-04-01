(ns frontier.util.edn-renderer
  (:require
   [sablono.core :as sab :include-macros true]))

(declare html)

(defn literal [class x]
  [:span {:className class} (prn-str x)])

(defn join-html [separator coll]
  (interpose [:span.separator separator]
             (map html coll)))

(defn html-collection [class opener closer coll]
  [:span.collection  { :className class }
   [:span.opener opener]
   [:span.contents (join-html " " coll)]
   [:span.closer closer]])

(defn html-keyval [[k v]]
  [:span.keyval
   (html k)
   [:span.separator " "]
   (html v)])

(defn html-keyvals [coll]
  (interpose [:span.separator ", "]
             (map html-keyval coll)))

(defn html-map [coll]
  [:span.collection.map
   [:span.opener "{"]
   [:span.contents (html-keyvals coll)]
   [:span.closer "}"]])

(defn html-string [s]
  [:span.string
   [:span.opener "\""]
   [:span.contents s]
   [:span.closer "\""]])

(defn html [x]
  (cond
   (number? x)  (literal "number" x)
   (keyword? x) (literal "keyword" x)
   (symbol? x)  (literal "symbol" x)
   (string? x)  (html-string x)
   (map? x)     (html-map x)
   (set? x)     (html-collection "set"    "#{" "}" x)
   (vector? x)  (html-collection "vector" "[" "]" x)
   (seq? x)     (html-collection "seq"    "(" ")" x)
   :else        (literal "literal" x)))

(defn html-edn [e]
  [:div.rendered-edn
   (html e)])

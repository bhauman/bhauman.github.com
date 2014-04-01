(ns reactor.core
  (:require
   [cljs.core.async :as async
    :refer [<! >! chan close! sliding-buffer put! take! alts! timeout onto-chan map< to-chan filter<]])
  (:require-macros [cljs.core.async.macros :as m :refer [go alt! go-loop]]))

(def Pure
  (.createClass js/React
    (js-obj
      "shouldComponentUpdate"
      (fn [next-props next-state]
        (this-as this
          (not (= (.. this -props -value) (.-value next-props)))))
      "render"
      (fn []
        (this-as this
          ((.. this -props -children)))))))

(def OwnerReference
  (.createClass js/React
                (js-obj
                 "render"
                 (fn []
                   (this-as this ((.. this -props -children) this))))))

(defn render-to [react-dom html-node callback]
  (.renderComponent js/React react-dom html-node callback))

(defn react-render [html-node react-dom]
  "A blocking render call"
  (let [out (chan)]
    (render-to react-dom html-node (fn [] (put! out :rendered) (close! out)))
    out))

(defn react-render-loop [html-node react-dom-chan]
  (go-loop []
           (let [react-dom (<! react-dom-chan)]
             (if (nil? react-dom)
               :finished
               (do (<! (react-render html-node react-dom))
                   (recur))))))

(defn raw [raw-html-str]
  (.div (.-DOM js/React)
        (clj->js { :dangerouslySetInnerHTML 
                   { :__html
                     raw-html-str }})))

(defn set-state [owner new-state-map]
  (.setState owner (clj->js new-state-map)))

(defn get-state-val [owner state-key]
  (if-let [state (.-state owner)]
    (aget state (name state-key))))

(defn get-prop-val [owner prop-key]
  (if-let [state (.-props owner)]
    (aget state (name prop-key))))

(defn get-children [owner]
  (.. owner -props -children))

(defn get-ref [owner ref-name]
  (aget (.-refs owner) (name ref-name)))

(defn get-node [owner ref-name]
  (.getDOMNode (get-ref owner ref-name)))

(defn input-value [owner ref-name]
  (let [node (get-node owner ref-name)]
    (condp = (.-type node)
      "checkbox" (.-checked node)
      (.-value node))))

(defn form-values [owner refs]
  (into {} (map (juxt identity (partial input-value owner)) refs)))

(defn prevent-default-wrap [f]
  (fn [x] (.preventDefault x) (f x)))

(defn form-submit [owner chan msg fields]
  (prevent-default-wrap #(put! chan
                               (let [form-vals (form-values owner fields)]
                                 (.log js/console "form submit")
                                 (.log js/console form-vals)
                                 [msg form-vals]))))

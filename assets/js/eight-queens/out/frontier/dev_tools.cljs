(ns frontier.dev-tools
  (:require
   [cljs.core.async :as async
    :refer [put!]]
   [reactor.core :refer [render-to raw]]
   [sablono.core :as sab :include-macros true]
   [frontier.util.edn-renderer :refer [html-edn]]
   [frontier.core :refer [iInputFilter
                          iPluginInit
                          iTransform
                          iEffect
                          iDerive
                          -derive
                          trans-helper*
                          system
                          add-effects
                          component-group]]
   [jayq.util :refer [log]]))

(defn can-go-forward? [{:keys [history pointer]}]
  (< pointer (dec (count history))))

(defn can-go-back? [{:keys [pointer]}] (pos? pointer))

(defn current-state [{:keys [history pointer]}]
  (get history pointer))

(defmulti hist-trans identity)

(defmethod hist-trans :default [_ system data] system)

(defmethod hist-trans :goto [_ {:keys [history pointer] :as sys} p]
  (-> sys
      (assoc :pointer p)
      (assoc :render-state (get history p))))

(defmethod hist-trans :collect [_ system data]
  (-> system
      (update-in [:pointer] (fn [p] (count (:history system))))
      (update-in [:history]
                 (fn [hist]
                   (conj (vec hist) data)))))

(defmethod hist-trans :back [_ {:keys [history pointer] :as sys} _]
  (if (can-go-back? sys)
    (-> sys
        (update-in [:pointer] dec)
        (assoc :render-state (get history (dec pointer))))
    sys))

(defmethod hist-trans :forward [_ {:keys [history pointer] :as sys} _]
  (if (can-go-forward? sys)
    (-> sys
        (update-in [:pointer] inc)
        (assoc :render-state (get history (inc pointer))))
    sys))

(defmethod hist-trans :keep [_ {:keys [history pointer] :as sys} _]
  (-> sys
      (add-effects [:set-state (get history pointer)])
      (assoc :pointer (dec (count history)))
      (dissoc :render-state)))

(defmethod hist-trans :cancel [_ {:keys [history pointer] :as sys} _]
  (-> sys
      (assoc :pointer (dec (count history)))
      (dissoc :render-state)))

(defn under-control [system]
  (if (:render-state system)
    (assoc system :under-control true)
    system))

(defn can-go-forward [state]
  (if (can-go-forward? state)
    (assoc state :can-go-forward true)
    state))

(defn can-go-back [state]
  (if (can-go-back? state)
    (assoc state :can-go-back true)
    state))

(defn add-msg [state]
  (assoc state :msg (:__msg (current-state state))))

(defn messages [state]
  (assoc state :messages
         (take 20 (reverse (map-indexed (fn [i x] [i (:__msg x)]) (:history state))))))

(defrecord HistoryManager [managed-system-event-chan]
  iTransform
  (-transform [o [msg data] system]
    (hist-trans msg system data))
  iEffect
  (-effect [o [msg data] system event-chan effect-chan]
    (if (= msg :set-state)
      (put! managed-system-event-chan [:__system.set-state data])))
  iDerive
  (-derive [o system]
    (-> system
        under-control
        can-go-forward
        can-go-back
        add-msg
        messages)))

(defrecord SystemSetter []
  iTransform
  (-transform [o [msg data] system]
    (if (= msg :__system.set-state) data system)))

(defn managed-system [initial-state comp state-callback initial-inputs]
  (let [managed-state (atom {})
        watch (add-watch managed-state :renderer
                         (fn [_ _ _ cs]
                           (state-callback cs)))
        sys-comp (component-group
                  (SystemSetter.)
                  comp)
        sys (system
             initial-state
             sys-comp
             (fn [{:keys [state event-chan]}]
               (swap! managed-state
                      assoc
                      :sys-state state
                      :sys-chan event-chan)))
        history (system {}
                        (component-group
                         (HistoryManager. (:event-chan sys)))
                        (fn [{:keys [state event-chan]}]
                          (swap! managed-state
                                 assoc
                                 :hist-state state
                                 :hist-chan event-chan)))]
    (add-watch (:state sys) :history-collect
               (fn [_ _ _ n]
                 (put! (:event-chan history) [:collect (-derive sys-comp n)])))
    (when initial-inputs
      (doseq [msg initial-inputs]
        (swap! (:state sys) (partial trans-helper* sys-comp identity) msg)))
    sys))

(defn render-history-controls [{:keys [under-control can-go-back can-go-forward msg messages] :as sys} hist-chan]
  (sab/html
   [:div.navbar.navbar-default
    [:div.nav.navbar-nav.btn-group
     (if can-go-back
       [:a.btn.btn-default.navbar-btn
        {:className ""
         :href "#"
         :onClick (fn [x]
                    (.preventDefault x)
                    (put! hist-chan [:back]))}
        [:span.glyphicon.glyphicon-step-backward]]
       [:a.btn.btn-default.navbar-btn.disabled [:span.glyphicon.glyphicon-step-backward]])
     (if under-control
       [:a.btn.btn-default.navbar-btn
        {:className ""
         :onClick (fn [x]
                    (.preventDefault x)
                    (put! hist-chan [:cancel]))}
        [:span.glyphicon.glyphicon-stop]]
       [:a.btn.btn-default.navbar-btn.disabled [:span.glyphicon.glyphicon-stop]]) 
     (if under-control
       [:a.btn.btn-default.navbar-btn
        {:className ""
         :onClick (fn [x]
                     (.preventDefault x)
                     (put! hist-chan [:keep]))}
        [:span.glyphicon.glyphicon-download-alt]]
       [:a.btn.btn-default.navbar-btn.disabled
        [:span.glyphicon.glyphicon-download-alt]])
     (if (and under-control can-go-forward)
       [:a.btn.btn-default.navbar-btn
        {:className "right"
         :onClick (fn [x]
                    (.preventDefault x)
                    (put! hist-chan [:forward]))}
        [:span.glyphicon.glyphicon-step-forward]]
       [:a.btn.btn-default.navbar-btn.disabled
        [:span.glyphicon.glyphicon-step-forward]]
       )
     ]
    [:ul.nav.navbar-nav
     [:li.dropdown
      [:a.dropdown-toggle {:data-toggle "dropdown"} "Input history " [:b.caret]]
      [:ul.dropdown-menu
       (map
        (fn [[i m]]
          [:li
           [:a
            {:href "#"
             :onClick
             (fn [x]
               (.preventDefault x)
               (put! hist-chan [:goto i]))}
            (str i " " (prn-str m))]])
        messages)
       ]]]
    [:p.navbar-text (prn-str msg)]
    ]
   ))

(defn managed-renderer [target-id render-func]
  (let [target-node (.getElementById js/document target-id)]
    (fn [{:keys [sys-state sys-chan hist-state hist-chan]}]
      (let [state (or (:render-state hist-state) sys-state)]
        (render-to (sab/html
                    [:div
                     (render-history-controls hist-state hist-chan)
                     (render-func { :state state
                                    :event-chan sys-chan }
                                  :disabled (:render-state hist-state))
                     (html-edn (dissoc state :__msg))])
                   target-node
                   identity)))))

(defn render-input-message-links [msgs event-chan & {:keys [disabled]}]
  [:ul
   (map (fn [x] [:li
                (if disabled
                  (prn-str x)
                  [:a
                   { :onClick (fn [] (put! event-chan x)) }
                   (prn-str x)])])
        msgs)])

(defn input-controls-renderer [input-messages]
  (fn [{:keys [event-chan]} & {:keys [disabled]}]
    (render-input-message-links
     input-messages
     event-chan
     :disabled disabled)))

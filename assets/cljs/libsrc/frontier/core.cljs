(ns frontier.core
  (:require
   [cljs.core.async :as async
    :refer [chan put! map<]])
  (:require-macros
   [cljs.core.async.macros :as m :refer [go-loop]]))

(defn- dev-null [in]
  (go-loop [v (<! in)]
           (if (nil? v) :closed (recur (<! in)))))

(defprotocol iPluginInit
  (-initialize [_ system event-chan]))

(defprotocol iTransform
  (-transform [_ msg system]))

(defprotocol iEffect
  (-effect [_ msg system event-chan effect-chan]))

(defprotocol iInputFilter
  (-filter-input [_ msg system]))

(defprotocol iDerive
  (-derive [_ system]))

(defn add-effects [system & args]
  (update-in system [:__effects]
             (fn [effects]
               (concat effects args))))

(defn component-group [& components]
  (let [initializers    (filter #(satisfies? iPluginInit %) components)
        transforms      (filter #(satisfies? iTransform %) components)
        effects         (filter #(satisfies? iEffect %) components)
        input-filters   (filter #(satisfies? iInputFilter %) components)
        derivatives     (filter #(satisfies? iDerive %) components)
        ifilter (apply comp (mapv
                             (fn [pl]
                               (let [func (partial -filter-input pl)]
                                 (fn [[msg system]]
                                   [(func msg system) system])))
                             (reverse input-filters)))
        itrans (apply comp (mapv
                            (fn [pl]
                              (let [func (partial -transform pl)]
                                (fn [[msg system]]
                                  [msg (func msg system)])))
                            (reverse transforms)))
        ideriv (apply comp (mapv
                            (fn [pl]
                              (partial -derive pl))
                            (reverse derivatives)))        
        ieffects (fn [msg system event-chan effect-chan]
                   (doseq [pl (reverse effects)]
                     (-effect pl msg system event-chan effect-chan)))]
    (reify
      iPluginInit
      (-initialize [_ system event-chan]
        (doseq [pl initializers]
          (-initialize pl system event-chan)))
      iTransform
      (-transform [_ msg system]
        (last (itrans [msg system])))
      iEffect
      (-effect [_ msg system event-chan effect-chan]
        (ieffects msg system event-chan effect-chan))
      iInputFilter
      (-filter-input [_ msg system]
        (first (ifilter [msg system])))
      iDerive
      (-derive [_ system]
        (ideriv system)))))

(defn trans-helper* [comp effect-handler sys msg]
  (if-let [new-sys (-transform comp msg sys)]
    (do
      (effect-handler (:__effects new-sys))
      (-> new-sys
          (assoc :__msg msg)
          (dissoc :__effects)))
    sys))

(defn trans-helper-new* [comp sys msg]
  (if-let [new-sys (-transform comp msg sys)]
    [(:__effects new-sys)
     (-> new-sys
         (assoc :__msg msg)
         (dissoc :__effects))]
    [nil sys]))


(defn system [initial-state
              comp
              state-callback]
  (let [state (atom initial-state)
        event-chan (chan)
        effect-chan (chan)

        trans-without-effect (partial trans-helper* comp identity)
        transformer (partial trans-helper* comp #(doseq [ef %]
                                                   (put! effect-chan ef)))]
    
    (add-watch state :renderer (fn [_ _ o n]
                                 (state-callback { :state (-derive comp n)
                                                   :event-chan event-chan } )))
    
    (-initialize comp initial-state event-chan)

    (dev-null
     (map< (fn [msg]
             (-effect comp msg @state event-chan effect-chan) true)
           effect-chan))
    
    (dev-null
     (map< (fn [msg]
             (let [new-msg (-filter-input comp msg @state)]
               (swap! state transformer new-msg)))
           event-chan))
    
    { :state state
      :event-chan event-chan
      :effect-chan effect-chan
      :component comp }))



(defn system-with-initial-inputs [initial-state
                                  comp
                                  state-callback
                                  initial-inputs]
  (let [system (system initial-state comp state-callback)
        trans (partial trans-helper* comp identity)]
    (doseq [msg initial-inputs]
      (swap! (:state system) trans msg))
    system))

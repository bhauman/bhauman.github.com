(ns dots-game-2.utils
  (:require
   [cljs.core.async :as async
    :refer [<! >! chan close! sliding-buffer put! alts! timeout]]
   [jayq.util :refer [log]])
  
  (:require-macros [cljs.core.async.macros :as m :refer [go]]))

(defn tap-until [end-pred in out]
    (go (loop []
          (if-let [v (<! in)]
            (do
              (put! out v)
              (if (end-pred v)
                v
                (recur)))))))

(defn take-until
  ([pred-sentinel in] (take-until pred-sentinel in (chan)))
  ([pred-sentinel in out]
    (go (loop []
          (if-let [v (<! in)]
            (do
              (>! out v)
              (if-not (pred-sentinel v)
                (recur)
                (close! out)))
            (close! out))))
    out))

(defn filter-chan [pred in]
  (let [out (chan)]
    (go (loop []
          (if-let [v (<! in)]
            (do
              (if (pred v)
                (>! out v))
              (recur))
            (close! out))
          ))
    out))

(defn map-chan [func in]
  (let [out (chan)]
    (go (loop []
          (if-let [v (<! in)]
            (do
              (if-let [out-v (func v)] (>! out out-v)) ;; no nils in channel
              (recur))
            (close! out))
          ))
    out))

(defn apply-to-chan [func in]
  (go (loop []
        (if-let [v (<! in)]
          (do (func v) (recur))))))

(defn tap-into [out in]
  (let [rc (chan)]
    (go (loop []
          (let [msg (<! in)]
            (if (nil? msg)
              (close! rc)
              (do
                (>! rc msg)
                (>! out msg)
                (recur))))))
    rc))

(defn siphon
  ([in] (siphon in []))
  ([in coll]
    (go (loop [coll coll]
          (if-let [v (<! in)]
            (recur (conj coll v))
            coll)))))

(defn siphon-off
  ([in]
    (go (loop []
          (if-let [v (<! in)]
            (recur))))))

(defn logger-chan [in]
  (go (loop []
        (if-let [msg (<! in)]
          (do (log (prn-str msg)) (recur))))))

(defn go-iterate-state [func [state in-chan]]
  (go (loop [state state]
        (let [next-state (func state (<! in-chan))]
          (if (= :recur (first next-state))
            (recur (last next-state))
            [next-state in-chan])))))

(defn go-iterate-chan [func in-chan]
  (go (loop []
        (let [result (func (<! in-chan))]
          (if (= :recur result)
            (recur)
            in-chan)))))

(defn remove-sequential-duplicates [in]
  (let [out (chan)]
    (go
     (loop [last-v nil]
       (if-let [v (<! in)]
         (do
           (if (not= v last-v) (>! out v))
           (recur v))
         (close! out))))
    out))

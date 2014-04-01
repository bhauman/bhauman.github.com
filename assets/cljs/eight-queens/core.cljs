(ns eight-queens.core
  (:refer-clojure :exclude [==])
  (:require
   [cljs.core.async :refer [put!]]
   [cljs.core.logic :refer [!= membero all conso fail succeed]]
   [frontier.core :refer [iInputFilter
                          iPluginInit
                          iTransform
                          iEffect
                          iDerive
                          add-effects
                          component-group]]
   [frontier.dev-tools :refer [managed-system
                               managed-renderer
                               input-controls-renderer]])
  (:require-macros
   [cljs.core.logic.macros :refer [all defne fresh run == conde conda] :as m]))

(defn log [a]
  (.log js/console a))

(defn logd [a]
  (.log js/console (clj->js a)))

(defn logp [a]
  (.log js/console (prn-str a)))

(set-print-fn! log)

;; logic helpers

(defne mapo [l g o]
  ([[] _ []])
  ([[f . r] _ [nf . nr]]
     (g f nf)
     (mapo r g nr)))

(defne reverseo [lst acum res]
  ([[] _ acum])
  ([[x . y] z _]
   (fresh [w]
     (conso x z w)
     (reverseo y w res))))

;; using conda because we have no inequality contraints
(defn rembero [x l o]
  (conda
   ((== [l o]  [[] []]))
   ((fresh [f r]
           (conso f r l)
           (== f x)
           (rembero x r o)))
   ((fresh [f r op]
           (conso f r l)
           (rembero x r op)
           (conso f op o)))))

;; identity based board representation
;; 1 represents [:q :_ :_ :_ :_ :_ :_ :_]
;; 3 represents [:_ :_ :q :_ :_ :_ :_ :_]

;; numbered board
;; probably not that efficient in order
#_(def nb [1 2 3 4 5 6 7 8])

(def nb [4 6 8 2 7 1 3 5]) 

(defne nshifto [x o]
  ([0 0])  
  ([0 1])
  ([1 2])
  ([2 3])
  ([3 4])
  ([4 5])
  ([5 6])
  ([6 7])
  ([7 8])
  ([8 9])
  ([9 9]))

(defn nlshifto [x o]
  (nshifto x o))

(defn nrshifto [x o]
  (nshifto o x))

(defne possible-moves [cm cls crs cpossibles opossibles]
  ([_ _ _ [] []])
  ([_ _ _ [f . r] [of . op]]
     (fresh [ls rs of1 of2]
            (nlshifto cls ls)
            (nrshifto crs rs)
            (rembero cm f of1)
            (rembero ls of1 of2)
            (rembero rs of2 of)
            (possible-moves cm ls rs r op))))

(defne proper-board-helper [b pm]
  ([[] []])
  ([[f . r] [cs . rs]]
     (fresh [ns]
            (membero f cs)
            (possible-moves f f f rs ns)
            (proper-board-helper r ns))))

;; needed for handling boards where chosen
;; positions are not consecutive

(defne all-possible-moves-forward [b cpossibles opossibles]
  ([[] [] []])
  ([[:_ . r] [c . cr] [c . op]]
     (all-possible-moves-forward r cr op))
  ([[x . r] [cs . rs] [[] . op]]
     (fresh [cp]
            (membero x [0 1 2 3 4 5 6 7 8 9])
            (possible-moves x x x rs cp)
            (all-possible-moves-forward r cp op))))

(defn all-possible-moves [b cpossibles opossibles]
  (fresh [rb rcp fop rop]
         (all-possible-moves-forward b cpossibles fop)
         (reverseo fop [] rcp)
         (reverseo b [] rb)
         (all-possible-moves-forward rb rcp rop)
         (reverseo rop [] opossibles)))

(defn get-possible-moves [b cp]
  (first (run 1 [q]
              (all-possible-moves b cp q))))

;; can win from hear ?

(defne to-query [i q]
  ([:_ x])
  ([r r]
     (membero r [0 1 2 3 4 5 6 7 8 9])))

(defn board-to-query [b q]
  (all
   (mapo b to-query q)))

(defn board-can-win? [b pm]
  (if (<= 4 (count (set b)))
    (let [;; have to add current moves back to poss-moves
          ;; for board helper to work
          pm (map (fn [bm mvs]
                    (if (= :_ bm)
                    mvs
                    (vec (set (conj mvs bm))))) b pm)
          res (run 1 [q]
                   (board-to-query b q)
                   (proper-board-helper q pm))]
      (first res))
    true))

;; controller and rendering

(defn has-won? [b]
  (and (= 8 (count b))
       (not (some #(= :_ %) b))))

(defn has-lost? [b pm]
  (and (= 8 (count b))
       (some #(= :_ %) b)
       (every? #(= [] %) pm)))

(defmulti moves first)

(defmethod moves :default [msg system] system)

(defmethod moves :reset [msg system]
  { :board [:_ :_ :_ :_ :_ :_ :_ :_]
    :poss-moves (take 8 (repeat (range 1 9)))})

(defmethod moves :move [[_ {:keys [row pos]}] system]
  (if (= :_ (get-in system [:board (dec row)]))
    (let [board (assoc (:board system) (dec row) pos)]
      (-> system
          (assoc :board board)
          (assoc :poss-moves (get-possible-moves board (:poss-moves system)))))
    system))

(defrecord MovesComp []
  iTransform
  (-transform [o msg system]
    (moves msg system))
  iDerive
  (-derive [_ system]
    (log "in derive")
    (let [board (:board system)
          poss-moves (:poss-moves system)]
      (-> system
          (assoc :queen-count (count (filter number? board)))
          (assoc :has-won? (has-won? board))
          (assoc :has-lost? (has-lost? board poss-moves))
          (assoc :can-win? (board-can-win?
                            board
                            poss-moves))))))

(defn render-cell [i r c mvs ec]
  (if (= c r)
    [:td.queen [:span.queen]]
    (if ((set mvs) c)
      [:td.move
       {
        :className (if (odd? c) "odd" "even")
        :onClick (fn [_] (put! ec [:move {:row i :pos c}]))}]
      [:td.nomove])))

(defn render-board [b pm ec]
  [:table.table.table-bordered.chess-board
   (map
    (fn [i r mvs]
      [:tr { :className (if (odd? i) "odd" "even")} (map
            (fn [c] (render-cell i r c mvs ec))
            (range 1 9))])
   (range 1 9)
   b
   pm)])

(defn render-board-area [{:keys [board poss-moves has-won?
                                 has-lost? can-win?
                                 queen-count]
                          :as state} ec]
  [:div.board-area
   {:className (or (and has-won? "has-won")
                   (and has-lost? "has-lost")
                   "")}
   [:div.controls
    [:button.btn.btn-default.lefter {:type "button"
                                     :onClick (fn [x] (put! ec [:reset]))}
     "Start Over"]
    [:span.righter.queen-count "Queens: " queen-count]
    (or (and has-won? [:span.text-success "You found 8 Queens!"])
        (and has-lost? [:span.text-danger "Well that didn't work."])
        (and (not can-win?) [:span.text-warning "Uhhh ... maybe not."])
        "")
    ]
   (render-board board poss-moves ec)])

(defn board-renderer [{:keys [event-chan state]}]
  (render-board-area state event-chan))

(defn run-example [target-id]
  (managed-system { :board [:_ :_ :_ :_ :_ :_ :_ :_]
                    :poss-moves (take 8 (repeat (range 1 9)))}
                  (component-group
                   (MovesComp.))
                  (managed-renderer target-id
                                    board-renderer)
                  [[:move {:row 0 :pos 0}]]))

(run-example "example1")

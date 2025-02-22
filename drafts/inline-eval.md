--- 
layout: inline_edit_post
title: Inline eval
published: true
cssUrl: "/assets/inline-edit/css/style.css"
javascriptUrl: "/assets/inline-edit/main.js"
---

Inline evaluation has been around for a long time, but not every
programmer has had the chance to use it. If you haven't, this is an
opportunity to try it out.

I've put together a simple editor with some example code so you can
experience how it works.

We will use `Control-r` to *RUN/EVALUATE* bits of code from inside the editor
pane below.
 
To see it in action, place your cursor immediately after the
expression you want to evaluate in the editor below. Then, press
`Control-r`−hold the `Control` key down while
pressing the `r` key.

For example, if you want to evaluate `(+ 1 2 3)`, position the cursor
after the closing parenthesis `)` before pressing `Control-r`. 

We will be using `^r` as shorthand for `Control-r` from now on.

<div class="cljs-editor-new"><pre>1
;`-- Place cursor after 1 then hit ^r

"Gremlins are cuties!"
;                     `-- Place cursor after " then hit ^r

(+ 1 2 3)
;   `-- Place cursor after 1 then hit ^r

(+ 1 2 3)
;        `-- Place cursor after the ')' then hit ^r

(+ 1 (/ 8 2) (* 2 3) )
;           `-------`-` Place cursor after each ')' and then hit ^r

(+ 1
   (/ 8 2)
   (* 2 3))
;          `-- Place cursor after ')' and then hit ^r

 
;`-- Place cursor above this line and hit ^r
</pre></div><br>When you pressed `^r`, the editor found the closest preceding complete
expression and sent it it to a runtime session (REPL) for
evaluation. The result than appeared right next to your code, exactly
where you were already looking.

You may have also noticed that you can evaluate smaller parts of an
expression, like `(/ 8 2)`, just as easily as a full expression.

> Note how the parens here are a feature that allow the editor to
> easily discern what code to pluck out and evaluate. More complicated
> language syntax can make it hard to know what invoking inline-eval
> would mean at a given position in the editor.

Luckily, in LISP like languages many common programming forms,
including: conditionals, binding local variables and loops are
expressions that can be evaluated.

For example go ahead and hit `^r` after the final `)` of each of these
examples:

<div class="cljs-editor-new"><pre>
;; ifs are expressions that evaluate to a result
(if true 100 0)
(if (= 0 5) :five :not-five)

;; local bindings are expressions as well
(let [x 100]
  x)

(let [x 100]
  (* x x))

;; loops as well
(loop [x 100]
  (if (<= x 0)
     :done
     (recur (- x 1))))

(loop [x 100
       accum 0]
  (if (<= x 0)
    accum         ;; return accum 
    (recur        ;; re-enter the loop above with
      (- x 1)     ;;   x bound to x - 1
      (+ accum x) ;;   accum bound the accum + x
    )))

</pre></div><br>

It's often the case that in other languages the forms above are not
expressions, rather they are statements that don't evalute to produce
values but rather they produce results by acting on the
environment. Thus rendering inline-eval a less useful and much harder
to implement editor feature.

So we can see that inline-eval can be used for testing out code as you
are developing it.

It can also be used to help you remember how various functions work.

For instance, when I need to use the `subs` (i.e. substring) I know
that it takes a string and two numbers `(subs "4 items required!" 2 5)`
and it extracts a substring. But I always forget meaning of the last 
argument. Is it the length or the ending offset of the substring?

<div class="cljs-editor-new"><pre>
;; change the numbers below to pluck out the word "required"
(subs "4 items required!" 8 8)

</pre></div><br>

So, instead of trapsing off the to docs we can just keep coding while
doing little experiments in our editor to see if we are on track.

Often, I even forget the specific names of functions and instead of
searching for them I invoke them to see if they exist.

For example, I have a function that expands and displays HTML in a div
above the editor. But I don't rember if it's called `show-html` or
`display-html`.

<div class="cljs-editor-new"><pre>
;; was it show-html or display-html??
(show-html "&lt;h1&gt;Testing&lt;/h1&gt;")

(display-html "&lt;h1&gt;Testing&lt;/h1&gt;")
</pre></div><br>

So now I know name of the function.

The function below is part of a text adventure. Give it a try.

<div class="cljs-editor-new"><pre>
;; To see where you are in the text adventure
(look)






</pre></div><br>

So yes it returns data and as an experience this could work for a bare
bones text adventure.  But it might be nice to render the data to HTML
and then display it?? Eh? Eh?

So let's display the description of the room.

<div class="cljs-editor-new"><pre>
;; First lets see what data is returned
(look)

;; I see a :desc key that holds a description 
(get (look) :desc)

;; OK we have a description let's put that into an HTML string
(str "&lt;p&gt;" (get (look) :desc) "&lt;/p&gt;")

;; Now let's display that string
(display-html (str "&lt;p&gt;" (get (look) :desc) "&lt;/p&gt;"))
</pre></div><br>

Actually, let' break out that paragraph tag into it's own function:

<div class="cljs-editor-new"><pre>
;; Evalute this to define the paragraph function
(defn p [content] 
  (str "&lt;p&gt;" content "&lt;/p&gt;"))

;; now let's see how it works
(p "Hello")

(display-html (p (get (look) :desc)))
</pre></div><br>




OK, now we are getting somewhere. But we also have to format the
things that are seen in the room:

<div class="cljs-editor-new"><pre>
(look)

;; I see a :desc key that holds a description 
(get (look) :seen)

;; this is a list so we want to go through all the items
;; and format each one
(map 
  (fn [item] (str "&lt;p&gt;" item "&lt;/p&gt;"))
  (get (look) :seen)) 


</pre></div><br>

 


Keep in mind that this session is stateful—each expression you
evaluate builds on previous ones. That means you can modify the state
by running commands, then inspect it by evaluating expressions.

Try evaluating some of the expressions below:

<div class="cljs-editor-new"><pre>

(look)
(move :east)

(stack)
(push :picture)
(peek)
(pop)

;; eventually??
(unlock-function :_something?_)

;; HELP
;; (look) - see where you are
;; (move :east) - move to next room :east, :west, :north, :south
;;                actually (move :e) is the same as (move :east)

;; You have a stack of items:
;; (push :item) - push an :item onto your stack
;; (peek)       - use/inspect the item on top of your stack
;; (pop)        - drop the item on top of your stack

</pre></div><br>

Are you getting used to this yet? You’ve been interacting with code in
a way that’s completely different from the usual "write, then run"
approach.

Instead of executing a whole program at once, you’re working in a live
stateful environment—each evaluation builds on the last. This lets you
test small pieces of logic, inspect results instantly, and refine your
approach interactively, all without leaving the editor.

Now, let’s iteratively build a solution to the puzzle above.

Below, you’ll see a `(do ...)` expression—a block that groups multiple
expressions together. You can add commands like `move` and `push` inside
this block, one at a time, to develop your solution step by
step. After adding a new expression, place your cursor after the
closing parenthesis of the do block and evaluate it to see your
progress.

> Remember, you can always evaluate `(look)` or `(stack)` to see the
> current state of the text adventure.

<div class="cljs-editor-new"><pre>
(look)
(stack)

(do
  (reset)
  (move :e)
  (move :n)
  (move :w)
  (push :open-paren)

  ;; ad steps in here 
  
  )
;; `-- place your cursor here after the ) to evaluate your progress
;;    after each change

</pre></div><br>

You just interactively built up a solution to a problem. While also
being allowed to eval `(look)` and `(stack)` in order to inspect the
current state of the game. The text editor has now morphed into your
own lab and game controller.

The immediacy of feedback with *inline-eval* is vastly different than
the common iterative process of composing code as whole and evaluating
it a whole.

> Hmmmm, now what is it? What is it that allows the editor to easily
> parse out an expression to send off for evaluation? What feature of
> LISP languages has made inline-eval, a persistent feature of LISP
> editors for decades?














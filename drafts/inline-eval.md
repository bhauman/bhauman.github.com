--- 
layout: inline_edit_post
title: Inline eval
published: true
cssUrl: "/assets/inline-edit/css/style.css"
javascriptUrl: "/assets/inline-edit/main.js"
---

I'm going to ask you to _experience_ something. I'm going to ask you
to experience *inline evaluation*, a code editor feature that has
existed for _a very long time_™. Even though *inline eval* is not new,
I think it's a safe bet that most programmers have not experienced it.

To facilitate this experience, I've whipped up an editor along with
some code examples.

I'd like you to take a moment and place your cursor as specified in the
editor below and hit `Ctrl-x Ctrl-e` which means you hold the `Ctrl`
key down while hitting the `x` key first and then the `e` key.

`Ctrl-x Ctrl-e` henceforth will be known as `^x^e`.

So, let's give it a try.

<div class="cljs-editor-new"><pre>1
;`-- Place cursor after 1 then hit ^x^e

"Gremlins are cuties!"
;                     `-- Place cursor after " then hit ^x^e

(+ 1 2 3)
;   `-- Place cursor after 1 then hit ^x^e

(+ 1 2 3)
;        `-- Place cursor after the ')' then hit ^x^e

(+ 1 (/ 8 2) (* 2 3) )
;           `-------`-` Place cursor after each ')' and then hit ^x^e

(+ 1
   (/ 8 2)
   (* 2 3))
;          `-- Place cursor after ')' and then hit ^x^e

 
;`-- Place cursor above this line and hit ^x^e
</pre></div><br>

Well, now there you've gone and done it. You've *evaluated* code from
an editor.

When you hit `^x^e`, you sent the closest *preceding* expression to a
REPL to be evaluated and the result is perched right there were your
attention already is.

You may have also noticed that it's not hard to pick out a
sub-expression like `(/ 8 2)` above and see its' value as easily as
evaluating a larger expression.

Keep in mind that when sending expressions to be evaluated that the
session is _stateful_.

Try evaluating some of the expressions below:

<div class="cljs-editor-new"><pre>
(look)
(stack)
(move :east)
(push :picture)
(peek)
(pop)

;; BTW (move :e) means the same as (move :east)

</pre></div><br>

Are you getting used to this yet? You have interacted with the code
above in a way that is profoundly different than composing something
and then hitting a run button.

You are interacting with a live stateful environment. Your
interactions are much more expressive and surgical than executing a
batch of code. AND with *inline eval* you can do this without a
switching away from the editor.

Next, let's iteratively compose a solution to the puzzle above. 

Below there is a `(do ...)` expression which is just a code block. You can
add commands like `move` and `push` in one at a time to the enclosing
`do` expression to build up a solution to the puzzle. After you add a
new expression to the block you can then put your cursor after the
closing paren of the `do` block and evaluate it to see how your
progressing.

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














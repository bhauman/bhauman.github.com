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
</pre></div>

When you pressed `^r`, the editor found the closest preceding complete
expression and sent it it to a runtime session (REPL) for
evaluation. The result then appeared right next to your code, exactly
where you were already looking. No ficus lost.

You may have also noticed that you can evaluate smaller parts of an
expression, like `(/ 8 2)`, just as easily as a full expression. You
can also evaluate expressions that span multiple lines as well.

Lisp languages make it simple to write editor tools that can do this.
Detecting an expression delimited by parenthesis is trivial.

Inline evaluation also serves as a way to interactively jog your
memory. Rather than interrupting your workflow to check the docs, you
can conduct quick experiments directly in your editor to verify a
functions name and behavior.

For instance, I frequently forget function names, and sometimes,
instead of searching for them, I simply try evaluating them to see if
they exist and if they work the way I expect them to.

For example, I know I created a function that renders HTML in a `div`
above the editor, but I can't remember if it's called `show-html` or
`display-html`. Let's evaluate both of the expressions below to see
which one works:

<div class="cljs-editor-new"><pre>
;; was it show-html or display-html??
(show-html "&lt;h1&gt;Testing!&lt;/h1&gt;")
;;                             `-- ^r eval here

(display-html "&lt;h1&gt;Testing!&lt;/h1&gt;")
;;                                `-- ^r eval here
</pre></div>

With inline evaluation, I can quickly discover which function is
defined **and** if does what I expect it to. This allows me to not
leave the editor and continue coding without breaking my flow.

Let's directly experience what the `look` and `move` functions below do.

_From here onward, you can assume that each expression in the all of
the examples below is intended to be evaluated with `^r`._

<div class="cljs-editor-new"><pre>
(look)

(move :east)

</pre></div>

We can see that the `look` function is returning data that is meant to
describe where one is on their journey through a text adventure and
that the `move` function can move you through that world.

Evaling these functions in the editor could work as a spartan
interface to the game, but it would definitely be better to display
this data using our `display-html` function. Right?

Let's work on the displaying the description of the room.

<div class="cljs-editor-new"><pre>
;; First lets see what data is returned
(look)

;; I see a :desc key that holds a description 
(get (look) :desc)

;; OK we have a description let's put that into an HTML string
(str "&lt;p&gt;" (get (look) :desc) "&lt;/p&gt;")

;; Now let's display that HTML
(display-html (str "&lt;p&gt;" (get (look) :desc) "&lt;/p&gt;"))
</pre></div>

Actually, let' break out that paragraph tag into it's own function:

<div class="cljs-editor-new" data-sci-ctx="main-game"><pre>
;; Evalute this to define the paragraph function
(defn p [content] 
  (str "&lt;p&gt;" content "&lt;/p&gt;"))

;; now let's see how it works
(p "Hello")

(display-html (p (get (look) :desc)))
</pre></div>

OK, now we are getting somewhere. But we also have to format the
things that are `:seen` in the room:

<div class="cljs-editor-new" data-sci-ctx="main-game"><pre>
(look)

;; The seen key holds a description of what you see:
(get (look) :seen)

;; let's format it a little
(str "You see: " (get (look) :seen))

;; put it in a paragraph
(p (str "You see: " (get (look) :seen)))

;; let's format the :desc and the :seen together
(str
  (p (get (look) :desc))
  (p (str "You see: " (get (look) :seen))))
 
;; then let's display it
(display-html
  (str
    (p (get (look) :desc))
    (p (str "You see: " (get (look) :seen)))))
		
</pre></div>

So we're building up some code to format the the data returned from the
`look` function as HTML.

So let's put this code in a function and start working on the function
instead of just composing expressions.

<div class="cljs-editor-new" data-sci-ctx="main-game"><pre>
;; so here's our initial format function
(defn look-html [data]
  (str
    (p (get data :desc))
    (p (str "You see: " (get data :seen)))))

;; let's see if it's working
(look-html (look))

;; and finally
(display-html (look-html (look)))

</pre></div>

OK now we have a function which we can re-use, but there is definitely
room for improvement.  If we look at the data that's returned by the
`look` function you can see that there is also an `:img-path`. Let's
use that to add more visual interest to our game display.

<div class="cljs-editor-new" data-sci-ctx="main-game"><pre>
;; let's build up an expression to format the :image-path as 
;; an img tag
(get (look) :img-path)
(str "&lt;img src='" (get (look) :img-path) "'/&gt;")

;; let's insert the image tag into our look-html function
(defn look-html [data]
  (str
    ;; vv added img here vv
    (str "&lt;img src='" (get (look) :img-path) "'/&gt;") 
    (p (get data :desc))
    (p (str "You see: " (get data :seen)))))

;; let's see if it's working
(look-html (look))

;; and let's take a look!
(display-html (look-html (look)))

</pre></div>

Not bad at all. OK, now we only have one more piece of information
left to add to our `look-html` function. When you evaluate the
`(look)` function you will notice an `:exits` entry which gives the
player clues about which directions they can move from their current
location.

I think we are at the point where you can add the `:exits` info to the
`look-html` function.

<div class="cljs-editor-new" data-sci-ctx="main-game"><pre>
;; here's the :exits data
(get (look) :exits)

;; Add the exits data to the function below:
(defn look-html [data]
  (str
    (str "&lt;img src='" (get (look) :img-path) "'/&gt;") 
    (p (get data :desc))
    (p (str "You see: " (get data :seen)))
	(p (str "Exits: "    ))))

;; test it out here to see if it's working
(look-html (look))

;; and finally take a look!
(display-html (look-html (look)))

</pre></div>

### Do you want to play a game?

Alright we've built our `look-html` function now let's play a game.

You can now explore the text adventure using the functions below.
There are a bunch of new functions that let you interact with the
game. Luckily, you can simply evaluate them to discover what they do.

<div class="cljs-editor-new"><pre>

(display-html (look-html (look)))

(move :east)

(stack)
(push :picture)
(peek)
(pop)

;; eventually??
(unlock-function :_something?_)

</pre></div>

### And end or a beginning

Thanks for taking the time to experience inline evaluation.

The goal of this post was to bring you into a development experience
and demonstrate some the instant feedback that inline evaluation
provides. To me inline evaluation is an abosolutely incredible
development feature that keeps you present in the problem you are
trying to solve.

While the above examples are toy examples inside of a toy editor. This
experience is very real. Many Clojure programmers experience this
every day at real companies and get paid real salaries. We are talking
about uses that range from intense data pipelines that power large big
box store chains, to the delivery of data to video streaming UIs that
you use every day, and the list of uses goes on and on from there.

My argument here is not that Clojure is superior, my argument is that
inline-eval is an incredible feature, that has yet to really manifest
itself as a ubiquitous reality for computer programmers. This
begs the question: why?

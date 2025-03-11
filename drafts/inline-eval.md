--- 
layout: inline_edit_post
title: Inline evaluation
published: true
cssUrl: "/assets/inline-edit/css/style.css"
javascriptUrl: "/assets/inline-edit/main.js"
---

Inline evaluation has been around for a long time, but not every
programmer has had the chance to use it. If you haven't, this is an
opportunity to try it.

To this end I've coded up a simple editor with some code
examples. These examples are all editable and executable, however no
**run** button exists to execute them. You'll use `Control-r` to
*RUN/EVALUATE* pieces of code that you select from inside the editor
panes below.

To see it in action, place your cursor immediately after the
expression you want to evaluate in the editor below. Then, press
`Control-r` (hold the `Control` key down while pressing the `r`
key). For example, if you want to evaluate `(+ 1 2 3)`, position the
cursor after the closing parenthesis `)` and then press
`Control-r`. For brevity, _we'll be using `^r` as shorthand for
`Control-r` from now on._

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
where you were already looking. No context change needed to see the
code run.

You may have noticed that you can evaluate smaller parts of an
expression, like `(/ 8 2)`, just as easily as a full expression. You
can also evaluate expressions that span multiple lines.

> Lisp languages make it simple to write editor tools that can do
> this. It is trivial to write an editor plugin to detect an
> expression delimited by parenthesis.

This flexibility of inline evaluation becomes particularly valuable in
everyday coding. For instance, when I forget function names, and
instead of searching for them, I simply try evaluating them inline to
see if they exist and if they behave the way I expect them to.

For example, I know I created a function that renders HTML into a
`div` above the editor, but I can't remember if it's called
`show-html` or `display-html`. Let's evaluate both of the expressions
below to see which one works:

<div class="cljs-editor-new"><pre>
;; was it show-html or display-html??
(show-html "&lt;h1&gt;It's in a DIV!&lt;/h1&gt;")
;;                                   `-- ^r eval here

(display-html "&lt;h1&gt;It's in a DIV!&lt;/h1&gt;")
;;                                      `-- ^r eval here
</pre></div>

With inline evaluation, I can quickly discover which function is
defined **and** if it does what I expect, all without leaving the
editor or breaking my flow.

In the next example, let's apply this same approach to discover what
the `look`, `move` and `reset` functions do.

> _In all examples that follow, try evaluating each expression with `^r`
> to see the results._

<div class="cljs-editor-new"><pre>
(look)

(move :east)

(reset)


</pre></div>

Notice how the `look` function returns data describing your location
in a text adventure game, while the `move` function lets you navigate
through this virtual world.

This provides an opportunity to demonstrate how inline evaluation
helps us build and refine code incrementally.

Evaluating `(look)` and `(move :east)` could work as a spartan interface to the
game, but it would definitely be better to display this data using our
`display-html` function. Right? Right??

Now if we examine the data that the `look` function returns we can
see that it's returning a **hash map** of some sort, with the keys
`:desc`, `:seen`, `:exit` and so on. Each of these keys map to
**string** descriptions of the state of the game.

Let's work on formatting the data returned by `look` into some HTML
that we can display.

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

Let's improve our code by breaking out that paragraph tag into its own
function:

<div class="cljs-editor-new" data-sci-ctx="main-game"><pre>
;; Evaluate this to define the paragraph function
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

;; Let's extract the :seen items
(get (look) :seen)

;; Add some context to the raw data
(str "You see: " (get (look) :seen))

;; put it in a paragraph
(p (str "You see: " (get (look) :seen)))

;; let's add the :desc and the :seen together
(str
  (p (get (look) :desc))
  (p (str "You see: " (get (look) :seen))))
 
;; then display it
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

OK now we have a `look-html` function which we can re-use, but there
is definitely room for improvement.  If we look at the data that's
returned by the `look` function you can see that there is also an
`:img-path`. Let's use that to add more visual interest to our game
display.

<div class="cljs-editor-new" data-sci-ctx="main-game"><pre>
;; let's build up an expression to format the :img-path as 
;; an img tag
(get (look) :img-path)
(str "&lt;img src='" (get (look) :img-path) "'/&gt;")

;; let's insert the image tag into our look-html function
(defn look-html [data]
  (str
    ;; v-- added img here --v
    (str "&lt;img src='" (get data :img-path) "'/&gt;")
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
    (str "&lt;img src='" (get data :img-path) "'/&gt;")
    (p (get data :desc))
    (p (str "You see: " (get data :seen)))
    (p (str "Exits: "    ))))

;; test it out here to see if it's working
(look-html (look))

;; and finally take a look!
(display-html (look-html (look)))

</pre></div>

### Do you want to play a game?

Now that we've built our `look-html` function, let's use inline
evaluation to explore the text adventure.

Below are several game interaction functions. Using the inline
evaluation, evaluate each one to discover its purpose and effect on
the game state. This demonstrates how inline evaluation serves as both
a development **and** exploration tool.

<div class="cljs-editor-new" data-sci-ctx="main-game"><pre>
(display-html (look-html (look)))
(move :east)

(stack)
(push :picture)
(peek)
(pop)

(unlock-function :_something?_)
(reset)
</pre></div>

<div id="secret-door"></div>

Don't be afraid to enhance the UI. Here are some suggestions:
* Create a `looki` function that combines our `display-html` and `look-html` functions: `(display-html (look-html (look)))`
* Develop a `movi` function that calls `move` and then `looki` to show the new location
* Extend your `look-html` function to display the `(stack)` information
* your own images, there's nothing stopping you from creating your own
  images and using those in the game

### The FLOW moment

There's a moment in the coding process. Your cursor blinks in the
editor while the shape of data and its necessary transformations hover
in your mind. As you type out your solution, uncertainty arrives - do
your assumptions actually hold? Is the data structured as you imagine?
Are you remembering function names and arguments correctly?  This is
where inline evaluation shines, sliding seamlessly into this moment
with immediate feedback that confirms whether your mental model
matches reality. It bridges the gap between thought and execution,
letting you verify assumptions without breaking your flow.

### And end or maybe a beginning

Thanks for taking the time to experience inline evaluation.

A major goal of this post to get more programmers to experience
this. As programmers, we often fall into cognitive ruts that deeply
constrain our expectations of what the programming process can
be. These mental ruts, in turn, limit the potential of what we
create. I have observed decisions by language designers, programming
architecture advocates, and tool builders that directly ignore or
impede this type of interactivity—a situation I find genuinely
unfortunate.

It's hard to get people to try things outside their experience. It's
natural to resist unfamiliar ideas and dismiss them. Many who read
this will likely respond by arguing that this kind of interactivity
isn't necessary or useful. However, in my humble opinion, that simply
isn't true. People who have never truly engaged with this workflow
often underestimate its value.

Yes, these may be toy examples inside a toy editor, but this level of
interactivity is very real. Clojure programmers—and others who use
similar evaluation capabilities—apply this technique daily in
professional settings, from data pipelines powering major retailers to
the video streaming services you likely use yourself.

My argument isn't that Clojure or Lisp is inherently superior to other
languages, but that inline evaluation is incredibly valuable and
deserves wider adoption across programming environments.

By experiencing it firsthand, you might be inspired to expect more
from your programming languages and tools—or even create your own.


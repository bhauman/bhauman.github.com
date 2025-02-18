---
layout: default
title: "Interactive Programming in ClojureScript"
published: true
category: 
tags: []
---

## Interactive programming in ClojureScript

I have been doing [interactive
programming](http://en.wikipedia.org/wiki/Interactive_programming) in
ClojureScript recently. After having spent some time with it, I can
easily say that when I return to projects that don't have an
interactive workflow I feel like I am in the stone ages.

When I say *interactive programming* I explicitly mean that as I make
changes to a ClojureScript **file**, the compiled javascript makes its
way to the browser so that I can see changed program behavior almost
immediately as I save the file. This workflow is distinctly different
from REPL based interactivity.

I recently hunkered down and wrote a [leinigen plugin/browser
client](https://github.com/bhauman/lein-figwheel) combo that handles
the reloading of changed files and enables this interactive workflow.

## Flappy Bird live on figwheel

Here is a demo of changing flappy bird code live:

<div class="video-container">
<iframe width="620" height="465" src="//www.youtube.com/embed/KZjFVdU8VLI" frameborder="0" allowfullscreen></iframe>
</div>

## Can't wait?

So ... just in case you don't want to read the rest of the post (I
totally understand). You can get the above demo from github:

    git clone https://github.com/bhauman/flappy-bird-demo.git

After it's downloaded `cd` into the `flappy-bird-demo` directory and
type:

    lein figwheel

You can now goto `localhost:3449/index.html` and open up
`src/flappy-bird-demo/core.cljs` your favorite editor and start
coding.

Keep in mind this is all pre-post-pre-alpha stuff, so when you find bugs in
figwheel let me know.

The flappy bird code is rough and has many refactoring opportunities.
I wish I could say I did that on purpose.

Suggestions:

* change the game play parameters (make the game harder or easier)
* change the pitch of flappy in relation to to his velocity
* make a protocol called animate and have a list of things that you call animate on
* make flappy flap his wings


#### Greenfield?

Want to jump into live coding? Try the leinigen template:

    lein new figwheel hello-world


## Not magic

Figwheel only causes the browser to reload the correct files and
offers a reload hook that you can use. Writing reloadable code is up
to the programmer.

When I refer to *reloadable code* I am talking about code that can be
evaluated in the same runtime repeatedly without disrupting the state
of the running program.

## Why interactive programming now?

Writing reloadable code has traditionally been a daunting software
requirement. In an imperative system, it requires scrupulous thinking
about how to persist state though behavior changes. This often
involved serializing the state out of stateful components and then
reinitializing new components with the serialized state.

Recent events have significantly reduced the cost of writing
reloadable code in the browser. The first was the advent of
ClojureScript and its accompanying philosophy of immutable state and
how it should be separate from behavior. Much of ClojureScript code is
innately reloadable. You can reload pure function definitions all day
long. They are side-effect free and not tied into the local state of a
running system.

The second thing that happened is
[React](http://facebook.github.io/react/). Hooking into browser APIs
and creating event based processes is the weak point of writing
reloadable code and is normally not optional. If you add an event
listener to something, you better remove it and add it back again on
code reload (the same serialization strategy mentioned above).

React allows you to write functions that express what the DOM state
should be given the current domain state. This movement from
imperative expression to functional expression is huge and allows us
to write reloadable code without having to think about it. 

Here's an example of a React program:

{% highlight clojure %}

(def counter (atom 0))

(defn template [count]
  [:div
   [:h1 "Counter: " count]
   [:p [:a { :href "#"
             :onClick (fn [e]
                        (.preventDefault e)
                        (swap! counter inc))} "increment"]]])

(defn render [comp]
  (.renderComponent js/React
                    (sablono/html comp) 
                    (.getElementById js/document "main-area")))

(add-watch counter :renderer
           (fn [_ _ _ n]
             (render (template n))))

;; ping the state to trigger the first render
(reset! counter @counter)

{% endhighlight %}

That program is almost reloadable as is. In fact, it is reloadable if
you don't care about reseting the state back to zero on every reload.
While still valuable this is not the type of reloading I am trying
for, I want the state of the system to survive reload.

If we reload the above program `counter` is going to get redefined on
each reload which resets the state of the system and will continually
create new atoms which then get bound by `add-watch`. Not the end of the
world, but also not the desired behavior.

This is easy to solve by only defining `counter` once. You can do this
by changing the first line in the above program to this:

{% highlight clojure %}

(defonce counter (atom 0))

;; defonce is not part of ClojureScript yet
;; I have included it in figwheel

{% endhighlight %}

Now when the code is reloaded it won't be redefining and reseting the
state of the system on reload. The burden of making the above program
reloadable is extremely small.

Now that the burden of writing reloadable code has shifted, the cost
benefit of doing interactive programming has shifted along with it. If
you tell me that I can experience live behavior changes in the browser
as I type and all I have to do is `defonce` the reference to my
program state I'd call that a clear win.

I feel like the time for interactive programming is now. Give it a
try, you won't regret it.

## You code in Javascript?

If you are programming in JavaScript and want to experience file based
interactivity give [Light Table](http://www.lighttable.com/) a try! As
an experiment try live coding in say Backbone, Angular or Ember and
see how well it handles code changes. Then switch to React and note
how the different frameworks respond to interactive programming. If you do
this, your experiences would make a great blog post ... just sayin'

## Question for the reader

Is reloadable code inherently better code?

## Links 

* [lein-figwheel](https://github.com/bhauman/lein-figwheel)
* [Play the flappy bird game](http://rigsomelight.com/flappy-bird-demo/)
* [Flappy bird demo code](https://github.com/bhauman/flappy-bird-demo)
* [React](http://facebook.github.io/react/)
* [Great talk on React](https://www.youtube.com/watch?v=h3KksH8gfcQ#t=1192)
* [The awesome Om framwork](https://github.com/swannodette/om)
* [Light Table](http://www.lighttable.com/)
* [The Functional Final Frontier by David Nolen](https://www.youtube.com/watch?v=DMtwq3QtddY)
* [Local State is Poison](http://awelonblue.wordpress.com/2012/10/21/local-state-is-poison/)


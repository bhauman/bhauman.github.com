---
layout: default
title: "Devcards"
published: true
category: 
tags: []
---

<link href="/resources/public/devcards/two-zero.css" rel="stylesheet" type="text/css">

# Devcards, a visual REPL experience for ClojureScript 

[Devcards][devcards] is a ClojureScript library that helps developers
interactively lift code examples out of their source files into an
organized set of cards in the browser.

<p>
<a href="https://github.com/bhauman/devcards">
<img class="img-responsive" src="https://s3.amazonaws.com/bhauman-blog-images/devcards-action-shot.png"/>
</a>
</p>

## Code examples and feedback

A REPL allows us to interactively try different code examples and
validate that we understand their behavior. For programmers who are
used to this workflow, this interactive validation of expectations
starts to become a cornerstone of how they strategize and corner the
solution to a particular problem. However, when you are coding UIs for
the browser you often want to verify code that has a display aspect
and the REPL doesn't help.

The current workflow for verifying visual behavior in the browser is
normally constrained to editing, reloading and then manually
manipulating the main application into a particular state. For
example: we are writing a game, and we just changed some behavior of
the game and need to verify that the change worked. We will have to
interact with the game in order to put it into the specific state which will
help us validate our change worked. 

We are normally constrained to working within **ONE** instance of the
application at hand. It doesn't have to be this way, but currently the
**cost** of displaying different code examples in different states is
often higher than just manually manipulating the main application
instance into state we are wanting to check.

Thus constrained, we are less likely to freely experiment but rather
continually run a cost-benefit analysis in our heads as to whether
trying to validate a certain piece of code is practical in our current
application environment. We end up writing longer stretches of code
without the value of feedback. I would venture that this alters the code
we write, as we will be prejudiced towards conservative tried and true
patterns that will reduce the likely pain of having to repeatedly
manipulate the main application into a certain state over and over
again.

This is an extreme divergence from the REPL experience where we can
try out different code examples with relative ease and low cost.

I am proposing a straight forward solution to this. A library that
allows us to easily create code examples in our source files which
will be immediately presented to us in the browser. This library is
intended to bring the interactive nature of REPL coding to problems
that are graphical in nature.

For example, this library would make it effortless to interactively
surface several [2048][2048] boards in different starting states. Feel
free to interact with these examples.

<div class="panel panel-default devcard-panel devcard-padding devcard-padding-top">
  <div id="tz-board-1"></div>
</div>

<div class="panel panel-default devcard-panel devcard-padding devcard-padding-top">
<div id="tz-board-2"></div>
</div>

<div class="panel panel-default devcard-panel devcard-padding devcard-padding-top">
<div id="tz-board-3"></div>
</div>

Interacting with these boards quickly verifies that tiles are
combining correctly and animations are phasing correctly in these
particular starting states. Given that [2048][2048] game progression
is random, being able to look at specific examples like this can be
very helpful in nailing down the behavior of shifting tile rows.

Seeing examples like these side by side is a luxury that we are not
accustomed to. Now imagine being able to surface code examples with
ease directly from the the source file your are working in.

## Introducing Devcards

I have created [Devcards][devcards] as one possible solution to this
problem. Devcards provides an interface that organizes a set of
cards, where each card represents a code example. Devcards allows you
to define cards in-line in your source file like so:

{% highlight clojure %}

(defcard my-first-card 
  (react-card (sablono/html [:div [:h1 "I'm a Devcard"]])))

{% endhighlight %}

Devcards is written with a great deal of attention towards live code
reloading. When you save the file that holds the definition above, a
card containing the rendered template will appear instantly in the
Devcards interface. It will appear under the namespace it was defined
in and it will respond to changes as you continue to code.

As you progress through a problem, you can create a set of cards that
will all appear in the Devcards interface. This enables you to surface
a set of examples that are **all** responding in real time to your
code changes. At the end of a coding session you will potentially have
a set of valuable artifacts (cards) that help you and others
understand your approach to the problem.

You can see an example of the Devcards interface [here](http://rigsomelight.com/devcards/).

Devcards derives its interactivity from the live reloading Leinigen
plugin: [lein-figwheel][figwheel-post]. Figwheel is a code reloading server/client
combination that continually reloads compiled code into the browser as
you change your ClojureScript sources.

## Developing with Devcards

If you are curious about how this looks in reality, check out the
demonstration video. 

<div class="video-container">
<iframe src="//player.vimeo.com/video/97078905?byline=0&amp;portrait=0" width="620" height="348" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

[the code from the video](https://gist.github.com/bhauman/68f965573ba660715b35)

## Feedback - the ultimate programming tool

Working with a page of visual code examples that are **all**
responding to the code I am writing, provides an unprecedented amount
of feedback and it accelerates my awareness of the ramifications of
the code I am writing. Tests start to fail, entities start
disappearing, I can go back and interact with components in specific
states and see how they are responding to recent code changes. I can
then move to other pages of cards and see if they are still working as
expected.

This experience has driven home for me the paucity of feedback in our
current development workflows. We are still in the cave looking at
shadows. Bret Victor has eloquently expressed this
[several][unthinkable] [times][learnableprogramming]. Figwheel and
Devcards have both the increased the amount of feedback I receive
while I code by a very large factor. Once you experience this for
yourself your eyes will be opened and you will not freely give up this
way of coding, just as you would be loath to give up your REPL now.

## Pages of examples FTW

As we all know, tests are not enough. Integration tests run in a black
box and take forever (preventing real time feedback) and they can't catch
the most obvious of display errors. Unit tests live in an isolated
world away from the real complexity where things actually go wrong.

A page of functioning code examples can be a very powerful tool in our
quest to continually verify that our code is working as we expect. We
can grow this list of examples to include problematic component
combinations. Then a **person** can go through all of these examples
and visually observe and interact with them. Automation helps but it
clearly isn't enough to verify the complex interactions of CSS,
JavaScript, and DOM, we need a human for that.

Be clear that I am not saying that this solves everything, I am just
saying that this is another tool that can be potentially very helpful.

## Potential

Anyone can implement their own cards easily. If you can create a React
or Om component you can create a card. So the potential for having a
library of very helpful cards at your fingertips as you program is
very high.

We can create cards with history management and backtracking built in.
There can also be cards that are very targeted, like a [regular
expression][rubular] card which would present an interface to try
different strings and allow you to change the regex.

Different libraries could provide their own cards. [Quil][quil] is
coming to ClojureScript! Can you imagine the Quil card? Or the
[Threejs][threejs] card? Or the [DataScript][datascript] query
composer card?

This is new territory and there are probably many creative helpful
applications.

## Give it a try

These are still the very early days for Devcards but I sincerely hope
you give it a try.

The [readme on Github][devcards] provides instructions for getting started.

## Links 

* [Devcards][devcards]
* [Figwheel introductory blog post][figwheel-post]
* [figwheel][figwheel]
* [2048 game][2048]
* [Learnable Programming][learnableprogramming]
* [Media for Thinking the Unthinkable][unthinkable]
* [React](http://facebook.github.io/react/)
* [Om](https://github.com/swannodette/om)


[devcards]: https://github.com/bhauman/devcards
[figwheel]: https://github.com/bhauman/lein-figwheel
[figwheel-post]: http://rigsomelight.com/2014/05/01/interactive-programming-flappy-bird-clojurescript.html
[2048]: http://gabrielecirulli.github.io/2048/
[learnableprogramming]: http://worrydream.com/LearnableProgramming/
[unthinkable]: http://worrydream.com/#!/MediaForThinkingTheUnthinkable
[quil]: https://github.com/quil/quil
[threejs]: http://threejs.org/
[datascript]: https://github.com/tonsky/datascript
[rubular]: http://rubular.com/


<script src="/resources/public/devcards/js/devcard-examples-prod.js"></script>



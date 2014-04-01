---
layout: default
title: "Frontier"
published: true
category: 
tags: []
---

# Towards a backbone js for ClojureScript

Over the past year, I have spent a lot of time thinking about front
end web development in ClojureScript. In the ClojureScript world we
have a lot of rich interesting ideas emerging.

However, in my humble opinion we don't really have a backbone.js. I
mean that in the sense of a small library that is renderer agnostic
that will help us modularize the behavior of browser based
applications.

I'd like to do an exploration here and hopefully derive a library that
embodies __The Clojure Way__ yet is still small enough to "drown in the
bathtub" (its fun to quote wack jobs).

## Out of the Tar Pit

I have heard tell that the paper Out of the Tar Pit by Ben Mosely was
infuential in the design of Clojure. This is an absolutely excellent
paper. Read it several times, please.

In the paper Ben steadfastly calls out all sources of complexity that
are not essential to solving a problem and patently states that as we
move away from the essential complexity of a problem we are shooting
ourselves in the foot, or face or something like that.

After reading the paper several times recently, a basic epiphany hit
me. As with most epiphanies I worry about drinking my own koolaid only
to find later that Jim Jones was hanging around at mixing time. But
*this* time it feels real and valuable, trust me.

The epiphany was that the essential complexity of most interactive
programs can be expressed as:

{% highlight ruby %}
CurrentViewState = F([input1, input2, input3 ... all_inputs])
{% endhighlight %}

Where `inputs` are from user interactions, timeout or server callbacks
and `F` is a deterministic operation over the inputs, such that given
the same inputs we will get the same output.

In the expression above, __the only essential data is the list of
inputs__. 

Instantiated domain models like `Todos` are actually a view that is
derived from this essential data. I have become so accustomed to these
entities that I've come to believe that they represent the essential
state of my programs. That is not essentially true! What is actually
happening is we are recieving one new input after another and the
current entity based view of the program is a derivative of these
inputs.

I'm not saying we do not need entities and other models to reason
about and write our programs, of course we do, but we assume that they
represent the core state of our programs and this fundamentally
affects how we think about and manage state in our programs.

The only essential behavior in the expression above is a deterministic
function `F` that maps a list of inputs to a DOM state.

This says to me that for a given single page web app there must exist
a deterministic function `F` and `inputs` that it can operate on.

Now according to Ben's awesome paper as our program moves away from
its essential complexity we are adding spurious complexity to our
system and that is a bad thing.

For me, keeping this in mind is where Simple verses Easy begins. A
system that is made up of a function that operates on a list of inputs
is something that we can actually reason about. Creating that function
may actually be harder to do than whipping together a bunch of
stateful objects but you are left with a system that is mechanically
simpler than the object based system.

## What about domain state?

For the purpose of this exploration I am going to use the term
__domain state__ to describe the various instantiated domain models
that we have in our program at any given moment.

Domain state is normally where we live and die as developers. This is
where entities like *users* and *todos* come to life. Domain
state is our best guess at how to model the given problem so that we
can store and reason about it. However, in terms of this exploration
it is a rolled up view of the original source of truth: the inputs.

Lets reflect on the stability of the domain model versus the stability
of the inputs. Domain models change quite often as knowledge of the
domain increases and software requirements change. But the inputs are
much more essential and immutable if a user changes his first name on
the 12th then that is always true regardless of your model changes.
You can have new and different types of inputs but the previous inputs
have happened and can't change. Again pointing to the essential nature
of the inputs to our systems. Yet it is standard practice to treat
them as the most transient things and trust our data model of
situation implicitly.

That being said domain state is a very useful and important derivation
of the inputs. We like thinking about and operating on domain models
not lists of user interactions.

Given that domain state is so helpful, let's introduce another
function:

{% highlight ruby %}
DS2 = Transform(DS1, input2) 
{% endhighlight %}

`Transform` is a function that applies all the changes implied by
the input to the last domain state.

This implies that `F` is simply:

{% highlight ruby %}
F(inputs) = ToDom( reduce(Transform, inputs) )
{% endhighlight %}

Where `ToDom` takes the domain state and converts it to a DOM view
state.

In the above expression we have stayed true to F's deterministic
nature and thus have have not added and spurious complexity to our
system.

In the above expression domain state is transient. It is accumulated
in the reduce operation as and aid to calculate our current view. It
isn't stored.

## Storing Domain State

We can reduce repeated calculation by recording the previously
produced application state:

{% highlight ruby %}
Transform(AS2, input3) = reduce(Transform, input1, input2, input3)

F(inputs) = ToDom( Transform(AS2, input3) )
{% endhighlight %}

Again we haven't strayed too much from our original system by doing
this, but I must clear that this is added complexity. Data is not the
only thing that changes over time. Implementations do as well. When
the Tranform function changes and operates on a cached state then a
lot of our guarantees go out the window.

This is interesting for two different reasons. 

First it's a validation of Ben's ideas. As soon as we make what seems
like a valid optimization that shouldn't affect the integrity of the
system too badly we discover that well actually there is a price to be
paid.

Second this rolling up of inputs into Domain State is responsible for
an incredible number of headaches and development frictions that we
experience in every layer of application development today. Migrating
databases and the accompaning deployment timing problems, almost all
of OOP, local browser state encountering a new version of a single
page web app, new browser state encountering and old version of a
single page web app, etc. Once you see it, you see it's footprints
everywhere and further more these problems are often stacked into a
tower of exponential complexity. We get to have all of this by
deviating from the essential complexity of the problem. Way to call it
Ben.

The third reason that this is interesting is live code reloading. Live
code reloading allows us to code and see how our changes are affecting
a running program. When we move from reducing the inputs with
Transform to caching the Domain State, we are moving from a place
where live coding is trivial to implement to a place where it is
practically impossible to implement. Again, if the Trasform function is
changing and operating on cached state its probably gonna fail. If we
are reducing across a set of inputs the transient domain state
constructed by transform will be internally consistent.

## Super Powers

It is surprising to see how many benefits just drop into our laps
if we stick the close to the essential complexity of the system.

### Testing 

Testing the system is trivial. Given a starting state and a set of
inputs you have a definite resulting state.

{% highlight ruby %}
assert reduce(Transform, [:add-todo {:data "Buy Milk"}]
                         [:add-todo {:data "Buy Bread"}]
                         [:add-todo {:data "Finish 2048 AI"}]) 
       ==
       { :todos [{:data "Buy Milk"}
                 {:data "Buy Bread"}
                 {:data "Finish 2048 AI"}] }
{% endhighlight %}

You can easily pass in an initial state as well.

{% highlight ruby %}
assert reduce(Transform, {:todos [{:data "Buy Milk"}]},
                         [:add-todo {:data "Finish 2048 AI"}]) 
       ==
       { :todos [{:data "Buy Milk"}
                 {:data "Finish 2048 AI"}] }
{% endhighlight %}

You can test lengthy input chains and verify that your program is
working as expected.

### Time travel

It is easy to backward through the previous states of the system
popping off the last input one at a time. It is also easy to add them
back.

This means that inplementing things like undo are fairly effortless.

But even more exciting is that this allows us to build interactive
development tools that let us step though a list of inputs and see
both the UI view and the domain state of the running program change.

### Best error reporting ever

On error we can bottle up the starting state and all the inputs that
lead up to the error and shuffle it off to a QA web service. This QA
web service could have an interface that would allow a programmer to
experience the exact error that the client experienced and would be
able to walk through all the steps that led up to it. This is pretty
awesome!

### The interactive development holy grail  

When all the state of the system is effectively separate from the
behavior it is fairly trivial to define the system in a way to allow
the live reloading of changed code into the browser. Allowing us to
see the system respond to our code changes as we type and save our
files.

## Presenters

Where application state is a derivative of the fundamental inputs that
come into a system, data that is intended only for the presentation
layer is a derivative of the application state.

There has been a very good and healthy trend to clean up view code by
performing many needed computations in an external library.

A todos count or a boolean representing whether a certain section of a
page should be showing are both examples of presentation data.

Let's extend our functional system with `Derive`:

{% highlight ruby %}
F(inputs) = ToDom( Derive( Transform( AS2, input3 ) ) )
{% endhighlight %}

Where `Derive` is responsible for deriving all of our presentation data.

## Side Effects!

We all know that this ideal functional pardise has to slam into the
real world somewhere. We will probably have to interact with other
services that are external to our system. We must try to accomodate
this with out adding spurious complexity.

One hard requirement for accomodating side effects in the system
is that any new data that results from the side effect needs to come
into the system as an input.

In many cases with every user input/action there is an intention and
part of that intention is a desired side effect. (i.e. store this on
the server) I have come to believe that it is best to *encode* side
effects in the transform function itself.

Notice I said *encode* and not *perform*.

I think the Transform should return a list of effect "messages" along
with the new transfomred state of the system. These messages are then
performed only if the system is in a mode to perform them. If you where
moving through past states, you wouldn't want to repeat the side
effects.

{% highlight ruby %}
{ :effects ... :new-state ... } = Transform( AS2, input )
{% endhighlight %}



Then the results of these side effects are in turn re-integrated into
the system as new inputs if necessary.



Example:

{% highlight clojure %}

(defn to-dom! [sab-dom]
   (.renderComponent js/React (sablono/html sab-dom)        
                     (.getElementById js/document "app-area")))

(defmulti transform first)

(defmethod transform :default [_ state] state)

(defmethod transform :add-todo [[_ todo-data] state]
   (assoc-in state [:todos (:id todo-data)] todo-data))

(defmethod transform :complete-todo [[_ {:keys [id]}] state]
   (assoc-in state [:todos id :completed] true))

(def derive [state]
   (assoc state :count (count (:todos state))))

(defn to-dom [state send-message] ...)

(defn run [start-state]
   (let [state (atom start-state)
         send-message (fn [msg] 
                         (swap! state (fn [st] (transform msg st))))]
      (add-watch state :renderer (to-dom (derive @state) send-message))))

{% endhighlight %}



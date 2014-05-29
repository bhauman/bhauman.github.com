---
layout: default
title: "The tryanny of domain state and the primacy of inputs"
published: true
category: 
tags: []
---

# The tyranny of domain state and the primacy of inputs

## TLDR;

#### definitions

*Inputs* are the various data carrying signals or messages that
come into our system such as user events, server responses, timing
callbacks etc.

*Domain state* is the current state of the instances of various domain
 models and data refererences that represent the state of the system.

The *domain state* of an application is a lossy compression of the
original *inputs*. We currently treat the inputs to our applications as
ephemeral and the domain state as a concrete base of truth. This
relationship is inverted as the original inputs are the ground truth
from which all domain state is derived. Domain state is in reality one
view or cache of the original inputs and as such it is ephemeral.

The problems caused by this reverence for our models of the inputs as
opposed to the inputs themsleves results in applications that are
opaque with regards to time, unresponsive to new requirements and
difficult to distribute.

## The opacity of WTF

As programmers it seems like we have valid opportunities to say WTF
quite often. Here are some common situations:

You get an email from a user that simply states: "It isn't working"
and nothing else. Well, we are kinda stuck here if they fail to tell us
anything more. We have no idea what they are talking about and there
is no way to find out. The most likely possibility is that there is
unknown bug in the system.

Your COO comes by and says "Hey I was on the site yesteday afternoon
and when I saved a todo it didn't take." Well that's just great. You
haven't touched the Todo code in 3 months and all the commits you have
made recently are no where near the todo codepath. In short, you have no
idea what could be causing a problem in the todos. Your only recourse
is to guess, read code, look at commits and slueth your way towards a
possible explaination. Too many times, we come away with shrugged
shoulders and empty upturned hands. We hope that the COO was mistaken
or some confuence of events fated him to have a bad experience.

The CEO comes by and says that he needs the usage statistics on the
accordian UI thats been on the home page for the last two weeks. You
look up from your code and stare back glassy eyed. There is no way to
get that data. Nobody notified you that you needed to collect it. Or
did they? You really need to pay more attention in those Wednesday
morning SEO strategy meetings.

All of these situations happen. They happen too often. These
situations are opaque. We have moved through the one way door of time
and as such we are not able to come up with conclusive answers to the
demands of these situations.

The `opacity: 0.9` of these situations could inspire us to ask: why? Is
this just the nature of our systems? Or is it symptom of current our
approach to application development?

## Essential State and Essential Complexity

The paper "Out of the Tar Pit" posits a notion that programs have an
essential state and an essential complexity. Essential state is the
base line state from which we can derive all the other data needed in
the system. Caches definitely fall outside of essential state because
they normally store some derivative of essential state.

Essential complexity is the complexity inherent in the problem *as
seen by its users*. A user would percieve that it isn't that hard to add
a todo to a list of todos. The layers of user interface, server and
database interaction all fall outside of the users concern and thus
into the realm of additional complexity.

"Out of the tar pit" proposes that as we move away from the essential
we are creating problems for ourselves. We are moving towards more
complexity and away from simplicity.

## Complexity Bad, Simplicity Good

Following the ideal of staying true to the essential let's start with
an ideal, perfectly testable deterministic system:

    ViewState = F( X ) 

Where `ViewState` is the current visual output of a users view, `F` is
some pure function and `X` is our essential state. I am going to
consider this my pure base. This is a system that we can reason about.
We know that for a certain `X` we will always get a deterministic
`ViewState`. This is simplicity itself.

Let's focus on `X`. What is `X` anyway?

Well, what I am looking for is for `X` to be the essential data from
which everything else is derived. Modern systems normally provide
interactive functionality. A user clicks on something or fills out a
form and submits it and the app responds accordingly.

To support interactive functionality `X` must be dynamic and changing
with each input. An input can be a user event, timing loop event,
message from the server etc. So, somehow `X` is changing based on the
inputs. Does that mean `X` is the result of a function applied to all the
inputs?

    X = process([x1, x2, x3, x4, x5 ...])

But wait! I am looking for `X` to be the *essential* state of the
system, and `process` is clearly causing `X` to be a derivative of the
inputs. Maybe `X` is just the current list of inputs:

    X = [x1, x2, x3, x4, x5 ...]

All other state can be derived from the list inputs and there is no
data prior to the inputs. I am going to conclude that the inputs
are the essential state!

Our ideal system now looks like this:

    ViewState = F( [x1, x2, x3, x4, x5 ...] )

This is extremely interesting! I am stating that this list of inputs
IS for sure the essential state of our program. If this is true we can
can conclude that if we stick to this list of inputs as the base for
our state we will avoid our dreaded enemy complexity.

The inputs we recieve from a user or some other service is an
immutable occurance. When an input comes in its hard to argue that it
never happened or that it happend some other way. "John clicked delete
at 7:15" is an event that occured in time and as such is fact.

So the inputs are an *immutable* time series. This immutable concrete
nature suggests that they are the base from which everything else is
derived. And thus the essential *transaction log* of our application.


## Concrete semantic inputs

Let's look at what this list of inputs is for a typical web application:

```clojure
[:add-todo {:content "buy milk" :id 5}]
[:complete-todo { :id 5 }]
[:remove-todo {:id 7}]
[:look-up-help {:question "Add todo?"}]
...
```

This is my interpretation of the inputs to a typical client side web
app. I am giving these inputs first class status. I might just give
them a schema as well.

Notice how the list does look like a transaction log for our
application. Also notice the *semantic nature of the list of inputs is
aligned towards the users perception of what is happening*. To me this
preserves the essential nature of the inputs. You are staying closer
to the intent and farther from the implementation.

If we had instead encoded the inputs as this:

```clojure
[:add-todo {:content "buy milk" :id 5}]
[:update-todo { :id 5 :completed? true }]
[:delete-todo {:id 7}]
[:help-window {:id 35}]
...
```

We are leaking the implementation details and losing the more general
nature of the actual intent when the event occured. We are moving from
the essential to the accidental.

I am pointing this out because I think there are those who may not
realize the degree of the trade off they are making by having a
transaction log that only records domain model transitions. For now
let's just say that it is a movement towards complexity and thus
something we do not want.

## Hmmm ... where is domain state?

So we have this expression that represents our *simple* system:

    ViewState = F( [x1, x2, x3, x4, x5 ...] )    

We now get that the inputs may very well be the the essential data of
my application. However, it looks like it could be an unpleasent
experience to work with the raw inputs as my data source. We do need
our domain models.

What is domain state really? Lets look at what happens when an input
comes in.

```
NextDomainState = TransformFunc( CurrentDomainState, 
                                 [:add-todo {:id 7 :content "buy cheese"}] )
```

We can think of domain state as being the result of applying a
transformation to the current domain state based on the current input.
From this we can conclude see that we can have our domain state if we
just reduce this transformation over the inputs.

```
CurrDomainState = reduce( TransformFunc,  [x1, x2, x3, x4, x5 ...] )
```


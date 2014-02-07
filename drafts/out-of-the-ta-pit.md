---
layout: default
title: "Out of the Tar Pit"
published: true
category: 
tags: []
---

# Out of the Tar Pit

Web application development is becoming the inceasingly dominant form
of front end development. Single page applications are coming into
their own as a confluence of technologies (HTML5 Apis, CORS, Oauth2, Client side
application frameworks ...) come into their maturity.

As such we the number of aproaches to tackling the problem of creating
a single page web is growing. Evaluting these approaches can be
difficult without a common language or base set of truths or
principles to guide us.

It is often good to start with the ideal system and then see where
reality forces us to deviate from the idea. The idea being that the
closer we stay to the ideal the less complexity and its associated
problems.

The excellent paper "Out of the Tar Pit" by Ben Moseley has been
extremely influential in the following. Read it 3 times. You will have
hanging questions after reading but it is still absoluty terrific in
providing language and conceptual structure to cordone off the non
ideal baddy stuff.

# The good news is: Its only a series of inputs

At it's core an application is a series of inputs. Or rather the
essential data of an application is a series of inputs. The only data
you need to produce the current incarnation of your application is the
list of inputs that has occured from the beginning of the applications
use.

The application state all the way upto the view is a _derivative_ of
the original list of intputs.

So here is the good news again. Where F is a pure function:

HTML_DOM_View_State = F( list_of_inputs )

That is our ideal. For a given list of inputs there is a precise DOM
View for our application. This is simplicity and entirely tractable
and something we can reason about.

Aside: link "yeah right ... buddy"
If you are a web programmer you may be thinking "yeah right". You may
be quick to point out the many situations where this doesn't seem to
apply. All I can say is bear with me. I'm web programmer as well, I
know where you are coming from.

We are using the ideal to feret out where we are creating _accidental
complexity_. Are we leaving the ideal for a good enough reason? Or are
we just creating the seeds for a future mess.

Example of our ideal:

simple todos or tick tack toe: function add_to_list([msg data])









Application State: Everybody is doing it.

While the ideal is the list of inputs we spend most of our time
operating on a cached rolled of view of that list of inputs. We will
call this the Application State or App State. 

Applcation State is analogous your Ember or Backbone models or even
the server database. Application state is where entities come into
being. Users, Todos, Todo Lists, etc...

It very important to remeber though that Application state is a cache.
It is a derivative of the essential. But it is a useful view of those
inputs that makes further derivations (such as placing data into HTML
templates) easier.

In the above example it is helpful to create a representation of the
board so that we can more easily query the current state of the game.

So Application State is an intermediate but very useful view of the
current list of inputs. An as such we can break down our F into two
functions.

Where:

HTMLDomView = F( list_of_inputs )

F(list_of_inputs) = MR( AS( list_of_inputs ) )

AS is a function that produces the Application state from the list of
inputs:

AppState = AS( list_of_inputs )

MR is the markup rendering function:

HTMLDomView = MR( AppState )

Is this settling in OK? Personally I find it comforting to know what
Application State is and what motivated its existence into being.

Let's look at AS again:

AppState = AS( list_of_inputs )

This is not what we do in reality at all. We don't take the list of
inputs and then produce the AppState. Why not? Because it is stupid to
do it that way. If AppState is a cache that represents the current
state of the system then we should use it to caclulate the next AppState.

So let's intoduce a new function that takes the last AppState and the
current intput as parameters.

AppState_current = TRANS( current_input, AppState_last )

This is a much more pure form of what is commonly done in practice.

HTMLDomView = MR( TRANS( AppState_last, current_input ) )

Well for the functional programmers in the room this is recognizable
as foldl or reduce. AppState is a reduce operation.

AS( list_of_inputs ) = reduce( TRANS, list_of_inputs )

We are goind to call TRANS the transform function as it transforms the
current app state into the next app state.

Example::





Immutability and state snapshots


From tic tack to to todos

Below we follow this same purity and write a todos application.









Introducing side effects.

saving stuff to the server.  Using local storage to emulate a server.


Where it goes wrong: Intentions are not transforms

When a user takes an action in a UI they have an intention that
intention is partially a trasnformation. But part of that is the
intention to have the data be stored in a whey that it is available
whenever they log into their account.

Thus we have come full circle back to the idea of a controller. This
is what controllers do they map intentions to transforms and side
effects. The ideal thoug is to have as many interactions be transforms
as possible. And really isolate and reduce the complexities introduced
by side effects.

We don't want to be propogating values all over the country side.
Thats just not decerning.

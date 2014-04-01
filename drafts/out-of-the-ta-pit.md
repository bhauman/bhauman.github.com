---
layout: default
title: "Out of the Tar Pit"
published: true
category: 
tags: []
---

# Out of the Tar Pit

Web application development is becoming the increasingly dominant form
of front end development. Single page applications are coming into
their own as a confluence of technologies (HTML5 Apis, CORS, Oauth2, Client side
application frameworks ...) come into their maturity.

As such, the number of approaches to tackling the problem of creating
a single page web is growing. Evaluating these approaches can be
difficult without a common language or base set of truths or
principles to guide us.

It is often good to start with the ideal system and then see where
reality forces us to deviate from the ideal. The guiding principle
being that the closer we stay to the ideal the less complexity
and its associated problems.

## My ideal system

After working on this front end Javascript stuff a bit I have gotten
to the point where I would like to be able to reproduce the complete
system states of client side Javascript applications easily.

If you have done any testing of your Javascript and/or Ruby systems,
you know that it tends to be an absolute pain to set up the the state
necessary to see how the system will behave under certain conditions.
You end up marshaling different objects and collections (mock or not)
into a magic cauldron of state to produce the situation you want to
test.

I don't know about you but I want a system that can take an initial
state, a series of inputs and will produce the resulting state while
rendering the resulting dom view to the div of my choice. I can then
test the result state and check to see if the resulting DOM conforms
to my expectations.

Something like this:

{% highlight javascript %}

var initialState = { todos: [{ id: 1, 
                               content: "buy milk"}] };

var result = System.process(initialState, 
                            [["new_todo"], 
                             ["create_todo", { content: "finish TRS" }],
                             ["complete_todo", { id: 1 }]],
                            "#test1");

assert(1 == initialState.todos.length)                
assert(2 == result.todos.length);
assert("finish TRS" == result.todos[0].content);
assert(next.todos[0].completed);

{% endhighlight %}

The `System.process` function above is intended to take the `initialState`
and list of inputs and return a state that results from applying those
inputs. It is also taking that data and rendering the view to the
`#test1` div in our DOM.

In order to prevent all kinds of crazy state based errors I am going
to require that the initialState not be altered by the `System.process`
function. I'd like to reuse the `initialState` over and over again
without defensively cloning it in my tests.

The benefits of such a system reach beyond testing. It is so easy to
reproduce states with a system like this, you should be able to
effortlessly walk the states of running system. If there is an error
you can easily step backwards to a point before the error occurred and
then walk forward towards the error and look at the whole system state
every step of the way.

In fact, this it is so valuable that I am going to add this state
walking as a requirement for my idea system.

Another advantage of a system like this is that when a client side
error occurs we can take the starting state, the error state and the
list of inputs that led up to it and post it all to the server. From
there we can debug the client problem leisurely. In fact while I'm
fantasizing here we could even have and nice interface for QA where
they receive these packaged up bugs and they can walk through them by
pushing a forward and backward button. We could easily know the
message that caused the bug but also the perhaps erroneous combination
of events that led up to it. Yeah I know crazy talk.

Actually this sounds so good to me that I am going to require that the
system state be serializable so that we can send it to the server. This
means we can't store closures and unserializable objects in the state.

Another requirement is that the system should be able to run isolated
in the DOM. This means that when the system is attached to the DOM it
should behave entirely independently of the same system running in a
div next door. This mainly means that events that originate in one
system div should only communicate back to the system/state that
created the div.

With this requirement I can now run two versions of the same program
next to each other on a single web page and compare their behaviors.
Why would you need this? If you run a suite of tests and they all
render the system to an independent div on a page you can now interact
with the resulting failed program views after the tests have run. Sweet!!!!

You could also do crazy things like skip explicit testing and just
create a function that generates random lists of inputs and bombs your
program with them. There is no quicker way to find unanticipated bugs.
You tend to find those wacky unanticipated conditions, like when
someone tries to update a todo that doesn't exist. Could you imagine
running a bomber test like this and then getting a list of isolated
rendered running programs in error states that you can interact with?

## Well ...

Now that you have heard the requirements of my ideal system do they
seem unreasonable? Do they seem doable? Do they seem crazy? Do these
features seem worth exploring?

## Trying to implement the ideal

Let's give a very basic version of this a shot. We will ignore
rendering for now and see if we can get create a system that produces
the resulting system state from an initial state and a list of inputs.

{% highlight javascript %}

var System = 
{
    create_todo: function(state, data) {
      var last_id = _(state.todos).sortBy(function(x) { return x.id; });
      state.todos.push(_(data).extend({id: id + 1}));
      return state;
    },

    complete_todo: function(state, data) {
      var todo = _(state.todos).find(function(x) { return x.id == data.id });
      var todo.completed = true;
      return state;
    },

    transform: function (state, input) {
      return System[input[0]](state, input[1]);
    },

    process: function(init, inputs) {
      var cur_state = init;
      // reduce :)
      for (var i=0; i < inputs.length; i++) {
         cur_state = this.transform(cur_state, inputs[i]);   
      }    
      return cur_state;
    }
};

var initialState = { todos: [ { id: 1, content: "buy milk" } ] };

var res = System.process(initialState, 
                         [["create_todo", { content: "hello" }], 
                          ["complete_todo", { id: 1 }]]);

console.log(res);


{% endhighlight %}

Well that was interesting. Try not to get get caught up in the details
of the todos implementation but focus on the processing of the system.

There are some interesting things here. 

One of the main things that stands out is that our requirement for
repeatability, dictates that we have one state object which is an
umbrella for all the state in the system. This makes perfect sense.
The system state has to move through each transition as a whole. A way of
looking at this is that in order to have a repeatable system we have
to have the familiar state -> transaction -> new state pattern.

This transaction pattern is more difficult with a set of individual
stateful objects. So, let's say the requirements are strongly nudging us
towards having one over-arching state object.

Another thing that stands out is that our transforming functions
"create_todo" and "complete_todo" both take the whole state and
operate on it. This is a bit different from the dominant OO way of
doing things. Instead of "create_todo" altering the local state of our
instantiated object we are altering the one system state. We are not
operating on "this" object we are operating on the whole state of the
system.

Having the whole system available to the transforming function gives
us access to all the data we need to make our decisions. It also allows us
to update the the system where needed.

Which brings us to where this implementation overtly fails my
requirements. The `System.process` function is altering the initialState
object literal. In fact after the `System.process` function is called
`initialState` and `next` are both equal.

If I or some newbie repeatedly passes the same initial state to
`System.process` each call is gonna corrupt the initial data and the
results are gonna be crazy.

This the second assert below is going to fail:

{% highlight javascript %}

var initialState = { todos: [ { id: 1, content: "buy milk" } ] };

var res = System.process(initialState, 
                         [["create_todo", { content: "hello" }], 
                          ["complete_todo", { id: 1 }]]);

assert(res.todos.length == 2)

var res2 = System.process(initialState, 
                         [["create_todo", { content: "hello" }], 
                          ["complete_todo", { id: 1 }]]);

assert(res.todos.length == 2)

{% endhighlight %}

In order to make the test above pass we will need to defensively clone
the state that is passed to process. It's going to have to be a deep
clone to prevent any state changes from bleeding their way back into
the initial state. No since we have the requirement that the state be
serializable we can require that the state be entirely seriailzable to
JSON. Our clone function can then be implemented simply.

{% highlight javascript %}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

{% endhighlight %}

And we will place the clone function in the process function as so:

{% highlight javascript %}

  process: function(init, inputs) {
      var cur_state = clone(init);
      for (var i=0; i < inputs.length; i++) {
         cur_state = this.transform(cur_state, inputs[i]);   
      }    
      return cur_state;
  }

{% endhighlight %}

Now the initialState is protected and we have met the initial
requirements of the system. However we should see the need for the
call to clone as a nudge. Cloning on modern Javascript VMs is freaking
fast and so is GC so we can get away with it up to a point but it
should hang there as a warning that we may run into problems down the
line.

Why do we need to clone? In Javascript it is more more convenient and
straight forward to manipulate data in place. In order to facilitate
this manner of working with data we need to clone to start with a
fresh slate that can be altered as neccesary. 

Again I feel that the requirements of the system are nudging me here
but lets continue on and see how it goes.

## Backwards and forwards

So far my system has only worked in a static situation but in
actual interactive use event listeners are going to get triggered and new
inputs are going to come into the system and the system is going to
process the new input and produce a new state.

Let's create a system runner to hold this functionality.

{% highlight javascript %}

function systemRunner(system, initialState) {
  var inputs = [];

  return {
    add_input: function(input) {
      inputs.push(input);
    },
    
    get_state: function() {
      return system.process(initialState, inputs);
    }
  };
}

{% endhighlight %}

This system runner facilitates the collection of inputs and allows us
to query the "current" state of the system. 

Let's add a toy renderer to give us some more context.

{% highlight javascript %}

function systemRunner(system, initialState, element_id) {
  var inputs = [];

  return {
    add_input: function(input) {
      inputs.push(input);
      this.render(this.get_state());
    },
    
    get_state: function() {
      return system.process(initialState, inputs);
    },

    render: function(state) {
      var target = document.getElementById(element_id);
      target.innerHTML = "<h2>Todos count: " + todos.length + "</h2>"      
    }
  };
}

{% endhighlight %}

< Show a running example here >

So now the system runner reacts to the addition of new inputs and
renders the result to the element of our choice.

Notice that in order to have a system that runs in the browser that
this is the very least that we need. We need to keep a reference to
the initial state and track the all the inputs to the system. Our only
stored changing state is the inputs array in this implementation.

It is interesting that we can capture the behavior of a system as a
deriviation of a changing list of inputs. In fact this does seem like
the very least we need, It's the essential source from which all derivative data
and behavior springs.

Alright, we are ready to add state walking behavior.

{% highlight javascript %}

function systemRunner(system, initialState, element_id) {
  var inputs = [];
  var cursor = inputs.length;
  
  return {
    add_input: function(input) {
      inputs.push(input);
      this.cursor = inputs.length;
      this.render(this.get_state());
    },
    
    get_state: function(cursor) {
      var inputs_to_render = 
          _.isUndefined(cursor) ? inputs : inputs.slice(0, cursor);
      return system.process(initialState, inputs_to_render);
    },
    
    move_back: function() {
      var pos = this.cursor - 1;
      this.cursor = pos < 0 ? 0 : pos;
      this.render(this.get_state(this.cursor));
    },
    
    move_forward: function() {
      var pos = this.cursor + 1;
      this.cursor = pos > inputs.length ? inputs.length : pos;
      this.render(this.get_state( this.cursor ));
    },
    
    render: function(state) {
      var target = document.getElementById(element_id);
      var todos_render = "<h2>Todos count: " + state.todos.length + "</h2>";
      var controls = '<div><a class="backwards" href="#"><- back</a> | ' + 
                          '<span>' + this.cursor + '</span>' + ' | ' +
                          '<a class="forwards" href="#">forward -></a></div>';
      target.innerHTML = todos_render + controls;
    }
  };
}

{% endhighlight %}

#### load up a set of inputs so that the reader can step back through them
#### make sure that they discover the problem with the mutability of the inputs

Here we have added a cursor to the system runner. We have also added
the "move_back" and "move_forward" functions to move the cursor
backward and forward within the bounds of the current number of
inputs.

This is pretty cool stuff we can move forward and backward between the
diferent states of the system and see their rendered outputs.

I added controls so that you can interactively walk the state of the
application so far.

## Ooops ...

If you walked the states of the application you might notice some
irregularity. 

There is a disparity between the list of inputs and the actual states
as we walk back through them. I inadvertently mutated the inputs in
the list. I the `create_todo` function I am taking the data from the
input and using it to create a new todo. Then as that todo is changed
so is the input. This kinda destroys to whole purpose of recording the
inputs and replaying them in the first place.

The errant line from the `create_todo` function is this:

{% highlight javascript %}

  state.todos.push(_(data).extend({id: id + 1}));

{% endhighlight %}

We are using the input data as the base object for our new todo and
thus any changes we make to the todo will propigate back to the
original input. The correct way to write this would be:

{% highlight javascript %}

  state.todos.push(_({id: id + 1}).extend(data);

{% endhighlight %}

To solve this we could have the requirement that as we program that we
have to remeber this and be careful not to mutate the inputs. Or we
could have our system prevent this from happening. The first option is
ridiculous and only opens us up to certain input corruption.

Let's go with the second option and protect ourselves from accidental
input mutation. We can freeze the inputs so that they can't be
changed. If we are going to do this we will have to do it recursively
just incase our inputs are compound object literals.

{% highlight javascript %}

function freezer(obj) {
  if(obj instanceof Object) {
    Object.freeze(obj); 
    for (var prop in obj) {
      freezer(obj[prop]);
    }
  }
}

{% endhighlight %}

We can freeze the inputs as we take them in in our runner by modifying
the `add_input` function.

{% highlight javascript %}

   add_input: function(input) {
      freezer(input);
      inputs.push(input);
      this.cursor = inputs.length;
      this.render(this.get_state());
    }

{% endhighlight %}

Well now we have prevented ourselves from mutating the inputs. But
unfortunately our program no longer works. The erroneous line above is
still giving us problems.

{% highlight javascript %}

  state.todos.push(_(data).extend({id: id + 1}));

{% endhighlight %}

This line results in pushing a frozen object onto the list of todos.
That means I just pushed an todo without an `id` on the list. And that
later when we try to complete the todo as we are below nothing will
happen.

{% highlight javascript %}

      var todo.completed = true;

{% endhighlight %}

While this is my fault I really don't want constantly say "WTF? Why
isn't it changing? Oh yeah it's frozen." So while freeze prevents the
bug of mutating input data it introduces a programming evironment
where things don't behave as expected. So I am going to come back to
defensive cloning. I am going to clone each input before it's used.

{% highlight javascript %}

    process: function(init, inputs) {
      var cur_state = init;
      for (var i=0; i < inputs.length; i++) {
         cur_state = this.transform(cur_state, clone(inputs[i]));   
      }    
      return cur_state;
    }

{% endhighlight %}

Here I modify the `System.process` function to clone each input before
it's used. So I'm going to call this my next nudge. Using clone to
again protect ourselves and make the system workable is inefficient at
best.

It did solve the problem though and keep in mind now that I am going
to have to come back and look at this.

The good news is that I now have a working system. It does what I have
asked for. But did you notice that every time an input comes in we
call process which recalculates the current state from the initial
state. We are recalculating the state for input1, input2, input3 etc.
for every input. This is silly because according to the requirements
of the system the following is always true:

{% highlight javascript %}

System.process(initialState, [input1]) == System.process(initialState, [input1])

{% endhighlight %}

This means we are needlessly recalculating the same states over and
over again. So I am going to change the system runner to remember the
intermediate states.

{% highlight javascript %}

function systemRunner(system, initialState, element_id) {
  var input_states = [];
  var cursor = inputs.length;
  
  return {
    add_input: function(input) {
      this.cursor = inputs.length;

      var last_state = inputs.last.state;                  
      var next_state = system.process(last_state, inputs_to_render);
      input_states.push({input: input, state: next_state});

      this.render(next_state);
    },
    
    get_state: function(cursor) {
      this.input_states[cursor].state;
    },
    
    move_back: function() {
      var pos = this.cursor - 1;
      this.cursor = pos < 0 ? 0 : pos;
      this.render(this.get_state(this.cursor));
    },
    
    move_forward: function() {
      var pos = this.cursor + 1;
      this.cursor = pos > input_states.length ? input_states.length : pos;
      this.render(this.get_state( this.cursor ));
    },
    
    render: function(state) {
      var target = document.getElementById(element_id);
      var todos_render = "<h2>Todos count: " + state.todos.length + "</h2>";
      var controls = '<div><a class="backwards" href="#"><- back</a> | ' + 
                          '<span>' + this.cursor + '</span>' + ' | ' +
                          '<a class="forwards" href="#">forward -></a></div>';
      target.innerHTML = todos_render + controls;
    }
  };
}

{% endhighlight %}

This works I am now saving each state with along with its input this
means for every incoming input we don't have to recalculate the all
the states that led up to this one again. This is great and leverages
the power of having a repeatable system but ...

I just realized that I have been calling clone for each and every
input. Every call to clone duplicates all the state in the system and
now that I am saving each and every state along the way I am creating
an awesome memory leak. For a todo application this isn't going to
hurt at all but I am not wanting my system to stay a toy system I want
it to be able to do real work. 

So I have been nudged over the edge. The cloning has to come to an end. 

So it is a good time to ask why this has come up. Is it that the
requirements of the system are asking too much? Or is it that the
dominant manner of manipulating data in javascript is failing us? 

Yes that was rhetorical. The dominant pattern of changing data in
place or "mutating data" is enimical to saving states and operating on
them.

We need something else here. Well it just so happens that there are
data structures that will simplify this whole thing and save cycles
and memory use. These data structures all called persistent data
structures and there main quality is that they are immutable. Once you
create a persistent data structure you can't change it. You can only
create a new one from it.

Luckily there is a Javascript library that gives us a range of great
persistent data structures. It's called __mori.js__.  

{% highlight javascript %}



{% endhighlight %}


















It's important to note that the system lends itself to the pattern
where each input message is handled by a function that operates on the
incoming data and returns a the result of the operation.

There is a glaring problem with this implementation though. It changes
the initialState object. This makes it really hard to have different
representations of the state of the system if the System mutates the
state as it operates on it.

Well we should fix that. Well not so fast. This is hard in Javascript.

Cloning the state object is a solution. Cloning is interesting in Javascript.

http://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript

But let's say we exercise discipline and we have a clone function that
works on basic JSONy things.

We can change the transform function above like so:

 transform: function (state, input) {
      return System[input[0]](clone(state), input[1]);
 }

This brings to what I was looking for the states of the system are
isolated between each input invocation.  That wasn't so hard eh?

This is what prevents us from building a system like this. That
cloning is no fun. If you have a significant amount of data in you
system it can theoretically be an expensive operation to recur through
all of the data in your system and copy it. It can also put a
significant pressure on the garbage collector.

Blatantly wasting cycles and memory is not good if you have a large
browser based application. Let's say that this is a show stopper I
can't have my idea system if it requires cloning.

There is another option. What if we could have a reference to every
state in the processing of a system where the different states share
underlying unchanged data?









# Essentially a series of inputs

At its core an application is a series of inputs. Or rather, the
essential data of an application is a series of inputs. The only data
you need to produce the current incarnation of your application is the
list of inputs that has occured from the beginning of the application's
use.

The application state all the way upto the view is a _derivative_ of
this original list of intputs.

So here is the good news again. Where F is a pure function:

HTML_DOM_View_State = F( list_of_inputs )

That is our ideal. For a given list of inputs there is a precise DOM
View for our application. This is simplicity.

I am going to postulate based on my own incredibly sound reasoning
that as we diverge from the purity ideal we are introducing extra
"accidental" complexity. As such we can use this ideal to reason about
the complexity being introduced by the various trae offs we are going
to inevitably going to have to make.

How can I make such a claim? Good question. I will refer you Ben
Moseley's paper. Basically, it's the minimum that's needed to create a
predictable functioning system. You don't need a set of in memory
objects that communicate with eachother. That is just done for the
convenient expressing and reasoning about the domain. But you do at
the very least need to store the list of inputs that led up to this
point in the applications life.

This simple function implies a great deal.

#### Time travel, testing and repeatability.

HTML_DOM_View_State = F( list_of_inputs )

Where the list_of_inputs = [ i0, i2, i3, i4, ... ]

ViewState0 = F( [i0] )
ViewState1 = F( [i0, i1] )
...
ViewState4 = F( [i0, i1, i2, i3, i4] )

Being a pure function, every time you pass a list of inputs to F you
will get the same result for the same set of inputs. This allows you
to walk back and forth through the history of inputs and inpsect the
results. This allow you to test crazy input sequences and see how F
responds.

#### Inputs need to capture all data in the system

This is sublter that you may think.

#### Support is needed.

Since the ideal expressed in the equation says nothing about storing
the inputs and applying the function. We encounter our first piece of
accidental complexity.

In order to have a functioning system we that responds and reacts to
input over time we will have to create a sytem to do this. At a very
minimum we need to respond to input, add it to the list of inputs and
apply the F function to the list and and render the result to the DOM.

#### Immutable data is a requirement

In a real system we are going to be storing a list of inputs. Because
of this it is very important that the list or the inputs themselves
are not changed in anyway by the application of F or the rendering of
the templates. Other wise our successive ViewStates can be corrupted by the
rendering of the previous views.

So we must require that the list of inputs and the inputs themselves
be immmutable.

#### F can be composed of other functions

It important to remember that F can be composed of other functions as
long as they are pure as well.

F(list_of_inputs) = 
  RenderTemplates( 
    InjectStaticData(  
      ExtractPresentationInformation(
        DeriveApplicationState( list_of_inputs ))))


## Aside: link "yeah right ... buddy" If you are a web programmer you
may be thinking "yeah right". You may be quick to point out the many
situations where this doesn't seem to apply. All I can say for now is
bear with me. I'm a web programmer as well, I get where you are coming
from. I am using the ideal as a tool to feret out where we are
uneccessarily creating additional complexity for ourselves.


## Quiz

### Is this function an example of the ideal?

function(list_of_inputs) { return "<div>Hello World!</div>" };

Yes. 

Explaination. Yes it is strange to be ignoring the list of inputs but
this function is pure and will return the same result for a given set
of inputs.

### Is this function an example of the ideal?

function(list_of_inputs) { return "<div>Count: " + 
                                  list_of_inputs.length +
                                  "</div>" };

Yesish? 

Explanation. This is an example of the ideal as long as the list of
inputs is immutable. We are more than likely being given a Javascript
array and if that array is frozen we are in business otherwise we are
in crazyland.

Because we don't know what we are getting we can rewrite this defensively as 

function(list_of_inputs) { 
  Object.freeze(list_of_inputs);

  return "<div>Count: " + 
         list_of_inputs.length +
         "</div>" };


### Is this function an example of the ideal?

function(list_of_inputs) { return "<div>Date: " + 
                                  new Date().toLocaleString()
                                  + "</div>" };

Nooooo!

Explanation. The output of this function returns something new each
time it is called and its output is changing independently of the
input.

We need to rewrite this making the date into an input.

function(list_of_inputs) { 
  Object.freeze(list_of_inputs);
  list_of_inputs.map(Object.freeze);

  return "<div>Count: " + 
         list_of_inputs.last.toLocaleString() +
         "</div>" };  




Fuller example of our ideal:

function F(list_of_inputs) {
  return '<div>' + 
  '<div>Likes ' + list_of_inputs.length +
  '<div><a href="#" onclick="sys.add_input(1); return false;">Like</a></div>' +
  '</div>';
}

function System(f, target_elem_id) {
  var inputs = [];

  return {
           add_input: function(input) {
             if(input instanceof Object) Object.freeze(input);
             var new_inputs = inputs.slice(0);
             new_inputs.push(input);
             inputs = Object.freeze(new_inputs); 
             this.render(inputs);
           },
    
           render: function(list_of_inputs) {
             var element = document.getElementById(target_elem_id);
             if(element) element.innerHTML = f(list_of_inputs);
           }
       };
}

var sys = System(F, "main-app");

sys.render([]);


So the system takes care of the side effects of 



Some things to note about the ideal. All the state is collected under
one data structure. It passes through one function.





Application State: Everybody is doing it.

While the ideal is the list of inputs we spend most of our time
operating on a cached rolled of view of that list of inputs. We will
call this the Application State or App State. 

Applcation State is analogous your Ember or Backbone models or even
the server database. Application state is where entities come into
being. Users, Todos, Todo Lists, etc...

It very important to remember though that Application state is a cache.
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

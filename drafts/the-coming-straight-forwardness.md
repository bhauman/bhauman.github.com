---
layout: default
title: "The Coming Straightforwardness"
published: true
category: 
tags: []
---

## The Coming Straightforwardness

My friend Peter, the inventor of the Yome and proprieter of [Red Sky
Shelters](http://redskyshelters.com/) asked me to update a widget that
I built for him 9 years ago. He is moving his website to Wordpress and
the current widget is aestheticly dated and not portable. The widget
itself allows a client to show where windows and doors should be
placed on the walls of their Yome (a yurtlike structure).

the finished widget here

This seems like a perfect opportunity to share how I built the widget
and my thoughts about the possibility of extremely straightforward
front end code.

> Straightforward: not complicated and easy to understand 

It's very important to note that **straightforwardness has nothing to
do with familiarity**. Just because a technique, language or syntax is
familiar or even an accepted industry best practice does not mean that
it is straightforward. And likewise, straightforward code does not
have to be familiar to be straightforward. Just because someone
doesn't understand it or finds it strange doesn't mean the code isn't
straightforward.

The key feature of straightforward code is absolute absence of
complexity. Not runtime complexity, but the type of complexity that
causes very subtle failures in your code. A very basic measure of
complexity is side effects. The more objects you have with changing
local state, the more complexity you have. My main tool for fighting
complexity is the simple pure function. The advent of Reactjs allows
us now to write dynamic view code as pure functions.

Now pure functions can only take us so far in an interactive program.
But I am going to use them as far as I can and when I have to
compromise and write a function with side effects I will. But I will
minimize side effects as much as possible and then hopefully the only
side effects I have left will represent the **essential complexity**
of the program.

This is going to be an interactive demonstration and I really hope you
follow along. This way of coding needs to be experienced to really
appreciate what I'm getting at.

### The setup

For this demo I'm going to use JavaScript and React.js.

I'm going to use Babeljs to watch and compile my JavaScript/JSX.


    npm install --global babel

Create files and directories:

    mkdir -p yome_widget/src
    mkdir -p yome_widget/build
    touch yome_widget/src/yome.js
    touch yome_widget/index.html
    touch yome_widget/style.css


Edit `style.css` to look like:

{% highlight css %}
body {
    background-color: rgb(24,26,38);
    color: white;
}

svg line,
svg polygon {
   stroke: #2997ab;
   stroke-width: 2;   
}

svg polygon {
    fill: transparent;
}
{% endhighlight %}

Edit `index.html` to have these contents:

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js"></script>
    <link href="style.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <div id="app"></div>
    <script src="build/yome.js"></script>
  </body>
</html>
{% endhighlight %}

Now we will need the Babeljs compiler to watch our yome.js file and
compile it when ever we hit save. We can do by invoking `babel` like so:

    cd yome_widget
    babel src/ -w --out-dir build/

Alright now open your browser to `file:///<the path on your
system>/yome_widget/index.html` and open `yome_widget/src/yome.js` in
your favorite text editor.

From now on you can add the JavaScript code into the file by appending
each function definition in this post to the `yome.js` file.

### The future is live

I have become very accustomed to live code reloading. When I wrote
this code I made a simple file reloader so that I could see my changes
in real time without reloading the file for every change.

One of the benefits of using pure function defenitions and
constraining side effects is that it makes it very easy to write code
that can just be simply reloaded.

Go ahead and put this at the top of the `yome.js` file.

{% highlight javascript %}
var Reloader = Reloader || {};

Reloader.reload_file = function (path) {
  var x = document.createElement("script");
  x.setAttribute("src",path + "?rel=" + (new Date().getTime()));
  document.body.appendChild(x);
  setTimeout(function(){ document.body.removeChild(x);}, 1000);
}

Reloader.start_reloading = function (files) {
  setTimeout(function() {
    console.log("--- reloading ---");
    files.map(Reloader.reload_file);
  }, 1000);
}

Reloader.start_reloading(["build/yome.js"])
{% endhighlight %}

And now reload the `index.html` page and open the Developers Console
of your browser. You should see `--- reloading ---` get printed out
every 3 seconds.

Now the interesting thing here is that this code is being reloaded so
you can change it and see the behavior change.

Go ahead and modify the `Reloader.start_reloading` function and change
the timeout from `1000` to `5000`. Or change the `"--- reloading ---"`
string to `"--- reloading files ---"`. You will see a likewise change of
behavior in the console. You can adjust the timing to your preference.

Welcome to instantaneous live reloading, it's the future.

### The Start

Go ahead and append these definitions to the `yome.js` file:

{% highlight javascript %}
function l(x) { console.log(x);  return x; }

var Yome = Yome || {};

Yome.initialState = { sides: [1,2,3,4,5,6,7,8].map(() => {}) }

Yome.state = Yome.state || Yome.initialState;

{% endhighlight %}

I always create a logging shortcut so that I can verify code is
behaving as I expect.

In the code above you can see that I define a Yome object literal and
on that literal I add an `initialState` object. I put this at the top
so that I can refer back to it to remind me of the shape of the data.

In this yome widget there will be one state map/object this will be
the central source of truth. The view of the state widget will
be a function of this data.

Yomes come in 3 sizes 6, 7 or 8 sides. Thus the view from above is
either a hexagon, septagon or octagon. As you can see from the
`initialState` above we are going to be starting with an octagon.

{% highlight javascript %}
Yome.sideCount = (st) => st.sides.length
//l(Yome.sideCount(Yome.state))
{% endhighlight %}

The widget allows you to change sizes so we will need to assess the
current size often. `Yome.sideCount` will allow us to do this. Notice
that `Yome.sideCount` is not referencing some local state but the
state is passed into to it. 

Now you can check the functioning of sidecount by uncommenting the log
line below it. And then rseeing the output of the function call in the
Dev Console. This output should be `8`. After verifying that it works
comment out that log line again.

{% highlight javascript %}
Yome.sliceTheta = (st) => 2 * Math.PI / Yome.sideCount(st)
//l(Yome.sliceTheta(Yome.state))
{% endhighlight %}

Since we are working with circular polygons I am going to constantly
be referencing the angle of one of the slices. The `sliceTheta`
function give us this angle in radians.

Again, you can see you its working by uncommenting the log line below
it and seeing the output in the Dev Console. I will continue to place
these log comments in the code and I will leave it up to you to try
code out if you would like.

{% highlight javascript %}
Yome.rotate = (theta, point) => {
  const sint = Math.sin(theta), cost = Math.cos(theta);
  return { x: (point.x * cost) - (point.y * sint),
           y: (point.x * sint) + (point.y * cost) };
}
//l(Yome.rotate(Math.PI, {x: 0, y: 1}));

Yome.radialPoint = (radius, theta) =>
  Yome.rotate(theta, {x: 0, y: radius})
//l(Yome.radialPoint(100, Math.PI));
{% endhighlight %}

Now I am planning on having a 500x500 svg based widget and I'm going
to be drawing octagons and such on it. It will be much simpler to
think in terms of radail points. In this case a radial point is a
distance from the center and angle from a line going straight down.

In order to facilitate radial points its necesary to `Yome.rotate` a
point about the center 0,0.

{% highlight javascript %}
Yome.sidePoints = (st) =>
  st.sides.map((_,i) => Yome.radialPoint(180, i * Yome.sliceTheta(st)))
//l(Yome.sidePoints(Yome.initialState))  
{% endhighlight %}

With this new found ability to create points about a center at any
given angle it becomes trivial to generate a set of points for current
state.

{% highlight javascript %}
Yome.pointsToPointsString = (points) =>
  points.map(p => p.x + "," + p.y).join(" ")
//l(Yome.pointsToPointsString(Yome.sidePoints(Yome.initialState)))

Yome.polygon = (points) =>
  <polygon points={ Yome.pointsToPointsString(points) }></polygon>
{% endhighlight %}

Here we start generating some svg with JSX. The `Yome.polygon` method
will take a set of point JavaScript objects and emit an Reactjs
polygon element.

### The Rendering

Now that we have a way to draw our polygons lets take a look at them.

Go ahead and place this code at the bottom of the file and keep it
there we will be modifying it and updating it as our widget
progresses.










### Context



---
layout: default
title: "An Immutable Data Service"
published: false
category: 
tags: []
---

## An Immutable Data Service

<script src="http://scratch.leaves.io/js/vendor/underscore-min.js">
</script>
<script src="http://scratch.leaves.io/js/json_renderer.js">
</script>
<link rel="stylesheet" href="http://scratch.leaves.io/css/json_renderer.css" />

Web based data services provide a means of storing and reading data
over HTTP. The core value of these services is that they make data
operations both accessible and available to clients such as web and
phone applications. These services can exist as application specific
RESTful resources or general data storage services. [Parse.com](http://parse.com) and
[Firebase.io](http://firebase.io) are both examples of a web based
data services intended for general application data storage.

The default operational paradigm of these services is one that implies
**mutation**. If we store data in a service it is assumed that we can
update it in place. A web resource with a given URI can be changed and
future references to that URI will yield the new mutated value. Watch
this [this video](http://www.infoq.com/presentations/Value-Values) for
a explanation of why this may not be such a great way to do things.

Let's consider a web based data service which is **immutable**.  This
service would allow you to _store_ data and _read_ data but does not
let you _update_ data once it is stored.

In this post I explore an example of an immutable service for JSON
documents. This example is not advocating an API. It's simply a
scaffold for looking at couple of the interesting properties of
immutable data services.

## Creating and reading

The example service allows you to post JSON data to an endpoint. The response will
include an identifier which refers to the newly stored document. The service
guarantees that the document referred to by this identifier will not change.

<style>
  .http_request { 
    font-family: sans-serif;
    margin-bottom: 2em;
  }
  .request-body {
    margin: 0.2em; 
  }
  .example {
    color: #aaa;
    font-size: 11px;
  }
  .head {
    color: #999;
    width: 6em;
    display: inline-block;
  }
  .highlight_path {
    color: rgb(196,33,0);
  }
  .highlight_id {
    color: #468847;
  }
  code {
    font-size: inherit;
  }
</style>


<div id="exampler-1" class="http_request">
    <div class="example">example</div>
    <div class="alert alert-info">
      <div class="request">
        <span class="head">Request</span>
        <span class="type">POST</span>
        <span class="url">/json-doc</span> 
      </div>
      <div class="body">
        <span class="head">Body</span>
        <code>{ "first_name": "James" }</code>
      </div>
    </div>
    <div class="alert alert-success">
      <div class="response-body">
        <span class="head">Response:</span>
        <div class="code render-my-json">
          { "id": 10001 }
        </div>
      </div>    
    </div>
</div>

The response includes an <code>id</code> which we can use in a GET
request to obtain the data that we stored there.

<div id="exampler-2" class="http_request">
    <div class="example">example</div>
    <div class="alert alert-info">
      <div class="request">
        <span class="head">Request</span>
        <span class="type">GET</span>
        <span class="url">/json-doc/<span class="highlight_path">10001</span></span> 
      </div>
    </div>
    <div class="alert alert-success">
      <div class="response-body">
        <span class="head">Response:</span>
        <div class="code render-my-json">
          { "first_name": "James" }
        </div>
      </div>    
    </div>
</div>

This url is unique and will will always refer to this particular data.
There is no operation in the API of this service that will allow you
to alter this data. This stored item can now be cached forever as the
data at the this url will never change.

This is an immutable data service in it's most basic form. I believe
this simple form has value on it's own. 

A key advantage of an immutable data service is that **authority is
not a necessity** for this service to operate. Clients do not have to
log in.  You simply can not overwrite a document that soemone else is
relying on. Authority may be needed for the tangential concerns of
running such a service, but it is simply not necessary for it's
function.

This is a big deal. Clients can store data without an authorization
step.  They can refer to it with the absolute guarantee that it
hasn't changed and that no other client has the authority to change
it.

This hints at the possibility of an open service or federation of
services that can facilitate effortless storage and exchange of
information.

## What about change?

In our experience of the world things change over time. When you get
a coffee a at a cafe you have an experience of the flow of events
that bring that coffee to you. Our minds have the ability to hold onto
this series of changes and turn it into something meaningful for us.
We are built to make decisions based on how things change over time.

When our programs operate on variables and other transient data they
are operating in the moment on transient data.  They normally don't
have the ability to have a latent trace of how things have changed
over time.  Our programs only know that <code>x == 5</code> right
now. The history of how x got there is gone. So our programs have a
very flat view of most of the objects in their world. It's like having
an intense version of amnesia where all you know is the current state
of the world and you don't know what has come before.  Is this coffee
in from of me mine? Did I order it? Did I walk here?

Things change and it can add a new dimension to our data if we
record how our data changes over time.

The only way to change immutable data is to record new data. If the
new data is based on another piece of data we can record that
relationship as well.

## Implementing change on top of immutability

Change _can_ be implemented by making clients of this service
responsible for changing the data and then creating a new JSON
document on the service with the modified data. This manual approach
is possible but change is such an essential feature of data use it
should also be a feature of the service. 

We need an operational interface that will allow us to specify changes
to a stored document and return to us a pointer to the new modified
one.

<style>
  .node_tree .node .node-url {
    display: inline-block;
    font-size: 0.7em;
    width: 125px;
    height: 125px;
    padding: 0px;
    border-radius: 15px;
    line-height: 125px;
    text-align: center;
   }
   .node_tree .node-data {
     font-size: 0.8em;
     display: inline-block;
     vertical-align: middle;
     padding-left: 39px;
   }

   .node {
     transistion: all 0.5s;
   }
   .node.focus {
     background-color: #fafafa;
     
   }
</style>

<script>
  var node_template = function (item) { 
     return "<div id='" + item._id + "' class='node' style='" + item._style + "'><span class='node-url alert alert-warning'>" + item._id + 
             "</span><span class='node-data'>" + JSONRenderer.render_json(item.data) + '</span></div>';
  };

  var display_nodes = function(last_child_id, element, count) {
    var count = count || 0;
    if(last_child_id) {
      $.ajax(service_root + '/json-doc/' + last_child_id, {type: 'GET'}).done(function(res) {
        var scale = 1 - (count * 0.05);
        var opacity = 1 - (count * 0.1);
        res["_style"] = "-webkit-transform: scale("+scale + ","+scale +"); opacity: "+ opacity +";";
        $(element).append(node_template(res));
        display_nodes(res["parent-id"], element, count + 1); 
      });
    }
  }

  $('.post').on('mouseover', '.atom_value', {}, function(e) {
    $("#" + $(e.target).text()).addClass("focus");                             
   });

  $('.post').on('mouseout', '.atom_value', {}, function(e) {
    $("#" + $(e.target).text()).removeClass("focus");                             
   });

</script>

Let's introduce a <code>set</code> operation that will allow us to set
the value of a key in the stored JSON document. The following example
adds a new list to our document.

<div id="exampler-3" class="http_request">
    <div class="example">example</div>
    <div class="alert alert-info">
      <div class="request">
        <span class="head">Request</span>
        <span class="type">POST</span>
        <span class="url">/json-doc/<span class="highlight_id">10001</span>/<span class="highlight_path">license_to_kill</span>
        </span> 
      </div>
      <div class="body">
        <span class="head">Body</span>
        <code>true</code>
      </div>
    </div>
    <div class="alert alert-success">
      <div class="response-body">
        <span class="head">Response:</span>
        <div class="code render-my-json">
          { "id": 10002, "parent_id": 10001 }
        </div>
      </div>    
    </div>
</div>

Here we have executed an **operation** on the original document we
created in the first [example](#example-1). Our return value consists
of two things. An <code>id</code> which identifies the new document.
There is also a <code>parent-id</code> which points to the parent document that
this new document was created from.

We now have an operation that "changes" the document and returns a
pointer to the new one. This operation also keeps track of the meta
information about who was the parent of this new document.

Let's look at the state of things after this operation.

<div id="example-6" class="node_tree">
  <div class="node">
    <span class="node-url alert alert-warning">GET /json-doc/10002</span>
    <span class="node-data render-my-json">{ "first_name" : "James", "license_to_kill": true }</span>
  </div>
  <div class="node">
    <span class="node-url alert alert-warning">GET /json-doc/10001</span>
    <span class="node-data render-my-json">{ "first_name" : "James" }</span>
  </div>
</div>

We now have a versioning system. It's important to note how easily
available the previous versions of the document are. We can now chain
through the history of the JSON document from it's inception.

It is important to note here that this provides an important contract
to the consumer of this API.  This provides an **operational guarantee**
that the operation was performed and which document it was performed
against. In other words, we have a reference to a specific document and
when we make a specific operation against that particular document we
know with great confidence the value of the resulting document. Hence, we don't
have to constantly fetch the value of the document we are working
with. The client library can easily perform the operation locally and
as long as the operation is successful we now know the absolute value
of the new stored document without fetching it's value.

In other words, it is possible to know the absolute value of the
current state of the document.

This is simply not possible with a mutable data service.

## Sharing

The same characteristics that make authority unnecessary for this
service makes sharing easy. Simply pass off a url to the party you
want to share the data with.  But you aren't just passing off a url to
inoperable data. The person you shared the data with has the same
operational interface that the originator of the document has. Thus
data is sharable and operable by default.

If you have a list of recipes is a recipe service and it's stored in
an immutable data service. You can share it as easily as emailing a
URL to friend.  Upon receipt they can edit and change the document with
no ramifications for you.

## Merging

There is no reason that such a service can not implement a merge
operation given to urls with a common ancestor.

## The official version

Authority is needed to know which version of a document is
important to a certain client but this is a simple matter as we fall
back to the dominant paradigm of data storage and store this pointer
in an authorized place.

## Conclusion

I have explored a basic immutable data service. 

By layering immutability on top of the availability of a web service
it seems that we have created something different and interesting.

The primary advantages are:

* Versioning of data.
* Authority is not a requirement for service function.
* Operational guarantees.
* Sharable and operable by default.

I have tried to focus on what the service is and it's intrinsic
advantages.  I have stayed away from implementation details as I feel
these problems are solved or solvable.  What's more interesting to me
is what this implies for openly sharing data and application
development. 

* What would a federation of open immutable data services
  enable for users and developers?
* Would we be able to create applications that robustly recover from
  errors and that can be scrolled back in time to see the absolute
  state of the application at the time of the error?
* Would "taking your data with you" finally be a simple reality?
* Could we stop the creation of yet another API to get at data that
  should just simply be available?

With the rise in the consumption of these services I think
immutability is important characteristic to consider.

Note: It is also important to consider that immutability and
durability are not the same thing. I have conflated them in this post.
The reason I have done this is that immutability in a memory based
programming environment like Clojure benefits from garbage collection
when there are no more pointers to an immutable object. In the web at
large it is very hard to tell who is still relying on the data at a
URI.

<div>
  <h4>Stuck on how wasteful this sounds? <a class="click_here" href="javascript:;">click here.</a></h4>
  <script>$('.click_here').click(function() { $('.wasteful').toggle(); });</script>
</div>

<div class="wasteful" style="display:none;">

<h2>Postscript: What about storage?</h2>

<p>
The first and primary objection to this type of service is the idea
that it's wasteful. That the servers will fill up with rotting bits in
a smouldering heap. We have to keep in mind that this is precisely
what Github does.  It stores every useless bit and poor coding choice
perpetually and makes it all available for us to peruse at any
moment.
</p>

<p>
We seem to take offense at storing apparently meaningless
data. However, as programmers we are very familiar with the desire to
look back in time and see the state of this one peice of transient
data as it reeked havoc on our systems.  The data that was of little
importance becomes momentarily very very important. We go to great
length to reproduce a crime scene.  But the reproduction has little
value compared to the actual state of system at that time.
</p>

<p>
So let us not judge the value of saving data permanently. Data and how
it changes over time tells a story. A single frame that represents the
latest state of a thing is an empty pretentender in comparison.
</p>

<p>
Data that was once meaningful may find meaning again.  And it's always
at the moment you need it that you wish you had it.
</p>

<p>
For the purpose of this exploration let's drop concerns of storage
limits and try to consider the potential value and power of a having
record.
</p>

</div>

<script>
  _($('.render-my-json')).each(function(el) {
   $(el).html(JSONRenderer.render_json(JSON.parse($(el).text())));
  });
</script>

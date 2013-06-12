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
over HTTP. The main advantage offered by these services is that they
make data operations both accessible and available to clients such as
web and phone apps. These services have many forms but developers
often roll their own for their particular use case. More general forms
of these services are available. Both Parse.com and Firebase.io are
examples of a web based data service.

The default operational paradigm of these services is the CRUD
paradigm (Create, Read, Update, Delete). If we store data in a service
it is assumed that we can update it in place. Watch this 
[this video](http://www.infoq.com/presentations/Value-Values) for a
explanation of why this may not be such a great way to do things.

Let's consider a web based data service which is **immutable**.  This
service would allow you to _store_ data and _read_ data but does not
let you _update_ data once it is stored. We would truncate CRUD to CR.

In this post I explore an example of an immutable service for JSON
documents. This example is not an advocacy for a certain API it's
simply a scaffold for explaining the concept.

## Creating and reading

The example service allows you to post data to an endpoint. The response will
include an identifier which refers to the stored data. The service
guarantees that the data referred to by this identifier will not change.

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
</style>

<div id="example-1" class="http_request">
    <div class="example">example</div>
    <div class="alert alert-info">
      <div class="request">
        <span class="head">Request</span>
        <span class="type">POST</span>
        <span class="url">/web-map</span> 
      </div>
      <div class="body">
        <span class="head">Body</span>
        <code>{ "todo_list": [] }</code>
      </div>
    </div>
    <div class="alert alert-success">
      <div class="response-body">
        <span class="head">Response:</span>
        <div class="code">{ todo_list: [] }</div>
      </div>    
    </div>
</div> 

<script>
    var service_root = "http://scratch.leaves.io";
    var run_request = function(ex, excludes, path) {
       var request = $.ajax(service_root + $('.request .url', ex).text(), 
                  { type: $('.request .type', ex).text(), 
                    contentType: "text/plain",       
                    data: $('.body code', ex).text()});
       request.done(function(res) {
           _(excludes).each(function(exclude) { delete res[exclude] });
           if(path) { res = res[path]; }
           $('.response-body .code', ex).html(
              JSONRenderer.render_json(res)
            );
       });
       return request;
    };
    var example_1 = $.Deferred();
    run_request($('#example-1'), 
                ["data", "action","parent-id"]).done(function(res) {
      example_1.resolve(res);
    });
    
</script>

The response includes an <code>_id</code> and now we can use this id in
a GET request to obtain the data that we stored there.

<div id="example-2" class="http_request">
    <div class="example">example</div>
    <div class="alert alert-info">
      <div class="request">
        <span class="head">Request</span>
        <span class="type">GET</span>
        <span class="url"></span> 
      </div>
    </div>
    <div class="alert alert-success">
      <div class="response-body">
        <span class="head">Response:</span>
        <div class="code">{}</div>
      </div>    
    </div>
</div>

<script>
  var example_2 = $.Deferred();
  example_1.done(function(res) {
    
    $("#example-2 .url").html( "/web-map/<span class='highlight_path'>" + res._id + "</span>");
    run_request($('#example-2'), [], "data").done(function(res) {
      example_2.resolve(res);
    });
  
  });
</script>

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

So when thinking about change and immutable data we have two
requirements so far.  We need to store new data and a pointer to the
previous version of this data. In order to add an item to our todo
list we will create a new todo list based on the old list and record
the id of the old list as well.

<div id="example-3" class="http_request">
    <div class="example">example</div>
    <div class="alert alert-info">
      <div class="request">
        <span class="head">Request</span>
        <span class="type">POST</span>
        <span class="url">/web-map/</span> 
      </div>
      <div class="body">
        <span class="head">Body</span>
        <code>
        </code>
      </div>
    </div>
    <div class="alert alert-success">
      <div class="response-body">
        <span class="head">Response:</span>
        <div class="code">{}</div>
      </div>    
    </div>
</div> 

<script>
  var example_3 = $.Deferred();
  example_2.done(function(res) {
    $("#example-3 .url").html( "/web-map/<span class='highlight_path'>" + res._id + "</span>");
    $("#example-3 .body code").html( '{ "parent-id": "' + res._id + '",  "todo_list": ["buy bacon"] }');
    run_request($('#example-3'), ["data", "parent-id", "action"]).done(function(res) { 
       example_3.resolve(res);
    });
  });


</script>

If we perform a get on this new id, the data in the new list will be
returned. As always the old list will be unmodified.

<style>
  .node_tree .node .node-url {
    display: inline-block;
    font-size: 0.3em;
    width: 125px;
    height: 125px;
    padding: 0px;
    border-radius: 60px;
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

<div id="example-4" class="node_tree">

</div>

<script>
  var node_template = function (item) { 
     return "<div id='" + item._id + "' class='node' style='" + item._style + "'><span class='node-url alert alert-warning'>" + item._id + 
             "</span><span class='node-data'>" + JSONRenderer.render_json(item.data) + '</span></div>';
  };

  var display_nodes = function(last_child_id, element, count) {
    var count = count || 0;
    if(last_child_id) {
      $.ajax(service_root + '/web-map/' + last_child_id, {type: 'GET'}).done(function(res) {
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

   example_3.done(function(res) {
     display_nodes(res._id, $('#example-4'));    
   });  

</script>

We now have a versioning system. It's important to note how easy and
available the previous versions of the document are. We can now chain
through the history of the JSON document from it's inception.

Making change the responsibility of the client is possible and would
work for many tasks. However, change is such an essential feature of
data use it should also be a feature of the service. We need an
operational interface that will allow us to specify changes to a
stored document and return to us a pointer to the new modified one.

Let's introduce a <code>set</code> operation that will allow us to set
the value of a key in the stored JSON document.

The following example adds a new list empty list of important things
to do to our document.

<div id="example-5" class="http_request">
    <div class="example">example</div>
    <div class="alert alert-info">
      <div class="request">
        <span class="head">Request</span>
        <span class="type">POST</span>
        <span class="url">/web-map/</span> 
      </div>
      <div class="body">
        <span class="head">Body</span>
        <code>
        </code>
      </div>
    </div>
    <div class="alert alert-success">
      <div class="response-body">
        <span class="head">Response:</span>
        <div class="code">{}</div>
      </div>    
    </div>
</div> 

<script>
  var example_5 = $.Deferred();
  example_2.done(function(res) {
    $("#example-5 .url").html( "/web-map/<span class='highlight_id'>" + res._id + "</span>/<span class='highlight_path'>todo_important</span>");
    $("#example-5 .body code").html( '[]' );
    run_request($('#example-5'), ["data", "action"]).done(function(res) { 
       example_5.resolve(res);
    });        
  });
</script>

Here we have executed an **operation** on the original document
we created in the first [example](#example-1). Our return value
consists of two things. An <code>_id</code> which is an indicator
that we have created a new thing.  There is also a
<code>parent-id</code> which points to the item that this new thing
was created from. 

Let's look at results of this operation.  

<div id="example-6" class="node_tree">
</div>

<script>
  example_5.done(function(res) {
    display_nodes(res._id, $("#example-6"));
  });
</script>

So here we have an operation that "changes" the data and returns a
pointer to the new thing. This operation keeps track of the meta
information regarding who was the parent of this current operation
result.

It is important to note here that this provides an important contract
to the consumer of this API.  This provides an operational guarantee
of the operation was performed and what data it was performed
against. In other words, we have a reference to a specific datum and
when we make a specific operation against that particular datum we
know with great confidence the value of the new datum.  Thus we don't
have to constantly fetch the new value of the datum we are working
with. The client library can easily perform the operation locally and
as long as the operation is successful we now know the absolute value
of the new stored document without fetching it's value.

This is simply not possible with mutable data.

Below is an interactive example:

<form id="todo_playground">
  <select name="action">
    <option value="add:get_bacon">Add "get bacon" to the</option>
    <option value="add:get_milk">Add "get milk" to the</option>
    <option value="add:rent_movie">Add "rent movie" to the</option>
    <option value="delete:0">Remove first item from the</option>
  </select>

  <select name="list">
    <option value="todo_list">todo_list</option>
    <option value="todo_important">todo_important</option>
  </select>
  <div>
    <input class="btn" type="submit" value="Run">
    </input>
  </div>
</form>

<div id="example-7" class="http_request">
  <div class="example">example</div>
  <div class="alert alert-info">
    <div class="request">
      <span class="head">Request</span>
      <span class="type">
      </span>
      <span class='url'>
      </span> 
      </div>
      <div class="body">
        <span class="head">Body</span>
        <code>
        </code>
      </div>
    </div>
    <div class="alert alert-success">
      <div class="response-body">
        <span class="head">Response</span>
        <div class="code">
        </div>
      </div>    
    </div>
</div> 

<div id="example-8" class="node_tree">
  
</div>

<script>
  var action_http_verb = { add: "POST", delete: "DELETE" };
  var action_query_op = { add: "add" };
 
  var parse_action = function(id, action, list) {
     var res = {};
     var parts = action.split(":");
     var verb = action_http_verb[parts[0]];
     var op = action_query_op[parts[0]];
     var query = op ? "?op=" + op : "";
     var action_query = list;
     var body = "";
     if(parts[0] == "delete") {
        action_query = action_query + '/' + parts[1];
     } else if (op == "add") {
        action_query = list + '/-1'+ query;
        body = "\"" + parts[1].split("_").join(" ") + "\"";
     }
     
     var path = "/web-map/<span class='highlight_id'>" + id + "</span>/<span class='highlight_path'>" + action_query+ "</span>"; 
     return { path: path, verb: verb, body: body};
  };

  var playground_form = $('#todo_playground');
  var set_request_from_action = function(ex, action_obj) {
    $(".type", ex).html(action_obj.verb);
    $(".url", ex).html(action_obj.path);
    $(".body code", ex).html(action_obj.body);
  };

  example_5.done(function(res) {
    var current_id = [res._id];
    var promote_selected_action = function() {
      var action = $("select[name=action]", playground_form).val();
      var list = $("select[name=list]", playground_form).val();
      var action_obj = parse_action(current_id[0], action, list);
      set_request_from_action($("#example-7"), action_obj);
    }; 
    promote_selected_action();

    playground_form.on('submit', '', {}, function(e) {
      e.preventDefault();
      run_request($("#example-7"), ["data","action"]).done(function(res) {
        console.log("done", res);
        current_id[0] = res._id;
        $('#example-8').html("");
        display_nodes(res._id, $('#example-8'));
        $('input[type=submit]', playground_form).attr("disabled", true);
      });
    });

    playground_form.on('change', 'select', {}, function (e) {
      promote_selected_action();
      $('input[type=submit]', playground_form).attr("disabled", null);
     $("#example-7 .response-body .code").html("");
    });
  });

</script>

## Forking Amazing

Versioning is a great and it enables forking because you can go back
in time and "alter" and work on earlier version of the data simply
because it still exists. As a result a client can maintain many
simultaneous versions of the same document. This would be a tree of
data which simply begs for a merging operation.

## Sharing

The same characteristics that make authority unnecessary for this
service makes sharing easy. Simply pass off a url to the party you
want to share the data with.  But you aren't just passing off a url to
inoperable data. The person you shared the data with has the same
operational interface that the originator of the document has. Thus
data is sharable and operable by default. We have witnessed the power
of this before.  Think about Github and how it has enabled the
creation of great things.

## The official version

Authority is needed to know which version of a document is
important to a certain client but this is a simple matter as we fall
back to the dominant paradigm of data storage and store this pointer
in an authorized place. An immutable data service like this may reduce
our dependence on them tremendously.

## Conclusion

I have explored a basic immutable data service. 

By layering immutability on top of the availability of a web service
it seems that we have created something profoundly different and
interesting.  

The primary advantages are:

* Versioning of data.
* Authority is not a requirement for service function.
* Operational guarantees.
* Sharable and operable by default.


I have tried to focus on what the service is and it's intrinsic
advantages.  I have stayed away from implementation details as I feel
these problems are solved or solvable.  What's more interesting to me
is what this implies for app development and the general service
ecosystem.  Can this lead to the development of more reliable feature
rich programs and services?  

With the rise in the consumption of these services I think
immutability is important characteristic to consider.

Note: It is also important to consider that immutability and
durability are not the same thing. I have conflated them in this post.
The reason I have done this is that immutability in the environment of
a program benefits from garbage collection when there are no more
pointers to an immutable object. In the web at large it is very hard
to tell who is still relying on the data at a URI.

<div>
  <h4>Stuck on how wasteful this sounds? <a
  href="javascript:$('.wasteful').show()">click here.</a></h4>
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

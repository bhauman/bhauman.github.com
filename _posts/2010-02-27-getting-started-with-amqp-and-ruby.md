--- 
layout: post
title: Getting started with AMQP and Ruby
published: true
---
OK so I want to see the most simple basic example of using a message
queue from Ruby. Install the rabbitmq server and the amqp ruby bindings. 

      brew install rabbitmq 
      sudo gem install amqp 
      sudo gem install carrot 

(I use homebrew [http://github.com/mxcl/homebrew](http://github.com/mxcl/homebrew)
for package management on OSX.)

Now start the server

    rabbitmq-server 

Create a server.rb that handles the messages.

{% highlight ruby %}
require 'rubygems'
require 'amqp'
require 'mq'

AMQP.start(:host => 'localhost' ) do
  q = MQ.new.queue('tasks') 
  q.subscribe do |msg|
    puts msg
  end
end
{% endhighlight %}

This server is pretty basic it handles the messages and prints them out as it gets them. 
Now lets create a client.rb that sends messages to the queue. 

{% highlight ruby %}
require 'rubygems'
require 'carrot'

q = Carrot.queue('tasks')

10.times {|x| q.publish('Message number ' + x.to_s) }
{% endhighlight %}

Note that I used the 'carrot' library. Carrot makes it easy for me to publish to asynchronous queues from synchronous processes like Sinatra or Rails.

Now run the server in one terminal. 

    ruby server.rb 

And run the client in another window.

    ruby client.rb 

You should see this show up in the terminal where you ran server.rb :

    Message number 0 
    Message number 1 
    Message number 2 
    Message number 3 
    Message number 4 
    Message number 5 
    Message number 6 
    Message number 7 
    Message number 8 
    Message number 9 

There you have it. A very simple example. 

Now if you want to send structured data, you may want to try using the JSON library to serialize the data you want to send.

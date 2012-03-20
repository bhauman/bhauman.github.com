---
layout: post
title: Fast tests in Rails make programming fun again
published: true
---

Corey Haines said just start with one test file.  He was right, once
you take Rails out of the loop your tests will fly.  And your life
will change.

# the big numb numb

Most Rails projects get big over time and loading the complete
environment takes a significant amount of time.  If I want to run a single test in my current project I have to wait 15 - 20 seconds for
the test to start.

This didn't seem that bad.  I was used to it.  But now that I have
experienced fast tests, the truth is that
slow tests have been sucking the fun and energy out of my programming.

These long weighty test runs have been numbing me out. With each successive
slow test run, my attention to the problem fades. I
start to want to just finish this current feature and move on to the
next one so that at the very least I can feel like I got something
done.

This murders what I consider to be the best part of programming: creativity and problem solving.

Not good.

# the gift of time

So I made a separate spec directory and ported my first test suite
over. The whole process flew. My tests kept time with the pace of my
thought.  Tests ran instantaneously.  There was nothing to wait for.

With this new found time I started to do something.  REFACTOR!

With speedy tests I find myself continuously typing
and trying different solutions.  My mind is constantly occupied with
the code and the problem that I am working on.  The result is more
fun, more problem solving and more refactoring.

Happiness comes back.

# Call to action

If you are test driving a large Rails project this is something you
have to experience for yourself.  You just have to try one test.

Don't hesitate.  Don't try and do it perfectly. Don't engage in internal
debates about fast testing best practices.  Don't read 5 blog
articles on how to do it.  Don't consider how to integrate it with
your continuous testing environment. Don't figure out how to integrate
it with your IDE.

Just do this:

Create a <code>spec_no_rails</code> directory in the root of your
rails project.

Take your next Rails feature and write the tests for it in a
<code>my_feature_test_spec.rb</code> file that resides in that directory.  Do
not require your environment.  Only require the files you need to test
the feature.  Mock everything that has to do with Rails out.

Then run this in your root directory.

    rspec spec_no_rails

Don't try to be artful.  Don't try and be clever. This is about
experiencing how fast you can develop when you don't have to load
Rails for every tiny little test run.

Watch Corey Haines' talk about this [here.](http://www.youtube.com/watch?v=bNn6M2vqxHE)








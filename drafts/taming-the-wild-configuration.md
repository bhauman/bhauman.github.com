---
layout: default
title: "Configuration Feedback is Essential"
published: true
category: 
tags: []
---

## Good Configuration Feedback is Essential

> Configuration: where your dreams go to die.

As programmers we are currently called on to leverage a growing number
of tools and services that require configuration. The process of
configuration has come to be associated with a long painful slog of
trial and error.  This process of continually re-deploying, restarting
or re-running a service or tool to verify the correctness of a
mystical combination of keys and values is undeniably awful.

It is easy to see how this can be such a burden. We are using a large
number of tools, where each tool's configuration has its very own set
of files, keys, and values. Each tool is essentially defining its own
domain specific language to help us meet our needs. Unfortunately,
this requires us to master enough of **every** tool's particular
configuration vocabulary to meet those needs.

In addition to the combinatorial complexity of each tool having its
own configuration "language", these configuration dialects are often
half baked, irregular, and provide absolutely crappy feedback when
they are misconfigured.

Adding insult to injury, not only do we have to learn a tool's arcane
notion of how to configure something. The ad hoc language is often
backed up with non-existent or extremely sparse error messages.

If full blown computer languages are often considered to have bad
error feedback, then I think it is fair to say that, in comparison,
many of these ad hoc configuration "languages" have absolutely
horrendous, practically non-existent feedback. As a result, the
experience of configuring these tools feels somewhat antagonistic.

Again it is easy to see why this is the case. From the tool author's
point of view, the set of configuration options are not that great and
don't appear complex enough to merit the effort of
validation. Especially when that effort doesn't appear to improve the
"bottom line" functionality of the tool.

Unfortunately, a tool users perspective is the opposite. To the user,
configuration validation is an integral part of the tool's UX and
functionality. This is because the tool user is on the hook to
intimately understand the configuration of a this tool **in addition
to** a growing suite of other tools. For all intents and purposes it
is practically impossible for a developer to stay abreast of all
configuration options in today's climate of rapid tool creation,
improvement and change. Tool authors need to fully recognize this and
do something to help.

## Help a Programmer Out

I am arguing that as programmers and tool creators we should face the
problem of configuration head on, and create excellent configuration
feedback mechanisms for two reasons:

1. the shear number of these configuration dialects considered as a
whole represent a tremendous and growing burden for the everyday
programmer

2. the scope and size of the configuration language for these
individual tools is often small and thus the problem of creating
excellent feedback is very tractable, if we bring our attention to it

I really think that fixing configuration feedback is an overlooked
opportunity to leverage a small amount of tool development time to
vastly improve programmer experience and productivity.

> A modest investment in configuration error feedback on behalf of
> tool authors will undoubtedly save countless hours of drudgery for
> tool users.

## Simple vs. Excellent Configuration Feedback

Simple configuration feedback is analogous to schema validation or
type checking in a language. It provides information about unknown and
missing configuration keys and verifies the type of a configuration
value.

Simple configuration validation is way way better than no
configuration validation. If you are a tool author and you are not
providing a simple schema based configuration feedback, please, for
the love of some supreme being, implement it soon. It costs so little
to do so.

But again because many configuration languages have such a small scope
we can do better with even a modest amount of programming.

## Excellent configuration feedback

I'm about to give examples of configuration feedback from
[Figwheel](https://github.com/bhauman/lein-figwheel) a tool that I
wrote to hot swap ClojureScript code as it's being worked
on. Figwheel's configuration validation until very recently was on par
with other tools. It was abysmal and practically non-existent.

Recently, I took it upon myself to fix this situation and try to
provide exemplary feedback when a configuration error is detected.

So, what does excellent configuration feedback look like?

Well, the goal is to reduce the amount of work that needs to be done to
correct the error. I think the following examples help demonstrate
this.

It's one thing to let your user know that an important configuration
key is missing. It's even better to **show** where it is missing
from and offer **documentation** for the missing key.

<img alt="missing key image" src="/assets/images/figconf/missingkey.png" width="100%"/>

You can see this behavior again in the following example where the user
provided the wrong type for a configuration key:

<img alt="error with a bad type" src="/assets/images/figconf/badtype.png" width="100%"/>

I think the above examples demonstrate good solid configuration
feedback. These error messages are making a direct effort to lighten
the load for our beleaguered tool user.

The technical difficulty of implementing the error messages above
falls well within what is reasonably plausible for a great number of
tools.

However, we are programmers, it's an interesting challenge to try and take
it further.

What about misspellings?

<img alt="error with misspelling" src="/assets/images/figconf/mispelling.png" width="100%"/>

Now we are getting somewhere, the tool is going the extra mile to be
helpful to the user, effectively cutting down the cognitive load of
configuration, and sparing precious cycles for the next task.

We can take this even farther and detect structural displacement of
configuration:

<img alt="error with key displacement" src="/assets/images/figconf/mispacement.png" width="100%"/>

The above is much more challenging to implement but is much more
helpful than just stating that an unknown key has been found.

## A Better Configuration Correction Process

<img alt="error with key displacement" src="/assets/images/figconf/live-reload-option.png" width="100%"/>

There is another annoying aspect of correcting configuration errors
and that is the constant need to restart a process to see if our
configuration changes are correct.

In Figwheel, I'm experimenting with an **interactive configuration repair
process**.

When a configuration error is reported, Figwheel will watch the
configuration file for changes and then will reload, and re-validate
it. This allows the user to skip the time cost of restarting Figwheel
process over and over.

## Its not sexy, but give good configuration feedback a chance

It's not sexy, and people will not sing your praises for implementing
good configuration validation. But it's code that will help a lot
developers on a daily basis.

As programmers I think we become accustomed to the status quo and are
oblivioius to many unbearable situations that actually have
solutions. As a community, we can vastly improve configuration
feedback at relatively low cost and and I'm pretty sure that the
effort will pay off a thousand fold at least.

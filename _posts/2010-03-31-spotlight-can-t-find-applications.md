--- 
layout: post
title: Spotlight can't find Applications
published: false
---

So spotlight decided that it didn't know where any of my Applications
were. This really puts a damper in my work flow so here is the
solution.

In Snow Leopard open Terminal and type:

    arch -i386 mdimport /Applications 

If you aren't using Snow Leopard just skip the 'arch -i386' and it should work.

This will reindex your Applications directory which will enable Spotlight to find your Applications again.

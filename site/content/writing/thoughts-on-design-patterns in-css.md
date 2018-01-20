+++
title = "Thoughts on how we structure projects"
description = "Me thinking about component based architecture for CSS in 2014, before I knew what to call it."
date = "2014-05-25T00:00:00Z"
publish_date = "2014-05-25T00:00:00Z"
+++

Typically when we begin a new web project we start by creating a number of directories for CSS, JavaScript and other resources. This task hasn't changed much and it's a typical step for most developers. In many cases, this structure is a non-optional part of the workflow enforced by scaffolding tools like [yeoman](http://yeoman.io/), an MVC framework or a [boilerplate](http://html5boilerplate.com/).

Reasons behind it relate to the well-established principle <a href="http://en.wikipedia.org/wiki/Separation_of_concerns">separation of concerns</a>. In web development we get separation of concerns for free. It is built into the difference between HTML, CSS and JavaScript, each relating to content, presentation, and behaviour respectively.

Despite the importance of this principal, I've found that simple separation of CSS, JavaScript and resources within a project folder, is increasingly inadequate - especially for larger projects, and I'm starting to think there might be a better way.


This change of thinking started with [object oriented CSS](https://github.com/stubbornella/oocss/wiki), and [BEM](http://bem.info/) methodologies. These ideas changed the way I think about different components on the screen and Brad Frost's concept of [Atomic](http://bradfrostweb.com/blog/post/atomic-web-design/) [Design](http://patternlab.io/about.html), perfectly articulates the evolution of this thinking.

These ideas changed the way I structure my CSS, but it wasn't until I started using build tools in my front-end development workflow to generate API references and documentation, that I started to realise some limitations of the typical project structure. I suspect that these limitations may become even more apparent with the take-up of [web components](http://css-tricks.com/modular-future-web-components).

<figure>
	<img src="http://cdn.madebymike.com.au/consern-based.png" />
  <figcaption>A typical project structure</figcaption>
</figure>

One of the problems I see is that components we think of are not really isolated. If you need to remove something you need to find the scripts, the styles, each of the resources, remove import statements if you are using a CSS pre compiler and perhaps update your build script. You often still don’t know if any of the resources are shared between components.

How we structure our projects is now often at odds with our thinking and how we set out API references, style guides, pattern libraries and other documentation. You have all of those right?

I’m starting to suspect (and I reserve the right to be wrong) that with modern build tools we have today, we can structure projects to better reflect our modular thinking.

I'm not suggesting that separation of concerns is no longer relevant, not at all, but separation can exist at a component level and while the end result might look much like a traditional project, this doesn't have to be the case for development.

Recently I’ve been experimenting with having each of the styles, scripts and resources inside a unique folder per component.

<figure>
	<img src="http://cdn.madebymike.com.au/component-based.png" />
  <figcaption>Component based structure</figcaption>
</figure>

So far this approach has worked well for any project that involves developing a component library, which means most websites.

Doing it this way you can keep better track of resources related to the component I'm working on. You can keep examples and documentation in the same folder and update them whenever you work on that component. You can even keep test libraries and other files close to the source. However the biggest advantage is you can easily and confidently remove a component simply by removing the folder.

Of course, there are some limitations -it’s not always obvious what represents a component. Smaller components must be grouped together and things like mixins and resets might also represent unique components in this structure. It’s always not easy to follow a rule, sometimes just decide what works best.

If including 3rd party libraries, you may have to refactor them or make exceptions when they don't fit the structure you're using -although this can be the case in any project.


Advantages of projects structured around components:

* It's easy to update and remove components
* Components become more portable between projects
* It encourages modular thinking and development practise
* It's easy for outsiders and non-technical people to understand
* Faster

Disadvantages of projects structured around components:

* More complicated build scripts
* Components must be largely independent of each other
* 3rd party libraries are sometimes difficult to include

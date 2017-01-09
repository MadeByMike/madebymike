---
layout: post
title: How do I CSS?
update: This article is a little dated now. Whilst some of my processes may have changed, I think the overall message of not attempting to write and maintain a unique set of guidelines and methodologies, but articulating how you apply existing guidelines is still a good idea for front-end teams.
---

When starting a new project with new developers one of the first things I want to do is get on the same page in terms of how we structure and manage CSS.

There are so many methodologies and guidelines today that I wonder why you would bother writing your own detailed documentation.

It's pretty simple choose a methodology, choose a set of guidelines and choose a build process.

### Methodologies

  - [BEM](https://en.bem.info/)
  - [SMACSS](https://smacss.com/)
  - [OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

### Guidelines

  - [codeguide.co](http://codeguide.co/#css)
  - [cssguidelin.es](http://cssguidelin.es/)
  - [idiomatic-css](https://github.com/necolas/idiomatic-css)

It doesn't matter which set of methodologies or guidelines you prefer at the end of the day consistency is what you are after. You could just place these all on a big wheel and spin it.

The problem we might have with this approach is they overlap, methodologies wander into the territory of guidelines, and guidelines get opinionated our build tools and processes. In my view we'd be better off if there were clearer guidelines for our guidelines. No, I'm not *actually* suggesting we write guidelines about guidelines. But if methodologies were primarily about organisation, structure and other big picture stuff, and guidelines were mostly about the style, formatting and other fine detail, we'd be more able to mix and match.

So what do you do about that short of specifying every detail? I recently came across [Chris Coyier's tour of CodePen's CSS](http://codepen.io/chriscoyier/blog/codepens-css) which was a response to [Ian Feather's tour of Lonely Planet's CSS](http://ianfeather.co.uk/css-at-lonely-planet/), which was in response to [Mark Otto's tour of GitHub's CSS](http://markdotto.com/2014/07/23/githubs-css/). I promise I am not going to add another 'in response' article to add to that chain! But it did get me thinking. This is the perfect way to state your preferred methodologies and guidelines and how you apply them.

Rather than doing this as a review of how you work what if you did this *before* starting a project as an agreed way of how you would like to work? You could state how strictly you follow certain guidelines, the things that matter most and where you are more agnostic. You can list your key points of difference and detail your preferred build process and importantly the reasons for these choices. It seems like a much faster way to arrive at a consensus in a new team.

So I've written down how I CSS for a typical website project and I thought I'd share it. Remember this is how I like to CSS and I'm not saying this is how you should CSS, or even that this always works for me. I'll be flattered if you find this useful or apply this method for arriving at a consensus within your team. But there is no expectation that what I have written is right for you.

## How I CSS

  - [I follow SMACSS conventions](#css-architecture)
  - [I use SCSS](#preprocessors)
  - [I use Autoprefixer](#autoprefixer)
  - [I use CSSLint](#linting)
  - [I comment extensively](#comments-docs)
  - [I use Grunt for my build process](#build-it)
  - [I don't always follow my own advice](#human-am-i)

<h3 id="css-architecture">CSS Architecture</h3>

I lean towards the naming conventions in SMACSS and generally aim to structure my CSS according to these guidelines. However I also prefer common-sense over strict adherence to naming conventions and guidelines.

I try to follow [these guidelines](http://mdo.github.io/code-guide/#css) by Mark Otto for the smaller things like formatting and declaration order. I also have immense respect for Harry Robert's [CSS Guidelines](http://cssguidelin.es/) but my personal preferences differ (slightly) from Harry's and his guidelines are so extensive it's easier for me to list my points of difference from Mark's code guide.

Some of my key personal preferences include:

  - using 'classy' selectors and not IDs
  - don't nest media queries, it makes me sad :(
  - I like tabs, but I don't hate spaces so don't hate me
  - unlike this bullet point, I try to keep class names and selectors chains as short as possible without sacrificing clarity
  - I care about accessibility and valid mark-up
  - I like REM units, but I'm happy to use the odd pixel

<h3 id="preprocessors">Preprocessors</h3>

I use SASS and the SCSS syntax because it's widely used and understood. But more importantly because it works for me.

Source SCSS files are compiled into two separate stylesheets:

  - a bare minimum set of styles for older devices and <IE9
  - a fully featured and enhanced version for everything else

I minifiy my CSS files straight out of SASS. I also generate source map files and publish my .SCSS files to production.  

I did use LESS for a long time because it felt more declarative like CSS is 'meant' to be, however also I enjoyed creating wild experimental things with SASS. Eventually I made the switch using SASS almost exclusively, in part because of its growing popularity. I know, I'm a sell-out and a sheep!

**Note:** I don't get too excited about my SASS (in production). I keep it basic with variables, keep mixins simple, use color and math functions, don't nest too deeply and don't try to be clever or fancy.

I also frequently inline my critical CSS and load additional styles asynchronously for better performance using the method described by Scott Jhel in [How we make RWD sites load fast as heck](https://www.filamentgroup.com/lab/performance-rwd.html) the results of this can be amazingly noticeable.

<h3 id="autoprefixer">Autoprefixer</h3>

I don't use any vendor prefixes in my SCSS or use mixins to generate them. Rather I write regular CSS according to the specification and run Autoprefixer as a post process (after SASS produces the CSS files). Not only is this easier, but it produces a better quality result because developers are human and sometimes forget to use prefixes and mixins. It also allows me to easily remove large chunks of legacy code by simply updating the target browsers in the Autoprefixer config.

<h3 id="linting">Linting</h3>

Rather than maintaining my own set of rules for code formatting I mostly follow suggestions from [Mark Otto's code-guide](http://mdo.github.io/code-guide/#css)

I differ in some respects such as I prefer using tabs rather than 2 spaces. But importantly, I don't get upset about this or any other code formatting convention. I understand that each developer has their own habits and preferences. When working together it is nice when if our code looks the same and is reasonably tidy, so that's why my build process usually includes linting.

<h3 id="comments-docs">Commenting &amp; Documentation</h3>

I am liberal with my use of comments. No one has ever complained a stylesheet is over documented. Comments range from highly structured block declarations describing modules to silly jokes and apologies for hacks, both are good.

Ideally each UI component, utility class, layout module and mixin should have a block comment briefly describing it.

In the past I've tried a whole range of automated documentation tools for SASS and CSS. My "professional" opinion is they all suck a little bit, so I don't get too hung up about it. When you are working with a team of developers a little bit of sucky documentation is often better than none.

At the end of the day documentation is made for humans and machines are only good at providing us a with the templates and structure. You need to put in real work to get good CSS documentation and this is only good if someone is going to read it. Find the right balance of documentation for your project, it might be none or it might be a lot.

I think of the [lonely planet style guide](http://rizzo.lonelyplanet.com/styleguide/) and the process described by [Ian Feather](http://ianfeather.co.uk/a-maintainable-style-guide/) as the standard we should be aiming for.

<h3 id="build-it">Build process</h3>

I chose Grunt to string together the various tasks that help me build and maintain my stylesheets:

Linting -> Preprocessor -> Autoprefixer -> CSS

I probably should have chosen Gulp cause word is it's much cooler now, but at the end of the day I just want to keep my build process as simple as possible and Grunt has allowed me to do this. I try not to over engineer the build process.

<h3 id="human-am-i">I am a Human</h3>

Finally I should say that at best I do this only about 60-70% of the time. Sometimes for small projects I very loosely apply these guidelines or don't follow them at all. Sometimes I'm lazy or tired or I'm tricked into thinking some marketing element will only be on the homepage for "2 weeks absolute maximum" and it's Friday so I just do it quickly. Two years later it's still there. I'm ok with that, these are only guidelines and we are humans not machines.

**Final disclaimer**: Things are constantly changing. This might not be how I CSS in the future. And ok, I guess this is kind of an 'in response' article.

## You might like

  - [Chris Coyier's tour of CodePen's CSS](http://codepen.io/chriscoyier/blog/codepens-css)
  - [Ian Feather's tour of Lonely Planet's CSS](http://ianfeather.co.uk/css-at-lonely-planet/)
  - [Mark Otto's tour of GitHub's CSS](http://markdotto.com/2014/07/23/githubs-css/).

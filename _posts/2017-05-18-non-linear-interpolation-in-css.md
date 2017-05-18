---
title: Non-Linear Interpolation in CSS
layout: post
---

A few years ago I wrote about fluid typography techniques that show how you can use calc() and viewport units to create transitions between different font-sizes as the viewport size changes. If you'd like to know more about how this technique works you should read my article [Precise control over responsive typography](https://madebymike.com.au/writing/precise-control-responsive-typography/).

Recently these ideas have circulated and gained more traction. I've seen more large sites using fluid typography and other people writing about it and expanding on my initial ideas and techniques. One recent example of this was an article by Jake Wilson [CSS Poly Fluid Sizing using calc(), vw, breakpoints and linear equations](https://medium.com/@jakobud/css-polyfluidsizing-using-calc-vw-breakpoints-and-linear-equations-8e15505d21ab).

One of the most interesting things in Jake's article is the idea of having multiple points of transition. He refers to these as "*Breakpoints + Multiple Linear Equations*" but I like to think of these as "bending points". I like the term bending points rather than breakpoints for these because to me, a breakpoint implies there should be a jump and that's not what this is. These are intermediary points where the rate of scale changes.

This idea of using multiple transitions is something I’ve been thinking about for a while, and I've occasionally been asked about doing this. Unfortunately at the moment we can’t do this with CSS alone. When I’m asked about this I usually reply with the same suggestion Jake has, that is to use multiple linear transitions. But I remain a little hesitant about how people might use this technique.

I'd love to be able to use non-linear equations for transitions of font-size or other properties, but until there is a native function in CSS, I think adding a large number of intermediary steps only adds complexity.

Undoubtedly some people will be willing to set many bending points at the cost readability and maintainability. In a lot of cases, readability and maintainability are more important than finessing a few pixels difference at uncommon screen sizes. That's why the original examples I created only allowed for only a single minimum and maximum font-size.

I also felt that that equations and ideas were complex enough and based on the feedback I've had, I think this is often still the case. I get that, sometimes you just want the font to bend and you don’t want to worry about how the maths works.

Yet this is only one type of user. Clearly many people want to do this, and despite the complexity, some designs could benefit from using a small number of bending points. Besides, CSS has other complex concepts.

If you want to use bending points to transition CSS values between multiple intermediary points, it should be done deliberately and with restraint; not just because you can. Aside from adding complexity to the CSS, for standard body text with limited variation in size the difference is not particularly noticeable. This is a technique better reserved for headings and other key features where small details matter. Assuming you do have a good case for more than one bending point, how do you determine what those intermediary points should be? And how do we make this accessible to all types of users?

Jake talks about statistics as a tool for determining the minimum and maximum font-sizes at points along a trendline. I found this to be an interesting idea. I like the mathematical approach, but if maths is not your thing and calculating a polynomial regression trendline is probably not going to be up your ally either.

For me the statistical approach is an interesting aside to what we are trying to do; choose a set of appropriate bending points. If you like this type of mathematics you can of course use statistics as a tool for determining these points, however, it would be equally valid to choose points that have no mathematical basis, or to use a modular scale, or a cubic bezier function, or any other method you can imagine for drawing a line between two points.
If we were to have a native interpolation function in CSS, it would likely be similar to existing features. One of the great things about CSS is that all the different parts of it are interoperable. That is, they work together and it is because calc() and viewport units work together that we’re able to get linear-interpolation in CSS. If we want a native interpolation function in CSS should be interoperable as well.

Changing the way we are used to doing things is difficult, learning a new syntax is hard, even when it's superior to previous techniques. Interoperability can help with this and that’s one of the reasons why you see when new layout properties shared between flexbox and CSS grid. It turns out that fluid values in CSS have a lot in common with animation.

That's why I think polynomial regression and statistics might not the best mental model for thinking about interpolation in CSS. After all, we already have native interpolation with animation. Animation-timing-functions like `cubic-bezier` and keywords like `ease-in`, provide all the tools we need in a way that will be somewhat familiar to developers and designers.

The missing piece is direct access to the internal interpolation function that powers animation in CSS and the ability to replace the time dimension with the viewport or another custom completion value. A custom completion value could provide further compatibility with future CSS features such as container queries. I wrote about these ideas in more detail in an article [interpolation outside of animation](https://madebymike.com.au/writing/interpolation-without-animation/).

It might sound a little complex but it's the same mathematics we use when creating animation on the web.  CSS does a good job of abstracting away the mathematical complexities you probably don’t think about it but you understand the result of applying keywords like `ease-in` to an animation. The average doesn't need to understand what type of function this is or how it works. It's not a big leap to take these ideas and use them for creating the effects in typography and other areas of the web.

Fluid typography doesn’t need to be hard, so I've taken these ideas and feedback from the community to create a mixin that generates one or more bending points with a syntax that closely aligns with animation-functions:

<p data-height="550" data-theme-id="dark" data-slug-hash="oWqvNa" data-default-tab="css,result" data-user="MadeByMike" data-embed-version="2" data-pen-title="Bending points " class="codepen">See the Pen <a href="http://codepen.io/MadeByMike/pen/oWqvNa/">Bending points </a> by Mike (<a href="http://codepen.io/MadeByMike">@MadeByMike</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

To properly see this in action you might want to <a href="http://codepen.io/MadeByMike/pen/oWqvNa/?editors=0100" target="_blank">open it in a new window</a> so you can resize it.

You can [grab the mixin you can get it here](https://www.sassmeister.com/gist/beac01f68da4f9ef3007c0d17f72d8c6).

This code for the mixin looks complex but it does a lot of the maths, so that you don't need to consider anything except the type of easing you want to apply.

Like other examples of fluid typography this one requires a min and max value for the target CSS property and screen sizes. But unlike other examples this one also takes an optional easing value.

The easing value works exactly like an [animation-timing-function](https://developer.mozilla.org/en/docs/Web/CSS/animation-timing-function). You can give it a keyword or even a `cubic-bezier` function and it will calculate the intermediary values and set up the transitions. Note: It does not accept `step` values.

The final optional parameter is the number of bending points. This defaults to 2, and in most cases I'd recommend leaving it at the default, but because I know you are going to do it anyway, you can set as many bending points as you like.

Here are some examples to get you started:

```scss
.classic-linear {
  @include interpolate('font-size', 600px, 12px, 900px, 24px);
}
.easy-peasy {
  @include interpolate('font-size', 600px, 12px, 900px, 24px, 'ease-in');
}
.cubic-bezier {
  @include interpolate('font-size', 600px, 12px, 900px, 24px, 'cubic-bezier(0.755, 0.05, 0.855, 0.06)');
}
.bloat-my-css {
  @include interpolate('font-size', 600px, 12px, 900px, 24px, 'ease-in-ease-out', 10);
}
```

If you want to [use this in a project grab it here](https://www.sassmeister.com/gist/beac01f68da4f9ef3007c0d17f72d8c6).

This aims to show how I think native interpolation should work in browsers, but it still only works where calc does. I think there is a lot more discussion to be had and problems that we need to solve before we can have a real native interpolation in CSS. I welcome contributions to this discussion and ideas from maths, statistics, animation or any areas. One thing that I think is increasingly apparent is that the web is fluid medium and breakpoints will not continue to be the only answer, or the key feature in the future of responsive design.

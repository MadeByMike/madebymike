---
title: "Interpolation in CSS without animation"
description: "Ideas for a more general purpose interpolation function in CSS."
date: "2016-12-29"
tags: 
  - css
---


Interpolation is the estimation of a new value between two known values. This simple concept is vastly useful and it's commonly seen in animation on the web. With animation you declare the target properties and the end-state, and the browser will workout out the values in-between. Animation happens over time, but this is not the only dimension where interpolation can occur. In fact we interpolate values regularly in design, albeit manually, and particularly in responsive design. You may even do it unknowingly. Because of this, I think there is a need for a more native way of interpolating CSS values outside animation.

If you are a web designer the chances are you frequently have two primary screen sizes in mind, a small screen and a large screen, or the device and the desktop. I know you probably think about more than just these two sizes, but these two sizes are especially important, they represent the upper and lower bounds of your design. When you make adjustments for screen sizes between these constraints, what you are doing is like interpolation.

When adjusting properties such as font-size, font-weight, image width or grid dimensions at specific screen sizes between the upper and lower bounds, these values usually fall somewhere between the choices you've made for the largest small and smallest screen size. It would be unusual for the font to get larger, then smaller, then larger again as the viewport changes. Or to give another example, if a font varied between bold, normal, italic, then bold and italic. It's not unusual for these things to change from one state to another, but typically these changes are progressive, not back and forward.

## Design intent vs constraints

We choose break-points where properties are to be adjusted. We don't do this because it is ideal, we're forced to select a fixed number break-points, often quite arbitrarily, where the design should change. Although sometimes we may want these break-points, more often it is due to technical limitations on the web.

Media queries are our primary tool for adjusting design in relation to the screen size and for practical reasons, we are constrained to using a limited number of these. These limitations have shaped how we think about web design, and the choices we make about using break-points don't necessarily reflect the pure intentions of the designer.

I've been told that good design is rarely arbitrary. It serves a purpose. If the font size is smaller, larger or its weight stronger, it's because that is the best experience for users, at that screen size. It's feasible to say that the best experience for some aspects of design, will vary directly in relation to the screen size rather than only at set points. This is the use-case for interpolation without animation.

Let's illustrate this with an example, imagine the following CSS:

```css
body {
  font-weight: bold;
}

@media screen and (min-width: 700px){
  body {
    font-size: 1.2rem;
    font-weight: normal;
  }
}
```

It's unlikely a designer would decide bold font is uniquely suited to screen resolutions below 700px. Why would one pixel make such a difference? Design decisions like this are often the result of constrains imposed by media queries. A more likely intention is for the font-weight to be adjusted in relation to its size, for improved legibility on smaller screens.

Media queries are the best tool available for approximately achieving this goal, but they are not always an accurate reflection of the designers intent.

## Maximum safe operating pressure

I noticed the label on my barbecue gas cylinder says it has a maximum safe operating pressure. If I exceed this pressure when refilling it, it might explode (it actually won't, they have safety valves, but just imagine would). Web design doesn't explode quite as spectacularly as gas cylinders, but responsive design is exposed to a different kind of operating pressure.

As the screen size gets smaller, there is often a point where a design is pressured by the limitations imposed by smaller screens. A break-point represents the point where the design cannot withstand this pressure any longer; it reached its maximum safe operating pressure and the appropriate response is to adjust some aspects of the design.

Designers choose these break-points carefully. They probably have in mind where constraints like this begin to pressure the design, and how quickly it impacts overall quality. But in a compromise to technology, we are forced to choose a middle point, knowing that immediately before and after the break-point the design is often still pressured by constrains that demanded change.

<img alt="gradient demonstrating the location of ideal font-sizes in relation to a break-point and the design pressure experienced between these points" data-src="/img/interpolation.png">

This graphic attempts to illustrate the location of ideal font-sizes in relation to a break-point. You can move the ideal font-size closer to the break-point but this only shifts the pressure to somewhere else in the design. Alternatively you can add more break-points until this becomes problematic, but ideally these changes would be introduced gradually and continuously to reduce pressure on the design as it's required.

Media queries are not the right tool for this. Media queries have been around longer than responsive design and responsive design was as much a reaction to the available technology, as the idea of media queries was to user needs. As is often the case, real world implementations of responsive design pushed the technology further than spec writers had imagined, and uncovered new uses, new requirements and new limitations.

This is normal process. And with the perspective we have now, it's easy to ask, if we were designing a technical solution for responsive design today, would media queries be the best tool to implement designers intentions? I think not; or at least not the only tool.

## Live interpolation in the browser today

Theoretically, between two ideal points, there is an ideal value for every screen size, that can be expressed as a ratio, or a function relative to the screen-size (or even another relative factor).

Previously I've written about techniques you can use to achieve some forms of interpolation using calc() and viewport units.

My favourite example of this demonstrates how you can interpolate between different modular scales with heading levels.

<video src="/img/modular-scale.mp4" style="max-width:600px" autoplay loop></video>

Not only do the individual font-sizes change in a controlled way relative to the viewport, but the ratio between the heading levels also fluidly changes. This means there is a changing but consistent relationship between each of the headings. If you haven't seen this yet, you should read my article [precise control over responsive typography](https://madebymike.com.au/writing/precise-control-responsive-typography/).

This technique allows linear interpolation between any two length values. This is great, but linear interpolation is not the only form of interpolation, and length values are not the only properties that change in responsive design. In addition to that, the first example in this article demonstrated a situation where font-size should change relative to the screen size, and font weight should change relative to font-size. At the moment this isn't possible with CSS.

## Limitations of interpolation with calc()

There are some limiting factors when it come to changing the font-weight in relation to the font-size. Firstly the calc() techniques work only with length values and font-weight is a unitless value.

The problem with interpolating unitless values could potentially be solved with something called 'unit algebra'. Unit algebra would allow calc() expressions that contain CSS units to resolve to a different unit type or even a unitless number. E.g `calc(2rem * 2rem) = 4`. This could allow us to interpolate unitless values like font-weight or line-height, and maybe even open the door to non-linier equations (by multiplying units by themselves). Whilst this would be a great feature, the syntax for these equations is likely to be complicated and still leaves us wanting a more native solution. We're also not likely to see this anytime soon. As far as I am aware there is no formal proposal, and this exists only as an idea discussed in w3c mailing lists.

The second problem with interpolating properties like font-weight is that by default a web font won't have all the variations required to smoothly interpolate between these values. Usually a font-family will include the standard font and a single variation for bold, or at worse, just a faux-bold. Adding more variations will increase network requests, loading time and FOUF (Flash Of Unstyled Font). This is another constraint designers will be familiar with.

## Variable fonts and the future of font interpolation

Luckily the problem of limited font variations has a solution that is relatively close on the horizon. Variable fonts offer the ability to specify how bold or italic a font should be. And not just bold or italic but other 'axes of variation'. You can read more about variable fonts in Andrew Johnson's excellent A List Apart article: [Live font interpolation on the web](http://alistapart.com/article/live-font-interpolation-on-the-web).

In his article Andrew mentions a need for
"bending points—not just breaking points—to adapt type to the design". He also hints at [some challenges we face interpolating font-values effectively](http://alistapart.com/article/live-font-interpolation-on-the-web#section8) on the web.

My main concern is that many of these 'axes of variation' are not length values and therefor, whilst I'm excited for the opportunities that variable font will provide, I see their potential limited by existing constraints.

## How interpolation and animation works in browsers

CSS is already great at interpolating values and it knows how to do this with a whole bunch of different [animatable properties](https://www.w3.org/TR/css3-transitions/#animatable-properties) and [property types](https://www.w3.org/TR/css3-transitions/#animatable-types).

We can interpolate the value of any property that [can be animated](http://canianimate.com/) using CSS transitions or keyframe animations.

During an animation the browser works out how much time has elapsed for every frame and picks an intermediary value. For example if 1 second of a 4 second animation has elapsed, we pick a point that is 25% of the way between the original and final value.

<object data="/img/easing.svg" type="image/svg+xml"></object>

This is easy to understand with numeric properties like width or position, but it works exactly the same with properties like color. Just imagine the same process happening for each of the R, G and B values that represents the color. You can think of them as 3 separate 2D interpolations that combine to give a color at each step of the animation.

> An interesting side note with CSS animations, is that no matter what values you use to define color the browser will always transition through an RGB colour space. This means that although the final colour will be the same, the path taken and intermediary colors will be different.

We can manipulate the timing of an animation to get different results at different points of interpolation. By plotting an animation timing function on the same graph above, we can see how this changes the value returned at different points in the animation, while the start and end values remain the same.

<object data="/img/easing2.svg" type="image/svg+xml"></object>

This is a non-linear interpolation and it’s really handy for creating all kinds of animation effects and more natural looking movement with acceleration and easing. We can define [animation timing functions in CSS](https://developer.mozilla.org/en/docs/Web/CSS/animation-timing-function) using [keywords, steps or cubic bezier curves](https://developer.mozilla.org/en-US/docs/Web/CSS/single-transition-timing-function) for greater control.

## Interpolation outside animation

So far I've discussed the problem with media queries not always reflecting design intentions, and the limitations of interpolation with calc(). I've also shown how new features like variable fonts might be constrained by these limitations. The interesting thing is, we have all the tools we need to solve these problems, in CSS right now. Only they are tied closely to animation in the browser.

The rest of this article is going to talk about the idea of exposing a native interpolation function in CSS, how it might work, and what problems might solve. It's very hypothetical and it's ok if you don't agree with either the idea in general or how it should work.

I've talked about interpolation and animation together, however interpolating values over time is just one possibility. The duration and elapsed time of an animation simply provides a percentage completion. Somewhere within the browser an interpolation function is called and it will dutifully return a value at the given percentage completion, according to the timing function.

Let’s imagine we could access this function directly in CSS and pass it our own percentage. If we could change this value using media queries, [CSS variables (custom properties)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) and calc(), what are some of the things we might be able to do?

First let’s imaging a syntax. We need an `initial-value`, a `target-value`, a `percentage-completion` and a `timing-function`. The timing function could be an optional value and default to a linear interpolation. That means it might look something like this:

```css
interpolate(initial-value, target-value, percentage-completion, [timing-function])
```

And could be used like this:

```css
.thing {
  width: interpolate(0px, 500px, 0.5, linear);
}
```

**Note**: This is a not real CSS, it is a hypothetical solution to a real problem for the purpose of discussion.  

Obviously in the example above it would be far easier to set the width to 250px. So, interpolation functions are not that useful without variables. We do have some variable values in CSS. Things like:

  - the viewport width and height,
  - the width and height of an element or its container,
  - the number of siblings an element has, or
  - the order of an element amongst its siblings.

These are all things that in one context or another we can know and use in CSS; unfortunately in many cases these variables are not easily queried to create conditional statements. There are some useful tricks to take advantage of them. Things like [advanced fluid typography](https://madebymike.com.au/writing/precise-control-responsive-typography/) and [quantity queries](http://alistapart.com/article/quantity-queries-for-css) are great real world examples.

A more hypothetical example in a native interpolation function might look something like this:

```css
:root {
  --max-viewport: 500px;
  --min-viewport: 1000px;
  --range: var(--max-viewport) - var(--min-viewport);
  --percentage-completion: calc( (100vw - var(--min-viewport)) / var(--range) );
}
.thing {
  width: interpolate(0px, 500px, var(--percentage-completion), ease-in);
}
```

Although the above calculation is quite simple, but it's more than a bit ugly. This is because it uses CSS variables and unit algebra concepts I mentioned earlier to work out a percentage completion.

A far neater solution would be a function to work out a percentage. This would reduce the above to something far more digestible like this:  

```css
root: {
  --percentage-completion: percentage(500px, 1000px, 100vw);
}
.thing {
  width: interpolate(0px, 500px, var(--percentage-completion), ease-in);
}
```

**Note:** Any interpolation function would probably need to clamp returned values to the specified range, as negative completion percentage are a likely result with variables.

This doesn't need to work with just length values. I mentioned that CSS has a whole bunch of [animatable properties](https://www.w3.org/TR/css3-transitions/#animatable-properties) that it already knows how to interpolate. It makes sense that any native function should work with these definitions. This means interpolating a color is also valid:

```css
root: {
  --percentage-completion: percentage(500px, 1000px, 100vw);
}
.thing {
  background-color: interpolate(red, greed, var(--percentage-completion));
}
```

The above example of changing the background color doesn't make much sense in relation to the viewport, but there are more legitimate use cases for interpolating a color in relation to an elements width. We just can't as easily query the properties needed to do this, as we can with the viewport. [Container queries](http://alistapart.com/article/container-queries-once-more-unto-the-breach) seem to be forever on the horizon. It won't be soon, but my hope is that container queries also ship with container and element units, that work much like viewport units, only for the width of an element.

Container query units might look something like this:

| Unit      | Description                                                           |
|-----------|-----------------------------------------------------------------------|
| cqw       | Relative to 1% of the container width                                 |
| cqh       | Relative to 1% of the container height                                |
| cqmin     | Relative to 1% of the container width or height, whichever is smaller |
| cqmax     | Relative to 1% of the container width or height, whichever is larger  |
| eqw       | Relative to 1% of the element width                                   |
| eqh       | Relative to 1% of the element height                                  |
| eqmin     | Relative to 1% of the element width or height, whichever is smaller   |
| eqmax     | Relative to 1% of the element width or height, whichever is larger    |

**Note**: I used the `cq` prefix is because `ch` is already a valid unit type and `eq` for consistency.

With units like these, we could do something like this:

```css
root: {
  --percentage-completion: percentage(0px, 100cqw, 100eqw);
}
.thing {
  background-color: interpolate(red, greed, var(--percentage-completion));
}
```
In this example the percentage-completion is the percentage width of a child element, in relation to it's parent element. Allowing CSS property values to be relative to context like this opens up a whole range of possibilities for things like, dynamic progress bars, creative navigation components and data-visualisation.

But maybe this isn't the right solution. If we have a unit type for viewport width, container width and element width, where does this stop? DOM order, line length, color? Is it better introduce another function to get a value? E.g. `value-of(width)` if we do this, what about container width and non CSS properties like DOM order or line length? Magic keywords? `value-of(dom-order)`. I don't know!

Perhaps you don't agree with any of this. Perhaps you think we shouldn't introduce more functional features to CSS. That's ok. I hope you will agree that there is a need for discussion, that break-points don't necessarily match the intentions of designers and that interpolation will become a more significant feature of web design with the introduction of variable fonts, and an increasing adoption of viewport units and dynamic layout features.

I'd like to start a discussion and if you have ideas please [let me know](https://twitter.com/MikeRiethmuller) or consider [contributing to the issue](https://github.com/w3c/csswg-drafts/issues/581) on the CSS Working Group's, GitHub page.


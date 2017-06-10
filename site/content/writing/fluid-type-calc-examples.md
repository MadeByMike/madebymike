---
date: 2015-06-15T00:00:00Z
extra_css:
- fluid-type-examples.css
title: Fluid type examples

---

A few months ago I published a [fluid type technique](/writing/precise-control-responsive-typography/) that doesn't require any JavaScript. Even though I consider it experimental the technique works well enough as a progressive enhancement and it generated a lot of interest, comments and suggestions. So I thought I'd put together a bunch of examples and address some comments.

## Fluid type with pixels

This is a simplified version of my original example. The minimum font size is 14px and the maximum is 22px. I've removed a redundant media query and reduced the complexity of the calc() equation.

```css
.fluid-type {
  font-size: 14px;
}

@media screen and (min-width: 320px) {
  .fluid-type {
    font-size: calc(14px + 8 * ((100vw - 320px) / 960));
  }
}

@media screen and (min-width: 1280px) {
  .fluid-type {
    font-size: 22px;
  }
}
```

### Example

<p class="example-1">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p>


## Fluid type with Rem units

This example should have the same result as the one above when the base font size is 16px (default).

It shows that the technique works with any length unit, as long as you can use it in a media query. It also addresses comments regarding how my initial example will override user preferences for the default font size.

The only catch is that all unit types must be the same for the calc() equation to work. That's a shame because we often use different unit types for breakpoints in media queries than we do for `font-size`.


```css
.fluid-type {
  font-size: 0.875rem;
}

@media screen and (min-width: 20rem) {
  .fluid-type {
    font-size: calc(0.875rem + 0.5 * ((100vw - 20rem) / 60));
  }
}

@media screen and (min-width: 80rem) {
  .fluid-type {
    font-size: 1.375rem;
  }
}
```

### Example

<p class="example-2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p>

## Reverse fluid type

In this example the text gets smaller as the viewport gets larger. This might have novel uses or it might not.

```css
.fluid-type {
  font-size: 22px;
}

@media screen and (min-width: 320px) {
  .fluid-type {
    font-size: calc(22px + -8 * ((100vw - 320px) / 960));
  }
}

@media screen and (min-width: 1280px) {
  .fluid-type {
    font-size: 14px;
  }
}
```

### Example

<p class="example-3">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p>


## Fluid line-height (Molten leading)

In this example the line-height is fluid. This is a pure CSS implementation of Wilto's [Molten leading technique](https://github.com/Wilto/Molten-Leading).

```css
.molten-leading {
  line-height: 1.2em;
}

@media screen and (min-width: 20em) {
  .molten-leading {
    line-height: calc(1.2em + 0.6 * ((100vw - 20em) / 60));
  }
}

@media screen and (min-width: 80em) {
  .molten-leading {
    line-height: 1.8em;
  }
}
```

### Example

<p class="example-4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p>


## Fluid box

This example shows how the technique can be applied to more than just font sizes, in this case `width`.

```css
.fluid-box {
  width: 200px;
}

@media screen and (min-width: 320px) {
  .fluid-box {
    width: calc(200px + 300 * ((100vw - 320px) / 960));
  }
}

@media screen and (min-width: 1280px) {
  .fluid-box {
    width: 500px;
  }
}
```

### Example

<p class="example-5">The width of this box will scale and at a different rate to the viewport.</p>

## Fluid type in Sass

[Indrek Paas](https://twitter.com/indrekpaas) developed a Sass mixin to help make fluid type using this technique easier. [You can find the latest fluid type Sass mixin here](http://sassmeister.com/gist/7f22e44ace49b5124eec).

I use a slightly modified version to generate the examples on this page.

### Example

```scss
.fluid-type {
  @include fluid-type(320px, 1280px, 14px, 18px);
}
```

## Fluid type in Less

If Less is how you roll I've got you covered with a [Less mixin](http://codepen.io/MadeByMike/pen/RWJyML).

## Fluid type in PostCSS

[Rucksack is a postCSS module](https://www.npmjs.com/package/rucksack-css) that makes use of this technique for fluid typography.


I have a collection of [other examples on CodePen](http://codepen.io/MadeByMike/pens/tags/2/?selected_tag=responsive+typography). [Let me know](https://twitter.com/MikeRiethmuller) if you have one you'd like me to share.

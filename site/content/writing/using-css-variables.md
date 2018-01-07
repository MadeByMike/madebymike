+++
title = "Using CSS variables correctly"
description = "Custom Properties have the potential to change how we write and think about CSS."
date = "2017-06-18T18:38:07+00:00"
publish_date = "2017-06-18T08:38:10.388Z"
+++

CSS Variables (also known as Custom Properties) are now supported in all modern browsers and people are starting to use them in production. This is great but they're different from variables in preprocessors and I've already seen some examples of people using them without considering the advantage they offer.

They have the potential to change how we write and think about CSS. I thought I'd do a few quick demos that show some good and bad ways to use CSS variables, and how their differences from preprocessors might change how we structure CSS.

## How do they differ?

Firstly how do they differ? The main difference is CSS variables can change. This might not sound surprising, variables typically do change. You might not have thought about it, but variables in preprocessors like Sass are static. Sure, you can update the value of a variable at different points in the compilation process, but when it's rendered to CSS the values are always static.

This makes variables in preprocessors a great tool for writing DRY (Don't Repeat Yourself) code and manageable CSS. CSS variables on the other hand, can respond to context within the page.

We can refer to variables as statically or dynamically scoped and CSS variables as dynamically scoped.

In this instance, dynamically scoped means they are subject to inheritance and the cascade. This is great because you can change the value of a CSS variable inside a media query or when an element matches a CSS selector. Using the same variable we can have different values in different places on the page. You can even read and manipulate CSS variables with JavaScript.

If you haven't thought of a ton of uses for CSS Variables already you will have by the end of this article. But first let me demonstrate how not to use CSS variables.

## Modular Scale with CSS variables

I'm going to use modular scales as an example. A modular scale is a mathematical scale that can be used as a basis for choosing heading sizes. I like to do this, and I like to choose different scales for small and large screens.

I'm going to use a scale 1.2 for smalls screens and 1.33 for large screens. I don't like maths so I got these values from [modularscale.com](http://www.modularscale.com/) and these are my heading sizes:

<table>
<thead>
<tr>
<th style="text-align:center">1.2</th>
<th style="text-align:center">1.33</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">2.488rem</td>
<td style="text-align:center">4.209rem</td>
</tr>
<tr>
<td style="text-align:center">2.074rem</td>
<td style="text-align:center">3.157rem</td>
</tr>
<tr>
<td style="text-align:center">1.728rem</td>
<td style="text-align:center">2.369rem</td>
</tr>
<tr>
<td style="text-align:center">1.44rem</td>
<td style="text-align:center">1.777rem</td>
</tr>
<tr>
<td style="text-align:center">1.2rem</td>
<td style="text-align:center">1.333rem</td>
</tr>
<tr>
<td style="text-align:center">1rem</td>
<td style="text-align:center">1rem</td>
</tr>
</tbody>
</table>

## Not like this...

This is a perfect situation to use CSS variables. The way I would have approached this with Sass, and how I've seen most people use CSS variables so far, is something like this:

```css
:root {
  /* scale for 1.2 */
  --ms-small-1: 1rem;
  --ms-small-2: 1.2rem;
  --ms-small-3: 1.44rem;
  --ms-small-4: 1.728rem;
  --ms-small-5: 2.074rem;
  --ms-small-6: 2.488rem;

  /* scale for 1.33 */
  --ms-large-1: 1rem;
  --ms-large-2: 1.333rem;
  --ms-large-3: 1.777rem;
  --ms-large-4: 2.369rem;
  --ms-large-5: 3.157rem;
  --ms-large-6: 4.209rem;
}
```

This seems fairly logical, We've defined variables for each of the values in each of the different scales. Next I'd expect to see this:

```css
/* Small scale for small screens: */
h1 {
  font-size: var(--ms-small-6);
}
h2 {
  font-size: var(--ms-small-5);
}
h3 {
  font-size: var(--ms-small-4);
}
h4 {
  font-size: var(--ms-small-3);
}
h5 {
  font-size: var(--ms-small-2);
}
h6 {
  font-size: var(--ms-small-1);
}

/* And large scale for larger screens */
@media screen and (min-width: 800px) {
  h1 {
    font-size: var(--ms-large-6);
  }
  h2 {
    font-size: var(--ms-large-5);
  }
  h3 {
    font-size: var(--ms-large-4);
  }
  h4 {
    font-size: var(--ms-large-3);
  }
  h5 {
    font-size: var(--ms-large-2);
  }
  h6 {
    font-size: var(--ms-large-1);
  }
}
```

<a target="_blank" href="https://codepen.io/MadeByMike/pen/dRoLpJ">This works!</a> More than that, if I want to change any of these values I can do it in one place. That's an even bigger advantage if I'm using variables elsewhere in my CSS.

This is DRY like Sass and I guess that's better than regular CSS. But we can do better.

## More like this...

The example above might seem like the most logical way to do things but it's not taking advantage of how CSS variables work. Let's try again, remembering that CSS variables are scoped to the DOM therefore subject to inheritance and the cascade.

```css
:root {
  /* scale for 1.2 */
  --font-size-1: 1rem;
  --font-size-2: 1.2rem;
  --font-size-3: 1.44rem;
  --font-size-4: 1.728rem;
  --font-size-5: 2.074rem;
  --font-size-6: 2.488rem;
}

@media screen and (min-width: 800px) {
  :root {
    /* scale for 1.33 */
    --font-size-1: 1rem;
    --font-size-2: 1.333rem;
    --font-size-3: 1.777rem;
    --font-size-4: 2.369rem;
    --font-size-5: 3.157rem;
    --font-size-6: 4.209rem;
  }
}
```

Notice that I have only one set of variables now and not one for each scale. I change the value of the variable depending on the screen size. This indirectly results in two things:

1. I'm forced to name the variables differently (not small or large anymore)

1. There is no need for media queries elsewhere in my CSS

I can now use variables directly in my property declarations knowing they will change as required. All the responsive logic is in the variable. The rest of my CSS looks like this:

```css
h1 {
  font-size: var(--font-size-6);
}
h2 {
  font-size: var(--font-size-5);
}
h3 {
  font-size: var(--font-size-4);
}
h4 {
  font-size: var(--font-size-3);
}
h5 {
  font-size: var(--font-size-2);
}
h6 {
  font-size: var(--font-size-1);
}
```

The example above demonstrates a better way of writing CSS with variables. Now let's see if we can define some of these techniques in more detail.

## Techniques for organising code with CSS variables

Variables have the potential to change how we organise and structure CSS, especially in relation to responsive design.

### Separate logic from design

The main advantage is we now have the ability to fully separate logic from design. Effectively this means separating variable declarations from property declarations.

```css
/* This is a variable declaration */
.thing {
  --my-var: red;
}
/* This is a property declaration */
.thing {
  background: var(--my-var);
}
```

My view is you should probably keep variable declarations and property declaration separate. Separating variables from the rest of the declarations is considered good practice when working with preprocessors. This shouldn't change when working with CSS variables.

### Change the value not the variable

In most cases, **I'd now consider it code smell if a media query or CSS selector swaps one variable for another**. Rather than swapping variables it's better to define one variable, set its initial value and change it with a selector or media query.

### If it changes it's a variable

**I'm convinced that in almost all cases, responsive design logic should now be contained in variables**. There is a strong argument too, that when changing any value, whether in a media query or an element scope, it belongs in a variable. If it changes, it is by definition a variable and this logic should be separated from design.

### Fewer media queries

It makes sense for all the logic related to variables to be at the top of the document. It's easier to maintain because you can change it in one place and it's easier to read because you can see what is changing without reading the entire stylesheet.

We couldn't do this with media queries because it fragmented the rules for styling an element across different parts the stylesheet. This was not practical or maintainable, so it made sense group media queries with declarations relating to the sames selectors they changed.

Variables now provide a link between the logic and the implementation of design. **This means in most cases media queries should not be required except for changing CSS variables** and they belong at the top of the document with variable declarations. Above the 'logic fold'.

### Simplify selectors

Effectively separating logic from design also keeps the complexity out of the main property declarations to the point that you can combine selectors.

In this example I have an aside and a main element with different font-sizes. The aside has a dark background and the main element has a light background.

```css
/* Default values */
:root {
  --font-size: 1.2rem;
  --background-color: #fff;
  --text-color: #222;
}
/* Values in aside */
aside {
  --font-size: 1rem;
  --background-color: #222;
  --text-color: #fafafa;
}

/* Same property declarations */
main,
aside {
  font-size: var(--font-size);
  color: var(--text-color);
  background-color: var(--background-color);
}
```

Try it out: 

<p data-height="360" data-theme-id="light" data-slug-hash="YQNVox" data-default-tab="css,result" data-user="MadeByMike" data-embed-version="2" data-pen-title="Organising code with CSS Variables" data-editable="true" class="codepen" data-preview="true">See the Pen <a href="https://codepen.io/MadeByMike/pen/YQNVox/">Organising code with CSS Variables</a> by Mike (<a href="https://codepen.io/MadeByMike">@MadeByMike</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Despite having a completely different appearance these two elements have exactly the same property declarations.

### Less generic variables

A quick warning about combining selectors with overly generic variables. You might think it's a fun idea to have a universal selector and let variables handle all the logic:

```css
/* Don't do this. */
* {
  display: var(--display);
  width: var(--width);
  height: var(--height);
  border: var(--border);
  background: var(--background);
  ...
}
```

Although fun, we should be careful about reusing variables and combining selectors. CSS variables are subject to the cascade. With the above example, when setting a border on a class `.container` like this:

```css
.container {
  --border: solid 2px tomato;
}
```

Everything inside that container will inherit the same border. Pretty soon you will be overriding variables on everything, and you don't need a universal `*` selector to fall into this trap.

### Use preprocessors for static variables

Do CSS variables replace preprocessors? No. Using preprocessors still makes sense. It's a good idea to keep all your static variables in Sass (or whatever preprocessor you use).

```scss
// Static variables:
$breakpoint-small: 600px;
$theme-color: rebeccapurple;

// Dynamic variables
@media screen and (min-width: $breakpoint-small) {
  body {
    --background: $theme-color;
  }
}
```

Not only does this denote static variables from dynamic variables in your code, but CSS variables can only be used for property declarations. In other words they can't be used in media queries.

Preprocessor also have color functions, mixins and allows us to keep styles related to different components in different files. All of this stuff still makes sense.

## New approach to responsive design

I think CSS variables offer a completely new approach to responsive design and will challenge some techniques and thinking we've developed over many years. These tips are just a few of the obvious things we need to consider.

I made a <a target="_blank" href="https://codepen.io/MadeByMike/pen/dRNqNw/">detailed example</a> of a simple responsive site that demonstrates some of the techniques and suggestions outlined in this article.

<p data-height="510" data-theme-id="light" data-slug-hash="dRNqNw" data-default-tab="css,result" data-user="MadeByMike" data-embed-version="2" data-pen-title="Responsive design with CSS variables" data-editable="true" class="codepen" data-preview="true">See the Pen <a href="https://codepen.io/MadeByMike/pen/dRNqNw/">Responsive design with CSS variables</a> by Mike (<a href="https://codepen.io/MadeByMike">@MadeByMike</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>


<a target="_blank" href="https://codepen.io/MadeByMike/pen/dRNqNw/">Open this demo in CodePen</a> to see how it responds to different viewport sizes.

If you have any thoughts about how CSS variables might change how we think about, manage and structure CSS please [let me know on Twitter](https://twitter.com/MikeRiethmuller).

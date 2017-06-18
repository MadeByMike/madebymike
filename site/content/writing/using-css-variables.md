---
title: Using CSS Variables
date: 2017-06-18T05:20:19.633Z
description: >-
  CSS Variables (also known as Custom Properties) are supported in all modern
  browsers and people are starting to use them production. They have the
  potential to change how we write and think about CSS. I thought I'd do a few
  quick demos showing how this might happen.
image: null
extra_css:
  - ''
extra_js:
  - ''
body_class: ' '
update: ' '
---
Native CSS Variables (also known as Custom Properties) are supported in all modern browsers and people are starting to use them production. This great but they're different form variables in preprocessors and I've already seen examples of people using them without considering the advantages they offer.
 
I thought I'd do a quick demo and show some good and bad ways to use them.

## How do they differ?

How do they differ? The main difference is CSS variables can change, as variables typically do. You might not have thought about it but variables in preprocessors like Sass don't really change. Sure, you can update the value of a variable at different points in the compilation, but when it's rendered to CSS all values are static.
 
This makes variables in preprocessors a great tool for writing DRY (Don't Repeat Yourself) and manageable CSS. CSS variables on the other hand, can respond to context within the page.

They are subject to the cascade. This is great because you can change the value inside a media query, or when an element is the child of a particular container. The same variables can provide different values in different places on the page. You even read and manipulate them with JavaScript.
 
If you haven't thought of a ton of uses for this already we will come back to that. First let me demonstrate how not to use CSS variables.
 
##An example

I'm going to use modular scales as an example. A modular scale is a mathematical scale that can be used as a basis for choosing heading sizes. I like to do this, and I like to choose different scales for small and large screens.
 
I'm going to use a scale 1.2 for smalls screens and 1.33 for large screens. I don't like maths so I got these values from [modularscale.com](http://www.modularscale.com/) and these are my heading sizes:
 
| 1.2        | 1.33       | 
|:----------:|:----------:|
| 2.488rem   |  4.209rem  |
| 2.074rem   |  3.157rem  |
| 1.728rem   |  2.369rem  |
| 1.44rem    |  1.777rem  |
| 1.2rem     |  1.333rem  |
| 1rem       |  1rem      |

###My first attempt

This is a perfect situation to use CSS variables. They way I would have approached this in Sass and how I've seen most people use CSS variables so far is something like this:
 
```css
:root {	
  /* scale for 1.2 */
  --ms-small-1: 1em;
  --ms-small-2: 1.2em;
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
 
This seems fairly logical, We've defined variables for each of the values in the different scales. Next I'd expect to see this:
 
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
<a target="_blank" href="https://codepen.io/MadeByMike/pen/dRoLpJ">This works!</a> More than that, if I want to change any of these values I can do it in one place. That's an even bigger advantage if I'm using variables elsewhere in my CSS. This is DRY like Sass and I guess that's better than regular CSS. But we can do better.
 
The example above might seem like the most logical way to do things but it's not taking advantage of how CSS variables work.

###A better way

Let's try again, remembering that CSS variables are scoped to the DOM therefore subject to inheritance and the cascade. 
 
```css
:root {
  /* scale for 1.2 */
  --font-size-1: 1em;
  --font-size-2: 1.2em;
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
Notice that I have only one set of variables now and not one for each scale. I change the value of the variables depending on the screen size. This indirectly results in two things:
 
  1. I'm forced to name the variables differently (not small or large anymore)
  2. There is no need for media queries elsewhere in my CSS
 
I can now just use variables in the correct place. All of the responsive logic is contained where the variables are declared. The rest of my CSS looks like this:
 
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
##Good practices for CSS Variables

This is hugely significant and has the potential to change how we write CSS. 
 
In most cases I'd now consider it code smell if a media query or CSS selector swaps one variable for another (such as in the first example). Rather than swapping variables it's better to define one variable, set it's initial value, and change this value with a selector or media query.
 
Sites that use CSS variables well, should have very few media queries other than for changing the value of variables. Even for variables scoped to an element it makes sense for all the logic related to the variable to be at the top of the document.
 
Separating variable declarations form property declarations should be considered good practice when using CSS Variables, just the same as it is with preprocessors.
 
In this example I have an aside and a main element with different font-sizes. The aside has a dark background and the main element has a light background.
 
```css
/* Default values */
:root {
  --font-size: 1.2em;
  --background-color: #fff;
  --text-color: #222;
}
/* Values in aside */
aside {
  --font-size: 1em;
  --background-color: #222;
  --text-color: #FAFAFA;
}
 
/* Same property declarations */
main,
aside {
  font-size: var(--font-size);
  color: var(--text-color);
  background-color: var(--background-color);
}
 
```
This has resulted in completely different appearance for these two elements, even though the property declarations are identical.

<p data-height="265" data-theme-id="dark" data-slug-hash="YQNVox" data-default-tab="css,result" data-user="MadeByMike" data-embed-version="2" data-pen-title="Organising code with CSS Variables" class="codepen">See the Pen <a href="https://codepen.io/MadeByMike/pen/YQNVox/">Organising code with CSS Variables</a> by Mike (<a href="https://codepen.io/MadeByMike">@MadeByMike</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
 
This is pretty powerful but for larger projects, separating components into different files still makes sense. It's far better to repeat these declarations even if it feels like duplication.

You should also be sensible about reusing variables. If you change the value of a variable on the `body` element for example, this will now be the value of that variable for every child element of the `body`.

Keeping these things in mind it should be possible to write 



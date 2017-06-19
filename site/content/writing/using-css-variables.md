+++
body_class = ""
date = "2017-06-18T18:38:07+00:00"
description = "CSS Variables (also known as Custom Properties) are supported in all modern browsers and people are starting to use them production. They have the potential to change how we write and think about CSS. I thought I'd do a few quick demos showing how this might happen."
draft = true
extra_css = []
extra_js = []
image = ""
publish_date = "2017-06-18T08:38:10.388Z"
title = "Using CSS Variables"
update = ""

+++


Native CSS Variables (also known as Custom Properties) are supported in all modern browsers now and people are starting to use them production. This great but they're different form variables in preprocessors and I've already seen some examples of people using them without considering the advantage they offer.

I thought I'd do a few quick demos that show some good and bad ways to use CSS variables, and talk about how their differences from preprocessors will change how we write and structure CSS.

<span style="color: rgb(40, 40, 40); font-size: 2.1em; word-spacing: 0.5px;">How do they differ?</span>

Firstly how do they differ? The main difference is CSS variables can change. This might not sound surprising, variables typically do change. You might not have thought about it, but variables in preprocessors like Sass don't really change. Sure, you can update the value of a variable at different points in the compilation process, but when it's rendered to CSS the values are always static.

This makes variables in preprocessors a great tool for writing DRY (Don't Repeat Yourself) and manageable CSS. CSS variables on the other hand, can respond to context within the page.

We can refer to Sass variables as statically scoped and CSS variables as dynamically scoped.

Dynamically scoped in this instance means they are subject to the cascade. This is great because you can change the value of a CSS variable inside a media query or when an element when an element matches a CSS selector. Using the same variable we can different values in different places on the page. You even read and manipulate CSS variables with JavaScript.

If you haven't thought of a ton of uses for this already you will have by the end of this article. First let me demonstrate how not to use CSS variables.

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

This is a perfect situation to use CSS variables. They way I would have approached this with Sass and how I've seen most people use CSS variables so far is something like this:

```
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

```
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

## More like this...

<span style="font-size: 1rem;">The example above might seem like the most logical way to do things but it's not taking advantage of how CSS variables work.&nbsp;</span>Let's try again, remembering that CSS variables are scoped to the DOM therefore subject to inheritance and the cascade.

```
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

Notice that I have only one set of variables now and not one for each scale. I change the value of the variable depending on the screen size. This indirectly results in two things:

1. I'm forced to name the variables differently (not small or large anymore)

1. There is no need for media queries elsewhere in my CSS

I can now use variables directly in my property declarations knowing they will change as required. All the responsive logic is in the variable. The rest of my CSS looks like this:

```
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

## Techniques for organising CSS variables

The above example demonstrates a better way of writing CSS with variables. Variables have the potential to change how we organise and structure CSS, especially in relation to responsive design.

In most cases I'd now consider it code smell if a media query or CSS selector swaps one variable for another (such as in the first example). Rather than swapping variables it's better to define one variable, set it's initial value and change this with a selector or media query.

Separating variables form property declarations is considered good practice when working with preprocessors. This shouldn't change when working with CSS variables.

In fact, **I'm convinced that in almost all cases, responsive design logic should now be contained in variables**. There is a strong argument too, that when changing any value, whether in a media query or an element scope, it belongs in a variable. If it changes it is by definition a variable and this logic should be separated from  design.

Effectively separating logic from design can make CSS

In this example I have an aside and a main element with different font-sizes. The aside has a dark background and the main element has a light background.

```
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

This has resulted in a completely different appearance for these two elements, even though the property declarations are identical.

See the Pen [Organising code with CSS Variables](https://codepen.io/MadeByMike/pen/YQNVox/) by Mike ([@MadeByMike](https://codepen.io/MadeByMike)) on [CodePen](https://codepen.io).
<script type="null"></script>

This is pretty powerful but for larger projects, separating components into different files still makes sense. It's far better to repeat these declarations even if it feels like duplication.

It makes sense for all the logic related to variables to be at the top of the document. It's easier to maintain because you can change it in one place and it's easier to read because you can see what properties are changing and when.

See the Pen Responsive design with CSS variables by Mike (@MadeByMike) on CodePen.

You should also be sensible about reusing variables. If you change the value of a variable on the `body` element for example, this will now be the value of that variable for every child element of the `body`.

Keeping these things in mind it should be possible to write
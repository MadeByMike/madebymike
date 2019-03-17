---
title: The Difference Between currentColor & Custom Properties
slug: currentcolor-and-custom-properties
description: There are some interesting differences between how currentColor and custom properties work. Both are examples of dynamic properties in CSS but how they are resolved differs in some very important ways. I recently came across an example of this that had me scratching my head for a while.
date: 2018-11-11
tags: [css, "custom properties"]
---

A friend was trying to set a theme on a container and have it apply a color to the border of a heading, and the body text. Something like this:

<div class="full-width">
  <img class="shadow" alt="A black heading with a blue border and blue paragraphs below" src="/images/custom-props.png">
</div>

She wanted to keep it simple with minimal CSS and ideally set the theme by applying just a single class in the HTML.

Since we wanted to change the color of more than just paragraphs in the body text, it made sense to start by setting the `color` property on a container element. This would allow all elements inside the container to inherit the theme color and we could just set the headings back to black.

Since we wanted to set the color in just one place, I suggested we set the value of `border-color` on the headings to inherit. This would cause the heading element to have the same value for `border-color` as its parent element. To my initial surprise the color of the border was black.

My CSS was something like this:

```css
.theme {
  color: #2378a3;
}

.theme-heading {
  color: black;
  border-color: inherit;
}
```

Since there is no `border-color` set on the `.theme` class, the default value is used. The default for `border-color` is `currentColor`, and in the context of `.theme`, the value of `currentColor` in this example is `#2378a3`. This is the value I expected `.theme-heading` to inherit.

You might be wondering, as I was, what exactly is happening? The answer is, it’s not a bug, and it’s still inheriting from the parent element. It turns out, when we inherit `currentColor` we are not retrieving the resolved value of that property from the parent. Instead we are inheriting the keyword itself, and the computed value will be resolved in the local context. And, therefore in this example the border color will be black.

The solution is of course to set the value of the `border-color` as well as `color` in the `.theme` selector:

```css
.theme {
  color: #2378a3;
  border-color: #2378a3;
}

.theme-heading {
  color: black;
  border-color: inherit;
}
```

Now we are no longer inheriting a dynamic property and the border color will be `#2378a3` as expected. And we are still setting the color values only on the `.theme` class.

Maybe this is what you expected. Perhaps the reason I didn’t, is that I’ve been working with custom properties a lot recently, and although they are both dynamic, custom properties will not work like `currentColor` in the same situation.

An equivalent example with custom properties would look something like this:

```css
.theme {
  --theme-color: #2378a3;
  color: var(--theme-color);
  border-color: var(--theme-color);
}

.theme-heading {
  --theme-color: black;
  color: var(--theme-color);
  border-color: inherit;
}
```

In this situation the `border-color` of `.theme-heading` is inheriting the `--theme-color` custom property from the parent element. Yet even though the value of `--theme-color` is set locally to black, its border-color will not use this local value in the same way `currentColor` did.

Inheriting a value set by a custom property will always match the resolved value from the parent.

**Note**: The `color` property in this example will take the local value, because it is not inherited.

The key difference here is: The `currentColor` keyword is not resolved at computed-value time, but is a reference to the used value of the local `color` property.

Since learning about custom properties, I'd started to think of `currentColor` as a dynamic property in a very similar to custom properties. It turns out there are some fundamental differences that have real implications that we should be aware of. And again, this example highlights how different custom properties are from variables in preprocessors.

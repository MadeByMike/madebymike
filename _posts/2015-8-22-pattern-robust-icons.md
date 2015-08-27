---
layout: post
title: "Pattern: Robust icons"
extra_css:
  - pattern-icons.css
---

I want to share a design pattern I've been using for icons. It's a robust technique that works in almost any situation. With this technique you can use icons inline or append &amp; prepend them to existing content. It works with paragraphs, headings, navigation items, buttons &hellip;almost any element.

<div class="robust-icon-container">
	<a class="robust-icon-examples icon-right-tomato icon-large" href="http://codepen.io/MadeByMike/pen/xGoMMw?editors=010">

		<h2 class="icon-left-tomato">Examples</h2>
		<p>View more examples <span class="icon icon-tomato icon-small"></span> on CodePen.</p>
		<button class="icon-right-tomato mtl mbl">View Examples</button>

	</a>
</div>

It's also easy to extend so I can usually drop it into almost any project.

##Usage

###Inline:

```css
<span class="icon icon-{icon-name}"></span>
```

###Prepend:

```css
<div class="icon-left-{icon-name}"></div>
```

###Append:

```css
<div class="icon-right-{icon-name}"></div>
```

###Size modifiers:

```css
<span class="icon icon-{icon-name} icon-small"></span>
<div class="icon-right-{icon-name} icon-large"></div>
<span class="icon icon-{icon-name} icon-responsive"></span>
```

##How it works

When appending or prepending, no matter the hight of the content, the icon will always be centred. Icons are vertically centred using absolutely positioned pseudo elements and left and right padding is added to the parent element as required to ensure icons and content always have adequate spacing.

The clever part of this technique, apart from the vertical centring, is the use of attribute selectors to target elements that that contain various `icon-` prefixes. By targeting attribute selectors we need fewer class names to apply icon styles and adding new icons or modifiers becomes exceptionally easy.

##Extending the icon library

If you follow the naming conventions all you need to add a new icon to the set is a background image. To add a new icon we just need to add following line and change `{icon-name}` to the name of our new icon.

Check out some <a href="http://codepen.io/MadeByMike/pen/xGoMMw?editors=010">demos on CodePen</a> or just <a href="https://gist.github.com/MadeByMike/b15aac18adc6a664efa4">grab the code</a>.

```css
.icon-{icon-name},
.icon-left-{icon-name}:before,
.icon-right-{icon-name}:after{
	background-image: url(icon-name.svg);
}
```
This is the first of hopefully more short articles, where I share some of my favourite desing patterns.







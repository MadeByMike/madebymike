---
layout: post
title: Understanding Flexbox
extra_css:
  - understanding-flex.css 
---
Instead of covering all properties of Flexbox this article focuses on understanding how Flexbox calculates the width of items. The examples in this article are all in the context of a horizontal layout, but the same logic applies if you use a vertical layout.

If you don't know what Flexbox is, it's a layout method best suited for distributing the available space inside a container, amongst child items, even when the number of child items, their size and even their DOM order is not known or might change. [Have a look at this guide](http://css-tricks.com/snippets/css/a-guide-to-flexbox/), and [take a look at some examples](http://codepen.io/MadeByMike/pen/26cb650eaef356da925e75139537f74e) it might look like magic, but it's not, there is a method for calculating the size of child items.

##How does it work?

The full algorithm for working out flexbox a layout in any situation is [available here](http://dev.w3.org/csswg/css-flexbox/#layout-algorithm), but as the spec rightly states:

<blockquote>Authors writing web pages should generally be served well by the individual property descriptions, and do not need to read this section unless they have a deep-seated urge to understand arcane details of CSS layout.</blockquote>

While this is true, I believe that designers and developers will want to understand some parts of the layout algorithm. In particular so that they can roughly estimate width of height of flex items and confidently assign flex values with excessive trial and error. That is what this description aims to provide, just the bare minimum of how to determine the width of an item.

Flexbox wants to fit in. If a flex item is allowed to be itself the flex-basis tells the browser what size it wants to be. Think of the flex-basis as a suggested size or ideal size. If a flex-basis is not set, or if it is set to 'auto', it will equal the initial size of the element. In other words, it will be the width of its inner content.

<strong>Note:</strong> If a flex item has borders, margin or padding these values need to be added to the flex-basis according to the current box-sizing method when calculating the remaining space. They should also be added to the values at then end of calculation to get the final outer width of each flex item.

Once each flex-basis has been determined the browser adds these together along with any margins, borders or padding and checks to see if there is any space remaining in the container. If there is space remaining it will destribute this proportionally amoungst the flex items, according to their flex-grow values. Similarly, if the space remaining is negative it will shrink each item proporitionatly, accoring to their flex-shrink values. Of course if the remaining space is 0, nothing more needs to be done.

###Increasing the size of flex items (flex-growing)

When the combined size of all the flex items is less than their container, the remaining space is distributed amongst all the items. The flex-grow attribute is used to determine how the remaining space should be allocated. To work out how much space is allocated to each item, take the ratio of the item's flex-grow value, over the total of all the other flex-grow values in the same container and multiply this by the space remaining. Here is an example:

<div id="example-static-flex-1" class="flex-container">
	<div class="flex-item flex-item-1">Item 1</div>
	<div class="flex-item flex-item-2">Item 2</div>
</div> 
<div class="example-container pre">
.flex-container{ width: 600px; }
.flex-item-1{ flex-basis: 200px; flex-grow: 3; }
.flex-item-2{ flex-basis: 200px; flex-grow: 1; }

Total basis: 400px
Space remaining:  200px

Item 1 grow factor: 3/4 &times; 200px = 150px
Item 2 grow factor: 1/4 &times; 200px = 50px
</div>

The space remaining is 200px, this is equal to the width of the flex container (600px) minus the total basis (400px). Of the remaining space (200px), ¾ (150px) is allocated to item 1 and ¼ (50px) to item 2. 

These fractions are determined by taking the items individual flex-grow value over the combined flex-grow value of all items. To get the final width of each item, add this result to the initial flex-basis (350px and 250px).

To give another example; if both items had a flex-grow value of 1, or in any case where they had the same number, they would each be allocated half the remaining space. If one item had a value of 2 and the other 1, the first flex item would be allocated ⅔ of the remaining space and the other ⅓. This works the same with 3, 4, 5 or any number of items although obviously the fractions will differ.

###Decreasing the size of flex items (flex-shrinking)

If the space remaining is a negative this means that the flex container is smaller than the preferred width of all the flex items. They are going to have to shrink. By assigning a flex-shrink value we can control much space each flex item will surrender. 

For some reason the method for working out flex shrink differs slightly and is a little harder.

Rather than working out the ratio of a items flex-shrink value against the total of all flex-shrink values, for each item we first multiply its flex shrink value by its basis and then workout the ratio of this number against the sum of all flex-basis values multiply their flex-shrink.

<div id="example-static-flex-2" class="flex-container">
	<div class="flex-item flex-item-1">Item 1</div>
	<div class="flex-item flex-item-2">Item 2</div>
	<div class="flex-item flex-item-3">Item 2</div>
</div>  
<div class="example-container pre">
.flex-container{ width: 600px; }
.flex-item-1{ flex-basis: 100px; flex-shrink: 1; }
.flex-item-2{ flex-basis: 400px; flex-shrink: 1; }
.flex-item-3{ flex-basis: 400px; flex-shrink: 1; }

Total basis: 900px
Space remaining: -300px

Item 1 shrink factor: (1&times;100) / (100px + 400px + 400px) = .111 &times; -300px = -33.333px
Item 2 shrink factor: (1&times;400) / (100px + 400px + 400px) = .444 &times; -300px = -66.666px
Item 3 shrink factor: (1&times;400) / (100px + 400px + 400px) = .444 &times; -300px = -66.666px
</div>

The space remaining is -300px, this is equal to the width of the flex container (600px) minus the total basis (900px). To find the shrink factor for each, multiply its flex-shrink value by its flex-basis value (1&times;100px or 1&times;400px), then divide this by the combined sum of the flex-shrink multiply the flex-basis for all items (1&times;100px) + (1&times;400px) + (1&times;400px).

Finally multiply this number by the space remaining (-300px) to get the amount to reduce each item by (33.33px and 66.66px).

In the above example if the flex shrink of the first item was to change to 2 the result would differ as follows:

<div class="example-container pre">.flex-container{ width: 600px; }
.flex-item-1{ flex-basis: 100px; flex-shrink: 2; }
.flex-item-2{ flex-basis: 400px; flex-shrink: 1; }
.flex-item-3{ flex-basis: 400px; flex-shrink: 1; }

Total basis: 900px
Space remaining: -300px

Item 1 shrink factor: (2&times;100) / (200px + 400px + 400px) = .111 &times; -300px = -60px
Item 2 shrink factor: (1&times;400) / (200px + 400px + 400px) = .444 &times; -300px = -120px
Item 3 shrink factor: (1&times;400) / (200px + 400px + 400px) = .444 &times; -300px = -120px
</div>

##More info

  - I built a little [tool for testing flexbox calculations](/demos/flexbox-tester/),
  - Chris Wright covers his [adventures with flexbox](http://chriswrightdesign.com/experiments/flexbox-adventures/),
  - Chris Coyier [a Complete Guide to Flexbox](http://css-tricks.com/snippets/css/a-guide-to-flexbox/),
  - Chris Mills, wrote a great [introduction to flexbox](https://dev.opera.com/articles/flexbox-basics/),
  - If you really must, every detail is available [in the spec](http://dev.w3.org/csswg/css-flexbox/#layout-algorithm)


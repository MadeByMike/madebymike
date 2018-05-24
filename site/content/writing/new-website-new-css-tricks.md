---
title: New website & some new CSS tricks
date: 2018-01-10T00:33:36.494Z
description: 'New design, content and some new CSS tricks on my new website.'
---
Like many people, I decided to redesign my website for 2018. In addition to updating the visual design, I changed the way I publish content. I want to share more than just long-form blog post, so expect to see CodePen collections, short lists, videos and links to content I've published elsewhere. 

One of the things I am really excited about is the chance to share content and resources created by friends in the community. That's why I created the "Not Ads" section I want to post new stuff here every couple of weeks so if you have something you want me to share [email me](mailto:mike@madebymike.com.au), but remember they are "not ads". 

I've also made some technical updates. The site is now making extensive use of CSS Grid and Custom Properties and I want to share a few tricks I've learnt during the development process.

## Tricks with CSS Grid

I've used a number of a number of different grids on the site, but by far the most complicated is the list of cards on the homepage. Although it looks relatively simple, it's actually quite a complicated layout problem. 

I wanted to auto-fill a region of the grid while having a full height item in the left-hand column that spans all the rows.

<img data-src="/img/grid-trick.png" alt="A CSS grid trick">

My first idea was to make a narrow container for the left column and a wide container for the right columns placing different grids in each of these containers. This could have worked, except my cards have variable widths and the number of columns on the right-hand side is variable depending on the space available. This means the number of rows is also variable.

I also wanted all columns to have the same width and I quickly realised to achieve this with variable widths, the left column had to be part of the same grid.

Let's look at the requirements for the grid: There can be any number of cards in the grid, the cards can be different sizes and might span multiple columns or rows. Columns also have a minimum width and the number of columns varies depending on the space available. 

To create a responsive grid like this, we can use the `grid-template-columns` along with the `repeat()`, `minmax()` and the `auto-fit` keyword. It might look something like this:

```css
.card-grid {
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 10px;
}
.card-wide {
  grid-column: span 2;
}
.card-tall {
  grid-row: span 2;
}
.card-large {
  grid-row: span 2;
  grid-column: span 2;
}
```

The first item in the grid is now the left column. This special item is both a grid-item and a grid-container. It has a grid with a single column that can contain other grid items. The mark-up looks something like this:

```html
<div class="grid">
   <div class="grid-item special-item">
    <div class="grid-item other-item"></div>
    <div class="grid-item other-item"></div>
   </div>
   <div class="grid-item"></div>
   <div class="grid-item"></div>
   <div class="grid-item"></div>
</div>
```

By default the left column with take up a single grid cell in the grid. Just like any other item, it spans a single row and other items in the gird can be placed beside and beneath this item.

With the tall and large cards we created earlier, we already know how to make grid items span multiple columns and rows. We could make the left column span the full height using: `grid-row: span 5;`, but this grid is responsive. When the number of columns is reduced, the number of rows increases. 

This is when I thought what if I make the item span 999 rows? This meant 999 rows were added to the grid. Rows without content have a height of 0, but the `grid-gap` meant I had 9,990 pixels of whitespace beneath the grid. I like a little whitespace but not that much.

Luckily margins collapse so I swapped the `grid-gap` for margins on individual grid-items. I did the old trick of adding a negative left and right margin on the grid container, equal to the margin on the grid-items. This means everything in the grid will align with other content on the page. The final result is something like this:

```css
.card-grid {
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}
.card {
  margin: 10px;
}
.left-col {
  display: grid;
  grid-row-start: 1;
  grid-row-end: 999;
  order: 0;
  align-items: start;
}
```

I added a few media queries and adjusted the `grid-template-columns` slightly for different layout on smaller screens. I added `order: 0;` to the left column because this meant I could change the DOM order and move it underneath the main content on mobile. This also makes sense for screen-readers as it's secondary content.

I've isolated a simple demo in a CodePen so you can experiment with or copy this technique. 

<p data-height="495" data-theme-id="light" data-slug-hash="ppwPBo" data-default-tab="html,result" data-user="MadeByMike" data-embed-version="2" data-pen-title="A CSS grid trick" class="codepen">See the Pen <a href="https://codepen.io/MadeByMike/pen/ppwPBo/">A CSS grid trick</a> by Mike (<a href="https://codepen.io/MadeByMike">@MadeByMike</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script> 

In the end, I was very happy with this result. It's definitely a bit of a hack but it's a nice one.

## Visited link checklists

You might have noticed that some of the lists I've published have checkboxes next to them. They are not interactive but if you visit one of the pages on the list you will see the item become checked.

<img data-src="/img/check-list.png">

This is a nifty little design feature that I am very happy with. It's just an elaborate visited `:visited` style, but the technique is far from simple. 

My idea was to create a checkbox style with CSS, then toggle the opacity of the tick depending on the :visited state. But visited styles are extremely restrictive. MDN does a great job of [explaining these restrictions](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Avisited). In short, you can only style color values, but this includes SVG `fill` and `stroke`.

My idea became to use an inline SVG. Did you know that you can set a `fill` property on an HTML element and that an inline SVG can inherit this color?

```css
a {
  fill: rgba(0,0,0,0);
}

a:visited {
  fill: rgba(0,0,0,1);
}
```

```html
<li>
  <a href="...">
    <svg>
      <use xlink:href="#icon-tick"></use>
    </svg>
    Check Link</a>
</li>
```

I knew I couldn't change the display or the opacity so my plan was to change the fill on the tick mark from `rgba(0,0,0,0)` to `rgba(0,0,0,1)`. This should work because I am only changing the color right? I was wrong! CSS was not going take any of my nonsense.

Another interesting restriction on styling `:visited` links is that the color and fill will retain the original alpha value. If you are interested in the reason behind these restrictions [read the MDN explaination](https://developer.mozilla.org/en-US/docs/Web/CSS/Privacy_and_the_:visited_selector).

Ok, plan C. What if I make the fill of the tick, match the background color? The only problem with this approach was that the tick would be visible over the top of the box resulting in this: <img alt="check-mark with broken border" data-src="/img/check.png">

That's far from the end of the world, but the broken borders on the box were going to annoy me and the solution was simple. When visible the tick is almost the same color as the border, so I can place the box over the top of the tick symbol. Even though the border will be drawn on the top, it won't be visible.

The final result looks something like this:

<p data-height="279" data-theme-id="light" data-slug-hash="XVEoOX" data-default-tab="html,result" data-user="MadeByMike" data-embed-version="2" data-pen-title="CSS :visited checklist" class="codepen">See the Pen <a href="https://codepen.io/MadeByMike/pen/XVEoOX/">CSS :visited checklist</a> by Mike (<a href="https://codepen.io/MadeByMike">@MadeByMike</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

It takes a little effort to get nice visited styles but I think it can be a helpful little bit of UX.
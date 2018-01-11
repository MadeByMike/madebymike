---
title: New website & new CSS tricks
date: 2018-01-10T00:33:36.494Z
description: 'New design, content and some new CSS tricks on my new website.'
no_link: true
external_link: dfssg
---
Like many people I decided to redesign my website for 2018. In addition to updating the visual design I changed the way I publish content. I want to share more than just long form blog post, so expect to see more CodePen collections, short lists, videos as well as links to other content and resources created by friends in the community.

I've also made some technical updates. The site is now making extensive use of CSS Grid and Custom Properties. I want to share a few tricks I've learnt during the development process:

## Tricks with CSS Grid

I've used a number of a number of different grids on the site, but by far the most complicated is the list of cards on the homepage. Although it looks relatively simple, it's actually quite a complicated layout problem. 

I wanted to auto fill a region of the grid, while having a full height item in the right hand column that spans all the rows.

![A css grid trick](/img/grid-trick.png)

My first idea was to make a narrow container for the left column and a wide container for the right columns placing different grids in each of these containers. This could have worked, except my cards have variable widths and the the number of columns on the right-hand side is variable depending on the space available. This means the number of rows is also variable.

I also wanted all columns to have the same width and I quickly realised to achieved this with variable withs, the left column had to be part of the same grid.

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

By default the left column with take up a single grid cell in the grid. Just like any other item it spans a single row and other items in the gird can be placed beside and beneath this item.

With the tall and large cards we created earlier, we already know how to make grid items span multiple columns and rows. We could make the left column span the full height using: \`grid-row: span 5;\`, but this grid is responsive. When the number of columns is reduced, the number of rows increases. 

This is when I thought what if I make the item span 999 rows? This ment 999 rows were added to the grid. Rows without content have a height of 0, but the \`grid-gap\` meant I had 9990 pixels of whitespace beneath the grid. I like a little whitespace but not that much.

Luckily margins collapse so I swapped the `grid-gap` for margins on individual grid-items. I did the old trick of adding a negative left and right margin on the grid container, equal to the margin on the grid-items. This means everything in the grid will align with other content on the page. The final result is something like this:

```
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

I added a few media queries and adjusted the `grid-template-columns` slighlty for differnt layout on smaller screens. I added `order: 0;` to the left column because this meant I could change the DOM order and it underneath the main content for mobile. This also makes sense for screen-readers as it is secondary content.

I've isolated a simple demo in a CodePen so you can experiment with or copy this technique. 

<p data-height="495" data-theme-id="light" data-slug-hash="ppwPBo" data-default-tab="html,result" data-user="MadeByMike" data-embed-version="2" data-pen-title="A CSS grid trick" class="codepen">See the Pen <a href="https://codepen.io/MadeByMike/pen/ppwPBo/">A CSS grid trick</a> by Mike (<a href="https://codepen.io/MadeByMike">@MadeByMike</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script> 

In the end I was very happy with this result. It's definitely a bit of a hack but it's a nice one.

## Visited links checklists

You might have noticed that some of the list I've publised have checkboxes next to them. They are not interactive but if you visit one of the pages on the list you will see the item become checked.

![checklists](/img/check-list.png)

This is a niffty little design feature that I am very happy with. It's just an elaborate visited \`:visited\` style, but the techniqe is far from simple. 

My idea was to create a checkbox style with CSS, then toggle the opacity of the tick depending on the :visited state. But visited styles are extreemly restrictive. MDN does a great job of [explaining these restrictions](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Avisited). In short, you can only style color values, but this includes SVG `fill` a `stroke`.

My idea became to use an inline SVG. Did you know that you can set a `fill` property on an HTML element and that an inline SVG can inherrit this color?

````css
        a {
          fill: rgba(0,0,0,0);
        }

        a:visited {
          fill: rgba(0,0,0,1);
        }
        ``

        ```html
        <li>
          <a href="...">
            <svg>
              <use xlink:href="#icon-tick"></use>
            </svg>
            Check Link</a>
        </li>
````

I knew I couldn't change the display or the opacity so my plan was to change the fill on the tick mark from `rgba(0,0,0,0)` to `rgba(0,0,0,1)`. This shoudl work because I am only changing the color right? I was wrong! CSS was not going take any of my nonsesne.

Another interesting restriction on styling `:visited` links is that the color and fill will retain the origional alpha value. If you are interested in the reason behind these restrictions [read the MDN explaination](https://developer.mozilla.org/en-US/docs/Web/CSS/Privacy_and_the_:visited_selector).

Ok, plan C. What if I make the fill of the tick match the background color? The only problem with this approach was that the tick would be visible over the top of the box resulting in this: ![check-mark with broken border](/img/check.png) 

That's far from the end of the world but the broken borders of the box were going to anoy me and the solution was simple. Since when it's visible the tick is almost the same color as the border, I can place the over the top of the tick symbol. Even though the border will be drawn over the top, it won't be visible.

My final CSS looks something like this:

```css
.check-list li a {
  position: relative;
  display: flex;
  padding-left: 30px;
  fill: #fff;
}
/* Tick */
.check-list li a svg {
  width: 25px;
  height: 25px;
  position: absolute;
  left: 9px;
  top: 0;
}
/* Box */
.check-list li a:after {
  content: '';
  position: absolute;
  display: block;
  left: 9px;
  top: 0.55em;
  width: 14px;
  height: 14px;
  padding: 0;
  margin: 0;
  border: solid 1px #555;
  border-radius: 2px;
}
.check-list li a:visited {
  color: #666;
  fill: #222;
}
```

---
title: New website & new CSS tricks
date: 2018-01-10T00:33:36.494Z
description: 'New design, content and some new CSS tricks on my new website.'
---
Like many people I decided to redesign my website for 2018. In addition to updating the visual design I changed the way I publish content. I want to share more than just long form blog articles, so expect to see more CodePen collections, short lists, videos as well as links to other content and resources created by friends in the community.

I've also made some technical updates. The site is now making extensive use of CSS Grid and Custom Properties. I want to share a few of the tricks I've learnt in the development process:

## Spanning all column with an auto-fit responsive grid

I've used a number of a number of different grids on the new site, but by far the most complicated is the list of cards on the homepage. Although it looks relatively simple, it's actually quite a complicated layout problem. 

I wanted to auto fill a region of a grid while having a full height item in the right hand column that spans all the rows.

![](/img/grid-trick.png)

There can be any number of cards in the grid, the cards can be different sizes and some might span multiple columns or rows. Columns also have a minimum width and the number of columns varies depending on the space available. To create a responsive grid like this, we can use the `grid-template-columns` feature along with the `repeat()`, `minmax()` and the `auto-fit` keyword. It looks something like this:

```css
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
```

This creates a template that is going to fit as many equal-with columns as possible, with a minimum width of `350px`. 

Creating responsive grids like this is pretty simple and by default, items will be automatically placed on the grid taking into account column and row span values.

<p data-height="495" data-theme-id="light" data-slug-hash="ppwPBo" data-default-tab="html,result" data-user="MadeByMike" data-embed-version="2" data-pen-title="A CSS grid trick" class="codepen">See the Pen <a href="https://codepen.io/MadeByMike/pen/ppwPBo/">A CSS grid trick</a> by Mike (<a href="https://codepen.io/MadeByMike">@MadeByMike</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script> 

But the left hand column of my template is special

## Impossible CSS Grid layout

## Visited links checklist

CSS Variables

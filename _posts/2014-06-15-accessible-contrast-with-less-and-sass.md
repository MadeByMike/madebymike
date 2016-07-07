---
layout: post
title: Accessible contrast with Less and Sass
---
Contrast is a critical factor in web design, it's important to get right because it has a strong influence on the visual aesthetic, but it's especially important for readability and accessibility of text on the page.

It's not a revolutionary idea to suggest that we use Less or Sass to help choose an appropriate text color for a particular background. There are plenty of examples of this, but what is the best way?

Most examples I've seen work on the general principle that, if a background color is "brighter" than 50% give me black text, otherwise give me white text.

But what does "brighter" mean? It depends on the implementation. There are different ways to measure the brightness of a color. Common methods include:

- Lightness - the lightness channel of the HSL color space.
- Value - the value channel of the HSV color space.
- Luminance - the perceptual brightness of a color.

Recently I've been experimenting with different implementations of text contrast mixins using Less and Sass. I've created examples for each method and evaluated them on their ability to meet required WCAG2 contrast ratios.

I found none of the simple methods give a guaranteed accessible result, but it is possible using only Less or Sass to create a mixin that will give desired contrast ratios including WCAG2 AA or AAA level.

## HSL based measurement
Unfortunately it seems **the most common implementation** which is based on lightness, **is the worst visual performer**. In the demo below #7CFC00 is a particularly good example of where the HSL method fails.

<p data-height="266" data-theme-id="6646" data-slug-hash="qjlpF" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/MadeByMike/pen/qjlpF/'>Contrast black\white - lightness (Sass)</a> by Mike (<a href='http://codepen.io/MadeByMike'>@MadeByMike</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>
This example uses Sass, do you prefer Less? [Got you covered](http://codepen.io/MadeByMike/pen/qjlpF)!

## HSV based measurement
My feeling is that HSV provides slightly better results than HSL, but it is still far from perfect. In this demo #0000CD and #8B0000 are two good examples of where HSV measurement fails.

<p data-height="266" data-theme-id="6646" data-slug-hash="hqvod" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/MadeByMike/pen/hqvod/'>Contrast black\white - value (Less)</a> by Mike (<a href='http://codepen.io/MadeByMike'>@MadeByMike</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>
Sorry Sass people, Sass has no HSV functions :(

## Luminance based measurement
Luminance is the perceived brightness of a color and as expected it was the best performer of the three methods tested.

In general I'd say  these results are reasonably good. The correct color is usually picked and the text is generally readable. But closer scrutiny shows that they often don't meet [WCAG 2.0 requirements](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) for text contrast.

<p data-height="266" data-theme-id="6646" data-slug-hash="jJFqI" data-default-tab="result" class="codepen">See the Pen <a href='http://codepen.io/MadeByMike/pen/jJFqI/'>Contrast black\white - luma (Less)</a> by Mike (<a href='http://codepen.io/MadeByMike'>@MadeByMike</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

This examples uses Less, is Sass more your thing? [Got you covered](http://codepen.io/MadeByMike/pen/FoBjq)!

Less has built-in luminance functions but Sass requires a little extra help.

<p>Calculating luminance in Sass using the <a href="http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef">w3c formula for relative luminance</a> requires the <code>pow</code> function, which is available only with <a href="http://compass-style.org/">compass</a>.</p>

I'm not sure exactly how Less calculates luminance but in my tests there was only one difference I could find (#9ACD32).

## Measured contrast ratios

So none of the simple methods work and using only black and white text is somewhat limiting anyway. What if we could measure the contrast ratios and progressively increase the lightness and darkness until a desired contrast ratio is met?

Wait, we can do that! In this demo the acceptable contrast ratio is set to 4.5 (WCAG AA compliance). If the desired contrast ratio can not be met, either black or white is returned using the luminance method.

I believe this method is by far the most useful. It can take a little time to compile, although in most situations you probably won't notice and if you're after guaranteed contrast ratios, this is the only option. No more <code>text-color</code> variables!

<p data-height="266" data-theme-id="6646" data-slug-hash="sDpxg" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/MadeByMike/pen/sDpxg/'>Contrast - WCAG compliant (Sass)</a> by Mike (<a href='http://codepen.io/MadeByMike'>@MadeByMike</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

<p>Prefer Less? <s>Sorry :( I think I may have finally found something I can do with Sass that I can't do with Less, although I haven't given up yet!</s></p>

It turns out this is possible to do with Less although I can't say I like the method. Consider this [proof of concept](http://codepen.io/MadeByMike/pen/rguCF) only.

## Contrast ratios with any color scheme

By default when you pass only one color to the mixin the results are in the same tonal range as the background color. This produces a monochromatic color scheme, however the function accepts a 2nd parameter, allowing a different starting point for the text color.

You can produce a range of [mathamatically determined color schemes](http://codepen.io/MadeByMike/pen/dqxCB) or you could just pick any color and let anarchy rule.

## Usage

<div class="special-attention">
<p>Again we're calculating luminance in Sass which requires the <code>pow</code> function, so you will need <a href="http://compass-style.org/">compass</a>.</p>
</div>

Drop the following functions into your Sass stylesheets.

```css
  @function luma($color){  
    // Thanks voxpelli for a very concise implementation of luminance measure in sass
    // Adapted from: https://gist.github.com/voxpelli/6304812
    $rgba: red($color), green($color), blue($color);
    $rgba2: ();
    @for $i from 1 through 3 {
      $rgb: nth($rgba, $i);
      $rgb: $rgb / 255;
      $rgb: if($rgb < .03928, $rgb / 12.92, pow(($rgb + .055) / 1.055, 2.4));
      $rgba2: append($rgba2, $rgb);
    }
    @return (.2126 * nth($rgba2, 1) + .7152 * nth($rgba2, 2) + 0.0722 * nth($rgba2, 3))*100;
  }

  @function contrast_ratio($color1, $color2) {
    $luma1: luma($color1) + 5;
    $luma2: luma($color2) + 5;
    $ratio: $luma1 / $luma2;
    @if $luma1 < $luma2 {
      $ratio: 1 / $ratio;
    }
    @return $ratio;
  }

  @function text-contrast($color, $bgcolor: $color) {
    $threshold: 4.5; // 4.5 = WCAG AA,7= WCAG AAA
    $list: 20 30 40 50 60 70 80 90 100;
    @each $percent in $list {
      $lighter: lighten($bgcolor, $percent);
      $darker: darken($bgcolor, $percent);
      $darker-ratio: contrast_ratio($color, $darker);
      $lighter-ratio: contrast_ratio($color, $lighter);
      @if($lighter-ratio > $darker-ratio){
        @if ($lighter-ratio > $threshold){
          @return $lighter;
        }
      }
      @if($darker-ratio > $lighter-ratio){
        @if ($darker-ratio > $threshold){
          @return $darker;
        }
      }
    }
    @return if(lightness($color) < 51, #FFF, #000)
  }
```

Call the `text-contrast()` function and pass it the background color:

```css
  .my-element {
	background: $backgroud-color;
    color: text-contrast($backgroud-color);
  }
```
Optionally, pass a second parameter to control the text color:

```css
  .my-element {
	background: $backgroud-color;
    color: text-contrast($backgroud-color, DarkSalmon);
  }
```

### Alternatives to compass

Need an alternative to compass? Voxpelli has a [pure sass alternative]( https://gist.github.com/voxpelli/6304812#file-_math-scss) for the `pow` function.

The w3c also has an alternative [formula for measuring brightness](http://www.w3.org/WAI/ER/WD-AERT/#color-contrast). My [experiments with this method](http://codepen.io/MadeByMike/pen/fwrhD) found it is not adequate for measured contrast ratios, but the results were often reasonable.

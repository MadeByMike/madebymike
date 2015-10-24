---
layout: post
title: Precise control over responsive typography
extra_css:
  - responsive-type.css
---
It is possible to have precise control over responsive typography. Using calc() and viewport units you can create fluid type that scales perfectly between specific pixel values, within a specific viewport range.

<p>
<a href="http://codepen.io/MadeByMike/pen/YPJJYv" class="responsive-type">
  This font is limited to between 20px and 40px, over a viewport range of 600px to 800px.
</a>
</p>

I don’t know why we don’t see viewport units being used more extensively for creating designs with responsive typography.

Viewport units have been around since 2012 and are [fairly well supported](http://caniuse.com/#feat=viewport-units). In fact Internet Explorer was an early mover on this and supports viewport units as far back as IE9.

They are also really easy to understand. One viewport unit is simply 1% of the viewport and there are 4 types of viewport units:

  * vw - viewport width,
  * vh - viewport height,
  * vmin - height or width, whichever is smaller,
  * vmax - height or width, whichever is larger

So the reason viewport units are not used more extensively is probably not due to a lack of browser support or developers' understanding. My guess is it’s probably more likely to do with the lack of precise control designers have over the font-size.

Designers that love typography often really love typography and they enjoy precise control over line-height, font-size, letter-spacing and other elements of typography those of us not in the club might not even know exist.

This desire for precise control is the reason that some designers still prefer to declare these properties using pixels. But it doesn’t really matter, whether they use ems, rems or percentages the truth is, they are all just abstractions of a base font size and that is usually 16 pixels. So they have never really had to give up complete control. It’s not difficult to work out what font-size an element is, as long as we know the base font-size.

But viewport units are different! They represent a fundamental change in approach. Unlike all the other units, viewport units are not relative to the base font size in any way. Instead they are relative to the viewport, which the user controls, and that might be scary for some.

But there are advantages to using viewport units, a font-size declared with viewport units is fluid, meaning it will scale smoothly. This is a clearly a better experience than [clunky responsive typography techniques](http://codepen.io/MadeByMike/pen/c54dfa521cf08e0439943b7a745f77f0) that require multiple media queries.

Responsive typography with viewport units is really easy to implement, just declare the base font-size using vw; as long as you are not using pixels elsewhere in your stylesheet, other units are relative to the base font-size, (which is now viewport units) so they will all scale accordingly.

But there are a few rough edges you will need to sand back. Firstly when you get down to a very small viewport scaling is problematic. Luckily there are a few good methods for avoiding this.

##Limit font scaling with calc()

If you would like set an exact minimum font-size in pixels you can use calc().

```css
:root{
  font-size: calc(16px + 3vw);
}
```

This example says set the default size to 16px + 3vw.

**Note**: There are still issues in some browsers when using viewport units and calc() together, so for now media queries is probably safer.

##Limit font scaling with media queries

You can prevent the text from scaling below a specific threshold simply by using a media query and only applying viewport units above a certain device resolution.

```css
:root { font-size: 18px;  /* default below 600px */ }
@media (min-width: 600px){
  :root {
    font-size: 3vw;
  }
}
```

We can also stop scaling above a specific font-size, but for this we need to first work out what the viewport size will be at the font-size we want to stop scaling. For that we need a bit of maths:

```text
font-size / ( number of viewport units / 100 )
Eg. 24 / ( 3 / 100 ) = 800px
```

With that result just set another media query to change the root font-size back to a fixed unit.

```css
...
@media (min-width: 800px){
  :root {
    font-size: 24px;  /*above 800px */
  }
}
```

The calculations are not that hard but I find it easier to look at a simple table. This helps me visualise the change in font-size across different resolutions.

<table>
  <tbody>
    <tr>
      <th>Viewport units:</th><th>1vw</th><th>2vw</th><th>3vw</th><th>4vw</th><th>5vw</th>
    </tr>
    <tr>
      <th>Viewport size</th><th colspan="5">font-size in pixels</th>
    </tr>
    <tr>
      <th>400px</th><td>4px</td><td>8px</td><td>12px</td><td>16px</td><td>20px</td>
    </tr>
    <tr>
      <th>500px</th><td>5px</td><td>10px</td><td>15px</td><td>20px</td><td>25px</td>
    </tr>
    <tr>
      <th>600px</th><td>6px</td><td>12px</td><td>18px</td><td>24px</td><td>30px</td>
    </tr>
    <tr>
      <th>700px</th><td>7px</td><td>14px</td><td>21px</td><td>28px</td><td>35px</td>
    </tr>
    <tr>
      <th>800px</th><td>8px</td><td>16px</td><td>24px</td><td>32px</td><td>40px</td>
    </tr>
    <tr>
      <th>900px</th><td>9px</td><td>18px</td><td>27px</td><td>36px</td><td>45px</td>
    </tr>
    <tr>
      <th>1000px</th><td>10px</td><td>20px</td><td>30px</td><td>40px</td><td>50px</td>
    </tr>
  </tbody>
</table>

Looking at the table you can see there are many limitations. We have little control over the rate at which viewport units change and we are confined to the options available in the table.

##Precise control with calc()

In his 2012 article on [Fluid Type](http://trentwalton.com/2012/06/19/fluid-type/) Trent Walton said:

<blockquote>"It's been hard to let go of setting a static font-size for a site and calling things done. I’m realizing that the predictability & control we've had over web type is becoming a thing of the past."</blockquote>

But perhaps not all predictability and control is lost.

Let's imagine that as a typography nerd with an eye for absolute precision, you want the font-size at a resolution of 600px to be 12px. Great! Looking at the table, setting a font-size of 2vw will achieve this. But you also want the font-size at 800px to be 32px. It seems you can’t do this without changing from 2vw to 4vw and this means a break-point and our font scaling will be jumpy and not fluid. I consider this a pretty significant limitation.

There is a solution to this! It's not exactly pretty but it works – at least in modern browsers. As stated earlier, some browser have bugs when using calc() and viewport units together, so this might be buggy in some older browsers. (This is not really a concern anymore, just set sensible default font sizes before declaring a fluid type calc() expression.)

It appears that by using calc() and vw we can get responsive typography that scales perfectly between specific pixel values within a specific viewport range.

This means you can have perfect smooth scaling between any 2 font sizes over any viewport range. The font will start scaling and stop scaling exactly where you want.

Try the demo: [Precise control over responsive typography](http://codepen.io/MadeByMike/pen/YPJJYv?editors=110)
The demo uses SASS so you can easily change the upper and lower limits of the font-size and media queries. But the important part looks something like this:

```css
  font-size: calc( 12px + (24 - 12) * ( (100vw - 400px) / ( 800 - 400) ));
```
**Note**: In the example above, 12px is the minimum font-size and 24px is the maximum. 400px is the start of the viewport range and 800px is where it should stop scaling. The inclusion or absence of the units after each value is important.

Put simply, it is a function that takes a value within a range and works out what the new value would be if applied to a different range. I can take the current viewport width (100vw) as input into this ‘function’. For example if I had viewport range of 500px to 1000px, and let’s imagine the current viewport is 750px, I then apply this to a font-size range. If my font-size range was 20px to 30px, because the input of 750px is right in the middle of 500px and 1000px my new font-size will also be right in the middle, 25px. Simple right?

This seems like it could be a pretty useful way to control the scaling of viewport units. It could also have uses beyond typography. You can do other interesting things, by inverting the range for example, you can have font sizes that get smaller as the viewport gets larger. Perhaps there is a use for this? I’d love to hear your thoughts and see other applications or extensions of this idea.

**Update**: Each of the methods above use pixels for 'precise' control, however some readers have expressed concern that this will override user preferences for default font size. This is true, however all methods also work equally well with rem or any other unit type.

##More info

  - [Fluid Type](http://trentwalton.com/2012/06/19/fluid-type/), Trent Walton
  - [Viewport units](https://web-design-weekly.com/2014/11/18/viewport-units-vw-vh-vmin-vmax/), Tim Severien
  - [CSS Viewport Units](https://dev.opera.com/articles/css-viewport-units/), Chris Mills
  - [FitText](http://fittextjs.com/), Dave Rupert
  - [Viewport sized typography] (https://eduardoboucas.com/blog/2015/06/18/viewport-sized-typography-with-minimum-and-maximum-sizes.html), a similar concept by Eduardo Bouças
  - [Molten leading](http://nicewebtype.com/notes/2012/02/03/molten-leading-or-fluid-line-height/)

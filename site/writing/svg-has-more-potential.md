---
title: SVG has more potential
slug: svg-has-more-potential
description: A bunch of interesting techniques for using SVG to make unique responsive components.
date: 2016-09-19
tags: [svg, css]
extra_css: ["/css/resize-images.css"]
extra_js: ["/js/resize-image.js"]
---

I think many of us are not using SVG to its full potential. I often see SVG used as an alternative image format or as a simple solution for icons, and whilst it's great for these things, it's also a lot more than that. SVG can solve problems that HTML and CSS alone can't. It has responsive properties that go beyond vector scaling, such as control over aspect ratio, embedded CSS and a unique co-ordinate system. I rarely see all the features of SVG used together to create unique responsive solutions.

Perhaps the full potential of SVG on the web remains untapped because to get the most out of it, you need care a little more about the mark-up. I'm not advocating writing SVG by hand, but the level of control that most graphics applications give us is not adequate for implementing anything more than basic techniques.

How we overcome this I'm not sure, unlike HTML we need a graphical interface for producing SVG images, but SVG is also a mark-up language, and there are good reasons why we use text editors for HTML. Perhaps SVG will always need both designers and developers to get the most out of it.

With that in mind, let's take some things you can do with SVG that you might not have seen, and perhaps not even considered possible.

## Complex positioning

SVG has a complex positioning and coordinate system that is entirely different from the box model that you are (hopefully) familiar with. To gain a full understanding of it, I recommend reading Sara Soueidan's excellent articles on [Understanding SVG Coordinate Systems and Transformations](https://sarasoueidan.com/blog/svg-coordinate-systems/) as well as Amelia Bellamy-Royd's, [How to Scale SVG](https://css-tricks.com/scale-svg/). I couldn't match the detail provided in these articles, so I choose not to try.

If you think of SVG like any other image format, to be responsive, it should stretch and scale to fill the available space. You should not be surprised to learn that "Scalable Vector Graphics" are great at this. Amelia's article demonstrated that, depending on the `viewBox` and `preserveAspectRatio` attributes, we can exercise more precise control over how SVG images scale.

Take a look at this example of an ornate border and try to imaging how you might do this with only CSS and HTML.

<div class="live-demo-extended card">
  <div class="js-resizable">
    <img class="js-resizable-image" src="/demos/svg/simple-border.svg">
  </div>
</div>

Dig into the SVG source and you will see we're taking advantage of symbols, masks, transformations and other goodness that HTML and CSS have only ever dreamt of. It works great, but it is by no means the extent of the responsive capabilities of SVG.

One interesting and little known fact about SVG is that the `viewBox` is an optional attribute. Did you also know that you can nest SVG elements and establish a new coordinate system on nested SVG and symbol elements, by applying a new `viewBox`?

With that in mind, imaging for a minute that this is not an image on the web. How might a traditional artist adapt this design for a different sized page? They would probably not just uniformly scale the design. More likely, the corner flourishes and diamond would remain roughly same size and the length of the line connecting them would be reduced.

<div class="live-demo-extended card">
  <div class="js-resizable">
    <img class="js-resizable-image" src="/demos/svg/complex-border.svg">
  </div>
</div>

We can do this with SVG! Compare this to the prior example, the difference is particularly notable on smaller screens.

This type of responsive design is particularly suited to SVG and with a little understanding of the SVG coordinates system you can break out of the limitations of the box model.

## Art directed responsive images with SVG

Although the [picture element](http://caniuse.com/#feat=picture) and [srcset](http://caniuse.com/#feat=srcset) are now widely supported (with the exception of Internet Explorer), did you know you can create responsive art-directed images using SVG?

<div class="live-demo-extended card">
  <div class="js-resizable">
    <img class="js-resizable-image" src="/demos/svg/ad-main.svg" >
  </div>
</div>

Resize your window to see how it works.

You may recognise the image from an [influential blog post](http://cloudinary.com/blog/automatically_art_directed_responsive_images) and [example by Eric Portis](https://ericportis.com/etc/cloudinary/). Although it looks the same, this example is achieved using only SVG and CSS.

To achieve this technique I'm loading an SVG as the `src` attribute for an image. The SVG itself has an image element and embedded CSS that resizes and reframes the image using media queries.

The image element inside the SVG, has a base64 encoded dataURI. I'm using a dataURI because when loading external SVG files in an image element, such as via `<image src="image.svg" >` they will not load additional linked resources. This is perhaps to prevent recursive references or for network performance reasons. Either way, to get around this limitation I'm using a dataURI.

**Note:** Thanks to Amelia Bellamy-Royds for letting me know that external resources will load in SVG files referenced via an `object` or `iframe` element.

CSS is global, so when embedding SVG in HTML (inline SVG), any CSS in the HTML document can also style SVG elements. Likewise `<style>` tags embedded in the SVG, when used inline, will not be scoped to the SVG element. They will be treated just like any other `<style>` tag found in the HTML body, that is, applied globally.

Developers often take advantage of this, using SVG sprites and CSS to change the colour of icons. Some developers complain that they cannot use CSS to style SVG elements that are not used inline.

I agree that this would be handy in some cases, but if you think about it the other way around many people are failing to take advantage of the fact that a referenced SVG (not inline) has its own document context.

Therefore, CSS in referenced SVG files, is scoped. This includes media queries! I can take advantage of that fact to create a responsive image that is aware of its own width and adjusts display accordingly. The size of the page doesn't matter, it's responsiveness is relative to the size of the image itself. This works the same for backgrounds and other methods of referencing external SVG.

One disadvantage this technique has over `srcset` or the `picture` element is that everything in the SVG will be loaded, there is no opportunity to prioritise loading only required assets first, depending on the user agent.

On the flip side, this technique works anywhere SVG does including in IE and offers the opportunity for customisation beyond just supplying a different source image. For example you could apply different filters for particular image sizes or anything else you can do with CSS and SVG.

Depending on the situation, this technique will not necessarily result in a larger download. So be clever and creative; use this technique where it makes sense.

## Adaptive images

We've learnt that media queries in referenced SVG will be bound to the width of the image or element they are used on. This sounds a lot like [container queries](https://alistapart.com/article/container-queries-once-more-unto-the-breach), one of the most requested browser features over the last few years, and in many ways (although not all), it works now in SVG.

I've seen very few examples that take advantage of this, the icon library [iconic](https://useiconic.com/) is one that comes to mind. But I don't think I've seen anyone use it to its full potential yet.

How about something that's not an icon? Let's update my ornate border example to resize and even remove the corner flourishes, in response to the available width.

<div class="live-demo-extended card">
  <div class="js-resizable">
    <img class="js-resizable-image" src="/demos/svg/adaptive-border.svg" >
  </div>
</div>

There is no way that I know of to achieve this with just CSS and HTML. Why aren't we doing much more of this on the web?!

## Container queries?

How far can we push this? Pretty far is the answer! But as always, with some caveats and limitations.

Let's try and reproduce another influential example. Remember Mat Marquis' article [Container Queries: Once More Unto the Breach](https://alistapart.com/article/container-queries-once-more-unto-the-breach)? Do you think we can do that with SVG?

<div class="live-demo-extended card">
  <div class="js-resizable">
    <img class="js-resizable-image" style="min-width: 250px !important;" src="/demos/svg/cq-main.svg">
  </div>
</div>

**Note**: Sorry this demo is a little buggy in Firefox &amp; IE.

### Caveats and limitations

Now that you are hopefully excited, I'm sorry to say this example is intended to demonstrate some limitations. It is obviously not the type of content you would normally use an image for, and this technique does not change that. It is definitely not accessible. On top of that, I've detailed some further technical limitations below.

#### Setting X & Y attributes with CSS

For the most part setting and changing X and Y attributes of SVG elements with CSS will not work. Although this will be fully possible in SVG 2.0, for now there is an exception to this rule in Chrome with regard to `<image>` elements. It is sometimes possible to use CSS transforms to manipulate positioning, but you will find this has limitations as well.

#### External sources in embedded SVG

As I mentioned in the earlier example of responsive art directed images, external SVG files loaded as an `img` source, will not load additional link references in the SVG source. Other limitations require that I use images, so I've used base64 encoded dataURIs.

In this case I'm encoding additional SVG files as the image source. Each has their own CSS and the ability to be responsive based on their own width. This can get complicated quickly, but it can also be a powerful technique.

#### Changing the height

The final limitation and the one I could not get around is that setting or changing the height of an SVG with CSS doesn't work! Even if it did, the image in the HTML sets its height based on the SVG attribute value only. I doubt the image would resize when an internal media query changes the height of the resource. It's like the SVG would have to reach up into the parent context and notify it of a change in height. This is the same for other methods of embedding external SVG.

There's still plenty you can do, given these limitations.

## Time of discovery

Every new technology has limitations, and the web has many. Because of this, I think we often give ourselves perceived limitations, based on our past experience. In this case it's easy to approach SVG with the same mindset as HTML and CSS, because "I know how images work on the web".

When we do this it's easy to miss opportunities to explore new and creative techniques. The examples I've demonstrated, probably only scratch the surface of unique possibilities with SVG. I hope I've got you thinking and I would love to see more examples.

One final though, it's important to be wary of perceived limitations, not just with SVG. This is especially true at the moment with a wealth of new layout features landing in browsers soon. It will require new perspectives to take advantage of new opportunities. Practice this now, there's never been a better time in the history of the web for creativity and discovery.

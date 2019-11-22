---
title: "Image manipulation techniques with 2D canvas"
description: "A short tutorial on different techniques for manipulating pixel data with the canvas element."
date: "2016-07-07"
tags: 
  - canvas
  - webgl
---

Canvas is a really interesting piece of our web development toolkit, but it is often overlooked or misunderstood. It is, as the name suggests, very much a blank canvas; not providing much in the way of prebaked solutions. It is up to us as developers to ensure what we make with canvas, is accessible and performant.

Canvas has no DOM, so when compared to working with HTML and CSS it may be less intuitive, and more work. For example if we want to interact with elements on a canvas we need to define our own object model and events. Why would we want to do this if we can find a solution where things like events, layout and rendering are already taken care of by the browser?

The problem is also the answer. We can take direct control over things like layout and rendering. This means we can effectively bypass many layers of abstraction (albeit often useful abstractions) put in place by the browser, and create very streamlined, purpose-built solutions.

In this article I’m going to use the example of applying image an effect with canvas. I chose this example because it is simple enough, and there are directly comparable methods using CSS and SVG. The aim is not to argue that canvas is in any way better than CSS or SVG for this task. In fact the results and usage cases are slightly different. I want to demonstrate these differences and approaches to solving the problem with canvas.

## Why use canvas?

Recently my friend Una Kravets wrote an excellent article for Smashing Magazine, [Web Image Effects Performance Showdown](https://www.smashingmagazine.com/2016/05/web-image-effects-performance-showdown/). In the article Una compared the ease of implementation and performance of HTML Canvas, SVG filters, CSS filters and CSS blend modes. One of Una’s conclusions was that we should not use Canvas for image effects and I’m inclined to agree with her conclusion, especially on the basis of simplicity.

Una knows a lot when it comes to applying image effects in the browser. You should checkout some of her other work including her A List Apart article, [Finessing feColorMatrix](http://alistapart.com/article/finessing-fecolormatrix) and [CSSgram](https://una.im/CSSgram/) which implements Instagram style filters using only CSS!

That’s amazing right? But it leaves the question; why would we ever want to use Canvas?

**The answer is when we want to do more than just apply image effects.**

Filters and blend modes don’t change images directly. Instead they are applied like mask layers in Photoshop where the source image is not modified. This means that if a user tries to save the image, they will get the original image without any effects. This might be exactly what you want, but for the average web user it’s probably a little confusing. That’s why I think CSS filters and blend modes work best for subtle effects and on background images, but not so much for applications where you want to make use of the end result.

For purely aesthetic purposes and in probably the vast majority of cases, CSS filters are exactly what you need but if you want to do something more involved, you probably need to start thinking about canvas. If you want to save an image or programmatically access the pixel data after an image effect is applied with CSS, you can’t. In the future [Houdini](https://www.smashingmagazine.com/2016/03/houdini-maybe-the-most-exciting-development-in-css-youve-never-heard-of/) may allow access the rendered output of CSS filters, but for now and in the immediate future, this stuff is locked away by the browser.

## Using canvas for image effects

Ok, you need to apply an image effect and do something with the result? You will need to use canvas. Hopefully you’ve now read Una’s article and seen the performance of canvas compared with CSS filters and blend modes. You’re probably wondering, what is the best way to apply image effects with canvas, and can I get better performance? You can get great performance from canvas. I’m going to step through a few different techniques for applying image effects with canvas. Each technique has different levels of complexity and performance factors. As always, the best solution will depend on your specific needs and appetite for complexity.

## Basic pixel manipulation with canvas

It makes sense that at its most basic Canvas is slower than other image manipulation techniques. We’re accessing the image data and manipulating it pixel by pixel then rendering the result back onto the Canvas. This means that we are doing a lot of extra work, rather than leveraging the built-in rendering capabilities of the browser. As well as this, because canvas can do a lot more than just apply image effects, we need to give explicit instructions, that would otherwise be assumed when using CSS filters and blend modes.

Despite these drawbacks the most basic technique is still useful to learn and we will build upon it in the following examples. Let’s start with an image and apply a desaturation effect using Canvas and JavaScript.

The HTML might look like this:

```html
<img id="image" src="image.jpg">
```

We need to make sure the image has fully loaded before we access the image data and because, web browsers, there are some inconsistencies in how the load event is triggered; especially when the image is loading from the cache. I’ve found the following method works well in browsers I tested.

```javascript
var image = document.getElementById('image');

if(image.complete){ // From cache
  desaturateImage(image);
} else { // On load
  image.addEventListener('load', function() {
      desaturateImage(image);
  });
}
```

Now let’s write the desaturateImage function. First we replace the image element with a canvas element:

```javascript
function desaturateImage(image){
  var canvas = document.createElement('canvas');
  image.parentNode.insertBefore(canvas, image);
  canvas.width  = image.width;
  canvas.height = image.height;
  image.parentNode.removeChild(image);
  ...
}
```
Next we get a 2D rendering context, draw the image onto the canvas and get the pixel data using the <code>getImageData</code> method.

```javascript
var ctx = canvas.getContext("2d");
ctx.drawImage(image, 0, 0);
var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var data = imgData.data;
```

Now that we have the image data we want to apply an effect and write it back onto the canvas. Each pixel has 4 pieces of color information, one for each rgb value and an alpha value. Because of this you might expect <code>getImageData</code> to return some kind of structured data, instead—for reasons that become clear in the next example—it returns a simple unstructured array. The first four values in the array represent the first pixel and so on. This means we have to loop over it in chunks of four. We can do this like so:

```javascript
for (var i = 0; i < data.length; i += 4) {
  ...
}
```

To desaturate the image I’m using the following technique <code>grey = (red * 0.2126 + green * 0.7152 + blue * 0.0722)</code>. There are numerous [greyscale conversion algorithms](http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/) with subtly different results, which I found an interesting and distracting side topic. One thing I like about Canvas is you have fine-grained control over any technique you apply.

Next, inside the loop, assign the grey to the next four values in the <code>imgData</code> array, leaving the alpha value unchanged.

```javascript
for (var i = 0; i < data.length; i += 4) {
  var grey = (0.2126 * data[i]) + (0.7152 * data[i + 1]) + (0.0722 * data[i + 2]);
  data[i] = grey;
  data[i + 1] = grey;
  data[i + 2] = grey;
}
```

Finally, outside the loop, let’s write the modified pixel data back onto the canvas.

```javascript
ctx.putImageData(imgData, image.width, image.height);
```

We did it! We applied a simple image effect with canvas. If you’d like to see this technique in action here is the code and a working example of [basic pixel manipulation with canvas](/demos/image-effects/basic.html). It’s not as simple as a CSS filter, but it’s not overly complicated either. You can use this technique in moderation for small images, where performance is not critical.

## 32bit pixel manipulation

Canvas is very flexible and there are many ways we can optomise our code to ensure that performance is comparable, or in some cases even better than CSS and SVG filters. With canvas unfortunately the trade-off for better performance is often an increase in code complexity.

One of the biggest overheads in the first example was writing to the <code>imgData</code> array. Write operations are always expensive and although individually insignificant, we needed to write three values to the image data array for every pixel in the image. That’s a lot! Using 32bit pixel manipulation we will be able to write to the array once for each rgba value and reduce the number write operations in our example by a factor of three. This obviously comes with significant performance gains.

In addition to using getImageData, we’re going to create some array buffers that will give a different “view” for accessing the pixel data.

```javascript
var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var buf = new ArrayBuffer(imgData.data.length);
var buf8 = new Uint8ClampedArray(buf);
var data = new Uint32Array(buf);
```

We can then replace our loop with the following:

```javascript
var j=0;
for (var i = 0; i < data.length; i += 4) {
  var grey = (0.2126 * imgData.data[i]) + (0.7152 * imgData.data[i + 1]) + (0.0722 * imgData.data[i + 2]);
  data[j] =
      (255  << 24) |    // alpha
      (grey << 16) |    // blue
      (grey <<  8) |    // green
       grey;            // red
  j++; // Advance current the increment
}
```

There are a few things going on in the example above that you might not be familiar with, including [array buffers](Typed Arrays: Binary Data in the Browser) and [Bitwise shift operations](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Left_shift). For the purpose of this tutorial all you need to know is the array buffers allow us to access the image data array in a 32bit format and the bitwise operations convert separate rgba values into a single 32bit value.

Finally, this is how we write the pixel data back to the canvas:

```javascript
imgData.data.set(buf8);  // Extra step
ctx.putImageData(imgData, 0, 0);
```

This technique is significantly faster than the basic example and should be applied whenever using basic pixel manipulation techniques. Here is the code and a working example of [applying image effects using canvas and 32bit pixel manipulation](/demos/image-effects/32bit.html).

## Image effects &amp; WebGL

Finally, if we want blazingly fast results that compare with CSS we are going to have to leverage WebGL. WebGL gives you access to hardware acceleration that is usually orders of magnitude faster than basic pixel manipulation. But it’s also the most complicated of the examples demonstrated. It includes some fairly low-level stuff that might not be intuitive if, like me, you don’t have prior experience with 3D graphics programming.

[WebGL has good support](http://caniuse.com/#feat=webgl) including on many mobile devices, however support for WebGL may depend on more than just the browser. For example on mobile devices and laptops the GPU may not be available in low power modes. In these cases you can fallback on 2D methods depending on your application.  

**Note:** Do not expect a full WebGL tutorial, that’s more than I could provide in this article, but I’ll aim to give a general overview of the steps involved in setting up a scene for rendering 2D image effects.

### Creating a WebGL program

We need to setup what is known as the rendering pipeline, a controllable sequence of steps for rendering 3D graphics. In WebGL this pipeline is fully configurable, which means we have the laborious task of setting up all the vertices, textures, variables and other information required by the shaders.

To many people this setup will not be particularly interesting; it’s the same boilerplate whatever the image effect applied. For this reason, and because a full introduction to WebGL deserves its own article, I’m going to skip over of most the initialisation code fairly quickly.

I’m going to create a helper function to compile a WebGL program.

```javascript
function createWebGLProgram(ctx, vertexShaderSource, fragmentShaderSource) {

  this.ctx = ctx;

  this.compileShader = function(shaderSource, shaderType) {
    var shader = this.ctx.createShader(shaderType);
    this.ctx.shaderSource(shader, shaderSource);
    this.ctx.compileShader(shader);
    return shader;
  };

  var program = this.ctx.createProgram();
  this.ctx.attachShader(program, this.compileShader(vertexShaderSource, this.ctx.VERTEX_SHADER));
  this.ctx.attachShader(program, this.compileShader(fragmentShaderSource, this.ctx.FRAGMENT_SHADER));
  this.ctx.linkProgram(program);
  this.ctx.useProgram(program);

  return program;
}
```
This function takes the source code for our fragment and vertex shaders, creates a program, compiles our shaders, and finally links it all together.

The next part of our code should look more familiar. We wait for the image to load then call the `desaturateImage` function, prepare our canvas, and replace the image element; the only difference is this time we request a `webgl` context rather than a 2D rendering context.

```javascript
var image = document.getElementById('image');

if(image.complete){
  desaturateImage(image);
} else {
  image.onload = function(){
    desaturateImage(image);
  };
}

function desaturateImage(image) {
  var canvas = document.createElement('canvas');
  image.parentNode.insertBefore(canvas, image);
  canvas.width  = image.width;
  canvas.height = image.height;
  image.parentNode.removeChild(image);

  var ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
  ...
}
```

We are now ready to call our helper function `createWebGLProgram` and we do that like this:

```javascript
var fragmentShaderSource = document.getElementById("fragment-shader").text;
var vertexShaderSource = document.getElementById("vertex-shader").text;
var program = createWebGLProgram(ctx, vertexShaderSource, fragmentShaderSource);
```

Before this can work, we need the source code for our shaders.

### Shaders

It’s convenient to write the shaders in unique script tags, not only does this keep them separate, but it avoids the mess and stress of writing strings with line-breaks in JavaScript.

Where image effects are concerned, shaders are the most important part of the process, as this is where the pixel manipulation takes place.

There are two types of shaders:

  - Vertex shaders
  - Fragment shaders

Generally speaking vertex shaders are responsible for determining the final position of each point (vertex) that forms part of a 3D shape. It does this by setting a variable named `gl_Position`. In our example, the 3D shape we are representing is a simple 2D rectangle or plane, upon which we will draw a texture.

Our Vertex shader takes the vertices that represent the rectangle, these points will match our image dimensions, and it converts them to "clip space", a representation of the same points in a space with dimensions between -1 and 1. It also sets the `v_texCoord` variable to be used by the fragment shader.

```html
<script id="vertex-shader" type="x-shader/x-vertex">
attribute vec2 a_position;
attribute vec2 a_texCoord;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

void main() {
   vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;
   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
   v_texCoord = a_texCoord;
}
</script>
```

**Note**: We give the script tags a `type` of `x-shader/x-vertex` and `x-shader/x-fragment` because we don’t want the browser to try and run them like normal JavaScript.

Next we need a fragment shader. While the vertext shader sets final position of each vertex on the canvas, the fragment shader sets the final color for each pixel, once the shape has been rasterised. Like the vertex shader, it does this by setting a special variable `gl_FragColor`.

```html
<script id="fragment-shader" type="x-shader/x-fragment">
precision mediump float;
uniform sampler2D u_image;
varying vec2 v_texCoord;

void main() {
  vec4 color = texture2D(u_image, v_texCoord);
  float grey = (0.2126 * color.r) + (0.7152 * color.g) + (0.0722 * color.b);
  color.rgb = (grey - color.rgb);
  gl_FragColor = color;
}
</script>
```

You will notice the method for converting the color values to greyscale is the same as in the previous examples. The line `color.rgb += (grey - color.rgb)` is a short-hand way of setting all the rgb values of color to grey.

### Data &amp; Variables

We’ve setup our shaders and WebGL program, but we need to provide the data and variables for the shaders to work with.

First we provide canvas dimensions to the vertex shader.

```javascript
var resolutionLocation = ctx.getUniformLocation(program, "u_resolution");
ctx.uniform2f(resolutionLocation, canvas.width, canvas.height);
```

Next we provide the data for the rectangle (2 triangles) on which we will draw the image.

```javascript
var positionLocation = ctx.getAttribLocation(program, "a_position");
var buffer = ctx.createBuffer();
ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([
  0, 0,
  image.width, 0,
  0, image.height,
  0, image.height,
  image.width, 0,
  image.width, image.height]), ctx.STATIC_DRAW);
ctx.enableVertexAttribArray(positionLocation);
ctx.vertexAttribPointer(positionLocation, 2, ctx.FLOAT, false, 0, 0);
```

We also need to provide data for shape of our texture. This tells the shaders how to map the texture onto the shape.

```javascript
var texCoordLocation = ctx.getAttribLocation(program, "a_texCoord");
var texCoordBuffer = ctx.createBuffer();
ctx.bindBuffer(ctx.ARRAY_BUFFER, texCoordBuffer);
ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([
  0.0, 0.0,
  1.0, 0.0,
  0.0, 1.0,
  0.0, 1.0,
  1.0, 0.0,
  1.0, 1.0]), ctx.STATIC_DRAW);
ctx.enableVertexAttribArray(texCoordLocation);
ctx.vertexAttribPointer(texCoordLocation, 2, ctx.FLOAT, false, 0, 0);
```
You can experiment with changing some of the numbers in either of the `bufferData` arrays to understand their purpose.

Finally we need to provide the image data itself, and we do this by creating a texture.

```javascript
var texture = ctx.createTexture();
ctx.bindTexture(ctx.TEXTURE_2D, texture);
ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.NEAREST);

ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, image); // Load the image into the texture.
```

Now that we have setup a program, shaders and provided the data the final step is to draw the scene on the canvas. We do that like this:

```javascript
ctx.drawArrays(ctx.TRIANGLES, 0, 6);
```

And that’s it! Checkout the [WebGL image effects demo page](/demos/image-effects/webgl.html).  

This example is fast! And I mean really fast! The results are directly comparable with CSS and SVG filters. That’s because with WebGL, the image effects are processed directly on your graphics card’s GPU, which is highly optimised for this type of work.

The code is definitely more complicated than using CSS or SVG filters but unlike these methods you can access the result, and apply many more types of effects. This technique is a good choice for an application where performance is critical and you need to save the image.

Once you understand a little about how shaders works it’s not that difficult to modify example above. You can create your own abstractions and make applying different image effects as familiar and easy as using CSS or SVG filters. To demonstrate this I wrote an examples that takes an SVG `feColorMatrix` value and applies a [color matrix transformation using WebGL](/demos/image-effects/webgl-matrix.html). This can produce an almost infinite number of image effects by simply changing the input variables.

As is often the case with modern web development, there are many features you can use to achieve the same results. For image effects CSS, SVG and canvas each have different strengths. Even after choosing the right technology, differences in implementation can make a huge difference in performance.

Whilst it is tempting to pick the simplest implementation from a development perspective, what is simple is sometimes more nuanced than this. The rendering process for CSS and SVG filters, whilst largely hidden from developers, is complicated due to its many features and abstractions. If we need to, we can take more direct control over the rendering process and have purpose-built applications that are amazingly fast. Although the path is less clear, and it may be more work initially, canvas can open a range [unique possibilities](/demos/image-effects/webgl-interactive.html) not available using more defined "paint by number" solutions.

## You might also be interested in reading

- [Canvas image pixel manipulation](http://codepen.io/jakealbaugh/post/canvas-image-pixel-manipulation)
- [Pixel manipulation with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)
- [An Introduction to WebGL - Part 1](https://dev.opera.com/articles/introduction-to-webgl-part-1/)
- [An introduction to shaders - Part 1](https://aerotwist.com/tutorials/an-introduction-to-shaders-part-1/)

## Examples in this article

- [Basic pixel manipulation](/demos/image-effects/basic.html)
- [32bit pixel manipulation](/demos/image-effects/32bit.html)
- [WebGL image effects](/demos/image-effects/webgl.html)
- [WebGL simulate SVG feColorMatrix](/demos/image-effects/webgl-matrix.html)
- [WebGL interactive image effects](/demos/image-effects/webgl-interactive.html)

<br>
<section class=" pal mtl background-dark">
If your interested in implementing any of these techniques in a real project, why not <a href="/hire">get in touch with me</a>? Let's make something interesting!
</section>


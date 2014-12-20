---
layout: post
title: Determining the quality of lighting in live video streams
---
I've been messing around with live video capture in the browser and have developed a nifty demo showing different methods for estimating the quality of light in realtime.

To view the demo you are going to need a web cam and a modern Chrome, Firefox or Opera browser. If you have what it takes you can [view my demo here](http://codepen.io/MadeByMike/full/d8369096b18e2192d0c9d721b9b2a673/). Please select allow when asked for permission to use the web cam. 

These tests have some potential real world uses. For example to advise of optimal lighting in a camera app or to estimate the size of the subject in the frame.

## A brief history of html video capture 

Before I explain my demo, it's worth sharing what I've learnt about the history of video capture and webRTC as well as its [state today](http://caniuse.com/#search=getusermedia).

The first thing to know is, it had a bit of a rock start. This history is well covered in [this excellent HTML5rock article](http://www.html5rocks.com/en/tutorials/getusermedia/intro/) by Eric Bidelman. 

The next thing to know is that `getUserMedia()` is still not fully supported in all browsers and there are some quirks (huge gaping inconsistencies) in implementation across browsers.

Not to fear because web development superhero Addy Osmani and others have come to the rescue with pollyfills such as:
 - [getUserMedia.js](https://github.com/addyosmani/getUserMedia.js/) 
 - [webcamjs](https://github.com/jhuckaby/webcamjs)
 
To keep it as simple as possible I haven't included any pollyfills in my demo, but I've tested them and they work, so there's no reason not to start using this now.

## Estimating the quality of lighting

In my demo there were 2 methods I trialed for determining the brightness. 

The first method was to find the average color of all the pixels in the frame then work out the relative brightness of this color. This method worked really well, in most situations it gave a good indication of the general brightness and would be suitable for uses such as a light indicator in a camera app. 

But eventually I found some limitations with the average color method when testing subjects with a high level of contrast. Images with a very dark background can give a false indication of the overall brightness and there is not enough information in the average color method to determine the 'quality' of light.

I realised that I wanted to know not just the average brightness but also how much of the frame was lit. To do this I applied a threshold filter to the incoming video stream. The threshold filter determines the brightness of each pixel and sets it to either black or white depending on whether it's above or below a certian level of brightness. In the end I can tell what percentage of the frame is lit and this is number can be very differnt to the average brightness. 

Used together we can determine a lot about the composition and lighting of the frame.

## Taking it further

If I apply more than one threshold I can set a maximum and minimum brightness and measure which parts of the image are potentially under or over exposed.

Finally and it's not in my demo but you could potentially automatically adjust the threshold based on the average color brightness.  

So there we have a ton of information we can use to make inferences about the quality of lighting in a video stream. Now it's up to up work out how to put them to practical application.

## Preformance tips

Despite being very poorly optomised my demo seems to run ok. Not only am I adjusting the brightness before rendering each frame to a canvas, I'm also showing the results of the threshold and average filters on a separate smaller canvas. In most cases you won't need to do either of these things. 

I was able to get these methods working on an average machine with a HD video input by combining each of the filters so that I was only looping over the pixel data once. I used an off screen canvas and only processed every 5th frame and every 5th pixel. The results were as accurate as the method shown in this demo. 

## Further reading

Interesting articles I found along the way include:

- [getUserMedia: Accessing the Camera and Privacy UI](https://dev.opera.com/articles/getusermedia-access-camera-privacy-ui/) - Bruce Lawson
- [Capturing Audio & Video in HTML5](http://www.html5rocks.com/en/tutorials/getusermedia/intro/) - Eric Bidelman
- [introduction to the getUserMedia API](http://www.sitepoint.com/introduction-getusermedia-api/) - Aurelio De Rosa
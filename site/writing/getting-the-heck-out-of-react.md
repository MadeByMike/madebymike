---
title: "Getting the heck out of React"
description: "React has limitations when it comes to working with persistent stateful media objects. In this article I discuss techniques for working with media elements like canvas, video and third-party libraries in React."
date: "2018-11-28"
tags: 
  - react
  - javascript
---

One of the biggest advantages of React is that we need to worry less about managing updates to the UI. The presentation is defined once within the `render()` method of a component and it will update automatically when data changes.

The `render()` method returns elements via `JSX` that instruct React to update the DOM. This is the strength of React because it can manage updates to the DOM more efficiently than I would, and `JSX` provides a declarative means of describing a component structure, much like HTML.

There is however, one key assumption in all of this and that is that updating data should result in updates to the DOM. This assumption is central to the React component lifecycle, and in-fact the render method is the only required method of a React component. That's a pretty core assumption, and as a result accessing the DOM node of a React rendered element, is not always straight-forward.

Typically DOM manipulation outside the render method is discouraged, but there are some elements in HTML that are not quite as descriptive when it comes to updates. Examples of these include elements like `<video>` and `<canvas>`. Updating these usually requires calling a native method to clear the canvas, or to pause video playback. To interact with these native methods we need to get a reference to the element in the DOM and for this React has refs. 

## Accessing the DOM in React

Refs, as the name implies, provide us with a reference to an element in the DOM. We can access this only after React has rendered the element. 

Methods for creating and retrieving refs have changed between React versions with backward compatibility, so you might see other techniques used in the wild. Here I am using the `createRef()` method introduced in React 16.3. 

```javascript
class CanvasComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myCanvas = React.createRef();
  }
  
  componentDidMount() {
    const ctx = this.myCanvas.current.getContext('2d');
    ctx.fillRect(0, 0, 100, 100);
  }
  
  render() {
    return <canvas ref={this.myCanvas} width={100} height={100} />
  }
}
```
In this example I create a ref named `myCanvas` in the `constructor()`, attact it to the component in the `render()` method, and then access it after the component has mounted, where I can finally draw to the HTML canvas.

This technique works well enough if I only need draw once, but for more complex examples, we're going to run into problems. React is calling the render method constantly, but because it is clever, it's recycling the DOM elements rather than re-building it each time. This is great because we want the canvas to be persistent. However changes to the surrounding HTML, and particularly higher up the document tree, can result in re-building parts of the DOM. If you'd like to know more about why and when React re-builds the DOM, I'd suggest reading the [React documentation on reconciliation](https://reactjs.org/docs/reconciliation.html).

## Working with stateful media objects

Take a look at this example of a random "Rainbow Walker": 

<div class="full-width">
<p data-height="350" data-theme-id="light" data-slug-hash="c795e7e7eb0a542a64739d7a1cb485a0" data-default-tab="result" data-user="MadeByMike" data-pen-title="Rainbow walker" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/MadeByMike/pen/c795e7e7eb0a542a64739d7a1cb485a0/">Rainbow walker</a> by Mike (<a href="https://codepen.io/MadeByMike">@MadeByMike</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</div>

It looks great, but "information" is stored directly on the canvas. Each `tick` of the animation draws a new part of the line and the previous position and color information is lost. The cumulative result of this drawing procedure is stored on the canvas for as long as the canvas exists, but if React creates a new element, this information is lost forever. This is one of the challenges of working with persistent and stateful media objects in React.

Take a look at this updated example and click the wrap\unwrap button to see what happens: 

<div class="full-width">
<p data-height="400" data-theme-id="light" data-slug-hash="e8ec1be6a6c4cd28212473074e6b4607" data-default-tab="result" data-user="MadeByMike" data-pen-title="Rainbow walker wrap\unwrap" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/MadeByMike/pen/e8ec1be6a6c4cd28212473074e6b4607/">Rainbow walker wrap\unwrap</a> by Mike (<a href="https://codepen.io/MadeByMike">@MadeByMike</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</div>

All the button does is change the `render()` method to wrap the `<canvas>` in an extra `<div>`. This is something that can happen frequently with larger applications and it's not always easy to avoid. Wrapping an element is one of many things that can cause parts of the DOM to be re-drawn.

It's worth noting that the current position of the walker is not reset when clicking the wrap\unwrap button. That's because the component itself is not unmounted when its output changes. However, it's not always easy to avoid unmounting components either. Logically we try to split components into smaller chunks and once again the sorrounding layout can change. Take a look at this example of a canvas clock: 

<div class="full-width">
<p data-height="250" data-theme-id="light" data-slug-hash="5c3293dade22de7d823741c8241950b3" data-default-tab="js,result" data-user="MadeByMike" data-pen-title="Clock" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/MadeByMike/pen/5c3293dade22de7d823741c8241950b3/">Clock</a> by Mike (<a href="https://codepen.io/MadeByMike">@MadeByMike</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</div>

Here I've split the logic for the clock and the layout between two different components. When the layout surrounding the clock changes the component is re-mounted. In addition to a new `canvas`, data in state is lost and the counter is reset to 0. You will also see a noticeable flash as the canvas is re-initialised. For elements like `canvas` this is much more expensive than re-drawing a typical DOM node. This is especially true if we need to re-initialise a 3rd-party library as well.

## Imperative & declarative APIs

It's not just `canvas`, these issues exist for `video` and other media, as well as 3rd-party libraries for things like data visualisation, mapping and charts. The problem is that libraries like D3.js, three.js, mapbox and whatever the hottest chart library is right now, have imperative APIs. This typically means that there is a single object that represents an entity on the page and we invoke actions directly on it. For example with Mapbox after creating a new map, we call methods like `flyTo()` to trigger actions. E.g.

```javascript
var map = new mapboxgl.Map(mapboxOptions);
map.flyTo({center: [0, 0], zoom: 9});
```

This approach is very different from HTML or JSX that have a more declarative API. With a declarative API it's more descriptive. We update the description of the map with new properties and the library resolves these changes into a set of actions required to update the map.

Animations or any action that occurs over time can be difficult to describe using a declarative API. This is because declarative components don't typically have a persistent state. Think about how animations work in CSS. New animations can be triggered by the addition of a classname but these properties will reset the existing animation, causing it to start from its initial state. 

Despite this, I see numerous attempts to "solve" the challenges of working with stateful media in React by creating libraries convert imperative APIs into a set of declarative React components. They do this by wrapping another layer of abstraction around 3rd-party tools and native APIs. 

The [react-map-gl](https://github.com/uber/react-map-gl) library has more than 4000 stars. This recreation of the HTML5 canvas API [react-konva](https://github.com/konvajs/react-konva) has more than 2000. The [react-d3-components](https://github.com/codesuki/react-d3-components) library has over 1400 and there are many more like these. 

To me these are the jQuery plugins of this era. They all provide limited on-rails solutions that serves to comfort developers with a React mindset. Perhaps the only advantage is that the better-designed examples of these allow developers to continue splitting logic into smaller components. 

## Escaping React

Often a `<canvas>`, `<video>`, or chart container will be the lowest level item in the DOM that React is aware of. Therefore the React component that mounts these can become bloated with all the custom methods, events and other logic that controls the embedded object.

I don't think the solution is to try and envelope everything into React. Although declarative APIs can be amazingly succinct and performant they are not the solution to everything. I also think that trying to map an existing imperative API to a set of React components going to result in something less than the original.   

My solution is to get the heck out of React when I need to and find a way to make these things work together. Let's take a look at an example of an HTML `<video>` element and a solution that avoids:

- clearing stateful data (such as the video source and play state) when React re-renders,
- methods and actions restricted to a single component

__Note:__ In this example, I'm using es6 imports to demonstrate how elements, functions and components can be shared between files. 

In one file I create a component with a ref similar to the first example.

```javascript
import React from "react";

const videoElement = document.createElement("video");

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.myVideoContainer = React.createRef();
  }

  componentDidMount() {
    this.myVideoContainer.current.appendChild(videoElement);
  }

  render() {
    return <div ref={this.myVideoContainer} />;
  }
}

export { videoElement, Video };

```
Instead of attaching it to a canvas or video element, the ref is attached to an empty `<div>` container. The video element is a detached DOM node that exists outside the component. I append this to the container once the React component is mounted. 

Because the video element exists outside a React component, even if React re-renders the container or unmounts the component, the video will be re-mounted without losing its source, play state, or any other data.

We're exporting the `videoElement` so we can access it in different components. I can now create a load button that applies a video source to the element:

```javascript
import React from "react";
import { videoElement } from "./video";

class LoadButton extends React.Component {
  render() {
    return (
      <button
        onClick={function() {
          //  Thank you MDN for the video source! 
          videoElement.src =
            "https://interactive-examples.mdn.mozilla.net/media/examples/flower.mp4";
        }}
      >
        Load
      </button>
    );
  }
}

export { LoadButton };
```

As well as a play button: 

```javascript
import React from "react";
import { videoElement } from "./video";

class PlayButton extends React.Component {
  render() {
    return (
      <button
        onClick={function() {
          videoElement.play();
        }}
      >
        Play
      </button>
    );
  }
}

export { PlayButton };

```

I can even create custom functions that extend the native `<video>` element. Here I've added a method to inverts colours by toggling a classname:

```javascript
import React from "react";
import { videoElement } from "./video";

function invertVideo() {
  videoElement.classList.toggle("invert");
}

class InvertButton extends React.Component {
  render() {
    return (
      <button
        onClick={function() {
          invertVideo();
        }}
      >
        Invert
      </button>
    );
  }
}

export { InvertButton };
```

In a real application, functions like `invertVideo()` might not be tied to a single UI element such as in this example. A function that clears data on a map, for example, might be triggered by multiple UI actions. In cases like this, it makes more sense to import functions rather than co-locating them with the UI components.

Either way, the ability to split this code and organise it in different ways is a huge win compared with a massive React component and some of the techniques used to pass imperative actions like that of a play button between independent components.

You can check out a full demo here:

[![Edit react-html-video](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n9zp6yry7p)

__Note__: By importing the `videoElement` we're creating an implicit link between components. 

Ideally, React components are dumb and fully reusable. I wanted to show the simplest example first, but also practically speaking, I think this technique is sufficient for many applications. Most importantly it's not difficult to refactor if you need greater flexibility or multiple instances of components later. 

## Multiple instances

The examples above deal with a single instance of a media element. If we needed a 2nd video, we'd have to create a 2nd component along with a 2nd play button, load button etc...

Despite its limitations, if you can get away with it, I think a single entity is a lot easier to work with, but there are problems when we have multiple instances. 

If you pass the `videoElement` as a prop a lot of the problems can be solved. However, if we are going to re-structure components to be more reusable, rather than just passing the DOM element, it might help to organise some of the functions and exports into methods and properties within a class. 

There are several different patterns you could use. What's best depends on your particular project. This is an example I created for the canvas clock: 

```javascript
class Counter {
  constructor() {
    this.element = document.createElement("canvas");
    this.ctx = this.element.getContext("2d");

    this.element.width = 100;
    this.element.height = 100;
    
    this.ctx.font = "40px Georgia, serif";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    
    this.timer = false;
    this.counter = 0;
    
    this.step = this.step.bind(this);
  }

  start() {
    this.timer = setInterval(this.step, 100);
  }

  stop() {
    clearInterval(this.timer);
  }

  step() {
    this.counter = this.counter < 99 ? this.counter + 1 : 0;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 100, 100);
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.counter, 50, 50);
  }
}
```

With this generic class, we create an instance of `Counter` for each clock, I then pass the instance as a parameter to the `<Clock/>` and `<StopButton/>` components.

```javascript
import { Clock } from "./clock";
import { StopButton } from "./stop-button";
import { Counter } from './counter'

const clockA = new Counter();
const clockB = new Counter();

<Clock counter={clockA} /> 
<StopButton counter={clockA} />
<Clock counter={clockA} /> 
<StopButton counter={clockA} />
```

In the `<Clock/>` and `<StopButton/>` components we can retrieve the DOM element and access methods via the `counter` prop:

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.myClockContainer = React.createRef();
  }

  componentDidMount() {
    this.myClockContainer.current.appendChild(this.props.counter.element);
    this.props.counter.start();
  }

  render() {
    return <div ref={this.myClockContainer} />;
  }
}
```

Once again you can see a full example here: 

[![Edit react-many-clocks](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/y06pjpo0lx)

## Sharing data

The final challenge we have is sharing data between React and the media elements. Many of these have internal state and retrieving this is often as easy as calling a method. For example to get the current play time of a video we can import the element and query the `currentTime` property: 

```javascript
import { videoElement } from './video' 
const time = videoElement.currentTime
```

This is adequate in many cases, but React is not going to re-render when the `currentTime` changes. We need to communicate relevant internal state changes to React. The video element has a `timeupdate` event. We can import the element and listen for `timeupdate`, then set state within React.

```javascript
import React from "react";
import { videoElement } from "./video";

class VideoTimer extends React.Component {

  constructor(props) {
    super(props)
    this.state = { time: 0 }
    this.setTime = this.setTime.bind(this)
  }

  setTime() {
    this.setState({ time: videoElement.currentTime })
  }
  
  componentDidMount() {
    videoElement.addEventListener("timeupdate", this.setTime);
  }
  
  componentWillUnmount() {
    videoElement.removeEventListener("timeupdate", this.setTime);
  }

  render() {
    return (
      <p>
        {this.state.time}
      </p>
    );
  }
}
```

There are situations where we want to keep large amounts of data in-sync. We can call imperative actions on media elements and listen for events within React components, and this is adequate for things like a video play button, a timer, or a simple `flyTo()` action on a map, but examples can easily become more complex than this. 

Consider a search and filtering interface that updates the application UI, then triggers a map to `zoomTo` and fit the bounds of filtered items. 

Here there are numerous state changes, computations and derived actions that need to be triggered on the map. It's not clear which component should be responsible for listening to updates and triggering imperative actions on the map. 

In these situations, it helps to use some kind of store for state management. With this, we can share state between React and the media element. You can use [Redux](https://redux.js.org/introduction) if you are familiar with it, or if you want a recommendation I've been enjoying [Unistore](https://github.com/developit/unistore) recently. It doesn't matter what you use as long as you can subscribe to state changes and imperatively get the state from the store.

There are two different approaches we can use. With canvas animations, games, and libraries like Three.js or D3.js you might want to implement a render loop. A render loop will run periodically (usually several times a second) and we can fetch state from the store and call an update method.

A very simple example of a render loop looks something like this:

```javascript
import { store } from './store'

function loop() {
  const state = store.getState();
  
  // Do updates
  
  requestAnimationFrame(loop)
}
  
requestAnimationFrame(loop)
```

This approach is constantly calling `loop()` using `requestAnimationFrame()`. It then gets state from the store and applies updates on every frame. 

The other approach is to subscribe to the store and call update only when the store changes.

```javascript
import { store } from './store'

function update() { 
  const state = store.getState();
  // Do updates
}

store.subscribe(update)
```

With both these examples, it is possible to call `store.setState()` or dispatch actions and have React components respond to data changes initiated by the media element.

Here's an example of a map application that shares data between media elements, UI components within React: 

[![Edit react-map-unistore](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/2x6xwz6k2n)

I really like this approach because we can have two highly separate applications that work largely independently yet share the same data source. In theory, it's not necessary to mount the map into a React application. It could just as easily be mounted by a different framework or plain onld JavaScript. This makes things much more portable and easy to test. 

If you find working with canvas, video and 3rd-party libraries like D3.js, three.js, or mapbox difficult within React, I hope this has helped you understand some of the reasons, as well as some possible solutions. 

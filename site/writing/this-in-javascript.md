---
title: What is this in JavaScript?
slug: this-in-javascript
description: My attempt at a very basic explanation of the 'this' keyword in JavaScript.
tags: [javascript]
date: 2018-11-11
---

Like many things, the `this` keyword in JavaScript is something I learned to work with and around, long before I gained any proper understanding of how it works. Recently I was asked to describe it and found despite my experience I still strugled to find simple terms. So I thought I'd write down my best attempt.

There is a special keyword in JavaScript called `this`. It is a reference to an object. This reference is sometimes called a `binding` because it ties the value of `this` to a specific object. What object, and the value of `this`, depends on how and where the function is called.

The default value of `this` is the `window` object in browsers or `undefined` when in strict mode.

We can explicitly set what `this` points by executing functions with methods like `call`, `bind` and `apply`.

```javascript
function myFunction() {
  return this;
}

myFunction(); // window
var myBinding = myFunction.bind("hello"); // .bind() returns a new function
myBinding(); // 'hello'
myFunction.call("hello"); // 'hello'
myFunction.apply("hello"); // 'hello'
```

What confuses me sometimes is JavaScript will implicity bind `this` if the function is called within a context owning object. This means when a function is a property of a context owning object, the value of `this` will be the object itself. In the example below the owning object, and therfore value of `this` is `myObject`:

```javascript
function myFunc() {
  return this.greeting;
}

var myObject = {
  greeting: "hello",
  function: myFunc
};

console.log(myObject.function()); // 'hello'
```

Calling a function with the keyword `new` will result in a new empty object bound to `this`.

```javascript
function myFunc(something) {
  this.thing = something;
  return this.thing;
}

console.log(new myFunc("something"));
```

This has been a very short introduction that covers only basic information. If you want to know more I was inspired to attempt my own explaination after reading Willian Martins, [Taming this In JavaScript With Bind Operator](https://www.smashingmagazine.com/2018/10/taming-this-javascript-bind-operator/) . I could also not write about `this` without recommending Kyle Simpson's explaination in [You Don't Know JavaScript](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md), especially the [TLDR](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md#review-tldr).

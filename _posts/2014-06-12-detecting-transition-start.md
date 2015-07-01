---
layout: post
title: Detecting transition start
---
If you've worked with the css transition events in JavaScript you will know that it's a little involved due to the need for multiple browser prefixes. Luckily it's easy, if slightly verbose, to detect which transition event to use:

{% highlight javascript %} 
  // Dave Walsh says this is from Modernizr, but I can't find it
  // http://davidwalsh.name/css-animation-callback
  var whichTransitionEvent = function(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    };
    for(t in transitions){
      if( el.style[t] !== undefined ){
        return transitions[t];
      }
    }
  };
  var transitionEvent = whichTransitionEvent();
  
  // With that sorted...
  if(transitionEvent){
    document.body.addEventListener(transitionEvent, function() {
	  // do stuff here
	});
  }
{% endhighlight %}
We need to check if `transitionEvent` exists before adding an event listener and whilst this isn't too hard, we could take this a step further and wrap it with a custom event `'transition-end'`. See: [example gist](https://gist.github.com/MadeByMike/0563ca51e08a790e553b).

My reason for this extra step, apart from easy of use, relates to detecting transition start. 

##What about transition start?

Unfortunately there is no transition start event and it might at first seem like this is not much of a problem. A css transition is usually triggered by an event such as resize or hover and these events can be captured with JavaScript. But that is not always the case, at times it is difficult if not impossible to tell when a particular transition is triggered.

The following example demonstrates a likely use case with the popular Foundation library and the [Equalizer](http://foundation.zurb.com/docs/components/equalizer.html) component.

<p data-height="650" data-theme-id="6646" data-slug-hash="ImxHA" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/MadeByMike/pen/ImxHA/'>Foundation Equalizer and the problem with CSS Transitions</a> by Mike (<a href='http://codepen.io/MadeByMike'>@MadeByMike</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

In the demo Equalizer changes the boxes so they are even height. The height is re-calculated when the browser is resized, but when the container is resized as part of a css transition the height will not be re-calculated and content will overflow the boxes.

I've exaggerated the transitions in the example to demonstrate.

Detecting transtionend and calling `$(document).foundation('equalizer','reflow');` will set the height correctly at the end of the transition but it is not a smooth experience.

Although not the ideal method I'd like, I've come up with a solution for detecting transition start. By wrapping the transitionend event with a custom event we can use transitionend in a sneaky way to detect a transition start.

<p data-height="500" data-theme-id="6646" data-slug-hash="sBjzn" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/MadeByMike/pen/sBjzn/'>Detect transition start </a> by Mike (<a href='http://codepen.io/MadeByMike'>@MadeByMike</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

As I said, it is not ideal. It requires some specific css with a 0.00001s transition to detect the transition start.

I'm looking forward to findind a better method. If you do let me know.
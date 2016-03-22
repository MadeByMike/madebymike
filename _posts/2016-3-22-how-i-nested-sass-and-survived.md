---
layout: post
title: "How I nested my Sass and lived"
---

Here is a secret. I like to nest my Sass. When I write SCSS I’ll happily go 3 or 4 levels deep. I’m so bad, I don’t even give a shit. I thought I would come out and talk about this because it is so heavily shamed by many developers, and I can’t quite figure out why. At risk of being the target of ridicule, let me explore this a little more. 

I feel like nesting is the scapegoat. If you have problems with nesting this is often a symptom of poorly written CSS, but in my opinion it is very rarely the cause. 

Remember that in the scheme of things Sass is still relatively new and we’re still figuring out how to best work with it. It took us ages to arrive at BEM and other methodologies that made CSS more maintainable, and whilst these principles still apply, Sass has additional features and brings the opportunity to structure things differently. So there is a whole lot more best practise to figure out.  And one thing I have seen is that many of our [‘best practises’ have been wrong](http://www.stubbornella.org/content/2011/04/28/our-best-practices-are-killing-us/) at times or at least change. 

My feeling is that maybe we stumbled over our own feet early with Sass and rather than tying our shoelaces we decided that shoelaces were the problem. Let’s deconstruct some of the arguments against nesting and then see where we stand. 

Finding a good arguments against nesting was actually harder than I thought. I found an article on the Sass Way website called [Nesting selectors: the inception rule](http://thesassway.com/beginner/the-inception-rule) it was written in 2011 and it is one of the first I remember to discuss the topic. But even after reading it again I’m still not clear what the problem is or how it specifically relates to nesting. In the first example given, the output from the nested Sass is exactly the same as the initial CSS. In both cases the CSS\SCSS is not great, but the nested example is easier to write, it makes use of Sass variables and I can see from the indentation everything that is related to a `post` component. I’d consider it a slight improvement on some fairly ordinary CSS.

The next example talks about mimicking the DOM in Sass. This is just a bad idea that has nothing to do with nesting. I guess what the author is trying to say is that maybe Sass makes it easier to think of doing something like this for someone who has absolutely no experience with CSS. It’s a stretch, but maybe it does, a little… or maybe not. But either way you can hardly blame the tool when someone does this. I remember that people were pretty good at writing horrible CSS long before Sass was involved.

I’ve actually found that Sass helps me write better more maintainable CSS and this can be true for new developers also. I’ve worked a lot on building and maintaining large scale UI libraries. I’ve seen that Sass and nesting in particular can help encapsulate ‘objects’ and even help new developers understand the CSS methodologies and concepts such as OOCSS, BEM, SMACSS and Atomic Design.

Take this relatively simple example of a card pattern:

<a href="http://codepen.io/MadeByMike/pen/GpYqZP/?editors=0100">
<img src="/img/card.png">
</a>
The structure of the important parts looks something like this:

```css
.card {
  figure {
    img { }
  }
  figcaption { }
  .card-content {
    .card-title { }
    ul { }
  }
}

.card-flip{
  .card-content { }
}
``` 

Inside my card object I wanted a special treatment for images and the figcaption but I don’t want these styles ‘leaking’ outside of the context of the card object. Nesting helps me to be specific, when and where I want to be. 

I chose a classname of `card-content` because I wanted only one instance of `card-content` per card and this was far more easily enforced with a class than by targeting a div. For the figure I chose not to do the same, although if I wanted to guard against the use of another figure element, inside the `card-content` for example, I should have probably used a classname here as well. However using a plain image inside the `card-content` should be fine because I am only targeting image styles inside the figure element. I feel pretty ok about these choices. Nesting helps me see all this easily and without it, there is more confusion.   

Additionally I used a classname of `card-title`. I could have targeted a `h2` but this might force non-semantic markup should the heading level need to be different. I don’t want to do that. 

I know that these class names belong to the card object because of the naming convention used. In BEM these would be element classes Eg. `card__content`. But I’m not using BEM, so how do I know that they are different from modifier classes such as `card-flip`? In this case, nesting helps. Yay nesting \o/ !

But surely there are better reasons not to nest Sass. Luckily there is no shortage of criticism on the internet for nesting Sass. I found some better reasons to avoid it in this SitePoint Article: [Beware of Selector Nesting in Sass](http://www.sitepoint.com/beware-selector-nesting-sass/). With a title like that it’s no wonder people are afraid of nesting. It kinda sounds like the title to a B-Grade horror movie. It’s actually a lot better than that, despite the title it is a well balanced argument and not completely against nesting in all situations.

In the article, Hugo gives this example: 

```css
.tabs {
  .tab {
    background: red;

    &:hover {
      background: white;
    }

    .tab-link {
      color: white;

      @at-root #{selector-replace(&, '.tab', '.tab:hover')} {
        color: red;
      }
    }
  }
}
```
I agree that this is kinda clever but it’s a step too far. It’s complicated and not easy to read. What it does is change the `.tab-link` color when the `.tab` element is hovered. I’ve found myself in this situation a number times. What I’m really wanting at this point is usually a ‘parent selector’ in CSS but no amount of SASS is going to give me this.

Typically I might write the above example something like this:

```css
.tabs {
  .tab {
    background: red;

    .tab-link {
      color: white;
    }

    &:hover {
      background: white;
      .tab-link {
        color: red;
      }
    }

  }
}
``` 

If there were more changes than just the color of the `.tab-link` element I would probably consider structuring it like this:

```
css.tabs {

  .tab {  }

  .tab:hover {  }

}
```

I treat the pseudo classes such as `hover`, `focus` and `active` a little like modifier classes and put them at the same level of indentation as the element they modify. It’s easier to read especially if you have multiple of them. I call this, being kind to yourself. I don’t nest stuff if it doesn’t make sense.

This time I’d say that nesting might indirectly contribute to the problem. The author wants to modify all the styles for `tab-link` including the different pseudo classes all in one place. They don’t want to traverse back up the selector chain and down again. I understand this. I’ve wanted to do the same thing, even without Sass. The real problem here is that Sass makes it appear like it’s almost possible. But it’s a lie.

The real rule we should be teaching developers in this situation is not don’t nest, I think it would probably be don’t modify the parent selector or simply don’t write overly complicated Sass.

The next point made in “Beware of Selector Nesting in Sass” is about unsearchable selectors. What this says is if you do something like this:

```css
.block {
  /* Some CSS declarations */

  &--modifier {
    /* Some CSS declarations for the modifier */
  }

  &__element {
    /* Some CSS for the element */

    &--modifier {
      /* Some CSS for the modifier of the element */
    }
  }
}

```

You won’t be able to search for the class name “block--modifier” although it will exist in your CSS. This is actually a pretty good point and you may want to avoid nesting in this way. Personally I use the `&` syntax only for pseudo elements and classes. Having said that I’m not totally against this idea either. I keep all my components in separate files and they never tend to be huge, finding an class should never be too hard even with this technique and if you use map files it’s a non argument.

Another common argument I hear against nesting is the bloated output when nesting is combined with @extend. Take this really simple example:

```css
.clearfix {
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
}

.block {
  @extend .clearfix;
  .element {
    @extend .clearfix;
    .element--modifier {
      float: right; 
    }
  }
}

.block2{
  @extend .block;
}
```

This can result is a lot of bloated CSS:

```css
.clearfix:before, .block:before, .block2:before, .block .element:before, .block2 .element:before, .clearfix:after, .block:after, .block2:after, .block .element:after, .block2 .element:after {
  content: " ";
  display: table;
}
.clearfix:after, .block:after, .block2:after, .block .element:after, .block2 .element:after {
  clear: both;
}

.block, .block2 {
  border: 1px solid black;
}
.block .element, .block2 .element {
  background: blue;
}
.block .element .element--modifier, .block2 .element .element--modifier {
  background: red;
}
```
This can get a whole lot worse when there is a lot more CSS as well as mixins and loops in the equation. Nesting can go some way to masking the problem but again is not the root cause. More and more I’m hearing valid arguments against the use of @extend and why @extend should be avoided. I think there can be valid reasons to use extend, but it can have far more dangerous outcomes than nesting and I would encourage people to avoid using it unless they know specifically what they are trying to achieve.

On the other hand I wouldn’t discourage people from nesting when writing Sass. I find it a useful tool to help structure components. My view is that the people doing horrible things with nested Sass are just as capable of doing horrible things with plain old CSS. And 2 levels of nested Sass can be just as crap as 5.

Sass may have suffered from the jQuery problem where it made things easier, and invited a whole lot of people with little experience writing maintainable CSS to the party. But I’m not going to blame Sass and I’m not going to blame nesting for this either. So can we lay off the nesting Sass is the root of all evil thing just a little bit and talk about the real problems and best practises when writing Sass?
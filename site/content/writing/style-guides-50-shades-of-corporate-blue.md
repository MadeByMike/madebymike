+++
title = "Style Guides: 50 shades of corporate blue"
description = "Sharing some experiences trying to get a design system\\living style guide working in a corprate environment."
date = "2016-02-26T00:00:00Z"
publish_date = "2016-02-26T00:00:00Z"
+++

I recently completed my third attempt at implementing a style guide within my organisation. So far this is the first attempt that looks to be maintainable and has some traction outside the development team. I want to share with you how we got there and what I learnt from 2 failed attempts.

My first attempt at a style guide used an automated tool called [KSS](http://warpspire.com/kss/styleguides/), it automatically generated a style guide from comments in the CSS. It was clever. I was sold by the efficiency. It failed quickly. I don't think it failed because of the choice of tool. I just hadn't adequately prepared. I hadn't discussed the objectives with other developers and definitely not more broadly with the team.

However before I could learn that lesson there was an immediate barrier of technical debt. At the time we didn't use build tools or even SASS. I'm ashamed to say that despite my best efforts the CSS was a little all over the place. This meant that the style guide was difficult to maintain. As well as this, people in the development team were also used to working reactively. The style guide was not being used as a tool for development and planning, so inevitably it became a post implementation task to update and it quickly fell behind production.


We needed to change how we worked. I began the mammoth task of refactoring seven thousand lines of CSS as well as making preprocessors and build tools a part our toolkit. We started discussing our prefered approach to CSS architecture and other development principles and guidelines. We settled on [SMACSS](https://smacss.com/) for naming conventions, [Mark Otto’s Code guide](http://codeguide.co/) and [Atomic Design](http://patternlab.io/about.html) principles. We were not instant experts at any of these things and developing discipline takes time. You never arrive at perfect and it’s a moving target anyway, so we just kept working towards it. I wrote about this in [another blog post on how I CSS](http://madebymike.com.au/writing/how-do-I-css).
We worked with these principles without a style guide for a while. Everyone up-skilled and we noticed better consistency and maintainability of our code. We were pretty sure we were ready and style guide version 2.0 was going to be brilliant. It was for a while. We used [Fabricator](https://fbrctr.github.io/) and [Gulp](http://gulpjs.com/) to create a custom style guide. Unlike KSS we manually created a markdown file for each component. The extra work was offset by a high degree of flexibility and the live reload features meant the style guide became the place for development and testing.

This worked really well for developers with only a slightly steeper learning curve and set-up cost for new staff.

The next thing I learnt was that the success of a style guide depends as much on the processes you have within your organisation as it does on on the discipline of your development team. It's not just the development process that matters, content and design processes also influence your chance of success.

This matters even more in large organisations. Unfortunately a lot of developers focus on the build process and no matter how clever that is it's not going to be successful if it doesn't enable content writers and designers to do their job better. They don't care how efficient your build process is. It also has to enable managers and decision makers to get an overview of how isolated changes are going to influence the boarded aesthetic. Only then will they see value in it.

Done well style guides reduce conflict and lead to better design decisions, at worst they cause friction and the development team will soon be seen as a blocker rather than an enabler. Right from the beginning start thinking about how your style guide is going to make other people's jobs easier not your own.

You might need to influence people's thinking and modify existing processes to move to a place in your organisation where a style guide will be accepted as an important design tool. A strong foundation in the concepts of atomic design is important but do not try to sell these concepts to non technical staff. Instead talk about the benefits of visual consistency from a user experience perspective and how patterns help streamline the design process and lead to better business outcomes.

This is easy to say now but this is not how I did it. Instead I harped on about maintainability of stylesheets, about reducing lines of code and more efficient development processes. "So what", was often the response, “I want that button, on that page only, to be corporate bule” and I would fight the good fight, but in the end, more often than not I found myself saying “which of the 49 shades of corporate blue we have, would you like to use”. No doubt only because I'd made such a fuss about it, “can I have a new one?” was the answer.

Eventually I clicked and I started talking about what does blue represent to our customers, where and why do we use buttons and what are the business rules that govern or guide our decisions to use these indicators. Everything in design conveys meaning and if you can define it on a per component basis, you can start to get non-technical people to understand the design language.

For the most part managers, designers and developers are all out to achieve the same goals and style guides can give you a common language to discuss this. Who’d have thought that style guides were not just a vanity exercise in developer tooling.

I started focusing on what purpose each component has on the site. Asking questions like: "What is its function?" and "Where should it be used?" I also realised that it is equally important to define where something should not be used. Soon I found we were wanting to put even more business logic in there, things like “What are the character limits?” and “How many times can a component be used on a single page?”.

Now we have a tool that is a lot more than a style guide it is a framework for discussion. When new feature is proposed we see if we have an existing component that fulfills the stated need. If we do, we use that. If we don’t we create a new one, modify an existing one or create a new variation of a base component. This forces more stringent thinking. Firstly am I happy with an existing feature, secondly am I prepared to modify something globally and if not, can I describe the reason and purpose for a variation.

Does this always work? It’s early days and we need more time to see how much influence this process will actually have. Although I’m optimistic, I don’t think it will always work. At the end of the day a process only works as long as people are prepared to follow it. The style guide now gives us a really good chance of showcasing the value of our process and the reason behind them but if someone high enough up the food chain says "it must be this shade of blue", I guess we'll just have to put that reason in the style guide.

---
title: Understanding Filters, Shortcodes and Data in 11ty
description: "Sometimes it’s a little confusing what the difference between shortcodes, data and filters really is, and frankly the boundaries can become a little blurred with 11ty."
date: "2020-12-08"
tags: ["11ty"]
---

Filters, shortcodes and data are the ultimate source of power in 11ty, that’s why together, they are known as the Triforce among 11ty enthusiasts. Sometimes it’s a little confusing what the difference between shortcodes, data and filters really is, and frankly the boundaries can become a little blurred with 11ty. 

11ty has the power of multiple template engines. This is a somewhat unique feature among static site generators. I find it incredibly convenient, but also know it’s a source of some confusion.

11ty decides which template engine to use based on the file extension. This can be configured in your `.eleventy.js` config file, but we’re going to assume the default configurations. The most common file types I see people using for templates in 11ty are markdown (`.md`) and nunjucks (`.njk`). Personally I use nunjucks for layout and markdown for simple content.

The default template engine for Markdown is Liquid and for Nunjucks, it’s unsurprisingly Nunjucks. Both Nunjucks, Liquid and other template languages in 11ty have capabilities for filters, data and tags. The `addShortcode` method is simply 11ty a unified way of creating tags and extensions.

11ty also has `addFilter` which provides a unified method for creating filters that will be available no matter which template engine is used.

## Filters

Filters take a single input on the left, modify this inline and return a single value. They are good for modifying a single piece of data in some way.


For example, in a markdown file I can use the `upcase` filter in liquid to modify the value “mike”:

```
{% raw %}
{{ "mike" | upcase  }}
{% endraw %}
```
The result of this filter will be “MIKE”.

In Markdown and Nunjucks you can chain multiple filters using the pipe (`|`) operator.

If you take a look at the 11ty documentation, you’ll see there’s not really a good list of available filters anywhere. You might find 4 universal 11ty filters, and if you’re not familiar with 11ty or templating languages in general, you might assume these are the only filters available.

For a complete list of filters take a look at the Liquid and Nunjucks or the documentation for your template engine of choice.

Looking at these docs you might notice some filters accept a values on the right such as divided_by:

```
{% raw %}
{{ 16 | divided_by: 4 }}
{% endraw %}
```

Or split:

```
{% raw %}
{% assign beatles = "John, Paul, George, Ringo" | split: ", " %}
{% for member in beatles %}
  {{ member }}
{% endfor %}
{% endraw %}
```

This is where things get a little bit blurry. You can use filters like this, but when creating your own, the ability to pass parameters other than the value to the left of the pipe is not supported by 11ty universal filters. This is primarily what distinguishes it from a shortcode in 11ty.  

Note: 11ty does allow you to extend the underlying template engine. But I’d strongly recommend sticking with the universal options as much as possible and making a clear distinction between filters, shortcodes and data for all your needs. 

## Shortcodes

Unlike filters, shortcodes don’t modify a value, but they can take any number of parameters, so they can do largely the same thing as a filter and more.

Personally I think filters provide an easier to read API and stop you from over complicating things. They should be used where it makes sense. 

Shortcodes work best when you need to pass multiple parameters.

Before making a shortcode, consider if the parameters are dynamic or if they can be set once using static config. An example might be a `JSON.stringify()` shortcode:

```
{% raw %}
{% stringify object, indentation %}
{% endraw %}
```
It’s likely indentation can be configured once per site so this example could probably be made into a filter.

The place where shortcodes really shine is when using paired shortcodes. Paired shortcodes have opening and closing tags that allow you to access and modify the content between the tags.

Let’s write a complete simple example.

Filename: `.eleventy.js`:
```js
 eleventyConfig.addPairedShortcode(‘my_shortcode’, (content) => {
  console.log(content); // Log in Node
  return content;
});
```

Filename: `index.md`:
```
---
var_in_shortcode: "I am resolved first"
---
{% raw %}
{% my_shortcode %}
  Hello {{ var_in_shortcode }}
{% my_shortcode %}
{% raw %}
```
With this example, it’s important to know that the value of `var_in_content` will be resolved from the front matter before it is passed to `my_shortcode`. 

Shortcode look similar to other template language features such as iteration:

```
{% raw %}
{% for product in collection.products %}
  {{ product.title }}
{% endfor %}
{% endraw %}
```

The key difference is that shortcodes cannot modify the global context and provide data to templates inside the paired tags.

## Data

One of my favourite things about 11ty is how it manages data. Typically data is read from front matter and is available to use inside templates. 11ty provides the means to inject custom global data at stages during the process.

One of the great things is that data can be literally anything. It’s really useful for a set of global variables like a site name, navigation menus or copyright statements.

Data can also be async. This means you can fetch data from other sources, for example a product list from Stripe or Shopify, or a feed from Twitter or Instagram. And you can use this data in the generation of a static site rather than as client side operation.

What makes data incredibly powerful is that, for some template languages at least, it can be more than a static value. In Nunjucks templates, but not Liquid, 11ty data can also be a function. This means we can create something similar to shortcodes by exporting a function from a data file:

Filename: `_data/example.js`:
```js
module.exports = {
  site_name: "Example",
  add: (a,b) => a + b
}
```

In our templates we can now access the `example` data:

Filename: `index.njk`:
```
{% raw %}
{{ example.add(1, 2) }}
{% endraw %}
```

Add to this the fact that data can be async (ok, filters and shortcodes can also be async as of version v0.2.13 but I started with 11ty before all this) and I think that data is probably the triangle at the top of the Triforce for me.
I hope this has helped clarify how and where to use data, filters and shortcodes. There may still be some confusion as a result of different implementations between template languages. Generally I’d say  before getting too far into an 11ty project, pick the template language that works best for you and stick with it. Understand how each of the above work with your choice. Make a few test shortcodes and filters as well as experiment with data before early in the project. Also choose nunjucks.

 


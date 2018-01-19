---
date: 2014-08-22T00:00:00Z
title: Merging JSON data sets

---

Merging deeply nested data in JSON is more difficult than it might seem.

In the past I've used a brute force approach when dealing with small and well structured data. This approach proved completely inadequate for large volumes of real world data.

Imagine we have a monthly darts competition and at the end of each month record the scores in a JSON file:

```javascript
data_jan = { "name": "mike", "score": 47 }
data_feb = { "name": "mike", "score": 25 }
```
(I have no clue what a darts score should look like)

At this level getting mike's total score is trivial `data_jan.score +  data_feb.score`. But if we add more players, more months or more data getting totals quickly becomes a bit more involved.

```javascript
data_jan = [
  { "name": "mike", "score": 47, "team": "A" },
  { "name": "jill", "score": 51, "team": "B" }
]
data_feb = [
  { "name": "mike", "score": 25, "team": "A" },
  { "name": "jill", "score": 41, "team": "B" }
]
```

Your first instinct might be to find all the players then for each player, loop over all the months, find score and add this to the current players total.

With help from something like [jQuery](http://jquery.com/) or [Underscore](http://underscorejs.org/), enough nested loops and liberal use filter and map statements you might get a result.

This will work until you run into some real world situations like players absent or a need for both team and player totals. In short this type of solution is a bit of a house of cards.

Thinking more about the problem I soon realised that it is similar to the use case for `.extend()` that both jQuery and Underscore provide. The only difference is I want control when merging so that I can change values and not just overwrite.

It was eventually suggested that I checkout [Lodash](http://lodash.com/) and I found the `.merge()` function allows a callback for data manipulation. So to get player totals all we need is:

```javascript
_.merge(data_jan, data_feb, function(a,b){
  if(_.isNumber(a) && _.isNumber(b)){
  	return a + b
  }
  return undefined
})
```

This is much faster and easier to follow than nested loops.

One small downside is you can only merge 2 objects at a time and my only other complaint is I don't have access to the key in the callback.

Bonus: If you are using Underscore, Lodash is almost a one for one replacement so it's easy to switch.

**Update**

If you're using jQuery and do not want to add another library to the mix I wrote a jQuery extension to merge objects:

https://gist.github.com/MadeByMike/e57dd16797acf5d105b5

It works much like `jQuery.extend()` however the first parameter is an array containing the objects to merge. The 2nd parameter is a callback that allows you to modify the data while merging.

```javascript
$.mergeObjects(merge_array, callback)
```

E.g.

```javascript
merge_array = [{ "name": "mike", "score": 47},{ "name": "mike", "score": 11}];
$.mergeObjects(merge_array, function(a,b){
	if($.isNumeric( a ) && $.isNumeric( a )){
    	return a+b;
    }
    return b;
});
// Will return: { "name": "mike", "score": 58}
```

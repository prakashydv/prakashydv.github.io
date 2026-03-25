---
layout: post
title:  "Experience with Jekyll"
date:   2022-09-05 00:06:16 +0530
categories: technology frontend jekyll
summary: "My experiuence in refactoring this blog to use Hakyll framework"
---

Its a mark of certain laziness to use a content manager for your static website. So I've done exactly that and used
`Jekyll`. It's perhaps the most popular static site generator with easy integration with [GitHub pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll).

I am documenting my experience as I get my hands wet.
To begin with info on customizing the layout and theme, I found it convinient to reference the a youtube channel [playlist](https://www.youtube.com/watch?v=T1itpPvFWHI&list=PLLAZ4kZ9dFpOPV5C5Ay0pHaa0RJFhcmcB) by Mike Dane. It was short and gave all the fundamentals i needed. Post watching the 19 short videos, I copied over the default `minima` theme over to the main repository so as to override all default schematics.

This infact is a refactor. First attempt was in hakyll (inspired by [gwern.net](http://www.gwern.net)) But i had bitten more than i could chew and this blog was in a limbo for a very long time. Since Jekyll works so well with GitHub pages, I settled for focussing more on the content than the delivery logistics of the blog.

Once I had my boilerplate code up with remains of my earlier blog, I soon came face to fece with the fact that to get anything serious design customisation done I would have to master Liquid templating that Jekyll uses. Fair enough, thats what I did. Refering to the [official Liquid documentation](https://shopify.github.io/liquid/) as well as [Jekyll's own documentation](https://jekyllrb.com/docs/liquid/filters/).

The default minima theme is good, but it can be made better with minimal effort. For example I found it natural to categorize my posts into 3-4 main categories; Tech, Books etc. I simply tag each post with fixed tags for each topic and on the main page i display 5 latest posts from each category. Further I made a page with all posts of each category. Now I could have made the code uniform by iterating through all categories, but I chose to manually specify the category in each page template. Its a peaceful design allowing me to conain the clutter more easily. Art category only has a separate page, as linked in the header tabs, because it contains a gallery that is not summarized in the homepage. Further the dedicated pages of the category also display the summary of the article as specified in the post markdown.

One responsive UI element is that for narrow displays date is not displayed beside the article title on the homepage. Neat IMO.

So with minimal page I got a functional site up and running, rest will be added on whenever I get time for such adventures. Please ignore typos, I havent yet found a way to integrate a spellcheck plugin into my code text editor.

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

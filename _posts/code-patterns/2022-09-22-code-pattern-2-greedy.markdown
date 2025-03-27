---
layout: post
title: "Code Patterns II - Greedy"
date: 2022-09-22 00:16:16 +0530
categories: technology
summary: "Collection of coding patterns for reference"
---

Greedy problems _usually_ manifest themselves as problems with a deterministic solution regardless of circumstances (inputs).
For example the fastest way to cover more distance in a fixed time, is to have the highest speed possible. There is no other way around such a problem, where the statistic to optimize is obvious. Greedy problems are fortunately somewhat intuitive.

In greedy problems the local best solution does indeed gurantee the globally optimal solution. Some problems might look like DP problems, relying on a past decision, but are actually greedy. Consider the 'fractional' knapsack problem. At each step the optimal solution can be determined by the best immidiate solutions. The item which is worth maximum per unit weight, is picked at each step till the knapsack is full.

Usually the easy-medium questions in competitive coding are greedy, with a mix of sorting and searching. Complexity is almost always O(n) outside of the sorting or other processing done. Another popular greedy solutions involve scheduling by choosing task with earliest finishing time. This ensures most time is available to accomodate further tasks.

[Here](https://usaco.guide/bronze/intro-greedy?lang=cpp) is a USACO post on greedy problems that will help you introduce to the greedy pattern of thought.

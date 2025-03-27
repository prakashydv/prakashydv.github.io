---
layout: post
title: "Code Patterns I - Two Pointers"
date: 2022-09-21 00:06:16 +0530
categories: technology
summary: "Collection of coding patterns for reference"
---

Following is a list of coding patterns I have encountered so far. This post is to serve as a repository for reference.

Organising coding problems has been challenging, the most common paradigm being categorization by data structure or algorithm used.
While that does serve as a practical division of exploring coding problems and their solutions, it cannot account for similarity between problems
that are otherwise categorized separately. This leads to duplication of effort when solving problems. The pattern of tackling questions can often be
categorized into paradigm groups, for which there is no official nomenclature, but commonly used nemonics like 'two pointer', or 'slow and fast pointer' etc. 'DP' or "Dynamic Programming' is a wide class, which needs a bit of experience but the strategy seldom changes. Its something like Neural networks or even linear programming, a generic tool to solve diverse yet similar type of problems.
Let's begin !

## Two Pointer method

Such problems _usually_ manifest themselves as an array or list of quantizations (numbers), which needs to be solved for a beginning and end candidates for the required solution. Note that a order must exist in the series for the two pointer paradigm to work. For a series on N numbers, set index `i=0` as the first pointer and `j=N-1` as second. The pointers move towards each other where the decision to move left or right is determined by comaing the values at i & j.

For example, lets take a [problem](https://www.geeksforgeeks.org/two-pointers-technique/) : _Given a sorted list A[] of N numbers, find the pairs which sum up to X_.

To begin, see that the list is sorted. So if you select any random pair, moving any candidate pointer to left decreases the sum of the pair, and moving it right increases the sum. So lets initialize `i=0` and `j=N-1`. Depending on `A[i]+A[j]` being less than or greater than required sum `X`, the pointers `i` and `j` can be adjusted. moving `i` right can only increase the sum, whereas moving `j` left can only decrease the sum. So depending on which side of X the current sum is, move `i` or `j`.

Let us consider another [problem](https://www.geeksforgeeks.org/maximum-water-that-can-be-stored-between-two-buildings/) : _Given an array of heights (not in sorted order), find the two heights which can hold maximum water (i.e. distance betwenn H1 and H2 x minimum of (H1, H2))._

Here the decision to move either of the pointers is based on the premise that moving the pointer with lower hight value will not decrease the volume of water, because though the distance decreases by 1 in every step, its the lower height pointer which determines height of the max area till now, so moving that pointer will ensure the resulting area will ensure the max area is not decreased. The code to the link problem looks like :

```C++
int maxCandy(int height[], int n)
{
    int i = 0;
    int j = n-1;
    int area = 0;
    while(i<j) {
        int a = min(height[i],height[j]) * (j-i-1);
        area = max(a, area);
        if(height[i] < height[j])
            i++;
        else
            j--;
    }
    return area;
}
```

An unorthodox usecase of two pointers is in finding the [next permutation](https://www.nayuki.io/page/next-lexicographical-permutation-algorithm)

For example see this simple implementation i found for [leetcode problem #31](https://leetcode.com/problems/next-permutation/discuss/14054/Python-solution-with-comments) :

```python
def nextPermutation(self, nums):
    i = j = len(nums)-1
    while i > 0 and nums[i-1] >= nums[i]:
        i -= 1
    if i == 0:   # nums are in descending order
        nums.reverse()
        return
    k = i - 1    # find the last "ascending" position
    while nums[j] <= nums[k]:
        j -= 1
    nums[k], nums[j] = nums[j], nums[k]
    l, r = k+1, len(nums)-1  # reverse the second part
    while l < r:
        nums[l], nums[r] = nums[r], nums[l]
        l +=1 ; r -= 1
```

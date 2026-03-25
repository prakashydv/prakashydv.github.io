---
layout: post
title: "Importing reviews from goodreads"
date:   2025-05-11 13:24:00 +0530
categories: coding
summary: ""
---

I regularly backup [my book reviews](https://www.goodreads.com/review/list/24198246) from Goodreads to my local storage (and this blog). The import/export functionality can be accessed at [`https://www.goodreads.com/review/import/`](https://www.goodreads.com/review/import/).

The exported format is typically `csv` which is convinient for most automations to process. I would've preferred json but it makes sense for Goodreads to provide limited support for exporting in favour of encouraging imports and resulting engagement with their product i.e. Goodreads.

I authored a simple python script to format the `csv` to the `md` markdown layout that can be directly used in this jekyll based blog.

1. First a small utility to read a csv and return a json with headers as keys:
```py
import csv
def csvToJson(file_path):
    data = []
    with open(file_path, mode='r') as file:
        csv_reader = csv.reader(file)
        header = next(csv_reader)
        for review in csv_reader:
            review_data = {}
            for i, column in enumerate(header):
                review_data[column] = review[i]
            data.append(review_data)
    return data
```

2. A utility to iterate over all of your reviews
```py
def formatReview(csv_filepath):
    out_str = ""
    jsonReviews = csvToJson(csv_filepath)
    for jsonReview in jsonReviews:
        if jsonReview["Date Read"] != "":
            out_str += getMarkdownReview(jsonReview)
    return out_str
```

3. Compose a markdown format to write the json values int:
```py
def getMarkdownReview(jsonReview):
    # print(jsonReview)
    return f"""
## {jsonReview["Title"]} - {jsonReview["Author"]}
#### read on {jsonReview["Date Read"]} | rating {jsonReview["My Rating"]} (avg. {jsonReview["Average Rating"]})
""" + ("\n" + jsonReview["My Review"] + "\n") if jsonReview["My Review"] != "" else ""
```


4. Finally just execute it on the exported csv file:
```py
import sys
str = format_review("/path/to/exported_reviews.csv")
f = open(f"/path/to/reviews.md", "w")
f.write(str)
f.close()

```

Of course I had copilot orchestrate the above for me using a few prompts. Anyway, the book reviews page is the end result of the above execution.

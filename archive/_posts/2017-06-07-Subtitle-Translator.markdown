---
layout: post
title:  "Subtitle Translator"
date:   2017-06-07 00:06:16 +0530
categories: technology frontend
summary: "Translating subtitles using Frengly free translation REST API"
---

![](http://sugarfx.tv/info/subtitles/info_subtitles_sm.jpg)

Subtitles are a convinient and engaging method to understand a  foreign language content where language audio translations may not be available.
This script uses Frengly free translation REST API to translate line by line all the content of the .srt subtitle file. Since this code used free translation API subsequent translation requests have an interval of three seconds therefore translation time is 3*number_of_lines_translated (Frengly supports about [38 languages](http://www.frengly.com/api))
script argument  looks like : `filename.srt:source_language[:destination_language]`
      example :
> Superman.srt:en:fr

  above input translates *Superman.srt* from english to french the new file created will be *fr_Superman.srt*
Checkout the source on my [github page](https://github.com/prakashydv/SRTtranslate)

	Destination by default is english (en)

Table for Encoding Language:

	"Encoding":"Language"

	"en","english"
	"fr","french"
	"ar","arabic"
	"bg","bulgarian"
	"zh-cn","chinese (Simplified)"
	"zh-TW","Chinese (Traditional)"
	"hr","Croatian"
	"cs","Czech"
	"da","Danish"
	"nl","Dutch"
	"en","English"
	"tl","Filipino"
	"fi","Finnish"
	"fr","French"
	"de","German"
	"el","Greek"
	"iw","Hebrew"
	"hi","Hindi"
	"hu","Hungarian"
	"id","Indonesian"
	"ga","Irish"
	"it","Italian"
	"ja","Japanese"
	"ko","Korean"
	"la","Latin"
	"no","Norwegian"
	"fa","Persian"
	"pl","Polish"
	"pt","Portuguese"
	"ro","Romanian"
	"ru","Russian"
	"sr","Serbian"
	"sk","Slovakian"
	"es","Spanish"
	"sv","Swedish"
	"th","Thai"
	"tr","Turkish"
	"vi","Vietnamese"

### Limitations :
	Since this code used free translation API subsequent translation requests have an interval of three seconds
	therefore translation time is 3*number_of_lines_translated

The heart of the script is very simple, just fetch a json from the url :
```py
url='http://syslang.com?src='+source_language+'&dest='+target_language+'+&text='+MESSAGETOTRANSLATE.replace(' ','+')+'&email=YOUREMAIL@ADDRESS.com&password=yourpassword&outformat=json'
```

#### Ciao !

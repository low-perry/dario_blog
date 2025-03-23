---
layout: page
title:  "Exploring media container format"
date:   2025-03-23 10:51:33 +0100
categories: media mp3 flac mdn
excerpt: "In this article I will define what media container format is and remove confusion regarding mp3"
permalink: /blog/:title
---
While reading [MDN's](https://developer.mozilla.org/en-US/) article on [Media Container Formats](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Containers), I noticed that it was missing a clear definition of what a container actually is—instead, it immediately jumped into various use cases. This gap led me to dig a little deeper for a solid answer.

Although the available resources were somewhat limited, I found valuable information in [Matroska’s documentation](https://www.matroska.org/technical/basics.html#:~:text=First%2C%20it%20is,a%20single%20file) and [Wikipedia](https://en.wikipedia.org/wiki/Container_format). These sources helped me come up with the following definition:

> **A media container is a file format that encapsulates one or more media streams (such as audio or video) along with metadata, enabling them to be stored and played back together.** The format of audio and video media files is defined by multiple components, including the codecs used for audio and/or video, the media container (or file type), and optionally other elements such as subtitle codecs or additional metadata.

Later, I came across [this issue](https://github.com/mdn/content/issues/38384) which asserted that MP3 is not a media container. Initially, I was skeptical because, in simple terms, MP3 does behave somewhat like a container—it can wrap metadata alongside the audio track. Nevertheless, this prompted me to delve even deeper into the topic.

## What is MP3?
[MPEG-1 Audio Layer III](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Audio_codecs#mp3_mpeg-1_audio_layer_iii) also simply knows as MP3, refres to both an audio codec, but also to a very popular file format. Below it's a simple diagram representing it's [structure](https://en.wikipedia.org/wiki/MP3#File_structure):

<img src="../../assets/images/mp3Structure.png" alt="MP3 File Structure" width="700" height="400" />
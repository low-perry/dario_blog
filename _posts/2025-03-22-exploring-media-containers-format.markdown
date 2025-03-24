---
layout: blog-post
title: Exploring media container format
date:   2025-03-23 10:51:33 +0100
categories: media mp3 flac mdn
excerpt: In this article I will define what media container format is and remove confusion regarding mp3
permalink: /blog/:title
---
While reading [MDN's](https://developer.mozilla.org/en-US/) article on [Media Container Formats](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Containers), I noticed that it was missing a clear definition of what a container actually is—instead, it immediately jumped into various use cases. This gap led me to dig a little deeper for a solid answer.

Although the available resources were somewhat limited, I found valuable information in [Matroska’s documentation](https://www.matroska.org/technical/basics.html#:~:text=First%2C%20it%20is,a%20single%20file) and [Wikipedia](https://en.wikipedia.org/wiki/Container_format). These sources helped me come up with the following definition:

> A media container is a file format that encapsulates one or more media streams (such as audio or video) along with metadata, enabling them to be stored and played back together. The format of audio and video media files is defined by multiple components, including the codecs used for audio and/or video, the media container (or file type), and optionally other elements such as subtitle codecs or additional metadata.

Later, I came across [this issue](https://github.com/mdn/content/issues/38384) which asserted that MP3 is not a media container. Initially, I was skeptical because, in simple terms, MP3 does behave somewhat like a container—it can wrap metadata alongside the audio track. Nevertheless, this prompted me to delve even deeper into the topic.

## What is MP3?

[MPEG-1 Audio Layer III](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Audio_codecs#mp3_mpeg-1_audio_layer_iii), more commonly known as MP3, refers both to an audio codec and to a very popular file format. Below is a simple diagram representing its [structure](https://en.wikipedia.org/wiki/MP3#File_structure):

<img src="{{ '/assets/images/mp3Structure.png' | relative_url }}" alt="MP3 File Structure" width="700" height="400" />

## Is MP3 a media container format?

To answer the question above, we first need to examine a similar format: [FLAC](https://datatracker.ietf.org/doc/rfc9639/). Like MP3, FLAC serves as both an audio codec and a widely used file format. A simplified version of its structure is shown below:

<img src="{{ '/assets/images/flackStructure.png' | relative_url }}" alt="FLAC File Structure" width="700" height="400" />

Now let's compare both formats.

| **Aspect**                | **FLAC**                                                                                                                                      | **MP3**                                                                                                                                |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| **Structure**             | Self-contained with a defined internal organization—includes a FLAC marker, STREAMINFO, and other metadata blocks followed by audio frames.  | A continuous chain of MP3 frames (each with a header and data block) forming an elementary stream, with minimal additional structure. |
| **Metadata Handling**     | Metadata is integrated into the file structure (e.g., STREAMINFO block, Vorbis comments), making it part of the container-like design.         | Metadata (e.g., ID3 tags) is placed either at the beginning or end of the stream rather than being an integrated container component.  |
| **Frame Independence**    | Audio frames are organized as independent units within the file, even though they are primarily for lossless audio data.                        | Frames are interdependent due to the bit reservoir; frames cannot be arbitrarily extracted or considered fully independent.            |
| **Purpose & Use Cases**   | Designed to preserve high-fidelity, lossless audio with all necessary parameters neatly packaged together—ideal for archiving and quality playback. | Designed for efficient, compressed audio playback with a focus on minimizing file size and resource usage.                             |

Based on the comparison above, we can conclude that FLAC acts like a basic container for audio, providing structured blocks for both the audio data and metadata within a single file. In contrast, MP3 does not function as a true container—it is essentially a continuous sequence of encoded audio frames without integrated multiplexing support.
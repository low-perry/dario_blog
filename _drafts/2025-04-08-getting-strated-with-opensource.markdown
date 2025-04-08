---
layout: blog-post
title:  "Getting started with open source"
author: Dario Haxhiraj
date: 2025-04-08 14:31:33 +0100
categories: technical writing documentation
excerpt: "Learn how to contribute to open source projects by finding issues, making changes, and submitting pull requests, with practical tips to get started."
permalink: /blog/:title
---
Contributing to open source can seem daunting at first, but it’s one of the most rewarding ways to grow as a developer, writer, or designer. Recently, I wrote an [article]({{ '/blog/strategies-for-details' | relative_url }}) about how much detail to include in technical documentation. Now, let’s see how to apply that knowledge in practice by contributing to an open source project.

In this guide, I’ll walk you through the steps I took to contribute to an open source project on GitHub. Specifically, I’ll show you how I found an issue, made changes to the project, and submitted a pull request.

## Step 1: Find an issue you can contribute to

The first step in contributing to open source is finding an issue that matches your skills and interests. For this example, I chose an issue from the [MDN Web Docs content repository](https://github.com/mdn/content). This repository contains documentation for web technologies, and it’s a great place to start if you’re interested in technical writing or web development.

The issue I selected is [#38988](https://github.com/mdn/content/issues/38988), which involves improving the "Timeouts in inactive tabs" section of an article. The task is to add a note with a link to an external resource for additional context.

## Step 2: Fork the repository

To make changes to the project, I first forked the repository. Forking creates a copy of the repository under my GitHub account, allowing me to make changes without affecting the original project.

1. Go to [MDN Web Docs content repository](https://github.com/mdn/content)
2. Click the Fork button in the top-right corner.
3. Clone the forked repository to my local machine:

```bash
git clone https://github.com/<your-username>/content.git
cd content
```

## Step 3: Create a new branch

Before making changes, I created a new branch to keep my work organized:

```bash
git checkout -b add-timer-throttling-note
```

## Step 4: Make the changes

I navigated to the file that needed updating and added the following note to the "Timeouts in inactive tabs" section:

> **Note:** For a deeper understanding of how timer throttling works in modern browsers, especially regarding chained JavaScript timers, please see [“Heavy throttling of chained JS timers beginning in Chrome 88”](https://developer.chrome.com/blog/timer-throttling-in-chrome-88#terminology). This article provides additional context and discusses related performance implications in detail.

After making the changes, I saved the file and tested the documentation locally to ensure everything looked correct.

## Step 5: Commit and push the changes

Once I was satisfied with the changes, I committed them to my branch:

```bash
git add .
git commit -m "Add note about timer throttling to 'Timeouts in inactive tabs' section"
git push origin add-timer-throttling-note
```

## Step 6: Submit a pull request

With the changes pushed to my fork, I opened a pull request (PR) to propose the changes to the original repository:

original repository:

1. Go to the forked repository on GitHub.
2. Click the Compare & pull request button.
3. Add a title and description for the PR:
   - **Title**: Add note about timer throttling to "Timeouts in inactive tabs"
   - **Description**: This PR adds a note with a link to an external article for additional context on timer throttling in modern browsers.
4. Submit the pull request.

## Step 7: Wait for feedback

After submitting the PR, I waited for the maintainers to review my changes. They might request additional edits or approve the PR as is. Open source contributions are often collaborative, so be prepared to engage in discussions and make adjustments.

## Conclusion

Contributing to open source is a fantastic way to apply your skills, learn from others, and give back to the community. By following these steps, I was able to improve an article in the MDN Web Docs repository and make a meaningful contribution.

If you’re new to open source, start small. Look for issues labeled "good first issue" or "documentation" in repositories that interest you. With time and practice, you’ll gain confidence and become a valuable contributor to the open source ecosystem.
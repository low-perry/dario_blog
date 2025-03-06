---
layout: page
title:  "How to enable code syntax highlighter in Jekyll!"
date:   2025-03-04 18:13:33 +0100
categories: jekyll tutorial
excerpt: "Learn how to enable code syntax highlighting in Jekyll."
permalink: /blog/:title
---

While customizing my own [Jekyll](https://jekyllrb.com/) theme instead of using the default [Minima](https://github.com/jekyll/minima), I noticed that syntax highlighting stopped working. This guide walks through the solution.

## Solution

### **Step 1: Install the Rouge Gem**

Ensure you're in your project directory by running the following command in your terminal:

`cd your_project`

Then, install the Rouge gem:

`gem install rouge`.



### **Step 2: Update** `_config.yml`

Modify your `_config.yml` file to include the following settings:

```yaml

    # Markdown settings

    markdown: kramdown
    highlighter: rouge
    kramdown:
    input: GFM

```

### **Step 3: Add a Syntax Stylesheet**

In your `assets/css` directory create a new css file named `syntax.css`. Link this file in your main layout (`_layouts/default.html` or equivalent) by adding:

```html

    <link rel="stylesheet" href="{{ '/assets/css/syntax.css' | relative_url }}">

```

### **Step 4. Choose a syntax Theme**

To style your code, select a Rouge theme:

1. Visit [this GitHub repository](https://github.com/brazacz/rouge-themes/tree/main) .

2. Navigate to the [css directory](https://github.com/brazacz/rouge-themes/tree/main/css).

3. Copy the content of your preferred theme into `syntax.css` file.

Alternatively, you can use my custom theme [here](https://github.com/low-perry/my-jekyll-syntax-highlighter-theme).

### **Step 5: Verify with Code Examples**

To ensure your syntax highlighting works correctly, add some sample code to a post or page.

**Java Example:**

```java

    public class HelloTheme {
        public static void main(String[] args) {
            System.out.println("Hello, Theme!");
        }
    }

```

**TypeScript Example:**

```typescript

    function greet(name: string): string {
        return `Hello, ${name}!`;
    }
    const name: string = "Theme"

    console.log(greet(name));

```

Now, syntax highlighting should work properly in your [Jekyll](https://jekyllrb.com/) project.
If you want to create your own theme, [follow my tutorial]({{ '/blog/tutorial-how-to-create-your-own-syntax-theme' | relative_url }}).

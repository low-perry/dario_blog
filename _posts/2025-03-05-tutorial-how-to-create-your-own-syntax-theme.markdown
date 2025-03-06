---
layout: page
title:  "Creating your own Jekyll syntax highlighting theme"
date: 2025-03-05 17:45:33 +0100
categories: jekyll tutorial
excerpt: "Learn how to create your own syntax theme for code highlighting in Jekyll."
permalink: /blog/:title
---

When [Jekyll](https://jekyllrb.com/) applies syntax highlighting, it uses specific [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) classes to style different elements of the code. Below are the key elements, their rendered [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), and how you can modify their appearance in your theme.

### Basic Example

#### Java Example

```java

    int num = 3;

```

#### Rendered HTML

```html

    <div class="language-java highlighter-rouge">
        <div class="highlight">
            <pre class="highlight">
                <code>
                    <span class="kt">int</span>
                    <span class="n">num</span>
                    <span class="o">=</span>
                    <span class="mi">3</span>
                    <span class="o">;</span>
                </code>
            </pre>
        </div>
    </div>

```

The following java code snippet showcases [my chosen theme](https://github.com/low-perry/my-jekyll-syntax-highlighter-theme). I will use this snippet to guide you through the process of creating your own theme.

```java

    import java.util.ArrayList;
    import java.util.List;

    public class GenericClassExample<T, V> {
        private T first;
        private V second;
        private static final int LOW = 123;

        public GenericClassExample(T first, V second) {
            this.first = first;
            this.second = second;
        }

        public T getFirst() {
            return first;
        }

        public void setFirst(T first) {
            this.first = first;
        }

        public V getSecond() {
            return second;
        }

        public void setSecond(V second) {
            this.second = second;
        }

        @Override
        public String toString() {
            return "GenericClassExample{" +
                    "first=" + first +
                    ", second=" + second +
                    '}';
        }

        public static void main(String[] args) {
            GenericClassExample<String, Integer> example = new GenericClassExample<>("Hello", 123);
            System.out.println(example);

            example.setFirst("World");
            example.setSecond(456);
            System.out.println(example);

            // This demonstrates the primitives
            byte a = 1;
            short b = 2;
            int c = 3;
            boolean d = true;
            boolean e = (a < 3) ? true : false;

            //Reference types
            Integer ab = 4;

            /* Create an ArrayList with positive and negative numbers */
            List<Integer> arr = new ArrayList<>();
            arr.add(-10);
            arr.add(20);
            arr.add(-30);
            arr.add(40);
            arr.add(-50);
            arr.add(60);

            // Print the ArrayList
            System.out.println("ArrayList: " + arr);

            // Check for positive numbers in the ArrayList
            for (Integer n : arr) {
                if (n > 0) {
                    System.out.println(n + " is positive.");
                } else {
                    System.out.println(n + " is negative.");
                }
            }
        }
        
    }

```

## Customizing Syntax Highlighting Colors

### 1. Access Modifiers , Non-Access Modifiers & Declaration Keywords**

**Examples:** `public`, `private` & `final`, `abstract`, `static` & `class`, `interface`

**Rendered HTML:**

```html

    <span class="kd">public</span>

```

**CSS:**

```css

    .highlight .kd {
        color: #f38ba8; /* color of your choosing */
    }

```

### 2. Operators & Punctuation

**Examples:** `+`, `?`, `.`, `=` & `{}`, `()`, `,`, `;`

**Rendered HTML:**

```html

    <span class="o">=</span>

```

> **Note:**This is only in Java's case, in other languages like C# or JavaScript the punctuations have `class="p"`while the operators remain the same.

**CSS:**

```css

    .highlight .o {
        color: #f38ba8; /* color of your choosing */
    }

```

### 3. Class Names & Reference Types

**Examples:** `String`, `Integer`, `ArrayList`, `GenericClassExample`

**Rendered HTML:**

```html

    <span class="nc">String</span>

```

**CSS:**

```css

    .highlight .kd {
        color: #89b4fa; /* color of your choosing */
    }

```

### 4. Primitive Types & void

**Examples**: `int`, `boolean`, `byte`, `short` & `void`

**Rendered HTML:**

```html

    <span class="kt">int</span>

```

**CSS:**

```css

    .highlight .kt {
        color: #89b4fa; /* color of your choosing */
    }
    
```

### 5. Control Flow Keywords

**Examples**: `while`, `for`, `if`, `else`, `switch`, `break`, `continue`

**Rendered HTML:**

```html

    <span class="k">for</span>

```

> **Note:** The `new` operator has the same class name in Java as these keywords

**CSS:**

```css

    .highlight .k {
        color: #89b4fa; /* color of your choosing */
    }

```

### 6. Functions & Methods

**Examples**: `toString()`, `setFirst()`, `setSecond()`, `getFirst()`

**Rendered HTML:**

```html

    <span class="nf">toString</span>

```

> **Note:** The method calls on an object are rendered with the `class="na"` (This happens only in the pattern `object.method()` where `object` has `class="n"` and the `.` operator has `class="o"`).

**CSS:**

```css

    .highlight .nf, .n + .o + .na, .na + .o + .na {
        color: #a6e3a1; /* color of your choosing */
    }

```

### 7. Arguments, Variables & Instance Fields

**Examples**: `first`, `second`, `arr`, `args`

**Rendered HTML:**

```html

    <span class="n">first</span>

```

> **Note:** When we refer to a class member with the `this` keyword then it is rendered with the `class="na"`

**CSS:**

```css

    .highlight .n, .highlight .na {
        color: #ced6f5; /* color of your choosing */
    }

```

### 8. String Literals

**Examples**: `"Hello"`, `"World"`, `"is positive"`, `"is negative"`

**Rendered HTML:**

```html

    <span class="s">"Hello"</span>
    
```

**CSS:**

```css

    .highlight .s {
        color: #f9e2af;
    }

```

### 9. Number & Boolean Literals

**Examples**: `-10`, `123` & `true`, `false`

**Rendered HTML:**

```html

    <span class="mi">-10</span>

    <span class="kc">true</span>

```

**CSS:**

```css

    .highlight .kc, .highlight .mi {
        color: #cba6f7; /* color of your choosing */
    }

```

### 10. Comments

**Examples**: `// Single line comment` & `/* Multi-line comment */`

**Rendered HTML:**

```html

    <span class="c1">// Single line comment</span>

    <span class="cm">/* Multi-line comment */</span>

```

**CSS:**

```css

    .highlight .c1, .highlight .cm {
        color: #505050; /* color of your choosing */
    }

```

> **Note:** This example is based on Java. If you're using another language, inspect the HTML elements in your browser's developer tools to identify the correct classes.

Now you have everything you need to create your own [Jekyll](https://jekyllrb.com/) syntax highlighting theme! 🚀

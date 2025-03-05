---
layout: page
title:  "How to enable syntax highlighter in Jekyll!"
date:   2025-03-04 18:13:33 +0100
categories: jekyll tutorial
---

While trying to diverge from the default theme in Jekyll [minima](https://github.com/jekyll/minima), and implementing my own theme, I realized that the syntax  broke.
This post is going to navigate through the solution of this problem.

```java
public class GenericClassExample<T, V> {
    private T first;
    private V second;

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
    }
}
```
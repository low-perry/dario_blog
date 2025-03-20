---
layout: blog-post
title:  About me
author: Dario Haxhiraj
date: 2025-03-08 01:17:33 +0100
categories: me
excerpt: This an article i started as an about me section on the "Me" page of my website
permalink: /blog/:title
---

This is a another test article

```c#
using System;
using System.Collections.Generic;

public class GenericClassExample<T, V>
{
    private T first;
    private V second;
    private const int LOW = 123;

    public GenericClassExample(T first, V second)
    {
        this.first = first;
        this.second = second;
    }

    public void SetFirst(T first)
    {
        this.first = first;
    }

    public V GetSecond()
    {
        return second;
    }

    public void SetSecond(V second)
    {
        this.second = second;
    }

    public override string ToString()
    {
    return $"GenericClassExample{\{\}}"
    }


    public static void Main(string[] args)
    {

    }
}
```

Linquid errors in c#
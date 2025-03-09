---
layout: page
title:  Beyonce Knowles
author: Kevan Hudson
date: 2025-03-08 01:05:33 +0100
categories: me
excerpt: this is a test
permalink: /blog/:title
---

Let me try writing something completely random here, and hope it picks something from this text

```typescript
class GenericClassExample<T, V> {
    private first: T;
    private second: V;
    private static readonly LOW: number = 123;

    constructor(first: T, second: V) {
        this.first = first;
        this.second = second;
    }

    public getFirst(): T {
        return this.first;
    }

    public setFirst(first: T): void {
        this.first = first;
    }

    public getSecond(): V {
        return this.second;
    }

    public setSecond(second: V): void {
        this.second = second;
    }

    public toString(): string {
        return `GenericClassExample{first=${this.first}, second=${this.second}}`;
    }

    public static main(): void {
        let example: GenericClassExample<string, number>;
        example = new GenericClassExample<string, number>("Hello", 123);

        console.log(example.toString());

        example.setFirst("World");
        example.setSecond(456);
        console.log(example.toString());

        // This demonstrates the primitives
        let a: number = 1;
        let b: number = 2;
        let c: number = 3;
        let d: boolean = true;
        let e: boolean = a < 3 ? true : false;

        // Reference types
        let ab: number = 4;

        // Create an Array with positive and negative numbers
        let arr: number[] = [-10, 20, -30, 40, -50, 60];

        // Print the Array
        console.log("Array: " + arr);

        // Check for positive numbers in the Array
        for (let n of arr) {
            if (n > 0) {
                console.log(n + " is positive.");
            } else {
                console.log(n + " is negative.");
            }
        }
    }
}

// Run the main method
GenericClassExample.main();
```


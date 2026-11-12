---
title: Derivatives, the short version
date: 2026-11-05
description: What a derivative actually means, plus the rules I use most.
tags: [math, calculus]
icon: ✏️
---

A derivative tells you how fast something is changing at one exact moment, like the speedometer of a function.

## Rules I use all the time

1. **Power rule:** the derivative of `x^n` is `n·x^(n-1)`
2. **Constant rule:** the derivative of a number on its own is `0`
3. **Sum rule:** take the derivative of each part separately

<mark>Remember:</mark> the derivative of `x²` is `2x`, not `2`.

```python
# checking my answer numerically
def f(x): return x**2
h = 0.0001
print((f(3 + h) - f(3)) / h)  # ≈ 6, and 2·3 = 6 ✓
```

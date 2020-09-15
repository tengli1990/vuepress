# 函数尾递归优化

栈溢出在递归程序编写过程中是常会出现的错误，但有时把递归程序改写成非递归可能并非易事，此时考虑一下采用尾递归或者相关优化技术就非常有必要。

## 什么是尾调用？

> 尾调用的概念非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。

``` js 
function f(x){
  return g(x)
}
```
上面的代码中，f函数最后一步是调用函数g，这就是尾调用

#### 以下两种都不属于尾调用：

``` js 
// 情况一
function f(x){
  let y = g(x)
  return y
}

// 情况二
function f(x){
  return g(x) - 1
}
```
- 情况一
  调用函数之后，还有别的操作，所以不属于尾调用。即使语义完全一样

- 情况二
  调用函数之后，也有别的操作，即便在同一行内。

#### 尾调用不一定出现在函数尾部，只要是最后一步运行即可

``` js
function f(x){
  if(x > 0){
    return m(x)
  }
  return n(x)
}
```
上面的函数都属于尾调用，因为函数m和n都是执行的最后一步。

## 尾调用优化

尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧” （call frame），保存调用位置和内部变量的等信息。如果在函数A内部调用函数B，那么在A的调用记录上方，还会形成一个B的调用记录。等到B运行结束，将结果返回给A，B的记录才会消失。如果函数B内部还调用函数C，那就还有一个C的调用记录栈，以此类推。所有的调用记录，就形成了一个调用栈 call stack。

::: tip 调用栈
港台称“呼叫堆叠”，英文直接简称为“栈”（the stack））别称有：执行栈（execution stack）、控制栈（control stack）、运行时栈（run-time stack）与机器栈（machine stack），是计算机科学中存储有关正在运行的子程序的消息的栈。有时仅称“栈”，但栈中不一定仅存储子程序消息。  

几乎所有计算机程序都依赖于调用栈，然而高级语言一般将调用栈的细节隐藏至后台。  

调用栈最经常被用于存放子程序的返回地址。在调用任何子程序时，主程序都必须暂存子程序运行完毕后应该返回到的地址。因此，如果被调用的子程序还要调用其他的子程序，其自身的返回地址就必须存入调用栈，在其自身运行完毕后再行取回。在递归程序中，每一层次递归都必须在调用栈上增加一条地址，因此如果程序出现无限递归（或仅仅是过多的递归层次），调用栈就会产生栈溢出。
:::

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用记录，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用记录，

``` js
function f(x){
  var m = 1
  var n = 2
  return g(m+n)
}
// result等同于
function (x){
  return g(3)
}
```

上面代码中，如果g不是尾调用，函数f就需要保存内部变量m和n的值，g的调用位置。但是由于调用g后，函数f就结束了，所以执行到最后一步，完全可以删除 f() 的调用记录。只保留g（3）j记录。

这就叫做尾调用优化 （Tail call optimization），即只保留内层函数的调用记录。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用记录只有一项，这将大大节省内存。这就是"尾调用优化"的意义。

## 尾递归

> 函数调用自身，称之为 递归，那么尾调用自身，就称为尾递归。

递归非常耗费内存，因为需要同时保存成千上百个调用记录，很容易发生"栈溢出"错误（stack overflow）。但对于尾递归来说，由于只存在一个调用记录，所以永远不会发生"栈溢出"错误。

### 一个普通的递归函数

``` js
function sum(x,y){

  if(y>0){
    return sum(x+1,y+1)
  }else{
    return x
  }

  sum(1,100000)
}
```


### 蹦床函数

sum 这里返回一个函数，并不会执行，这样就避免了递归执行函数，消除调用站过大的问题。
``` js

function trampoline(f){
  while(f && f instanceof Function){
    f = f();
  }
  return f
}

function sum(x,y){
  if(y>x){
    return sum.bind(null,x+1,y-1)
  }else{
    return x
  }
}

trampoline(sum(0,10000)) // 5000
```


### 尾递归优化
蹦床函数并不是真正的尾递归优化，下面的实现才是
``` js
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1, 100000)
// 100001
```
上面代码中，tco函数是尾递归优化的实现，它的奥妙就在于状态变量active。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；而accumulated数组存放每一轮sum执行的参数，总是有值的，这就保证了accumulator函数内部的while循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。




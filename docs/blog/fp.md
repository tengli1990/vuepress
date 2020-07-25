# 基础入门

## 范畴论

### 概念

1、函数式编程的起源，是一门叫做范畴论（Category Theory）的数学分支。理解函数式编程的关键，就是范畴论。他是一门很复杂的数学。认为世界上所有的概念体系，都可以抽象成一个个的范畴 `Category` 。  

2、彼此之间存在某种关系概念、事物、对象等等，都构成范畴。任何事物只要找出他们之间的关系，就能定义。  

3、箭头表示范畴成员之间的关系，正式的名称叫做 `态射 morphism`。 范畴论认为，同一个范畴的所有成员，就是不同状态的 `变形 transformation`。通过 `态射 morphism` , 一个成员可以变形成另外一个成员。

![avatar](/fp01.jpg)

### 数学模型

既然范畴是满足某种变形关系的所有对象，就可以总结出他的数学模型。  

* 所有成员是一个集合
* 变形关系是函数

也就是说，范畴论是集合论更上层的抽象，简单的理解就是 `集合` + `函数`。  

理论上通过函数，就可以从范畴的一个成员，算出其他所有成员。


## 函数式编程的基础理论

* 数学中的函数书写✍️如下形式 `f(x) = y`。一个函数 `f` ，以 `x` 作为参数，并返回输出 `y`, 这很简单，但是包含几个关键点：
  * 函数必须总是接受一个参数
  * 函数必须返回一个值
  * 函数应该依据接收到的参数（例如：x）运行，而不是依据外部环境运行的，对于指定的 `x` 只会输出唯一的y。

* 函数式编程不是用函数来编程，也不是传统的面向过程编程。主旨在于将复杂的函数符合成简单的函数（计算理论、递归理论或拉姆达演算）。运算过程尽量写成一系列嵌套的函数调用。

* 通俗写法 function xx(){}区别开函数和方法。方法要与指定的对象绑定、函数可以直接调用。  

* 函数式编程其实相对于计算机的历史而言是一个非常古老的概念，甚至早于第一台计算机的诞生。函数式编程的基础模型来源于 `λ`, `lambda x=>x*2`演算，而 `λ` 演算并非设计于在计算机上执行，它是在 20 世纪三十年代引入的一套用于研究函数定义、函数应用和 递归的形式系统。  

* Javascript 是披着C外衣的 Lisp。

* 真正的火热是随着React的高阶函数而逐步升温。

## 函数式编程常用的核心概念

我们从以下价格方面来说明函数式编程的核心知识

* 纯函数

* 偏应用函数、函数柯里化

* 函数组合

* Point Free

* 声明式与命令式代码

* 惰性求值

### 纯函数

对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态。  

``` js
var arr = [1,2,3]
arr.slice(0,3)
arr.slice(0,3)
// Array.slice 是纯函数，因为他没有副作用，对于固定的输入，输出总是固定的。
```

### 优缺点

``` javascript
// area 1
import _ from 'lodash';
var sin = _.memorize(x => Math.sin(x));

// 第一次缓存会慢一些
var a = sin(1);
// 第二次有了缓存，速度极快
var b = sin(1);
```
纯函数不仅可以有效的降低系统的复杂度，还有很多很棒的特性，比如可缓存性。


``` javascript
// area 2
var min = 18;
// 非纯函数
var checkage = age => age > min;
// 纯函数
var checkage = age => age > 18
```
在不纯的版本中，checkage不仅取决于age 还有外部依赖的变量min。  
纯的checkage把关键字18硬编码在函数内部，扩展性比较差，柯里化优雅的函数式解决

### 纯度和幂等性


`幂等性` 是指函数执行无数次后还具有相同的效果，同一参数运行一次函数应该与连续两次或多次结果一致。幂等性在函数式编程中与纯度相关，但有不一致。

``` javascript
Math.abs(Math.abs(-42))
```
### 偏应用函数

偏应用函数(partial application)

传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

偏函数之所以偏，就在于其只能处理那些能与至少一个 case 语句匹配的输入，而不能处理所有可能的输入

```js
// 带一个函数参数和该函数的部分参数
const parital = (f, ...args) => {
  (...moreArgs) => {
    f(...args, ...moreArgs)
  }
}

const add3(a, b, c) => a + b + c

// 偏应用 2 和 3 到 add3 给你的一个单参数的函数
const fivePlus = partial(add3, 2, 3)
fivePlus(4)
// bind 实现
const add1More = add3.bind(null, 2, 3) // (c)=> 2 + 3 + c

```

### 函数的柯里化

柯里化(curried) 通过偏应用函数实现。它把一个多参数的函数转换为一个嵌套一元函数的过程

传递给函数一部分参数来调用它，让他返回一个函数去处理剩下的函数

改改上边的例子：

```js
var checkage = min => (age => age > min)
var ck18 = checkage(18)
ck18(20)
```

#### 函数的反柯里化

函数柯里化，是固定部分参数，返回一个接受剩余参数的函数，也称为部分计算函数，目的是为了缩小适用范围，创建一个针对性更强的函数

那么反柯里化函数，从字面上讲，意义和用法和函数柯里化相反，扩大适用范围，创建一个应用范围更广的函数。使本来只有特定对象才适用的方法，扩展到更多的对象

```js
// 柯里化
// 柯里化之前
function add (x, y) {
  return x + y
}
add(1, 2) // 3

// 柯里化之后

function addX(x) {
  return function(y) {
    return x + y
  }
}
add(1)(2) // 3

// 反柯里化
Function.prototype.unCurring = function() {
  var self = this
  return function () {
    var obj = Array.prototype.shift.call(arguments)
    return self.apply(obj, arguments)
  }
}

var push = Array.prototype.push.unCurrying()
var obj = {}
push(obj, 'first', 'two')
console.log(obj)

```

**优缺点**：

事实上，柯里化是一种“预加载”函数的方法，通过传递较少的参数，得到已经记住了这鞋参数的新函数，某种意义上讲，这是一种对参数的缓存，是一种非常搞笑的编码函数的方法

**柯里化和偏应用的区别**：

柯里化的参数列表是从左向右的，如果使用 setTimeout 这种就得额外的封装

```js
    const setTimeoutWraper = (timeout,fn)=>{
        setTimeout(fn,timeout)
    }
    const delayTenMs = curring(setTimeoutWraper)(10)
    delayTenMs(()=>console.log('1'));
    delayTenMs(()=>console.log(2))
```

setTimeoutWraper 显得多余,这时候我们就可以使用偏函数，使用 curry 和partial 是为了让函数参数或者函数设置变得更加简单和强大， curry 和 partial实现方式可以参考 lodash

### 函数组合

函数柯里化之后，一旦写出 h(g(f(x))) 为了解决这个问题并且让函数更加自由，函数组合应运而生

#### 函数组合子

更多了解[查看](https://blog.csdn.net/weixin_34006468/article/details/88711570)

compose 函数只能组合接受一个参数的函数，类似于 filter、map、接受两个参数（投影函数：总是在应用转换操作，通过传入高阶参数后返回数组），不能被直接组合可以借助偏函数包裹后继续组合

函数组合的数据流是从右至左，因为最右边的函数首先执行，将数据传递给下一个函数一次类推，有人喜欢另外一种方式，最左侧先执行，我们可以实现 pipe 管道函数。它和 compose 所做的事情一致，只不过交换了数据的方向

因此我们需要对组合子管理程序的控制流

命令式代码能够使用 if-else 和 for 这样的过程控制,函数式则不能.所以我们需要函数组合子.组合子可以组合其他函数(或者其他组合子),并作为控制逻辑单元的高阶函数,组合子通常不声明任何变量,也不包含任何业务逻辑,它们旨在管理函数程序执行流程,并在链式调用中对中间结果进行操作

常见组合子

- 辅助组合子

nothing(没有)、identity（照旧）、defaultTo(默许)、always（恒定）

- 函数组合子

收缩(gather) ,展开(spread) , 颠倒(reverse) , 左偏(partial) ,右偏(partialRight),柯里化(curry) , 弃离(tap) , 交替(alt) ,补救（tryCatch） ,同时（seq）,聚集（converge）,映射（map）,分捡（useWith）,规约（reduce）,组合（compose）

- 谓语组合子

过滤（filter）,分组（group）,排序（sort）

- 其他

组合子变换 juxf

### Of 方法

你可能注意到了，上面生成新的函子的时候，用了 new 命令。这实在太不像函数式编程了，因为 new 命令是面向对象编程的标志。

函数式编程一般约定，函子有一个 of 方法，用来生成新的容器。

下面就用 of 方法替换掉 new。

```js
Functor.of = function(val) {
  return new Functor(val);
};
```

然后，前面的例子就可以改成下面这样。

```js
Functor.of(2).map(function(two) {
  return two + 2;
});
// Functor(4)
```

这就更像函数式编程了。

### Maybe 函子

函子接受各种函数，处理容器内部的值。这里就有一个问题，容器内部的值可能是一个空值（比如 null），而外部函数未必有处理空值的机制，如果传入空值，很可能就会出错。

Maybe 函子就是为了解决这一类问题而设计的。简单说，它的 map 方法里面设置了空值检查。

```js
class Maybe extends Functor {
  constructor(value) {
    super();
    this.val = value;
  }
  isnothing() {
    return !!!this.val;
  }

  map(f) {
    if (this.isnothing()) {
      // 如果没有值，不执行变形函数，直接返回一个新函子 null。
      return Maybe.of(null);
    } else {
      return Maybe.of(f(this.val));
    }
  }
}
```

### Either 函子

条件运算 if...else 是最常见的运算之一，函数式编程里面，使用 Either 函子表达。

Either 函子内部有两个值：左值（Left）和右值（Right）。右值是正常情况下使用的值，左值是右值不存在时使用的默认值。

```js
class Either extends Functor {
  constructor(value) {
    super();
    this.val = value;
  }
  isnothing() {
    return !!!this.val;
  }
  map(left, right) {
    if (this.isnothing()) {
      return Either.of(left(null));
    } else {
      return Either.of(right(this.val));
    }
  }
}
```

### AP 函子

函子里面包含的值，完全可能是函数。我们可以想象这样一种情况，一个函子的值是数值，另一个函子的值是函数。

```js
function addTwo(x) {
  return x + 2;
}

const A = Functor.of(2);
const B = Functor.of(addTwo);
```

上面代码中，函子 A 内部的值是 2，函子 B 内部的值是函数 addTwo。

有时，我们想让函子 B 内部的函数，可以使用函子 A 内部的值进行运算。这时就需要用到 ap 函子。

ap 是 applicative（应用）的缩写。凡是部署了 ap 方法的函子，就是 ap 函子。

```js
class Ap extends Functor {
  constructor(value) {
    super();
    this.val = value;
  }
  ap(F) {
    return Ap.of(this.val(F.val));
  }
}
```

注意，ap 方法的参数不是函数，而是另一个函子。

因此，前面例子可以写成下面的形式。

```js
Ap.of(addTwo).ap(Functor.of(2));
// Ap(4)
```

ap 函子的意义在于，对于那些多参数的函数，就可以从多个容器之中取值，**实现函子的链式操作**。

```js
function add(x) {
  return function(y) {
    return x + y;
  };
}

Ap.of(add)
  .ap(Maybe.of(2))
  .ap(Maybe.of(3));
// Ap(5)
```

上面代码中，函数 add 是柯里化以后的形式，一共需要两个参数。通过 ap 函子，我们就可以实现从两个容器之中取值。它还有另外一种写法。

```js
Ap.of(add(2)).ap(Maybe.of(3));
```

### Monad 函子

函子是一个容器，可以包含任何值。函子之中再包含一个函子，也是完全合法的。但是，这样就会出现多层嵌套的函子。

```js
Maybe.of(Maybe.of(Maybe.of({ name: 'Mulburry', number: 8402 })));
```

上面这个函子，一共有三个 Maybe 嵌套。如果要取出内部的值，就要连续取三次 this.val。这当然很不方便，因此就出现了 Monad 函子。

Monad 函子的作用是，总是返回一个单层的函子。它有一个 flatMap 方法，与 map 方法作用相同，唯一的区别是如果生成了一个嵌套函子，它会取出后者内部的值，保证返回的永远是一个单层的容器，不会出现嵌套的情况。

```js
class Monad extends Functor {
  join() {
    return this.val;
  }
  flatMap(f) {
    return this.map(f).join();
  }
}
```

上面代码中，如果函数 f 返回的是一个函子，那么 this.map(f)就会生成一个嵌套的函子。所以，join 方法保证了 flatMap 方法总是返回一个单层的函子。这意味着嵌套的函子会被铺平（flatten）。

### IO 函子

Monad 函子的重要应用，就是实现 I/O （输入输出）操作。

I/O 是不纯的操作，普通的函数式编程没法做，这时就需要把 IO 操作写成 Monad 函子，通过它来完成。

```js
var fs = require('fs');

var readFile = function(filename) {
  return new IO(function() {
    return fs.readFileSync(filename, 'utf-8');
  });
};

var print = function(x) {
  return new IO(function() {
    console.log(x);
    return x;
  });
};
```

上面代码中，读取文件和打印本身都是不纯的操作，但是 readFile 和 print 却是纯函数，因为它们总是返回 IO 函子。

如果 IO 函子是一个 Monad，具有 flatMap 方法，那么我们就可以像下面这样调用这两个函数。

```js
readFile('./user.txt').flatMap(print);
```

这就是神奇的地方，上面的代码完成了不纯的操作，但是因为 flatMap 返回的还是一个 IO 函子，所以这个表达式是纯的。我们通过一个纯的表达式，完成带有副作用的操作，这就是 Monad 的作用。

由于返回还是 IO 函子，所以可以实现链式操作。因此，在大多数库里面，flatMap 方法被改名成 chain。

```js
var tail = function(x) {
  return new IO(function() {
    return x[x.length - 1];
  });
};

readFile('./user.txt')
  .flatMap(tail)
  .flatMap(print);

// 等同于
readFile('./user.txt')
  .chain(tail)
  .chain(print);
```

上面代码读取了文件 user.txt，然后选取最后一行输出。


## 流行函数式编程库<Badge type="tip" text="源码可读"/>

- RxJS
- cycleJS
- lodash
- underscoreJS
- ramdaJS












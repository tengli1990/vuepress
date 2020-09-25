# JavaScript 执行堆栈详解

当JavaScript执行代码的时候会将变量存在内存中的不同位置：堆（heap）、 栈（stack）中加以区分。其中堆里存放着一些对象，而栈中则存放着一些基础类型变量以及对象的指针。但是我们这里说的执行栈和上面这个栈的意义有所不同。  
js在执行可执行的脚本时，首先会创建一个全局可执行上下文Global Execution Context（简称：GO），每当执行一个函数调用时都会创建一个可执行上下文Execution Context（简称：EC）。当然可执行程序可能会存在很多函数调用，就会创建很多EC，所以JavaScript引擎会创建可执行上下文栈Execution Context Stack (简称：ECS)来管理执行上下文，当函数调用完成，js会退出这个执行环境，并把执行环境销毁，回到上一个方法的执行环境，反复进行，直到执行栈中的代码全部执行完毕。

请看如下关键字：

- 执行栈 （ECS, Execution Context Stack)
- 全局对象 （GO, Global Context）
- 活动对象 （AO, Activation Object）
- 变量对象 （VO, Variable Object）
- 全局上下文 （GC, Global Execution Context）
- 执行上下文 （EC, Execution Context）
- 垃圾回收 （GC, Garbage Collection）
- 词法环境  (LexicalEnvironment)
- 变量环境  (VariableEnvironment))
- 环境记录  (Environment Record)

![img](/blog/js-stack-flow.png)

### 执行栈 - Execution Context Stack
>浏览器解释器执行 js 是单线程的过程。这就意味着同一时间，只能有一件事情在进行，其他的活动和事件只能排队等候，生成出一个等候队列执行栈。

### 执行栈压栈顺序
从开始执行的时候，便会确定一个全局执行上下文 Global Execution Context 作为默认值。如果你在全局环境中，调用了其他的函数，程序将会在创建一个新的EC，然后将此EC 推入到执行栈 ESC 中。  

如果函数内在调用其他函数，重复以上步骤再次执行，创建一个新的EC -> 把EC推入执行栈。一旦一个EC执行完成，便会从执行栈中推出（pop）,ESP负责EC出栈指向。

``` js 
ECStack = [
  GlobalObject
]
```
####  分析压栈过程

``` js    
function fun3() {
    console.log('fun3')
}
function fun2() {
fun3(); }
function fun1() {
    fun2();
}
fun1(); //执行fun1 结果如下 
ECStack = [
  fun2,
  fun1,
  globalContext
];
```
在全局环境执行代码，首先创建一个全局上下文并将全局对象压入栈中，当执行fun1的时就会创建一个fun1的EC并压入栈中，fun1执行过程中，fun2开始执行，同样创建了一个新fun2的EC 并压入栈中,此时栈顶就是fun2, 继续运行到了fun3被调用执行时，再次创建fun3的EC继续压入栈中，到此时的状态
``` js 
ECStack = [
  fun3,
  fun2,
  fun1,
  globalContext
];
```
fun3执行完成后，便会从栈中推出（pop操作）直到所有EC执行完成后，

#### 变量对象 - Variable Object

变量对象VO 是 与执行上下文相关的特殊对象，用来存储上下文的函数声明，函数的形参和变量。

变量对象存储声明的以下内容:
``` js 
// 1-1 函数声明FD(如果在函数上下文中)，-- 不包含函数表达式
// 1-2 函数形参 function arguments
// 1-3 变量声明-注意b=10不是变量，但是var b = 10 是变量。有变量声明提升。
// alert(a); // undefined
// alert(b); // ReferenceError: b is not defined
// b = 10;
// var a = 20;

var a = 10;
function test(x) {
  var b = 20;
}; 
test(30);

// 全局上下文对象
VO(globalContext) = {
  a: 10,
  test: <reference to function>
}


// test 函数上下文对象
VO(test functionContext) = {
  x: 30,
  b: 20
}

// VO分为全局上下文变量对象和 函数上下文的变量对象
VO(globalContext) === global
```

#### 活动对象 - Activation Object
在函数上下文中，变量对象被表示为活动对象AO。当函数被调用后，这个特殊的活动对象就会被创建，它包含普通参数和特殊参数，活动对象在函数上下文中作为变量对象来使用。

``` js 
// - 在函数上下文中，VO是不能直接被访问的，此时由活动对象扮演VO的角色。
// - Arguments它包含如下属性: callee、length
// - 内部定义的函数
// - 以及绑定上对应的变量环境
// - 内部定义的变量
VO(functionContext) === AO
function test(a,b){
  var c = 10
  function d(){}
  var e = function _e(){}
  (function x(){})
}

text(10)

当进入带有 参数 为10 的test函数上下文时，AO的表现如下：
// AO里并不包含 x ，因为x为函数表达式（Function Expression ）而不是函数声明，所以不会影响VO，

AO(test) = {
  a:10,
  b:undefined,
  c:undefined,
  d:<reference to FunctionDeclaration 'd'>,
  e:undefined
}
```

#### 深度活动对象

AO分为创建阶段和执行阶段。

``` js
function foo(i){
  var a = 'hello';
  var b = function privateB() {};
  function c() {}
}
foo(22);
//当我们执行foo(22)的时候，EC创建阶段会类似生成下面这样的对象:
fooExecutionContext = {
  scopeChain:{ Scope },
  AO:{
    arguments:{
      0:22,
      length:1
    },
    i:22,
    c: pointer to function c(),
    a:undefined,
    b:undefined
  },
  VO:{},
  Scope:[AO, globalContext.VO]
}

//在创建阶段，会发生属性名称的定义，但是并没有赋值(变量提升阶段)。一旦创建阶段(creation stage)结束，变进入了激活 / 执行阶段，那么fooExecutionContext便会完成赋值，变成这样:
//【 运行函数内部的代码，对变量复制，代码一行一行的被解释执行 】

fooExecutionContext = {
  scopeChain:{ Scope },
  AO:{
    arguments:{
      0:22,
      length:1
    },
    i:22,
    c: pointer to function c(),
    a: "hello",
    b: pointer to function privateB()
  },
  VO:{},
  Scope:[AO, globalContext.VO],
  this: {运行时确认}
}

```

#### 补充活动对象

``` js
var x = 10;
function foo() {
  var x = 11
  var barFn = Function('alert(x); alert(y);');
  barFn(); // 10, "y" is not defined
}
foo(); 
//1.通过函构造函数创建的函数的[[scope]]属性总是唯一的全局对象(LexicalEnvironment)。 
//2.Eval code - eval 函数包含的代码块也有同样的效果
```

#### 整体运行流程如下

``` js 
// VO函数上下文的链接AO是函数自身的 
ECStack = [
  fun3,
  fun2,
  fun1,
  globalContext
]
```

#### 事件队列 - Task Queue

当js引擎遇到一个异步事件后，不会一直等到异步事件的返回，而是先将异步事件进行挂起。等到异步事件 执行完毕后，会被加入到事件队列中。(注意，此时只是异步事件执行完成，其中的回调函数并没有去执行。)当执行队列执行完毕，主线程处于闲置状态时，会去异步队列那抽取最先被推入队列中的异步事件，放入执行栈中， 执行其中的回调同步代码。如此反复，这样就形成了一个无限的循环。这就是这个过程被称为“事件循环(Event Loop)”的原因

#### 小实战

``` js 
function test(){
  var result = []
  for(var i=0;i<10;i++){
    result[i] = function(){
      return i
    }
  }
  return result
}

let r = test();
r.forEach(fn=>{
  console.log('fn',fn())
})
```
1、函数test执行完出栈，留下AO(test)有个i的指向  
2、函数在执行的时候，函数的执行环境才会生成。所以fn执行的时候生成的作用域链条如下：  
AO(result[i]) -> AO(fn) -> VO(GO) 加个闭包就立马创建了执行环境。  

``` js 
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
</ul>
var list_li = document.getElementByTagName('li')
for(var i=0;i<list_li.length;i++){
  list_li[i].onclick = function(){
    console.log(i)
  }
}
```

那么其实一切就迎刃而解了，闭包的原理就是Scope（堆空间中存储的closure(foo)），this的原理是动态绑定，作用域链的原理是Scope:[AO,globalContext.VO], eval 不能回收的原因是因为推不进AO，变量提升的原理是AO的准备阶段，异步队列的原理是ECS。


### ES5+

- this 值的决定，也被称为 This Binding （即：this 绑定）
- LexicalEnvironment 词法环境
- VariableEnvironment 变量环境

``` js
// EC 执行上下文
ExecutionContext = {
  ThisBinding: "Value",
  LexicalEnvironment: { 
    // ... 
  },
  VariableEnvironment: { 
    // ...
  }
}

// GC 全局执行上下文
GlobalExecutionContext = {
   // 词法环境
   LexicalEnvironment:{
     // 环境记录
      EnvironmentRecord:{
         Type: 'Object', // 全局对象
         outer: null  // 对外部环境的引用
      }
   }
}

// 函数执行上下文
FunctionExecutionContext = {
   LexicalEnvironment:{
     EnvironmentRecord:{
       // 函数环境
       Type: "Declarative",
       // ... 标识符绑定在这里
       // 对全局环境或外部函数环境的引用   
       outer: <Global or outer function environment reference>
     }
   }
}

```

为了继续去适配早期的JS的var等，新的规范增加了变量环境(VariableEnvironment)。变量环境也是一个词法环境，其环境记录器包含了由变量声明语句  

在ES6中 词法环境和变量环境的区别在于 前者用来存储 函数声明和变量（let, const）绑定，而后者仅用于存储变量（var）绑定。

``` js

let a = 10;
const b = 20;
var c

function multiply(e, f){
    var g = 20;
    return e*f*g;
}
c = multiply(20, 30);

GlobalExecutionContext = {
  ThisBinding:"Global Object",
  LexicalEnvironment:{
    EnvironmentRecord:{
      Type: 'Object',
      a: '<uninitialized>',
      b: '<uninitialized>',
      multiply: '<function>'
    },
    outer:null // 外部环境引用
  }.
  VariableEnvironment:{
    EnvironmentRecord:{
      Type: 'Object',
      c: undefined
    },
    outer: null // 外部环境引用
  }
}

// 函数执行上下文

FunctionExecutionContext = {
  ThisBinding:"Global Object",
  // 词法环境 声明函数和let或const变量
  LexicalEnvironment:{
    Environment:{
      Type:"Declarative",
      arguments:{0:20,1:30,length:2},
    },
    outer: null
  },
  // 变量环境 声明 var 变量
  VariableEnvironment:{
    environment:{
      Type:"Declarative",
      g: undefined
    },
    outer: null
  }
}

```

以上 let 和 const 定义的变量并没有关联任何值 uninitialized 未初始化，但 var 定义的变量被初始化成 undefined。这也就是造成TDZ的原因了。







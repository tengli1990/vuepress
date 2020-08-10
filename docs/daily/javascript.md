---
sidebarDepth: 1
---

# javascript 每日一题

## 01 项目中如何进行异常捕获？

::: details 查看解析
  ### 代码执行的错误捕获

  #### 1.try...catch
  * 能捕获到代码执行的错误。
  * 捕获不到语法的错误。
  * 无法处理异步中的错误。
  * 使用try...catch 包裹， 影响代码可读性。

  #### 2.window.onerror

  * 无论是异步还是非异步错误，`onerror` 都能捕获到运行时的错误。
  * `onerror` 主要是来捕获预料之外的错误，而 `try...catch ` 则是用来在可预见性行情况下的监控特定的错误，两者结合使用更加高效。
  * `window.onerror` 函数只有在返回true的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 `Uncaught Error: xxxx` 。
  * 当我们遇到 `<img src="./404.png">` 报404网络请求异常的时候，`onerror` 是无法帮助我们捕获到异常的。

  监听不到资源加载的报错onerror,事件处理函数只能声明一次，不会重复执行多个回调。
  

  #### window.addEventListener('error')

  可以监听到资源加载的报错，也可以注册多个事件处理函数。
  ``` js
  window.addEventListener('error',(msg,url,row,col,error) => {},true)
  ```
  这种方式虽然可以捕捉到网络请求的异常，却无法判断HTTP状态是404还是其他（比如：500等），所以还需要配合服务端日志进行排查分析。



  #### window.addEventListener('unhandledRejection')

  捕获 `Promise` 错误，当 `Promise` 被 `reject` 且没有 `reject` 处理器的时候，会触发 `unhandledRejection` 事件；这可能发生在window下，但也可能发生在Worker中。 这对于调试回退错误处理非常有用。


  ### 资源加载的错误捕获

  1、`imgObj.onerror()`
  2、`performance.getEntries()`,获取到成功加载的资源，对比可以间接捕获错误
  3、`window.addEventListener( 'error', fn,true)`, 会捕获但是不冒泡， 所以window.onerror 不会触发，捕获阶段可以出发。


  ### Vue、React中捕获

  * Vue有 `errorHandler` 可以捕获错误
  * React有 `componentDidCatch` 可以捕获错误
:::



## 02 比较以下表达式1、2、3大小的结果

```javascript
 console.log(1 > 2 > 3)
 console.log(1 < 2 < 3)
```
::: details 查看答案与解析
  ### 答案

  ``` javascript
  true false
  ```

  ### 解析
  1、运算符 `>` `<` 一般是按照从左到右计算。  
  2、题1: `1<2 = true` ,然后 `true < 3`,因为`true == 1`, 所以结果为 `true`。  
  3、题2: `3>2 = true` ,然后 `true > 1`,因为`true == 1`, 所以结果为 `false`。  
:::


## 03 Javascript中如何模拟实现方法的重载

::: details 查看答案
### 一、什么是函数重载

函数重载是函数的一种特殊情况，为方便使用，允许在同一个范围中声明几个功能类似的同名函数，但是这些同名函数形式参数（个数、类型、或顺序）必须不同，也就是说同一个函数完成不同的功能

### 二、利用闭包特性模拟

``` javascript
function addMethod(obj, name, fn){
  var old = obj[name]
  obj[name] = function(){
    if(fn.length === arguments.length){
      return fn.apply(this,arguments);
    }else if(typeof old === 'function'){
      return old.apply(this,arguments);
    }
  }

  const methods = {}
  addMethod(methods,'add', function(){return 0})
  addMethod(methods,'add', function(a){return a})
  addMethod(methods,'add', function(a,b){return a+b})
  addMethod(methods,'add', function(a,b,c){return a+b+c})

  console.log(methods.add(1,2,3)) // 6
  console.log(methods.add(1,2)) // 3
}

```

addMethod 接收3个参数；目标对象，目标方法名，函数体，当函数被调用时；  
1、先将目标 obj[name] 的值存入old中，起初old的值可能不是一个函数。  
2、接着向obj[name] 赋值一个代理函数，并且由于变量old、fn在代理中被调用，所以old、fn将常驻内存不被回收。  
:::


## 04 什么是虚拟DOM、作用、定义？

::: details 查看答案
### 什么事虚拟DOM
从本质上来说，Virtual DOM 是一个javascript 对象，通过对象的方式来表示DOM结构。将页面的状态抽象为js对象的形式，配合不同的渲染工具，是跨平台渲染成为可能。通过事务处理机制，将多次DOM修改的结果一次性更新到页面上。从而有效的减少页面渲染的次数，减少修改DOM的重绘重排次数，提高渲染性能。  

虚拟DOM是对DOM的抽象，这个对象是更加轻量级的对DOM的描述。它设计的最初目的，就是更好的跨平台，比如Node.js就没有DOM，如果想实现SSR，那么一个方式就是借助虚拟DOM，因为虚拟DOM本身是js对象。

在代码渲染到页面之前。vue或者react会把代码转换成一个虚拟DOM对象，以对象的形式来描述真是DOM结构，最终渲染到页面。在每次数据发生变化之前，虚拟DOM都会缓存一份，在变化之时，现在的虚拟DOM会与缓存的虚拟DOM进行比较。

在vue 或者react 内部封装了diff算法，通过这个算法来进行比较，渲染时仅修改 改变的地方。原先没有发生过改变的通过原来的数据进行渲染。

另外现代前端框架的一个基本要求就是无需手动操作DOM，一个方面是你为手动操作DOM无法保证程序性能，多人协作的项目中如果review不严格，可能会有开发者写出性能比较低的代码，另一方面更重要的是省略了手动操作DOM可以大大提高工作效率。

### 为什么要用 Virtual DOM
#### 1.保证性能下限，再不进行手动优化的情况下，提供过得去的性能
- 我们来看一下页面渲染的流程：  
 `解析HTML`  -> `生成DOM Tree` -> `生成CSSOM` -> `Layout` -> `Paint` -> `Compiler`

- 对比一下修改DOM时真实DOM操作和Virtual DOM的过程，来看下他们重排重绘的性能消耗：  
  - 真实DOM：生成HTML字符串 + 重建所有的DOM元素
  - Virtual DOM：生成VNode + DOMDiff + 必要的DOM更新

Virtual DOM更新DOM的准备工作耗费更多的时间，也就是JS层面，相比于更多的DOM操作他的消费是及其便宜的，尤雨溪在社区论坛中说道：框架给你的保证是，你不需要手动优化的情况下，我依然可以给你提供过得去的性能。

#### 2.跨平台
Virtual DOM本质上是JS的对象，它可以很方便的跨平台操作，比如服务端渲染，uniapp等。

### Virtual DOM真的比真实DOM性能好吗？
- 首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML 插入慢。
- 正如它能保证性能下限，在真实DOM操作的时候进行针对性的优化，还是更快的。
:::

## 05 javascript 垃圾回收方法
::: details 查看答案
- 标记清除（mark and sweep）
  * 这是JavaScript最常见的垃圾回收方式，当变量进入执行环境的时候，比如函数中声明一个变量，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”
  * 垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，然后去掉环境中的变量以及被环境中变量所引用的变量（闭包），在这些完成之后仍存在标记的就是要删除的变量了
- 引用计数（reference counting）
  * 在低版本IE中经常会出现内存泄露，很多时候就是因为其采用引用计数方式进行垃圾回收。引用计数的策略是跟踪记录每个值被使用的次数，当声明了一个 变量并将一个引用类型赋值给该变量的时候这个值的引用次数就加1，如果该变量的值变成了另外一个，则这个值得引用次数减1，当这个值的引用次数变为0的时 候，说明没有变量在使用，这个值没法被访问了，因此可以将其占用的空间回收，这样垃圾回收器会在运行的时候清理掉引用次数为0的值占用的空间
:::
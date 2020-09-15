# WebAssembly

- WASM的特点
- 性能表现
- WASM开发工具
- 应用场景
- JavaScript API
- C语言编译成WebAssembly
- 实现一个 Hello World

## WASM的特点

![img](/blog/webassembly-characteristic.png)

- 高效
  WebAssembly 有一套完整的语义，实际上wasm是体积小且加载快的二进制格式，其目的就是充分发挥硬件能力以达到原生执行效率

- 安全
  WebAssembly 运行在一个沙箱化的执行环境中，甚至可以在现有的JavaScript 虚拟机中实现。在web环境中，WebAssembly 将会严格遵守同源策略以及浏览器安全策略。
  
- 开放
  WebAssembly 设计了一个非常规整的文本格式用来调试、测试、实验、优化、学习、教学或者编写程序。可以以这种格式在web页面上查看wasm模块的源码。

- 标准
  WebAssembly 在web中被设计成无版本、特性可测试、向后兼容的。WebAssembly 可以被JavaScript调用，进入JavaScript 上下文，也可以像Web API 一样调用浏览器的功能。当然 WebAssembly 不仅可以运行在浏览器上，也可以运行在非web环境下。

:::tip 对比JS还有以下优点
- 体积小、下载快  
- 不需要引擎解释  
- 兼容性比较少  
- 虽然编译出来的是字节码，并不是机械码，需要引擎转换，但是时间可以忽略不计。
:::
**那么我们来看下下JS 和 WASM的处理步骤**
![img](/blog/webassembly-js_vs_wasm.png)
- JS  
  `解释引擎解释 -> 编译 -> 优化 -> 执行 -> 处理GC`
- WASM  
  `解码 -> 编译优化 -> 执行`  
  WASM中没有GC步骤的，需要手动处理。



## WASM的工具 和 性能表现

- AssemblyScript:支持直接将 TypeScript 编译成 WebAssembly。这对于前端来 说，入门的门槛很低的。
- Emscripten:可以说是 WebAssembly 的灵魂工具。将其他的高级语言，编译成 WebAssembly。
  [Emscripten下载地址](https://github.com/emscripten-core/emscripten)
- WABT:将 WebAssembly在字节码和文本格式相互转换的一个工具，方便开发者 去理解这个 wasm 到底是在做什么事。

> WebAssembly版本和原生JavaScript版本的递归无优化的Fibonacci函数，下图是这 两个函数在值是45、48、50的时候的性能对比。

![img](/blog/webassembly-performance.png)

## 应用场景


## JavaScript API

[MDN-方法和属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly)

## C语言编译成WebAssembly

## WebAssembly实现一个Hello World
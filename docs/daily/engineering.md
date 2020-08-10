---
sidebarDepth: 1
---

#  工程化

## 01 webpack里面的插件是怎么实现的？

::: details 查看答案
  - webpack本质是一种事件流机制，核心模块是
  ``` Javascript
  tapable(Sync + Async)Hooks 构造出 => Compiler(编译)+ Compilation(创建bundle)
  ```

  - compiler 对象代表了完整的webpack 环境配置，这个对象在启动webpack时 被一次性建立，并配置好所有可操作的设置，包括options，loader 和 plugin。挡在webpack环境中应用一个插件时，插件将收到此compiler对象的引用。可以使它来访问webpack 主环境。

  - compilation 对象代表了一次资源版本的构建。当运行webpack开发中间件时，每当检测到一个文件变化，就会创建一个新的compilation，从而生成一组新的编译资源。一个compilation对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪的依赖状态信息。compilation对象也提供了很多关键时机的回调，以供插件做自定义处理。

  - 创建一个插件函数，在其prototype上定义apply方法；  
    指定一个绑定到webpack自身的事件钩子。

  - 函数内，处理webpack内部实例的特定数据

  - 处理完成后，调用webpack提供回调

  **代码示例**

  ``` Javascript
  function myWebpackPlugin(){

  }

  myWebpackPlugin.prototype.apply = function(compiler){
    // 指定挂在
    compiler.plugin('webpacksEventHook', function(compilation /* 处理webpack内部特定的数据 */, callback){
        console.log('This is an example pulgin')

        callback()
    })
  }
  ```
:::


<!-- ## 02 webpack热更新的原理？

:::details 查看答案

::: -->


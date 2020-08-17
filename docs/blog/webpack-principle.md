# 核心原理

- entry
- module
- plugins
- Webpack 运行流程


## 走进webpack入口文件-Entry

``` javascript 
 if(/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js)/g.test(item) === true){
   const entryKey = RegExp.$1
   _entry[entryKey] = item
   const [dist,template] = entryKey.split('-')
 }
```

### 开启对webpack的多核支持

1.webpack是基于NodeJs的，所以开启多核编译 - Open multi core support

``` Javascript
const HappyPack = require('happypack')

const os = require('os')

// 开辟一个线程池
const happyThreadPoll = HappyPack.ThreadPool({size: os.cpus().length});

module.exports.plugins = [
  new HappyPack({
    id: 'babel-application-js',
    threadPool: happyThreadPool,
    verbose: true,
    loaders: [
        {
            loader: require.resolve('babel-loader'),
            options: {
                ...省略
            },
        },
    ],
}),
]

```


### Loader原理分析

![img](/webpack/webpack-loader.jpg)


### 如何开发一个自己的loader
1、use: ['bar-loader', 'foo-loader'] 时，loader 是以相反的顺序执行的  

2、最后的 loader 最早调用，传入原始的资源内容(可能是代码，也可能是二进制文件，用 buffer 处理)第一个 loader 最后调用，期望返回是 JS 代码和 sourcemap 对象(可选)中间 的 loader 执行时，传入的是上一个 loader 执行的结果  

3、多个 loader 时遵循这样的执行顺序，但对于大多数单个 loader 来说无须感知这一点，只负责好处理接受的内容就好。  

4、还有一个场景是 loader 中的异步处理。有一些 loader 在执行过程中可能依赖于外部 I/O 的结果，导致它必须使用异步的方式来处理，这个使用需要在 loader 执行时使用 `this.async()` 来标识该 loader 是异步处理的，然后使用 `this.callback()` 来返回 loader 处理结果。 

### AST静态语法分析树

在计算机科学中，抽象语法树(abstract syntax tree 或者缩写为 AST)，或者语法树(syntax tree)，是源 代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。树上的每个节点都表示源代码中的一种结构。之所以说语法是「抽象」的，是因为这里的语法并不会表示出真实语法中出现的每个细节。  

Webpack提供的一个很大的便利就是能将所有资源都整合成模块，不仅仅是js文件。所以需要一些loader，比如url-loader等等来让我们可以直接在源文件中引用各类资源。最后调用 acorn(Esprima) 解析经 loader 处理后的源文件生成抽象语法树 AST  

- type:描述该语句的类型 --变量声明语句
- kind:变量声明的关键字 -- var
- declaration: 声明的内容数组，里面的每一项也是一个对象
  - type: 描述该语句的类型
  - id: 描述变量名称的对象
    - type:定义
    - name: 是变量的名字
  - init: 初始化变量值得对象
    - type: 类型
    - value: 值 "is tree" 不带引号
    - row: "\"is tree"\" 带引号


``` javascript 

```

## 你不知道的module

## 更好的应用plugins

### 如何 编写自己的webpack

<img src="/webpack/webpack-plugins.png" width="500" style="display:block;margin:20px auto">

**webpack实现插件机制的⼤大体⽅方式是:**

- 「创建」—— webpack在其内部对象上创建各种钩⼦子; 
- 「注册」—— 插件将⾃自⼰己的⽅方法注册到对应钩⼦子上，交给webpack; 
- 「调⽤用」—— webpack编译过程中，会适时地触发相应钩⼦子，因此也 就触发了了插件的⽅方法。

plugins.js
``` javascript
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin { 
  apply(compiler) {
    // 在 compiler的hooks中注册一个方法，当执行到该阶段时会调用 compiler.hooks.run.tap(pluginName, compilation => {
    console.log("The webpack build process is starting!!!");
    }); 
  }
}
```

webpack.config.js
``` javascript
 import ConsoleLogOnBuildWebpackPlugin from './plugins'
  module.exports = {
    plugins:[
      new ConsoleLogOnBuildWebpackPlugin()
    ]
  }
```

### Tapable 

webpack 利用了 [tapable](https://github.com/webpack/tapable) 这个库来协助实现对于整个 构建流程各个步骤的控制。 tapable 定义了主要构建流程后，使用 tapable 这个库添加了各种各样的 钩子方法来将 webpack 扩展至功能十分丰富,这就是plugin 的机制。

![img](/webpack/webpack-tapable.png)

#### 1.什么是Tapable?
webpack核心使用Tapable 来实现插件(plugins)的binding和applying.Tapable是一个用于事件发布订阅执行的插件架构。Tapable就是webpack用来创建钩子的库。

#### 2.打开webpack->package.json->main -> webpac.js 一起分析~


#### 3.创建流程
`Compiler` ->  
`调用 compiler.run 开始构建` ->   
`创建 Compilation` ->    
`基于配置开始创建 Chunk` ->  
`使用 Parser 从 Chunk 开始解析依赖` ->  
`使用 Module 和 Dependency 管理代码模块相互关系` ->   
`使用 Template 基于 Compilation 的数据生成结果代码`

1.事件钩子会有不同的类型 SyncBailHook，AsyncSeriesHook，SyncHook等。  

2.如果是异步的事件钩子，那么可以使用 tapPromise 或者 tapAsync 来注册事件函数， tapPromise 要求方法返回 Promise 以便处理异步，而 tapAsync 则是需要用 callback 来返回结 果。  

3.compiler.hooks.done.tapPromise('PluginName', (stats) => { return new Promise((resolve, reject) => {
// 处理promise的返回结果 reject(err) : resolve() })  

4.compiler.hooks.done.tapAsync('PluginName', (stats, callback) => { callback(err)) })  

5.除了同步和异步的，名称带有 parallel 的，注册的事件函数会并行调用，名称带有 bail 的，注册的事件函数会被顺序调用，直至一个处理方法有返回值名称带有 waterfall 的，每个 注册的事件函数，会将上一个方法的返回结果作为输入参数。有一些类型是可以结合到一起 的，如 AsyncParallelBailHook，这样它就具备了更加多样化的特性。 

## Webpack整体运行流程

webpack 本质上就是一个 JS Module Bundler，用于将多个代码模块进行打包。bundler 从一个构 建入口出发，解析代码，分析出代码模块依赖关系，然后将依赖的代码模块组合在一起，在 JavaScript bundler 中，还需要提供一些胶水代码让多个代码模块可以协同工作，相互引用。下边会 举一些简单的例子来说明一下这几个关键的部分是怎么工作的。  

entry.js
``` javascript 
import { bar } from './bar.js'; // 依赖 ./bar.js 模块  
```

bar.js
``` javascript
const foo = require('./foo.js'); // 依赖 ./foo.js 模块
```

递归下去，直至没有更多的依赖模块，最终形成一颗模块依赖树。  

分析出依赖关系后，webpack 会利用 JavaScript Function 的特性提供一些代码来将各个模块整 合到一起，即是将每一个模块包装成一个 JS Function，提供一个引用依赖模块的方法，如下面例子 中的 __webpack__require__，这样做，既可以避免变量相互干扰，又能够有效控制执行顺序。  

分别将各个依赖模块的代码用 modules 的方式组织起来打包成一个文件
``` javascript
// entry.js
modules['./entry.js'] = function() {
  const { bar } = __webpack__require__('./bar.js')
}
// bar.js
modules['./bar.js'] = function() {
  const foo = __webpack__require__('./foo.js') 
};
// foo.js
modules['./foo.js'] = function() {
  //... 
}
```

### 构建流程的几个步骤

![img](/webpack/webpack-run.jpg)

#### 创建Compiler，调用Compiler.run方法开始构建

- Compiler webpack 的运行入口，compiler 对象代表了完整的 webpack 环境配置。这个对象 在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用，可以使用 它来访问 webpack 的主环境。
  
#### 创建Compilation实例，基于配置开始创建Chunk

- Compilation 对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检 测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状 态信息。compilation 对象也提供了很多关键步骤的回调，以供插件做自定义处理时选择使 用。

#### 使用Parser从Chunk开始解析依赖，使用Module和Dependency 管理代码模块相互关系。

- Chunk，即用于表示 chunk 的类，对于构建时需要的 chunk 对象由 Compilation 创建后保存 管理(webpack中最核心的负责编译的Compiler和负责创建bundles的Compilation都是Tapable的实 例)

- Module(https://github.com/webpack/webpack/blob/master/lib/Module.js)，用于表示代码 模块的基础类，衍生出很多子类用于处理不同的情况(https://github.com/webpack/webpack/ blob/master/lib/NormalModule.js)关于代码模块的所有信息都会存在 Module 实例中，例如 dependencies 记录代码模块的依赖等

- 当一个 Module 实例被创建后，比较重要的一步是执行 compilation.buildModule 这个方法，它 会调用 Module 实例的 build 方法来创建 Module 实例需要的一些东西，然后调用自身的 runLoaders 方法。runLoaders :loader-runner(https://github.com/webpack/loader-runner)，执 行对应的 loaders，将代码源码内容一一交由配置中指定的 loader 处理后，再把处理的结果保 存起来。

- Parser，其中相对复杂的一个部分，基于 acorn 来分析 AST 语法树，解析出代码模块的依赖

- Dependency，解析时用于保存代码模块对应的依赖使用的对象。 Module 实例的 build 方法 在执行完对应的 loader时，处理完模块代码自身的转换后，继续调用 Parser 的实例来解析自 身依赖的模块，解析后的结果存放在 module.dependencies 中，首先保存的是依赖的路径，后 续会经由 compilation.processModuleDependencies 方法，再来处理各个依赖模块，递归地去建立 整个依赖。

#### 使用Template基于Compilation的数据生成结果代码

  - Template，生成最终代码要使用到的代码模板，像上述提到的胶水代码就是用对应的 Template 来生成。

  - Template 基础类:[lib/Template.js](https://github.com/webpack/webpack/blob/master/lib/Template.js)

  - 常用的主要 Template 类:[lib/MainTemplate.js](https://github.com/webpack/webpack/blob/master/lib/MainTemplate.js)

  ### 给babel编写插件

  [https://github.com/jamiebuilds/babel-handbook/](https://github.com/jamiebuilds/babel-handbook/)


# Vue2.x源码解析（一）

- Vue整体架构
- 双向数据绑定原理
- Vue运行时的优化

## Vue 整体架构

### 目录结构

``` text
├── dist                    // 打包后的vue版本
├── flow                    // 类型检查， 3.0换了TypeScript
├── script                  // 构建不同版本vue的相关配置
├── src                     // 源码
│   ├── compiler            // 模版编译器
│   ├── core                // 双向数据绑定核心代码
│       ├── components      // 通用的抽象组件
│       ├── global-api      // 全局API
│       ├── instance        // 实例的构造函数和方法
│       ├── observer        // 数据响应式
│       ├── utils           // 常用的工具函数
│       └── vdom            // 虚拟DOM相关
│   ├── platforms           // 平台的核心模块，不同平台的不同实现
│   ├── server              // 服务端渲染
│   ├── sfc                 // 处理但文件.vue的解析
│   └── shared              // 提供全局用到的工具方法
└── test                    // 单元测试等
```

![img](/blog/vue-defineProperty.png)


## 双向数据绑定原理

- Object.defineProperty
- Observer
- Watcher
- Dep
- Directive



## Vue运行时的优化

- 完整版：同时包含编译器和运行时的版本。
- 编译器：用来将模板字符串编译成为 JavaScript 渲染函数的代码。
- 运行时：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码，在这个过程中，保留的状态和数据。基本上就是除去编译器的其它一切。








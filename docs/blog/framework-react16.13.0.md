# React 源码分析

版本：16.13.0

## 预备工作

- React.createElement
- React.children.map
- React.fiber的思路
- ReactDom.render分析
- 更新state是怎么执行的
- hooks源码分析
- hooks实例分析

工具
- prettier格式化

## React工作流

执行ReactDom.render() 都干了什么。

- legacyRenderSubtreeIntoContainer 方法做了哪些事情
  1、创建 reactRoot 在dom元素上挂在，FiberRoot
  2、初始化时调用 unbatchUpdates 非批处理 
    为什么初始化时不用批处理，初始化操作不需要单独做批处理操作，不做的话会比较快。
    unbatchUpdates 方法
    executionContext 内部上下文，闭包
    状态为什么使用二进制？
    1.按位操作 减少执行时间
    2.方便比较，代码少
    **需要了解 二进制按位操作及返码**
  3、运行时调用 updateContainer

    1 拿到第一个FiberNode `container.current` 
    2 设置 expirationTime 



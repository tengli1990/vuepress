# Vue2.x源码解析（一）

- Vue整体架构
- 双向数据绑定原理
- Vue运行时的优化

## Vue 整体架构

``` text
├── examples      // 例子
├── flow          // 类型检查
├── packages      // 包管理
├── src
│   ├── compiler   // 模版编译
│   ├── core       // 双向数据绑定核心
│   ├── platforms  // 平台的核心模块
│   ├── server     // ssr 处理服务端渲染
│   ├── sfc        // 处理但文件.vue
│   └── shared     // 提供全局用到的工具函数
└── test           // 单元测试等
```

## 双向数据绑定原理

![img](/blog/vue-defineProperty.png)

- Object.defineProperty
- Observer
- Watcher
- Dep
- Directive

### Object.defineProperty

> vue中使用 `Object.defineProperty` 监听对象的同时，还用他重写了数组的方法，那么我们来看一下他是如何对数组的方法进行重写的

#### 监听对象  
- 不能监听目标对象新增的key  
- 可以监听数组，因为数组是类对象，数组的key值就是索引值，但是监听数组会出现意想不到的情况  
  例如：当我们给被监听的数组arr对象执行 `arr.unshift('d') ` 时，会多次触发`Object.defineProperty` get 和 set方法，这是由于数组被修改之后会导致数组的元素进行移位（也可以说是重排索引）,所以要监听数组就需要我们重写数组的方法来避免多次触发监听事件。

#### 重写方法

没有重写数组之前监听数组:
``` javascript
function defineProperty(data, key, value){
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get:function defineGet(){
            console.log(`get:${value}`)
            return value
        },
        set:function defineSet(newVal){
             console.log(`set:${newVal}`)
            value = newVal
        }
    })
}
function observe(data){
    Object.keys(data).forEach(function(key){
        defineProperty(data,key,data[key])
    })
}
var arr = ["a","b","c"]
observe(arr)
arr.unshift('d')
```
当执行 arr.unshift方法时，是如何打印日志的？

重写数组方法之后：
``` Javascript

```




`Observer` `Watcher` `Dep` `Directive`


<!-- - components: keep-alive
- global-api: 全局api、.use、.mixin、.extend
- instance 生命周期、事件绑定处理
- observer: 双向数据绑定逻辑
- utils
- vdom 虚拟dom -->
## Vue运行时的优化

运行时就是当前程序运行的过程中，保留的状态和数据。







# Vuex 实现

- 核心原理
- Vuex本质
- 分析Vue.use
- 完善install方法
- 实现getter
- 实现mutation
- 实现actions

## 核心原理

- Vuex本质是一个对象
- Vuex对象有两个属性
  - install方法：作用是将一个store挂载到全局
  - Store 类
- Store 这个类拥有 commit，dispatch等方法，Store类里将用户传入的state包装成data，作为new Vue的参数，从而实现了state值的响应式

## 基本准备工作

安装vue-cli
``` shell
npm install -g @vue/cli 
vue create my-vuex
cd my-vuex
```
然后删除一些没用的文件夹,删除后src目录
```
src
├── App.vue
├── main.js
└── store      
      └── index.js
```

项目[github地址](https://github.com/tengli1990/my-vuex)，欢迎star,欢迎提建议

我们主要看下 `app.vue` `main.js` `store/index.js` 代码如下：

App.vue
``` js
<template>
  <div id="app">
    my-vuex
  </div>
</template>
```

store/index.js
``` js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```

main.js
``` js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

```

现在来启动一下项目看看初始化是否成功  

my-vuex  

页面显示my-vuex ，ok，没问题，初始化成功

在store文件夹中创建myVuex.js 文件 目录如下
```
├── App.vue
├── main.js
└── store   
      ├── myVuex.js   
      └── index.js
```
再将Vuex引入 改成我们的myVuex

/store/index.js
``` js 
import Vue from 'vue'
import Vuex from './myVuex' // 我们的vuex文件

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
}) 
```

## Vuex的本质

### 在Vue项目中，是如何引入Vuex的呢？

`1` 安装vuex,再通过 `import vuex from 'vuex'` 引入
`2` 先 `var store = new Vuex.Store({...})`，在把store作为参数的一个属性值传入到 new Vue 的实例中, `new Vue({store})`
`3` 最后通过 Vue.use(Vuex) 使得每个组件都可以拥有store的实例。

### 从上述过程我们发现了什么？
通过 `new Vuex.store()` 获得一个store实例，也就是说我们引入的Vuex中有Store这个类作为Vuex对象的一个属性。

初步假设
``` js 
class Store{

}

let Vuex = {
  Store
}

export default Vuex 
```

我们还是用了 `Vue.use` ， 而这方法本质就是执行use对象的install方法
所以 Vuex对象还存在install方法

``` js 
class Store{

}

function install(){}

let Vuex = {
  Store,
  install
}

export default Vuex
```


这样基本的Vuex基础代码就写完了，可以跑起来验证一下。

## 分析Vue.use

```js
Vue.use( plugin )
```

### 参数
{Object | Function} plugin

### 用法
安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。  

该方法需要在调用 new Vue() 之前被调用。  

当 install 方法被同一个插件多次调用，插件将只会被安装一次。  

### 作用

注册插件，此时只需要调用install方法并将Vue作为参数传入即可。但在细节上有两部分逻辑要处理：  

`1` 插件的类型，可以是install方法，也可以是一个包含install方法的对象。  
`2` 插件只能被安装一次，保证插件列表中不能有重复的插件。  

### 实现

``` js 
Vue.myUse = function(plugin){
  const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))

  if(installedPlugins.indexOf(plugin) > -1){
    return this
  }
  const args = Array.prototype.slice.call(arguments,1)
  args.unshift(this)
  if(typeof plugin.install === 'function'){
      plugin.install.apply(plugin, args)
  }else if( typeof plugin === 'function'){
    plugin.apply(null,plugin,args)
  }
  installedPlugins.push(plugin)
  return this
}
```

`1` 在Vue中新增use的方法，接收一个 plugin 参数  
`2` 首先判断是否已经注册过了，如果注册过了，直接终止，使用对象存储安装的插件并使用indexOf判断是否存在。  
`3` 使用 `Array.prototype.slice.call(arguments,1)` 方法 将获取到参数(跳过第一个参数)转化成为数组并赋给args，然后将Vue添加到args列表的最前面。这样做的目的是保证install方法被执行时第一个参数是Vue，其余参数是注册插件时传入的参数。  
`4` 由于plugin参数支持对象和函数类型，所以通过判断plugin.install和plugin哪个是函数，即可知用户使用哪种方式祖册的插件，然后执行用户编写的插件并将args作为参数传入。  
`5` 最后，将插件添加到installedPlugins中，保证相同的插件不会反复被注册。 

## 完善install方法

### 我们前面提到 通过Vue.use(Vuex) 使得每个组件都可以拥有store实例。这是什么意思呢？？？
来看 main.js
``` js 
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
```

我们可以发现这里只是将store ，也就是store/index.js导出的store实例，作为Vue 参数的一部分。  

但是这里就是有一个问题咯，这里的Vue 是根组件啊。也就是说目前只有根组件有这个store值，而其他组件是还没有的，所以我们需要让其他组件也拥有这个store。  

因此，install方法我们可以这样完善

``` js
let install = function(Vue){
  Vue.mixin({
    beforeCreate(){
      if(this.$options && this.$options.store){
        Vue.prototype.$store = this.$options.store 直接挂载
      }
    }
  })
}
```

`1` 当执行`Vue.use(Vuex)`的时候 会执行Vuex下的install方法并将Vue作为参数传递进来。
`2` Vue.mixin 是将mixin的参数合并到Vue的初始参数options中
`3` 使用beforeCreate是因为这个时候$options还没有被初始化完成
`4` 如果$options中挂在了store 那么我们就给store挂载到Vue的原型中

## 实现Vuex的state

``` html
<p>{{$store.state.num}}</p>
```
我们都知道，通过这语句可以获得state的值

``` js
export default new Vuex.Store({
  state: {
    counter:0
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```
也就是说我们把一个对象当作参数传递给了Vuex.Store方法中。

那么接着完善Store方法

``` js
let Vue;
class Store {
   constructor(options){
     const { state, mutations, actions } = options
     this._mutations = mutations
     this._actions = actions
     this._vm = new Vue({
       data:{
         $$state:state
       }
     })
   }

   get state(){
     return this._vm._data.$$state
   }
}

let install = function(_vue){
  Vue = _vue
  Vue.mixin({
    beforeCreate(){
      if(this.$options.store){
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
export default {
  Store,
  install
}
```

`1` 我们在外层声明了Vue全局变量 ,在执行install方法的时候 将 Vue方法赋给我们生命的Vue变量，以便在Store类中使用  
`2` options则是当执行new Vuex.Store 的时候传递过来的对象，有`state` `mutations` `actions` 等属性，我们直接在类中定义好  
`3` Store中new Vue的作用就是实现 state的响应式  
`4` 给Store类添加一个state属性。这个属性自动触发get接口,这是ES6，的语法，有点类似于Object.defineProperty的get接口  

然后查看启动的项目，成功实现。  

## 实现getters

首先我们看一下用法
``` js
export default new Vuex.Store({
  state: {
    counter:0
  },
  mutations: {},
  actions: {},
  getters:{
    doubleCounter: function(state){
      return state.counter * 2
    }
  },
  modules: {
  }
})
```

app.vue
``` html 
<div id="app">
  <p>{{this.$store.state.counter}}</p>
  <p>{{this.$store.getters.doubleCounter}}</p>
</div>
```
定义的getters 被挂载到$sotre中，并被直接执行返回计算之后的值，那么是如何实现的呢？

``` js 
class Store {
  constructor(options){
    const {getters, state, mutations, actions } = options
    this._mutations = mutations
    this._actions = actions
    this._vm = new Vue({
      data:{
        $$state:state
      }
    })

    if(getters){
        this.handleGetters(getters)
    }
  }

  get state(){
    return this._vm._data.$$state
  }

  handleGetters(getters){
    this.getters = {}
    Object.keys(getters).forEach((key)=>{
      Object.defineProperty(this.getters, key,{
        get:()=>getters[key](this.state)
      })
    })
  }
}
```

`1` 判断如果getters存在那么就执行 handleGetters ,在函数内，首先给$sotre.getters赋值一个空对象  
`2` 遍历我们传递过来的getters并将每一个方法通过 Object.defineProperty 绑定到$sotre.getters上  
`3` 当我们获取$sotre.getters的值时，get方法会将传入的getters[key]方法执行并返回结果给$sotre.getters  

## 实现actions

``` js
// 在Store类中新增dispatch、commit
class Store {
  constructor(options){
    const { getters, state, mutations, actions } = options
    this._mutations = mutations
    this._actions = actions
    this._vm = new Vue({
      data:{
        $$state:state
      }
    })
  }

  get state(){
    return this._vm._data.$$state
  }

  handleGetters(getters){
    this.getters = {}
    Object.keys(getters).forEach((key)=>{
      Object.defineProperty(this.getters, key,{
        get:()=>getters[key](this.state)
      })
    })
  }
  
  dispatch(type, payload){
    const entry = this._actions[type]
    if(entry){
      entry(this,payload)
    }
  }

  commit(type, payload){
    const entry = this._mutations[type]
    if(entry){
      entry(this.state, payload)
    }
  }
}
```

app.vue
``` html
<div id="app">
    <p>{{this.$store.state.counter}}</p>
    <p>{{this.$store.getters.doubleCounter}}</p>
    <button @click="$store.dispatch('add')">增加</button>
</div>
```

store/index.js
``` js 
export default new Vuex.Store({
  state: {
    counter:0
  },
  mutations: {
    add(state){
      return state.counter++
    }
  },
  actions: {
    add({commit}){
        commit('add') 
    }
  },
  getters:{
    doubleCounter: function(state){
      return state.counter * 2
    }
  },
  modules: {
  }
})
```

`1` 点击增加的时候传入一个操作为 `add` 对应dispatch的第一个参数type
`2` 判断actions中是否存在`add`方法，如果存在则执行此方法，看一下actions下的方法第一个参数都接收一个可以解构出 commit方法的对象，毋庸置疑，这就是Store的实例。第二个参数payload就是其他的自定义参数，
`3` commit方法接收2个参数与 dispatch一样，不一样的是 dispatch执行actions中的方法，commit则是执行mutations中的方法，如果方法存在，则执行方法，并将state传递过去。

到此结束

## 项目地址
[github](https://github.com/tengli1990/my-vuex)

















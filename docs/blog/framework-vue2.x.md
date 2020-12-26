# Vue2.x 源码阅读

## 一、Vue 的构造函数是什么样的

``` js
// node_modules/vue/src/core/instance/index.js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue

```

引入依赖，定义 Vue 构造函数，然后以Vue构造函数为参数，调用了五个方法，最后导出 Vue。
这五个方法分别来自五个文件：
- init.js 
- state.js 
- render.js
- events.js
- lifecycle.js。

打开这五个文件，找到相应的方法，你会发现，这些方法就是在Vue的原型prototype上挂载方法或属性，经历这五个方法会变成这样：
``` js  
// initMaxin(Vue) src/core/instance/init.js ***********************
Vue.prototype._init = function (options?: Object) {}

// initState(Vue) src/core/instance/state.js ********************
Vue.prototype.$data
Vue.prototype.$props
Vue.prototype.$set = set
Vue.prototype.$delete = del
Vue.prototype.$watch = function(){}

// renderMixin(Vue)    src/core/instance/render.js *****************************
Vue.prototype.$nextTick = function (fn: Function) {}
Vue.prototype._render = function (): VNode {}
Vue.prototype._o = markOnce
Vue.prototype._n = toNumber
Vue.prototype._s = toString
Vue.prototype._l = renderList
Vue.prototype._t = renderSlot
Vue.prototype._q = looseEqual
Vue.prototype._i = looseIndexOf
Vue.prototype._m = renderStatic
Vue.prototype._f = resolveFilter
Vue.prototype._k = checkKeyCodes
Vue.prototype._b = bindObjectProps
Vue.prototype._v = createTextVNode
Vue.prototype._e = createEmptyVNode
Vue.prototype._u = resolveScopedSlots
Vue.prototype._g = bindObjectListeners
Vue.prototype._d = bindDynamicKeys
Vue.prototype._p = prependModifier

// eventsMixin(Vue)    src/core/instance/events.js ***************************
Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {}
Vue.prototype.$once = function (event: string, fn: Function): Component {}
Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {}
Vue.prototype.$emit = function (event: string): Component {}

// lifecycleMixin(Vue)    src/core/instance/lifecycle.js *************************
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {}
Vue.prototype.$forceUpdate = function () {}
Vue.prototype.$destroy = function () {}
```

这就完了吗？  
并没有，根据路线这只是刚刚开始，我们追溯路线往回走，下一个处理Vue构造函数的应该是`src/core/index.js` 文件：
``` js 
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
```

这个文件也很简单，从 instance/index 中导入已经在原型上挂载了方法和属性后的 Vue，然后导入 initGlobalAPI 和 isServerRendering，之后将Vue作为参数传给  initGlobalAPI ，最后又在 Vue.prototype 上挂载了 $isServer和 $ssrContext ，在 Vue 上挂载了 FunctionalRenderContext 和 version 属性。

initGlobalAPI的作用是在Vue构造函数上挂载静态属性和 方法，Vue 经过initGlobalAPI 之后，会变成这样：
``` js  
Vue.config
Vue.util
Vue.set = set
Vue.delete = del
Vue.nextTick = nextTick
Vue.options = {
    components: {
        KeepAlive
    },
    directives: {},
    filters: {},
    _base: Vue
}
Vue.use = function(plugin){}
Vue.mixin = function (mixin: Object) {}
Vue.extend = function (extendOptions: Object): Function {}
Vue.component = function(){}
Vue.directive = function(){}
Vue.filter = function(){}
Vue.prototype.$isServer
Vue.prototype.$isServer
Vue.FunctionalRenderContext = function(){}
Vue.version = '__VERSION__'
```

其中，稍微复杂一点的就是 Vue.options，大家稍微分析分析就会知道他的确长成那个样子。下一个就是 web-runtime.js 文件了，web-runtime.js 文件主要做了三件事儿：

1、覆盖 Vue.config 的属性，将其设置为平台特有的一些方法
2、Vue.options.directives 和 Vue.options.components 安装平台特有的指令和组件
3、在 Vue.prototype 上定义 __patch__ 和 $mount

经过web/runtime/index.js 文件之后是这样的：

``` js  
// 安装平台特定的utils
Vue.config.isUnknownElement = isUnknownElement
Vue.config.isReservedTag = isReservedTag
Vue.config.getTagNamespace = getTagNamespace
Vue.config.mustUseProp = mustUseProp

// 安装平台特定的 指令 和 组件
Vue.options = {
    components: {
        KeepAlive,
        Transition,
        TransitionGroup
    },
    directives: {},
    filters: {},
    _base: Vue
}
Vue.prototype.__patch__
Vue.prototype.$mount
```

这里大家要注意的是 Vue.options 的变化。另外这里的 $mount 方法很简单：
``` js  
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

首先根据是否是浏览器环境决定要不要 query(el) 获取元素，然后将 el 作为参数传递给 this._mount()。
最后一个处理 Vue 的文件就是入口文件 web-runtime-with-compiler.js 了，该文件做了两件事：
1、缓存来自 web-runtime.js 文件的 $mount 函数
``` js  
const mount = Vue.prototype.$mount
```
然后覆盖覆盖了 Vue.prototype.$mount

2、在 Vue 上挂载 compile

``` js  
Vue.compile = compileToFunctions
```
compileToFunctions 函数的作用，就是将模板 template 编译为render函数。


至此，我们算是还原了 Vue 构造函数，总结一下：

### 总结
1、Vue.prototype 下的属性和方法的挂载主要是在 src/core/instance 目录中的代码处理的   
2、Vue 下的静态属性和方法的挂载主要是在 src/core/global-api 目录下的代码处理的  
3、web-runtime.js 主要是添加web平台特有的配置、组件和指令，web-runtime-with-compiler.js 给Vue的 $mount 方法添加 compiler 编译器，支持 template。  


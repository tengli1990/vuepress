---
sidebarDepth: 1
---

# 手写部分

## 手写一个new 操作符

### 步骤

`1` 创建一个新的空对象  
`2` 给这个新对象绑定原型  
`3` 将这个新对象的this指向构造函数  
`4` 如果返回的不是一个对象，默认返回新对象  

### 实现

``` javascript 
function createNew(Con,...args){
  var obj = Object.create(null);
  Object.setPrototypeOf(obj,Con.prototype);
  var result = Con.apply(obj,args)
  return result instanceof Object ? result : obj;
}
```

## 手写一个instanceof
`1` 查找左侧对象的链`__proto__` 是否与右侧的原型相等，如果相等则返回 `true`  
`2` 如果不等一直向上查找，直到找到null，则返回 `false`
``` javascript 
function myInstanceof(l,r){
  var L = l.__proto__
  var R = r.prototype
  while(true){
    if(L === R){
      return true
    }
    if(L === null){
      return false
    }
    L = L.__proto__
  }
}
```

## 手写 map 和 reduce

``` javascript 
// map 
Array.prototype.myMap = function(fn,context){
  var len = this.length
  var i = 0;
  var ret = []
  for(;i<len;i++){
    ret.push(fn.call(context, this[i], i, this))
  }
  return ret
}

// reduce function
Array.prototype.myReduce = function(fn, initValue){
  var len = this.length
  var i = 0
  var ret
  for(;i<len;i++>){
    ret = fn(ret || initValue, this[i],i, this)
  }

  return ret
}
```

## 手写防抖和节流

### 防抖函数
**防抖函数**是指多次触发事件后，事件处理函数只执行一次，并且在触发操作结束时执行。

``` javascript
function debounce(fn, delay, immediate){
  var timer 
  return function(){
    var args = arguments
    var context = this

    timer && clearTimeout(timer)
    if(immediate){
      fn.apply(context, args)
      immediate = false
    }else{
      timer = setTimeout(function(){
        fn.apply(context, args)
        timer = null
      },delay)
    }
  }
}
```

### 节流函数
**节流函数**是指触发事件后，在一定时间间隔内无法连续调用，只有过了规定的时间间隔，才能进行下一次函数调用。

``` javascript
function throttle(fn, delay){
  var timer
  return function(){
    if(timer){
      return 
    }
    var context = this;
    timer = setTimeout(function(){
      fn.apply(context, arguments)
      timer = null
    },delay)
  }
}
```

## 手写实现Object.create原理

``` Javascript
function create(obj){
  function F(){}
  F.prototype = obj
  return new F()
}
```

## 手写一个 call 函数

``` Javascript
Function.prototype.myCall = function(context,...args){
  //  绑定的对象
  var context = context || window
  //  防止冲突
  var callFn = Symbol('callFn')
  context[callFn] = this 
  var result = context[callFn](...args)
  delete context[callFn]
  return result
}
```

## 手写一个 bind 函数
`1` 调用者必须是一个函数  
`2` bind()的第一个参数将作为他运行时的this，  
`3` 一个绑定函数也能使用new操作符创建对象，这种行为就像把原函数当作构造器。  
``` javascript   
Function.prototype.myBind = function(target){
  if(typeof this !== 'function'){
    throw new TypeError('调用者必须是一个function')
  }

  var  aArgs = Array.prototype.slice.call(arguments,1),
  fToBound = this,
  fNOP = function(){},
  fBound = function(){
    return fToBound.apply(
      (this instanceof fNOP ? this : target),
      aArgs.concat(
        Array.prototype.slice.call(arguments)
      )
    )
  }

  if(this.prototype){
    fNOP.prototype = this.prototype
  }

  fBound.prototype = new fNOP()
  return fBound
}
```

## 手写一个对象深拷贝

`1` 如果是非引用类型可以直接返回  
`2` 使用WeakMap存储已经clone的对象，防止循环引用

``` js
function deepClone(obj,cacheObj = new WeakMap()){

  function isObject(obj){
    return Object.prototype.toString.call(obj) === "[object Object]"
  }
  function isArray(obj){
    return Array.isArray(obj)
  }

  // 非引用类型直接返回
  if(!isObject(obj) && !isArray(obj)){
    return obj
  }

  var result ;
  if(isObject(obj)){
    result = {...obj}
  }
  if(isArray(obj)){
    result = [...obj] 
  }

  // 防止循环引用
  if(cacheObj.has(obj)){
    return cacheObj.get(obj)
  }
  cacheObj.set(obj,result)
  for(var key in obj){
    if(isObject(obj[key])){
       result[key]= deepClone(obj[key],cacheObj)
    }else{
      result[key] = obj[key]
    }
  }
  return result
}
```


## 补充代码（一）

`const repeatFun = repeat(console.log, 4, 3000){} repeatFun('Hello World')` 
 实现打印4次，每次间隔 3000ms 

``` js
// 这里直接实现优化版 添加stop方法停止运行
function repeat(fn,times,delay){
  timer = null
  function start(...args){
    var context = this
    timeFn(times-1)
    fn.apply(context,args,4)
    function timeFn(n){
      if(n>0){
        timer =setTimeout(function(){
          timeFn(--n)
          fn.apply(context,args)
        },delay)
      }
    }
  }
  function stop(){
    clearTimeout(timer)
  }
  return {
    start,
    stop
  }
}
var repeatFun  = repeat(console.log, 10, 3000)
repeatFun.start('Hello World')
// 使用 repeatFun.stop()停止运行
```

## 手写一个node eventEmitter
> 实现四个方法 `on` `off` `once` `emit`

``` javascript
class eventEmiter{
  constructor(){
    this.listeners = new Map()
  }

  on(eventName,listener,isOnce){
    const listeners = this.listeners.get(eventName)
    if(isOnce){
      listener.$$once = true
    }
    if(!listeners){
       this.listeners.set(eventName,[listener])
       return
    }
    listeners.push(listener)
  }
  once(eventName,listener){
    this.on(eventName,listener,true)
  }

  off(eventName){
    if(this.listeners.has(eventName)){
      this.listeners.delete(eventName)
    }
  }
  emit(eventName,...args){
    const listeners = this.listeners.get(eventName)
    if(!listeners){
      return new Error(`not found ${eventName} of listeners`)
    }

    const len = listeners.length

    for(let i=0;i<len;i++){
      const listener = listeners[i]
      if(listener.$$once){
        listener = listener.splice(i,1)
        i--
      }
      listener.apply(null, args)
    }
  }
}

var emitter = new EventEmitter()
emitter.on('test',function(...arg){
    console.log('打印1',...arg)
})
emitter.once('test',function(...arg){
    console.log('打印2',...arg)
})
emitter.on('test',function(...arg){
    console.log('打印3',...arg)
})
emitter.trigger('test',1,2,3)
emitter.trigger('test',1,3)
```

## 手写Array负索引
> 使用proxy实现数组负索引 arr[-1]

``` js
var arr = [1,2,3,4,5]

var proxy = new Proxy()
```




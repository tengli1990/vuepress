---
sidebarDepth: 1
---

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

<!-- ## 手写一个 bind 函数

``` javascript   

``` -->





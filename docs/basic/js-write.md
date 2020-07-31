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

<!-- ## 手写一个instanceof -->





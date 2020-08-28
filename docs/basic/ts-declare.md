# 声明

#### 属性重命名
``` ts 
let {a: name1, b: name2} = { a: "foo", b: "bar"};
console.log(name1)  // foo
console.log(name2)  // bar
``` 

#### 默认值
``` ts 
function keepWholeObject(wholeObject: { a:string, b?: number }){
  let { a, b=1031 } = wholeObject
}
```

#### 函数声明
结构也能用于函数声明

``` ts
type C { a: string, b?: number}

function fn({a, b}: C):void {
  // ...
}

// 结构设置默认值
function fn({a='',b=1} = {a:''}):void {
  console.log(a,b)
  // ...
}

fn()            // '' 1  
fn({a:'yes'})   // yes 10
fn({})          // Error  a is reqired 
```

#### 展开

``` ts 
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
console.log(search)    // { food: "rich", price: "$$", ambiance: "noisy" }
```
像数组展开一样，它是从左至右进行处理，但结果仍为对象。出现在展开对象后面的属性会覆盖前面的属性。 

当你展开一个对象实例时，你会丢失其方法：
``` ts 
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
```
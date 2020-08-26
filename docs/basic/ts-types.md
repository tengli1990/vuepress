# 类型

## 布尔、数字、字符串
``` ts
let isDone: boolean = false       // boolean
let count: number = 60            // number
let name: string = "bob"          // string 支持模版字符串 例如： `我的名字叫${name}`
```
## 数组

有两种方式可以定义数组第一种：
``` ts
let list: number[] = [1,2,3] 
```
第二种是使用泛型：`Array<元素类型>`
``` ts 
let list: Array<number> = [1,2,3]
```

## 元组 - Tuple

元组类型允许表示一个已知数量和类型的数组，各元素的类型不必相同，比如你可以定义一对值分别为`string` 和 `number` 类型的元组。
``` ts
let x: [number, string] = [1, "name"]   // OK     
x = ['name',1]                          // Error 
// 当访问一个越界的元素，会使用联合类型替代
x[3] = 'world';                         // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString());           // OK, 'string' 和 'number' 都有 toString
x[6] = true                             // Error, 布尔不是(string | number)类型
```

## 枚举 - enum
enum 类型是对JavaScript 标准数据类型的一个补充，像C# 等其他语言一样，使用枚举类型可以为一组数值赋予友好的名字。 

默认情况下，从0开始为元素编号。手动将元素编号设置为从1开始： 
``` ts
// 默认
enum Ball {Basketball, Football, Tennis}
let b: Ball = Ball.Basketball;
console.log(b)  // 0 

// 手动指定开始编号
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;

// 通过枚举的值获取名字
let colorName: string = Color[2]
console.log(colorName)            // Green 因为默认编号设置为 Red=1 那么Green没有指定，所以默认为2
```

## Void 

声明一个void类型的变量没什么大用，因为它只能被赋予 null 和 undefined.
``` ts 
let unusable: void = undefined;
let unusable: void = null;
```

## null 和 undefined
``` ts 
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```
默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
``` ts
let nums: number[] = undefined  // Ok [当指定了 --strictNullChecks标记时，会抛出错误]
```
当指定了 --strictNullChecks标记时，null和undefined只能赋值给void和它们各自。

::: warning 注意
我们鼓励尽可能地使用--strictNullChecks。
:::


## Never

`never` 表示的时那些用不存在的值的类型。  
`never` 类型是任何类型的子类型，也可以赋值给任何类型；  
然而，没有类型是 `never` 的子类型或可以赋值给never类型（除了 `never`  本身之外）。 即使 any也不可以赋值给`never` 。

``` ts  
// 返回never的函数必须存在无法达到的终点
function error(message: string):never {
  throw new Error(message);
}

// 推断返回值为 never
function fail(){
  return error("somethine error")
}

// 返回never的值始终无法到达终点
function infiniteLoop(): never{
  while(true){
    //...
  }
}
```

## Object

object 是一个复杂的数据类型。

``` ts 
declare function create (o: object | null): void

create({prop:0})      // Ok
create(null)          // Ok

create('prop')        // Error
create(10)            // Error
```

## 类型断言

类型断言有两种形式。 
``` ts  
let someValue: any = 'this is a string'
//  建括号方法
let someValueLength: number = (<string>someValue).length

// as 方法
let someValueLength: number = (someValue as string).length
``` 

## 声明

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



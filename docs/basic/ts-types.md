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



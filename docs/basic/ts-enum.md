# 枚举

### 字符串枚举
概念很简单，但是又细微的运行时差别。在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。

``` ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
}

let up: string = Direction.Up
console.log(up) // UP
```

### 异构枚举
混合字符串和数字成员: 不推荐这么做
``` ts
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```

### 计算过的和常量成员

枚举成员使用 常量枚举表达式初始化。 常数枚举表达式是TypeScript表达式的子集，它可以在编译阶段求值。 当一个表达式满足下面条件之一时，它就是一个常量枚举表达式：

- 一个枚举表达式字面量（主要是字符串字面量或数字字面量）
- 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
- 带括号的常量枚举表达式
- 一元运算符 +, -, ~其中之一应用在了常量枚举表达式
- 常量枚举表达式做为二元运算符 +, -, *, /, %, <<, >>, >>>, &, |, ^的操作对象。 若常数枚举表达式求值后为 NaN或 Infinity，则会在编译阶段报错。

所有其它情况的枚举成员被当作是需要计算得出的值。
``` ts
enum FileAccess {
  // contant members
  None,
  Read  = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = '123'.length
}
```




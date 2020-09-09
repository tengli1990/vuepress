# 泛型

使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。

### 示例!
下面来创建第一个使用泛型的例子：identity函数。 这个函数会返回任何传入它的值。你可以把这个函数当成是echo命令

不使用泛型可能会像下面这样
``` ts
function identity(arg:number):number {
  return arg
}
```
使用泛型呢
``` ts
function identity<T>(arg:T):T{
  return arg
}
```
我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型，参数也定义了泛型T，返回值也是类型T

定义泛型之后,可以用两种方法使用

```ts
// 第一种是，传入所有的参数，包含类型参数：
let output1 = identity<string>('myString')
// 利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型
let output2 = identity('myString')
```

### 使用泛型变量
下面例子 由于T的类型不确定是否存在 `length` 属性 所以报错。例如 T 为 number类型时

``` ts
function identity<T>(arg: T):T{
  return arg
}

function loggingIdentity<T>(arg: T):T{
  console.log(arg.length) // Error: T doesn`t have .length
  return arg
}
```

如果是T类型的数组呢

``` ts
function identity<T>(arg: T[]):T[]{
  console.log(arg.length)  // Ok
  return arg
}
```
也可以写成
``` ts 
function identity<T>(arg:Array<T>):Array<T>{
  console.log(arg.length) // OK
  return arg
}

```

### 泛型类型与泛型接口

主要研究函数本身的诶型，以及如何创建泛型接口。
``` ts
function identity<T>(arg: T):T{
  return arg
}

let myIdentity:<T>(arg:T)=>T = identity;
// 也可以想下面这样
let myIdentity2:<U>(arg:U)=>U = identity;
// 还可以使用对象字面量的方式来定义泛型
let myIdentity3:{<T>(arg: T):T} = identity;

```

这引导我们写一个泛型接口，就是用到了对像字面量的方式

``` ts 
interface GenericIdentityFn {
  <T>(arg: T):T;
}

function identity<T>(arg:T):T{
  return arg
}

let myIdentity: GenericIdentityFn = identity
```

改良版，把泛型参数当作整个接口的一个参数，这样我们就能清楚的知道使用的具体是哪个泛型类型

``` ts 
function GenericIdentityFn<T>{
  (arg:T):T;
}
function identity<T>(arg:T):T{
  return arg
}
let myIdentity:GenericIdentityFn<number> = identity;
```
### 泛型类
泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。

``` ts 
class GenericNumber<T>{
  zeroValue:T;
  add:(x:T,y:T)=>T;
}
let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x,y){return x+y}
console.log(myGenericNumber.add(1,2))  //3
```

### 泛型约束

``` ts
interface Lengthwise{
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T):T{
  console.log(arg.length)
  return arg
}

loggingIdentity(123) // error: Argument of type '123' is not assignable to parameter of type 'Lengthwise'.

loggingIdentity([1,2,3]) // OK
loggingIdentity({length:1}) // Ok , 如果去掉了length属性 则会报错
```

#### 在泛型约束中使用类型参数

你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象 obj上，因此我们需要在这两个类型之间使用约束。

``` ts 
function getProperty<T, K extends keyof T>(obj: T, key: K){
  return obj[key]
}

let x = {a:1,b:2,c:3,d:4}

getProperty(x, 'c')
```

#### 在泛型里使用类类型

在TypeScript 使用泛型创建工厂函数时，需要引用构造函数的类类型。 比如
``` ts
function create<T>(c:{new():T}):T{
  return new c()
}
```

一个更高级的例子，使用原型属性推断并约束构造函数与实例的关系。
``` ts 
class Beekeeper{ 
  hasMask: boolean
}

class ZooKeeper{
  nametag:string
}

class Animal {
  numLegs:number
}

class Bee extends Animal{
   kepper: Beekeeper
}

class Lion extends Animal{
  keeper: ZooKeeper
}

function createInstance<A extends Animal>(c: new()=>A){
  return new c()
}

createInstance(Lion).keeper.nametag  // typechecks

```
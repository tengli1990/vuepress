## 设计模式的六大原则 ——SOLID

- Single Responsibility Principle：单一职责原则  
- Open Closed Principle：开闭原则  
- Liskov Substitution Principle：里氏替换原则  
- Law of Demeter：迪米特法则  
- Interface Segregation Principle：接口隔离原则  
- Dependence Inversion Principle：依赖倒置原则  

### 单一职责原则 （SRP）
单一职责原则认为一个对象应该仅具有一种单一功能的概念。
::: tip 说明
换句话说就是让**一个类只做一种类型责任**，当这个类需要承担其他类型的责任的时候，就需要分解这个类。在所有的SOLID原则中，这是大多数开发人员感到最能完全理解的一条。严格来说，这也可能是违反最频繁的一条原则了。单一责任原则可以看作是低耦合、高内聚在面向对象原则上的引申，将责任定义为引起变化的原因，以提高内聚性来减少引起变化的原因。责任过多，可能引起它变化的原因就越多，这将导致责任依赖，相互之间就产生影响，从而极大的损伤其内聚性和耦合度。单一责任，通常意味着单一的功能，因此不要为一个模块实现过多的功能点，以保证实体只有一个引起它变化的原因。
:::

请看以下Code：
``` javascript
// bad
class UserSettings {
    constructor(user) {
        this.user = user;
    }
    changeSettings(settings) {
        if (this.verifyCredentials()) { }
    }
    verifyCredentials() { }
}

// good
class UserAuth {
    constructor(user) {
        this.user = user;
    }
    verifyCredentials() {}
}

class UserSetting {
    constructor(user) {
        this.user = user;
        this.auth = new UserAuth(this.user);
    }
    changeSettings(settings) {
        if (this.auth.verifyCredentials()) {}
    }
}

```

#### 【优点】
降低了单个类或者对象的复杂度，按照职责把对象分解成了更小的粒度，这有助于代码的复用，也有利于进行单元测试。当一个职责需要变更的时候，不会影响到其他的指责。

#### 【缺点】
增加编码复杂度，同时增加了对象之间联系的难度。

## 开闭原则（OCP）
对扩展开放，对修改封闭
::: tip 说明
当需要改变一个程序的功能或者给这个程序增加新功能的时候，可以使用增加代码的方式，但是不允许改动程序的源代码。
:::

### 【优点】

程序的稳定性提升、容易变化的地方分离出来后更容易维护了。

### 【缺点】

代码的完全封闭几乎不可能，谁也没有“未卜先知”的能力，但是我们可以尽可能的将容易变化的地方进行封闭


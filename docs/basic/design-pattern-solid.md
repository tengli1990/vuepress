# SOLID

## 设计模式的六大原则
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
#### bad way
``` javascript
class UserSettings {
    constructor(user) {
        this.user = user;
    }
    changeSettings(settings) {
        if (this.verifyCredentials()) { }
    }
    verifyCredentials() { }
}
```
#### good
``` javascript
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

### 迪米特法则 - 最少只是原则 (LKP)
也叫**最少只是原则** （LKP），一个对象应该对其他对象有最少的了解。

我们再写一个类的时候，应该尽可能的少暴露自己的接口。就是说，再写类的时候能不用`public` 就不用 `public`，所有暴露的属性或接口，都是不得不暴露的，这样的话就能保证其他类对这类有最少的了解了。

如果被调用者暴露的太多不需要的属性和方法，那么就可能导致 调用者滥用其中的方法，或是会引起一些不必要的麻烦。

### 开闭原则（OCP）
开闭原则认为“软件体应用应该是对扩展开放的，但是对修改是封闭的”。
::: tip 软件体可扩展，而不可修改
“开”指的就是类、模块、函数都应该具有可扩展性  
“闭”指的就是他们（类、模块、函数）不应该是被修改  
也就是说，你可以新增功能，但是不能修改源码。
:::
这个原则是诸多面向对象编程原则中最抽象、最难理解的一个。  

**对扩展开放**，意味着有新的需求变化时，可以对现有代码进行扩展，以适应新的情况。**对修改封闭**意味着类一旦设计完成，就可以独立完成工作，而不需要对类进行任何修改。可以使用变化和不变来说明：封装不变的部分，开放变化的部分，一般使用接口继承方式来实现“**开放**”应对变化，说大白话就是：你不是要变化吗？那么我就让你继承实现一个对象，用一个接口抽象你的职责，你变化越多，继承实现的子类就越多。

#### bad way
``` javascript
class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'ajaxAdapter';
  }
}
class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'nodeAdapter';
  }
}
class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }
  fetch(url) {
    if (this.adapter.name === 'ajaxAdapter') {
      return makeAjaxCall(url).then((response) => {
        // 传递 response 并 return
      });
    } else if (this.adapter.name === 'httpNodeAdapter') {
      return makeHttpCall(url).then((response) => {
        // 传递 response 并 return
      });
    }
  }
}
function makeAjaxCall(url) {
  // 处理 request 并 return promise
}
function makeHttpCall(url) {
  // 处理 request 并 return promise
}
```

#### good way
``` Javascript
class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'ajaxAdapter';
  }

  request(url) {
    // 处理 request 并 return promise
  }
}
class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'nodeAdapter';
  }

  request(url) {
    // 处理 request 并 return promise
  }
}

class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }

  fetch(url) {
    return this.adapter.request(url).then((response) => {
      // 传递 response 并 return
    });
  }
}
```

### 里氏替换原则 （LSP）

里氏替换原则认为“程序中的对象应该是可以再不改变程序正确性的前提下被他的子类所替换”

“**子类必须能够替换成他们的基类**”  即：子类应该可以替换任何基类能够出现的地方，并且经过替换以后，代码还 能正常工作。另外，不应该 在代码中出现if/else之类对子类类型进行判断的条件。里氏替换原则LSP是使代码符合开闭原则的一个重要保证。正式由于子类型的可替换性才使得父类型的模块在无需修改的情况下就可以扩展。  
在很多情况下，在设计初期我们类之间的关系是不明确的，LSP则给我们一个判断和设计类之间关系的基准：需不需要继承，以及怎样设计继承关系。

当一个子类的实例应该能够替换任何其超类的实例时，他们之间才具有is-A关系。继承对于OCP，就相当于多态性对于里氏替换原则。子类可以代替基类，客户使用基类，他们不需要知道派生类所做的事情。这是一个针对行为职责可替代的原则，如果S是T的子类型，那么S对象就应该在不改变任何抽象属性的情况下替换所有T对象

#### bad way

``` Javascript
// 长方形
class Rectangle {
  constructor() {
    this.width = 0;
    this.height = 0;
  }

  setColor(color) {
    // ...
  }

  render(area) {
    // ...
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

// 正方形
class Square extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.width = height;
    this.height = height;
  }
}

function renderLargeRectangles(rectangles) {
  rectangles.forEach((rectangle) => {
    rectangle.setWidth(4);
    rectangle.setHeight(5);
    const area = rectangle.getArea(); 
    rectangle.render(area);
  });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);
```

#### good way
``` javascript
  //Good
class Shape {
  setColor(color) {
    // ...
  }

  render(area) {
    // ...
  }
}
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
}
class Square extends Shape {
  constructor(length) {
    super();
    this.length = length;
  }
  getArea() {
    return this.length * this.length;
  }
}
function renderLargeShapes(shapes) {
  shapes.forEach((shape) => {
    const area = shape.getArea();
    shape.render(area);
  });
}
const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
renderLargeShapes(shapes);

```

### 接口隔离原则（ISP）

接口隔离原则认为“多个特定客户端接口要好于一个宽泛用途的接口”。

不能强迫用户去依赖那些他们不使用的接口。换句话说，**使用多个专门的接口比使用单一的总接口总要好（Javascript 几乎没有接口的概念所以使用TS）**。注意：在代码中使用ISP并不一定意味着服务就是绝对安全的。仍然需要采用良好的编码实践，以确保正确的验证与授权。  

这个原则起源于施乐公司，他们建立了一个新的打印机系统，可以执行诸如装订的印刷品一套，传真多种任务。此系统软件创建从底层开始编制，并实现了这些任务功能，但是不断增长的软件功能却使软件本身越来越难适应变化和维护。每一次改变，即使是最小的变化，有人可能需要近一个小时的重新编译和重新部署。这是几乎不可能再继续发展，所以他们聘请罗伯特Robert帮助他们。他们首先设计了一个主要类Job，几乎能够实现所有的任务功能。只要调用Job类的一个方法就可以实现一个功能，Job类就变动非常大，是一个胖模型，对于客户端如果只需要一个打印功能，但是其他无关打印的方法功能也和其耦合，ISP原则建议在客户端和 Job类之间增加一个接口层，对于不同功能，有不同的接口，比如打印功能就是Print接口，然后将大的Job类切分为继承不同接口的子类，这样有一个Print Job类，等等。

#### code view

``` Javascript

```

### 依赖倒置原则 （DIP）

依赖倒置原则规定：代码应取决于抽象概念，而不是具体实现。

**高层模块不应该依赖于底层模块，二者都应该依赖于抽象。**  
**抽象不应该依赖于细节，细节应该依赖于抽象（总结解耦）**  

类可能依赖于其他类来执行其工作。 但是，他们不应当依赖于该类的特定具体实现，而应当是他的抽象。这个原则实在太重要了，社会分工化，标准化都是这个设计原则的体现。显然，这一概念会大大的提高系统灵活性。如果类只关心他们用于支持特定契约而不是特定类型的组件，就可以快速而轻松的修改这些低级服务的功能，同时最大限度的降低对系统其余部分的影响。

#### 依赖注入
当某个角色要另一个角色协助时，通常由调用者来创建被调用者的实例。现在创建实例由容器来完成然后注入调用者。

#### 注入过程
如果需要另一个对象协助时，无需在代码中创建被调用者，而是依赖于外部的注入。

#### 注入的两种方式
- 设置注入
- 构造注入

#### code view
``` Javascript
```
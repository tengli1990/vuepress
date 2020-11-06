# 《JavaScript 高级程序设计》

<!-- ## 目录 -->
<!-- * 第一章 什么是JavaScript
  - 1.1 历史回顾
  - 1.3 JavaScript版本
  - 1.4 小结
* 第二章 HTML中的Javascript -->


## 第一章 什么是Javascript

### JavaScript的实现

完整的 JavaScript 实现包含以下几个部分：
- 核心 （ECMAScript）
- 文档对象模型 (DOM)
- 浏览器对象模型 (BOM)

![img](/books/JSAP/JSAP-1.2.png)

### ECMAScript
ECMAScript，即 ECMA-262 定义的语言，并不局限于 Web 浏览器。事实上，这门语言没有输入和 输出之类的方法。ECMA-262 将这门语言作为一个基准来定义，以便在它之上再构建更稳健的脚本语言。 Web 浏览器只是 ECMAScript 实现可能存在的一种宿主环境(host environment)。宿主环境提供 ECMAScript 的基准实现和与环境自身交互必需的扩展。扩展(比如 DOM)使用 ECMAScript 核心类型 和语法，提供特定于环境的额外功能。其他宿主环境还有服务器端 JavaScript 平台 Node.js 和即将被淘汰 的 Adobe Flash。

如果不涉及浏览器的话，ECMA-262 到底定义了什么?在基本的层面，它描述这门语言的如下部分:
- 语法
- 类型
- 语句
- 关键字
- 保留字
- 操作符
- 全局对象

ECMAScript 只是对实现这个规范描述的所有方面的一门语言的称呼。JavaScript 实现了ECMAScript，而 Adobe ActionScript 同样也实现了 ECMAScript。

#### 版本
> 从ES5版本开始看起

- ECMAScript 3.1 (ECMA-262 第 5 版) 
  于 2009 年 12 月 3 日正式发布。第 5 版致力于厘清 11 第 3 版存在的歧义，也增加了新功能。  
  **新功能包括：JSON 对象 、 方便继承和高级属性定义的方法，以及严格模式**。  
  第5版在2011年6月发布了一个维护性修订版，这个修订版只更正了规范中的错误，并未增加任何新的语言 或库特性。
- ES6、ES2015 或 ES Harmony(和谐版) (ECMA-262 第 6 版)
  2015 年 6 月发布。这一版包 含了大概这个规范有史以来最重要的一批增强特性。  
  **ES6 正式支持了类、模块、迭代器、生成器、箭头 函数、期约、反射、代理和众多新的数据类型**。
- ES7 或 ES2016 ECMA-262 第 7 版
  于 2016 年 6 月发布。这次修订只包含少量语法层面的 增强，如 Array.prototype.includes 和指数操作符。
- ES8 或 ES2017 ECMA-262 第 8 版
  完成于 2017 年 6 月。这一版主要增加了异步函数(async/ await)、SharedArrayBuffer 及 Atomics API，以及 Object.values()/Object.entries()/Object. getOwnPropertyDescriptors()和字符串填充方法，另外明确支持对象字面量最后的逗号。
- ES9 或 ES2018 ECMA-262 第 9 版
  发布于 2018 年 6 月。这次修订包括异步迭代、剩余和 扩展属性、一组新的正则表达式特性、Promise finally()，以及模板字面量修订。
- ES10 或 ES2019 ECMA-262 第 10 版
  发布于 2019 年 6 月。这次修订增加了 Array.prototype. flat()/flatMap()、String.prototype.trimStart()/trimEnd()、Object.fromEntries()方 法，以及 Symbol.prototype.description 属性，明确定义了 Function.prototype.toString() 的返回值并固定了 Array.prototype.sort()的顺序。另外，这次修订解决了与 JSON 字符串兼容的 问题，并定义了 catch 子句的可选绑定。

#### 符合性
> ECMA-262 阐述了什么是 ECMAScript 符合性。要成为 ECMAScript 实现，必须满足下列条件:

 支持 ECMA-262 中描述的所有“类型、值、对象、属性、函数，以及程序语法与语义”;  
 支持 Unicode 字符标准。  

此外，符合性实现还可以满足下列要求。 

 增加 ECMA-262 中未提及的“额外的类型、值、对象、属性和函数”。ECMA-262 所说的这些额外内容主要指规范中未给出的新对象或对象的新属性。  
 支持 ECMA-262 中没有定义的“程序和正则表达式语法”(意思是允许修改和扩展内置的正则表达式特性)。   
以上条件为实现开发者基于 ECMAScript 开发语言提供了极大的权限和灵活度，也是其广受欢迎的原因之一。  


## 第二章 HTML中的JavaScript

<Title title="2.1 script元素" /> 

将 JavaScript 插入 HTML 的主要方法是使用`<script>`元素。这个元素是由网景公司创造出来，并 最早在 Netscape Navigator 2 中实现的。后来，这个元素被正式加入到 HTML 规范。`<script>`元素有下 列 8 个属性。



<Title sub title="属性crossorigin" />

可选属性  
配置相关请求的 CORS(跨源资源共享)设置。默认不使用 CORS。crossorigin= "anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据 标志，意味着出站请求会包含凭据。

#### 基本概念
- Cross Origin Resource Share 
简称 CORS，译为**跨源资源共享**，所涉及到的HTML标签元素有：script、link、img、audio、video
- Origin的组成
由protocol、domain、port三部分组成

#### 凭据模式

- anonymous 不包含凭据，即匿名
- use-credentals 包含凭据

::: tip 凭据是什么？
指的就是Cookie，匿名就是不需要携带cookie发送请求。默认值是anonymous。
:::

<Title sub title="属性integrity" />

允许比对接收到的资源和指定的加密签名以验证子资源完整性(SRI，Subresource Integrity)。  
如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络(CDN，Content Delivery Network)不会提供恶意内容。
``` html
<script crossorigin="anonymous" integrity="sha384-AQSFWSDFSDF..." src="https://lib.baomutu.com/jquery.min.js"></script>
```
浏览器在加载带有integrity属性的script或link标签时，在下载文件后，会先比较自己计算的散列值与integrity属性的值，如果不等则返回网络错误

<Title sub title="属性src" />

可选属性。表示包含要执行的代码的外部文件。

<Title sub title="属性async 和 defer" />

我们来分析下面这张图：
![img](/books/JSAP/JSAP-1.3.png)

- `<script>`  
  加载页面parser过程中遇到此类标签,浏览器会停止解析去请求script的资源并执行，执行后继续解析。

- `<script defer>`  
  异步加载script资源，不会影响解析，但是需要等到解析完成之后执行脚本。执行完脚本之后 触发 DOMContentLoaded 事件

- `<script async>`    
  与defer相似，都是异步加载，区别是在加载完成之后立即执行，会中断解析，执行完成之后继续解析。
- `<script type="module">`  
  ES module的加载方式默认是应用了defer的方式加载，上图fetch的部分的分叉是因为会并行的加载其他依赖的js文件。等依赖全部加载完成后不会立即执行，需要等到文档解析完成后，执行DOMCOntentLoaded前一步 执行js
- `<script type="module" async>`  
  ES module的async方式加载，是在加载全部依赖的js完成之后立即执行，会中断解析，执行完成之后继续解析。  

::: warning defer
表示应该立即开始下载脚本，但不能阻塞页面其他动作，比如下载资源或等待其 他脚本加载。只对外部脚本文件有效。
:::

::: warning async
表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。 在 IE7 及更早的版本中，对行内脚本也可以指定这个属性。
:::

<Title title="2.2 行内代码与外部文件" /> 

虽然可以直接在 HTML 文件中嵌入 JavaScript 代码，但通常认为最佳实践是尽可能将 JavaScript 代 码放在外部文件中。不过这个最佳实践并不是明确的强制性规则。推荐使用外部文件的理由如下。

 **可维护性**    
  JavaScript 代码如果分散到很多 HTML 页面，会导致维护困难。而用一个目录保存 所有 JavaScript 文件，则更容易维护，这样开发者就可以独立于使用它们的 HTML 页面来编辑 代码。  

 **缓存**  
  浏览器会根据特定的设置缓存所有外部链接的 JavaScript 文件，这意味着如果两个页面都 用到同一个文件，则该文件只需下载一次。这最终意味着页面加载更快。  
 
 **适应未来**   
  通过把 JavaScript 放到外部文件中，就不必考虑用 XHTML 或前面提到的注释黑科技。 包含外部 JavaScript 文件的语法在 HTML 和 XHTML 中是一样的。

在配置浏览器请求外部文件时，要重点考虑的一点是它们会占用多少带宽。在 SPDY/HTTP2 中， 预请求的消耗已显著降低，以轻量、独立 JavaScript 组件形式向客户端送达脚本更具优势。

比如，第一个页面包含如下脚本:
```html
<script src="mainA.js"></script>
<script src="component1.js"></script>
<script src="component2.js"></script>
<script src="component3.js"></script>
...
```
后续页面可能包含如下脚本:
``` html
<script src="mainB.js"></script>
<script src="component3.js"></script>
<script src="component4.js"></script>
<script src="component5.js"></script>
...
```

在初次请求时，如果浏览器支持 SPDY/HTTP2，就可以从同一个地方取得一批文件，并将它们逐个 放到浏览器缓存中。从浏览器角度看，通过 SPDY/HTTP2 获取所有这些独立的资源与获取一个大 JavaScript 文件的延迟差不多。  

在第二个页面请求时，由于你已经把应用程序切割成了轻量可缓存的文件，第二个页面也依赖的某 些组件此时已经存在于浏览器缓存中了。  

当然，这里假设浏览器支持 SPDY/HTTP2，只有比较新的浏览器才满足。如果你还想支持那些比较 老的浏览器，可能还是用一个大文件更合适。  

<Title title="2.3 文档模式" />

- 混杂模式(quirks mode)：前者让 IE 像 IE5 一样(支持一些非标准的特性)  
- 标准模式(standards mode)：让 IE 具有兼容标准的行为。

以上两种模式的主要区别只体现在通过 `CSS` 渲染的内容方面，但对 `JavaScript` 也有一些关联影响，或称为副作用。

- 准标准模式  
  这种模式下的浏览器支持很多标准的特性，但是没有标准规定得那么严格。主要区别在于如何对待图片元素周围的空白(在表格中使用图片时最明显)。

<Title sub title="模式的声明" />

#### 混杂模式
混杂模式在所有浏览器中都以省略文档开头的 doctype 声明作为开关。

#### 标准模式通过下列几种文档类型声明开启:

``` html
<!-- HTML 4.01 Strict -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<!-- XHTML 1.0 Strict -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 

<!-- HTML5 -->
<!DOCTYPE html>
```

#### 准标准模式通过过渡性文档类型(Transitional)和框架集文档类型(Frameset)来触发:

``` html
<!-- HTML 4.01 Transitional -->
<!DOCTYPE HTML PUBLIC 5 "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<!-- HTML 4.01 Frameset -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">

<!-- XHTML 1.0 Transitional -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<!-- XHTML 1.0 Frameset -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

准标准模式与标准模式非常接近，很少需要区分。后续所提到的**标准模式**，指的就是除混杂模式以外的模式。

<Title title="2.4 <noscript> 元素" />

在下列两种 情况下，浏览器将显示包含在`<noscript>`中的内容:

 浏览器不支持脚本;  
 浏览器对脚本的支持被关闭。 

任何一个条件被满足，包含在`<noscript>`中的内容就会被渲染。否则，浏览器不会渲染`<noscript>`中的内容。


<Title title="小结" />

JavaScript 是通过`<script>`元素插入到 HTML 页面中的。这个元素可用于把 JavaScript 代码嵌入到 HTML 页面中，跟其他标记混合在一起，也可用于引入保存在外部文件中的 JavaScript。

 要包含外部 JavaScript 文件，必须将 src 属性设置为要包含文件的 URL。文件可以跟网页在同 一台服务器上，也可以位于完全不同的域。  

 所有`<script>`元素会依照它们在网页中出现的次序被解释。在不使用 defer 和 async 属性的 情况下，包含在`<script>`元素中的代码必须严格按次序解释。

 对不推迟执行的脚本，浏览器必须解释完位于`<script>`元素中的代码，然后才能继续渲染页面 的剩余部分。为此，通常应该把`<script>`元素放到页面末尾，介于主内容之后及`</body>`标签 之前。

 可以使用 defer 属性把脚本推迟到文档渲染完毕后再执行。推迟的脚本原则上按照它们被列出 的次序执行。

 可以使用 async 属性表示脚本不需要等待其他脚本，同时也不阻塞文档渲染，即异步加载。异 步脚本不能保证按照它们在页面中出现的次序执行。

 通过使用`<noscript>`元素，可以指定在浏览器不支持脚本时显示的内容。如果浏览器支持并启 用脚本，则`<noscript>`元素中的任何内容都不会被渲染。


## 第三章 语言基础

ES5 定义的ECMAScript是目前位置实现最为广泛（受浏览器支持最好的）的一个版本。  
ES6 受浏览器支持的程度次之，到 2017 年底，大多数主流浏览 器几乎或全部实现了这一版的规范。

<Title title="3.1 语法" />
ECMAScript 的语法很大程度上借鉴了 C 语言和其他类 C 语言，如 Java 和 Perl。熟悉这些语言的开发者，应该很容易理解 ECMAScript 宽松的语法。

<Title sub title="3.1.1 区分大小写" />
ECMAScript 中一切都区分大小写。无论是变量、函数名还是操作符，都区分大 10 小写。

<Title sub title="3.1.2 标识符" />
所谓标识符，就是变量、函数、属性或函数参数的名称。 

#### 标识符的组成
 第一个字符必须是一个字母、下划线(_)或美元符号($);  
 剩下的其他字符可以是字母、下划线、美元符号或数字。

::: warning 标识符格式
尽量使用驼峰大小写形式，即第一个单词的首字母小写，后面每个单词的首字母大写，如:firstSecond、myCar、doSomethingImportant
:::
::: danger 注意
关键字、保留字、true、false和null不能作为标识符。
:::

<Title sub title="3.1.3 注释" />
// 单行注释  
/* 这是多行 注释 */

<Title sub title="3.1.4 严格模式" />
ES5 新增严格模式（strict mode）的概念。 它是一种不同的 JavaScript 解析和执 行模型，ES3中一些不规范的写法或不安全的活动会被抛出错误。

#### 使用
文件中使用：
``` js 
'use strict'
```

函数体中使用：
``` js 
function todo(){
  'use strict'
}
```
::: tip 支持
所有现代浏览器 都支持严格模式。
:::

<Title sub title="3.1.5 语句" />

#### 分号
语句以分号结尾。省略分号意味着由解析器确定语句在哪里结尾。
加分号可以：    
- 避免输入内容不完整
- 避免导致语法错误
- 有助于在某些情况下提升性能

#### 代码块

if 控制语句执行单条语句时也应该尽量添加代码块，避免导致错误

::: warning 使用代码块
可以让内容更清晰，修改代码时也可以减少出错的可能性
:::

<Title title="3.2 关键字与保留字" />
保留的关键字不能用作标识符或属性名。  

ES6规定的所有关键字如下:  

`break` `do`  `in`  `typeof` `case` `else` `instanceof` `var` `catch` `export` `new` `void` `class` `extends` `return` `while` `const` `finally` `super` `with` `continue` `for` `switch` `yield` `debugger` `function` `this` `default`  `if` `throw` `delete` `import` `try`
 
 保留字：  
 `enum`

 严格模式保留字：  

 `implements` `package` `public` `interface` `protected` `static` `let` `private`

 模块代码中保留:  

 `await`

 ::: warning 注意
 以上词汇不能用做标识符，但可以用作对象的属性名。（最好还是不要使用关键字和保留字作为属性名）
 :::

<Title title="3.3 变量" />

<Title sub title="var" />
* 函数级作用域
* 作用域提升
* 重复声明不报错
* 全局声明的变量成为window对象的属性

::: warning 注意
不推荐通过省略var操作符来定义全局变量，因为这很难维护，也会造成困扰。在严格模式下，给未声明的变量赋值，则会抛出ReferanceError。

:::

<Title sub title="let" />

* 块级作用于
* 没有提升，有TDZ（Temporal Dead Zone）
* 不能重复生命
* 混用var和let，重复声明会报错
* 全局声明不是window对象的属性

<Title sub title="const" />

* 声明同时必须初始化变量
* 初始化后不能修改
* 不能修改仅限于常量的引用
* 不能用于声明会自增的迭代变量

<Title sub title="声明风格及最佳实践" />

- 不使用var
- 优先使用const，次之let


<Title title="3.4 数据类型" />

<Title sub title="typeof操作符" />

对一个值使用 typeof 操作符会返回下列字符串之一:  
|值|含义|值|含义|
|-|-|-|-|
|'undefined'| 表示值为定义  | 'function'| 表示值为函数|
|'string'  | 表示值为字符串 | 'boolean'| 表示值为布尔值|
|'number' | 表示值为数字|'object'| 表示值为对象|
|'symbol' | 表示值为符号|

::: warning 注意
- 调用 typeof null 返回的是"object"。这是因为特殊值 null 被认为是一个对空对象的引用。  
- 严格来讲，函数在ECMAScript中被认为是对象，并不代表一种数据类型。可是， 函数也有自己特殊的属性。为此，就有必要通过 typeof 操作符来区分函数和其他对象。
:::

<Title sub title="Undefined类型" />
Undefined 类型只有一个值，就是特殊值undefined，当使用var或let声明一个变量但未初始化时，这个变量的值就等于undefined
``` js 
let message 
message == undefined // true
```
包含 undefined 值的变量跟未定义变量是有区别的。请看下面的例子:
``` js
let message 
console.log(message) // undefined
console.log(age) // 报错：age is not defined
typeof age  // undefined typeof的特殊的安全防范机制避免了报错
```
<Title sub title="Null类型" />

特殊值null，即空对象指针，这也是typeof null === 'object'的原因。  

``` js 
if(!a&& typeof a === 'object'){
  // 如果成立 则a为null
}
```

<Title sub title="Boolean" />

Boolean(布尔值)类型是 ECMAScript 中使用最频繁的类型之一，有两个字面值:true 和 false。 这两个布尔值不同于数值，因此 true 不等于 1，false 不等于 0。

::: warning ⚠️ 注意
布尔值字面量 true 和 false 是区分大小写的，因此 True 和 False(及其他大小混写形式) 5 是有效的标识符，但不是布尔值。
:::


<Title sub title="3.4.7 Symbol类型" />

Symbol 是 ES6新增的数据类型，符号是原始值，且符号实例唯一、不可变。

- 1. 符号的基本用法
- 2. 使用全局符号注册表
- 3. 使用符号作为属性
- 4. 常用内置符号
- 5. Symbol.asyncIterator
- 6. Symbol.hasInstance
- 7. Symbol.isConcatSpreadable
- 8. Symbol.iterator
- 9. Symbol.match
- 10. Symbol.replace
- 11. Symbol.search
- 12. Symbol.species
- 13. Symbol.split
- 14. Symbol.toPrimitive
- 15. Symbol.toStringTag
- 16. Symbol.unscopables

#### 1.符号的基本用法

##### 使用函数Symbol()初始化
``` js
let sym = Symbol()
console.log(typeof sym ) // symbol
```
##### 使用字符串描述Symbol()

``` js 
let fooSymbol = Symbol('foo');
let otherFooSymbol = Symbol('foo');
console.log(genericSymbol == otherGenericSymbol);  // false
```
::: warning ⚠️ 注意
以上代码传入的 “foo”描述字符串参数 与 符号定义或标识完全无关
:::

##### Symbol()函数不能创建包装对象
``` js 
let mySymbol = new Symbol();  // TypeError: Symbol is not a constructor
```
可以借用 Object()函数实现包装对象
``` js
var objSym = Object(Symbol())
console.log(typeof objSym) // object
```

#### 2.使用全局符号注册表

##### 可以通过使用Symbol.for方法创建并重用符号
``` js
// 第一次执行创建符号
let fooSym = Symbol.for("foo") 
// 第二次查找是否已经创建了 foo 符号 如果创建了 则直接返回已创建的符号
let otherSym = Symbol.for("foo") 
console.log(fooSym === otherSym) // true
```
::: warning ⚠️ 注意
- 通过Symbol('foo') 直接创建的符号不能被Symbol.for('foo')查找到，所以他们并不相等。  
- 任何传给Symbol.for方法的参数都会被转换为字符串，此外，注册表中使用的键同时也会被用作符号描述。  
:::

##### 使用Symbol.keyFor()查询注册表
Symbol.keyFor()这个方法接收符号作为参数，返回全局对应的字符串键。如果找不到则返回`undefined`。

``` js
let sym = Symbol.for('foo')
console.log(Symbol.keyFor(sym)) // foo
```
::: warning ⚠️ 注意
Symbol.keyFor()如果接收的不是符号，那么就会抛出错误：TypeError: xxx is not a symbol
:::


#### 3.使用符号作为属性

凡是可以使用字符串或数值作为属性的地方，都可以使用符号。这就包括了对象字面量属性和 Object.defineProperty()/Object.defineProperties()定义的属性。

``` js
let s1 = Symbol('foo')
let s2 = Symbol('bar')
let s3 = Symbol('baz')
let s4 = Symbol('qux')
let o = {
  [s1]:'my name is s1',
  [s2]:'my name is s2',
  [s3]:'my name is s3',
  [s4]:'my name is s4'
}
Object.defineProperty(o,s2,{
  value:'my real name is bar'
})
Object.defineProperties(o, {
    [s3]: {value: 'baz'},
    [s4]: {value: 'qux'}
});
console.log(o[s1]) // my name is s1
console.log(o[s2]) // my real name is bar
console.log(o[s3]) // baz
console.log(o[s4]) // qux
```

##### Object.getOwnPropertyNames & Object.getOwnPropertySymbols

首先我们来看 getOwnPropertyNames 的用法，用来获取对象属性的集合，但是不包括Symbol的符号属性
``` js
var obj = {
  bar:'bar',
  foo:'foo',
  [Symbol('baz')]:'symbol'
}
Object.getOwnPropertyNames(obj) // ['bar','foo']
```
获取符号的属性需要使用 getOwnPropertySymbols 方法

``` js
Object.getOwnPropertySymbols(obj) // [Symbol(baz)]
```

#### 4.常用内置符号

ES6 引入了一批常用的内置符号，用于暴露语言内部的行为；

##### 特点
- 以Symbol工厂函数字符串属性的形式存在。
- 可直接访问、重写或模拟
- 最重要的用途就是用来重新定义，从而改变原生结构,例如：修改for of 中的Symbol.iterator
- 所有内置符号都是不可写、不可枚举、不可配置

::: warning ⚠️ 注意
在ECMAScript规范中，提到的@@iterator 指的就是 Symbol.iterator
:::

#### 5.Symbol.asyncIterator
- 是一个方法
- 该方法返回对象默认的AsyncIterator。
- 使用for-await-of语句遍历执行异步迭代操作。循环时，它们会调用以 Symbol.asyncIterator 为键的函数，并期望这个函数会返回一个实现迭代器 API 的对象。很多时候，返回的对象是实现该 API 的 AsyncGenerator:
  ``` js
  class Emitter {
    constructor(max){
      this.max = max;
      this.asyncIdx = 0
    }

    async *[Symbol.asyncIterator](){
      while(this.asyncIdx < this.max){
        return new Promise(resolve=>resolve(this.asyncIdx++))
      }
    }
  }

  function asyncCount(){
    let emitter = new Emitter(5)

    for await(const x of emitter ){
      console.log(x)
    }
  }
  asyncCount()
  ```

::: warning ⚠️ 注意
Symbol.asyncIterator 是 ES2018 规范定义的，因此只有版本非常新的浏览器 支持它。
:::

#### 6.Symbol.hasInstance
- 是一个方法
- 该方法决定一个构造器对象是否认可一个对象是它的实例。 类似于 instanceof
- 在 ES6 中，instanceof 操作符会使用 Symbol.hasInstance 函数来确定关系。以 Symbol. hasInstance 为键的函数会执行同样的操作，只是操作数对调了一下:
  ``` js 
  function Foo(){};
  let f = new Foo();
  console.log(Foo[Symbol.hasInstance](f)) // true
  console.log(f instance of Foo) // true
  ```
- 重新定义Symbol.hasInstance
  ``` js
  class Baz(){
    static [Symbol.hasInstance](){
      return false
    }
  }
  var b = new Baz()
  Baz[Symbol.hasInstance](b) // false
  // 由于 instanceof 也会去原型上寻找 Symbol.hasInstance 所以也返回false
  b instanceof Baz // false
  ```

#### 7.Symbol.isConcatSpreadable

- 是一个值，值类型：Boolean
- 该属性返回表示是否可以通过 `Array.prototype.concat()`方法打平其数组元素，覆盖 Symbol.isConcat- Spreadable 的值可以修改这个行为。默认情况下会被打平到已有的数组
- Symbol.isConcatSpreadable 真假值
  ``` js
  var arr1 = ['foo']
  var arr2 = ['baz']
  // 默认情况 值为 undefined ，自动被打平  等于 true的情况
  arr2[Symbol.isConcatSpreadable]  // undefined 
  arr1.concat(arr2)   // ['foo','baz']

  // false 将追加的对象添加到末尾
  arr2[Symbol.isConcatSpreadable] = false
  arr.concat(arr2) // ['foo',['baz']]
  ```

- 支持合并 类数组对象
  ``` js
   var arrayLikeObj = {length:1, 0:'bar'}
   var arr = ['foo']
   arr.concat(arrayLikeObj) // ['foo',{length:1,0:'bar'}]
   arrayLikeObj[Symbol.isConcatSpreadable] = true
   arr.concat(arrayLikeObj) // ['foo','bar']
  ```
- 非类数组对象
  ``` js
  var obj = {a:1}
  var arr = ['foo']
  arr.concat(obj) // ['foo',{a:1}]
  obj[Symbol.isConcatSpreadable] = true
  arr.concat(obj) // ['foo']
  ```

#### 8.Symbol.iterator

- 是一个方法
- 该方法返回对象默认迭代器，使用for - of遍历。
  for - of 循环这样的语句结构会利用这函数执行迭代操作，他们会调用以 Symbol.iterator为键的函数，返回迭代器API对象，返回对象很多时候就是实现迭代对象的 Generator
  ``` js
  class Emitter{
    constructor(max){
      this.idx = 0;
      this.max = max
    }
    *[Symbol.iterator](){
      while(this.idx < this. max){
        yield this.idx++
      }
    }
  }
  function count(){
    const emitter = new Emitter(2)
    for(let key of emitter){
      console.log(key) // 0 .. 1 
    }

    // 等同于以上for - of
    /*for(let i = 0;i<2;i++){
      console.log(emitter[Symbol.iterator]().next().value)
    }*/
  }
  count()
  ```

#### 9.Symbol.match

- 是一个正则表达式方法
- 该方法用正则表达式去匹配字符串。由 `String.prototype.match` 方法使用，此方法会使用以`Symbol.match` 为键的函数来对正则表达式求值。

  ``` js
  class StringMatcher{
    constructor(str){
      this.str = str
    }

    [Symbol.match](target){
      return target.includes(this.str)
    }
  }

  'foostring'.match(new StringMatcher('foo')) // true
  'foostring'.match(new StringMatcher('quex')) // false
  ```

#### 10.Symbol.replace

- 是一个正则表达式方法
- 该方法替换一个字符串中匹配的字符串，使用String.prototype.replace 方法使用，此方法会使用 Symbol.replace 为键的函数来对正则表达式求值。
  ``` js   
  class StringReplacer{
    constructor(str){
      this.str = str
    }
    [Symbol.replace](target,replacement){
      return target.split(this.str).join(replacement)
    }
  }

  // 将 strquereplace 中的 que 替换成 xxx
  'strquereplace'.replace(new StringReplacer('que'),'xxx')
  ```

#### 11.Symbol.search

- 是一个正则表达式方法
- 该方法返回字符串中匹配正则表达式的索引，使用String.prototype.search 方法来使用。 次方法会使用以Symbol.search 为键的函数来对正则表达式求值。

  ``` js  
    class StringSearcher{
      constructor(str){
        this.str = str;
      }
      [Symbol.search](target){
        return target.indexOf(this.str)
      }
    }

    'fooString'.search(new StringSearcher('foo'))

  ```

#### 12.Symbol.species

- 是一个值
- 该函数作为创建派生对象的构 造函数”。用于对内置类型实例方法的返回值暴露实例化派生对象的方法。用Symbol.species定义静态的获取器(getter)方法，可以覆盖新创建实例的原型定义:

  ``` js 
  class CustomArray extends Array {
    static get [Symbol.species](){
      return Array
    }
  }
  let arr = new CustomArray(1,2,3)
  let derivedObj = arr.map(v=>v)
  derivedObj instanceof CustomArray // false 
  derivedObj instanceof Array // true 
  ```
  以上代码通过数组的的内置方法map会创建一个派生对象 derivedObj，那么派生对象 derivedObj 的构造函数就是 Symbol.species 方法的返回值 所以 derivedObj 的构造函数是 Array，并不是 CustomArray。

##### 使用了此属性的方法

- Array.prototype.concat();
- Array.prototype.slice();
- Array.prototype.splice();
- Array.prototype.filter();
- Array.prototype.flat();
- Array.prototype.map();
- Array.prototype.flatMap();

#### 13.Symbol.split

- 是一个正则表达式方法
- 该方法在匹配正则表达式的索引位置拆分字符串。由Sting.prototype.split方法使用，可以重新定义Symbol.split 
- RegExp默认定义了Symbol.split方法，接收正则参数，如果传入非RegExp对象类型，则会将参数强制转换成正则。
- 可重新定义
  ``` js   
  class StringSplit{
    constructor(str){
      this.str = str;
    }
    
    [Symbol.split](target){
      return target.split(this.str)
    }
  }
  'foobarbaz'.split(new StringSplit('baz')) // ['foo','baz']
  ```

#### 14.Symbol.toPrimitive

- 是一个方法
- 该方法将对象转换为相应的原始 值。由 ToPrimitive 抽象操作使用。  
  很多内置操作都会尝试强制将对象转换为原始值，包括字符串、 数值和未指定的原始类型。
- 可重新定义
  ``` js
  let obj = {
    [Symbol.toPrimitive](hint){
      if(hint === 'number'){
        return 42
      }
      if(hint === 'string'){
        return 'hello'
      }
      return true
    }
  }

  console.log(+obj) //  40 number
  console.log(`${obj}`) // hello  string
  console.log(obj+'') // true   default 
  ```
##### toString 和 valueOf

- toString()
  该方法返回一个表示该对象的字符串
- valueOf()
  该方法返回指定对象的原始值

  <!-- TODO：需要补充 -->

#### 15.Symbol.toStringTag

- 是一个字符串，用于创建对象的默认字符串描述
- 由内置方法Object.prototype.toString()使用。
  ``` js   
  let s = new Set() // Set(0) {}
  class Foo {}
  let reg = new RegExp(/abc/)

  s.toString()      // [object Set]
  Foo.toString()    // class Foo {}
  reg.toString()    // /abc/

  class Bar {
    constructor(){
      this[Symbol.toStringTag] = 'Bar'
    }
  }
  let bar = new Bar()
  bar.toString()            // [object Bar]
  bar[Symbol.toStringTag]   // Bar
  ```

#### 16.Symbol.unscopables

- 是一个对象，该对象所有的以及继承的属性，都会从关联对象with环境绑定中排除。
- 设置Sybol.unscpables符号映射的属性的键值为true，就可以阻止该属性出现在with中
  ``` js 
  const o = {
    foo:'my name is o'
  }
  with(o){
    console.log(foo) // my name is o
  }
  o[Symbol.unscpables] = {
    foo: true
  }
  with(o){
    console.log(foo) // ReferenceError
  }
  ```








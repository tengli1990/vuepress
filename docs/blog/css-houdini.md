# CSS Houdini

## Houdini 简介

CSS Houdini 旨在建立一系列的CSS API，让开发者能够介入浏览器的 CSS engine，来释放CSS的魔力，来解决长久以来的CSS问题：
- 浏览器兼容性问题
- CSS polyfill实现困难

## CSS Houdini API

#### CSS Parsing API
还没有被写入规范，所以下面我要说的内容随时都会有变化，但是它的基本思想不会变：允许开发者自由扩展 CSS 词法分析器，引入新的结构（constructs），比如新的媒体规则、新的伪类、嵌套、@extends、@apply 等等。  

只要新的词法分析器知道如何解析这些新结构，CSSOM 就不会直接忽略它们，而是把这些结构放到正确的地方。

#### CSS属性/值 API

[CSS Properties and Values API](https://drafts.css-houdini.org/css-properties-values-api/) 的出现进一步推动了自定义属性，它还允许自定义属性添加不同的类型，大大增强了自定义属性的能力。  

来看看这个例子：
```CSS
body {
  --primary-theme-color: tomato;
  transition: --primary-theme-color 1s ease-in-out;
}
body.night-theme {
  --primary-theme-color: darkred;
}
```

在自定义属性中加入不同的类型是很棒啦，不过这个 API 最大的的卖点是，开发者可以在自定义属性上做！动！画！而仅凭现在的技术，我们是做不到的……

当 night-theme 类被加到 `<body> `元素上之后，页面所有有 --primary-theme-color 的元素属性值都会慢慢从 tomato 变成 darked。如果今天你想要在自己的页面上实现这个效果，那就需要费劲儿的一个个给元素添加过渡动画。

#### CSS Layout API  
开发者可以通过 [CSS Layout API](https://drafts.css-houdini.org/css-layout-api/)实现自己的布局模块（layout module），这里的“布局模块”指的是display 的属性值。也就是说，这个 API 实现以后，开发者首次拥有了像 CSS 原生代码（比如 display:flex、display:table）那样的布局能力。

让我们来看一个用例，在 [Masonry layout library](https://masonry.desandro.com/) 上大家可以看到开发者们是有多想实现各种各样的复杂布局，其中一些布局光靠 CSS 是不行的。虽然这些布局会让人耳目一新印象深刻，但是它们的页面性能往往都很差，在一些低端设备上性能问题犹为明显。

CSS Layout API 暴露了一个 registerLayout 方法给开发者，接收一个布局名（layout name）作为后面在 CSS 中使用的属性值，还有一个包含有这个布局逻辑的 JavaScript 类。假如你想要用这个方法定义一个 masonry 的类，可以这么写：

``` javascript
class masonry {
  static get inputProperties(){
    return ["width","height"]
  }
  static get childrenInputProperties() {
    return ['x', 'y', 'position']
  }
  layout(children, constraintSpace, styleMap, breakToken) {
    // Layout logic goes here.
  }
}
registerLayout('masonry',masonry)
```

如果上面这个例子你看不明白也用不着担心。关键在下面的代码，当你下载好 masonry.js 后，将它加入你的站点，然后这么来写 CSS 你就能得到一个 masonry 布局的样式了：

``` CSS
body {
  display: layout('masonry');
}
```
#### CSS Paint API
CSS Paint API 和上面说到的 Layout API 非常相似。它提供了一个 registerPaint 方法，操作方式和 registerLayout 方法也很相似。当想要构建一个 CSS 图像的时候，开发者随时可以调用paint() 函数，也可以使用刚刚注册好的名字。

下面这段代码展示时如何画一个有颜色的圆型：
```javascript
registerPaint('circle',class {
  static get inputProperties(){ return ['--circle-color'] }

  paint(ctx, geom, properties){
    // 改变填充颜色
    const color = properties.get('--circle-color')
    ctx.fillStyle = color;
    // 确定圆和半径
    const x = geom.width / 2
    const y = geom.height / 2
    const radius = Math.min(x, y)
    // 画圆

    ctx.beginPath()
    ctx.arc(x, y, radius,0 ,2*Math.PI, false)
    ctx.fill()
  }
})
```

在css中可以这样使用它：
```css
.bubble {
  --circle-color: blue;
  background-image: paint('circle');
}
```

你将在页面上看到一个以蓝色圆形为背景的元素，它的类是 .bubble，这个圆形背景将始终占满 .bubble 元素。

## Worklets 实战
`registerLayout` 和 `registerPaint` 已经了解过了，估计现在你想知道 的是，这些代码得放在哪里呢?答案就是 worklet 脚本(工作流脚本文 件)。

Worklets 的概念和 web worker 类似，它们允许你引入脚本文件并执行 特定的 JS 代码，这样的 JS 代码要满足两个条件:
- 可以在渲染流程中调用
- 和主线程独立
Worklets 脚本严格控制了开发者所能执行的操作类型，这保证了性能

::: tip 特点
Worklets的特点就是轻量以及生命周期短
:::

我们来看一下Worklets的使用：
```javascript
CSS.paintWorklet.addModule('xx.js')
CSS.layoutWorklet.addModule('xx.js')
```
以下是xx.js文件
```javascript
registerPaing('xx', class{
 	static get inputProperties() { ... }
  static get inputArguments() { ... }
  paint (ctx, geom, props) { ... }
})
```

## Typed OM Object

Typed OM 的出现，给我们读取以及设定数值添加了一种新的方法，不同于 CSSOM 中原有的字符串值的表现形式，Typed OM 将 CSSOM 的数值以 map 的形式展现在元素的 attributeStyleMap 中，规则所对应的值则是更有使用价值的 JavaScript 对象。

- 更少的 bug，正如前面所展示的操作，通过 TypedOM 进行操作减少此类型的问题；
- 在数值对象上调用简单的算术运算方法，绝对单位之间还能方便得尽兴单位转换；
- 更好的性能，由于减少了字符串操作，对于 CSSOM 的操作性能得到了更进一步的提升，由 Tab Akins 提供的测试表明，操作 Typed OM 比直接操作 CSSOM - 字符串带来了大约 30% 的速度提升；
- 错误处理，对于错误的 CSS 值，将会抛出错误；
- 键名与常规 CSS 写法保持一致，不用在 backgroundColor 和 background-color 的边缘试探；
- 由于 attributeStyleMap 以及 computedStyleMap 对象是个 map，这样意味着我们可以使用标准 map 中提供的所有方法。

``` javascript
// 可用检测方法 
window.CSS && CSS.number

// 要对一个元素的样式赋值，除了可以使用 CSS.px 构建之外，还能接受字符串
el.attributeStyleMap.set('height', CSS.px(10));
el.attributeStyleMap.set('height', '10px');

// 对于获取，返回 CSSUnitValue 对象，访问其 value 属性即可得到数字类型的值
el.attributeStyleMap.get('height').value; // 10
el.attributeStyleMap.get('height').unit; // 'px'
// <position> 5px 10px
let pos = new CSSPositionValue(
  new CSSUnitValue(5, 'px'),
  new CSSUnitValue(10, 'px')
)
```

## 相关链接

[CSS Typed OM](https://drafts.css-houdini.org/css-typed-om/#numeric-factory)
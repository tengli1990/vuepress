# CustomEvent
构造方法 CustomerEvent() 创建一个新的 CustomEvent 对象

<!-- https://www.cnblogs.com/liujinyu/p/13627186.html -->

## 语法
``` js
event = new CustomEvent(typeArg, customEventInit);
```
#### typeArg
一个表示 event 名字的字符串

####  customEventInit

一个字典类型参数，有如下字段
- detail
  可选的默认值是 null 的任意类型数据，是一个与 event 相关的值

- bubbles 
  一个布尔值，表示该事件能否冒泡。 来自 EventInit。注意：测试chrome默认为不冒泡。

- cancelable
  一个布尔值，表示该事件是否可以取消。 来自 EventInit

## 使用示例

``` js 
obj.addEventListener('cat',function(e){
  console.log(e.detail)
})

var event = new CustomEvent('cat',{
  detail:{
    hazcheeseburger: true
  }
})

obj.dispatchEvent(event)
```


## Polyfill
polyfill 支持 Internet Explorer 9及更高版
```js
(function () {
  try {
    // a : While a window.CustomEvent object exists, it cannot be called as a constructor.
    // b : There is no window.CustomEvent object
    new window.CustomEvent("T");
  } catch (e) {
    var CustomEvent = function (event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined,
      };

      var evt = document.createEvent("CustomEvent");

      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      );

      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
  }
})();
```

## 相关链接

[MDN CustomEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)

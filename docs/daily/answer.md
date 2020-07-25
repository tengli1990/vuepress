## Day02-比较以下表达式1、2、3大小的结果
### 答案
``` javascript
true false
```
### 解析
1、运算符 `>` `<` 一般是按照从左到右计算。  
2、题1: `1<2 = true` ,然后 `true < 3`,因为`true == 1`, 所以结果为 `true`。  
3、题2: `3>2 = true` ,然后 `true > 1`,因为`true == 1`, 所以结果为 `false`。  


## Day01 项目中如何进行异常捕获？

### 一、代码执行的错误捕获

#### 1.try...catch
* 能捕获到代码执行的错误。
* 捕获不到语法的错误。
* 无法处理异步中的错误。
* 使用try...catch 包裹， 影响代码可读性。

#### 2.window.onerror

* 无论是异步还是非异步错误，`onerror` 都能捕获到运行时的错误。
* `onerror` 主要是来捕获预料之外的错误，而 `try...catch ` 则是用来在可预见性行情况下的监控特定的错误，两者结合使用更加高效。
* `window.onerror` 函数只有在返回true的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 `Uncaught Error: xxxx` 。
* 当我们遇到 `<img src="./404.png">` 报404网络请求异常的时候，`onerror` 是无法帮助我们捕获到异常的。

::: warning 缺点
  监听不到资源加载的报错onerror,事件处理函数只能声明一次，不会重复执行多个回调。
:::

#### window.addEventListener('error')

可以监听到资源加载的报错，也可以注册多个事件处理函数。
``` js
window.addEventListener('error',(msg,url,row,col,error) => {

},true)
```
这种方式虽然可以捕捉到网络请求的异常，却无法判断HTTP状态是404还是其他（比如：500等），所以还需要配合服务端日志进行排查分析。



#### window.addEventListener('unhandledRejection')

捕获 `Promise` 错误，当 `Promise` 被 `reject` 且没有 `reject` 处理器的时候，会触发 `unhandledRejection` 事件；这可能发生在window下，但也可能发生在Worker中。 这对于调试回退错误处理非常有用。


### 二、资源加载的错误捕获

1、`imgObj.onerror()`
2、`performance.getEntries()`,获取到成功加载的资源，对比可以间接捕获错误
3、`window.addEventListener( 'error', fn,true)`, 会捕获但是不冒泡， 所以window.onerror 不会触发，捕获阶段可以出发。


### 三、Vue、React中捕获

* Vue有 `errorHandler` 可以捕获错误
* React有 `componentDidCatch` 可以捕获错误





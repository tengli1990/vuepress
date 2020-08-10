# 性能优化启示录 H5版

## 一.为什么要进行性能优化？

- 57%的用户更在乎网⻚在3秒内是否完成加载。

- 52%的在线用户认为网⻚打开速度影响到他们对网站的忠实度。

- 每慢1秒造成⻚面 PV 降低11%，用户满意度也随之降低降低16%。

- 近半数移动用户因为在10秒内仍未打开⻚面从而放弃。

## 二.性能优化学徒工

- 雅虎军规

- 缓存策略

- 网站协议

- 小字为先

### 雅虎军规践行

<YahooRules></YahooRules>


### 缓存的优先级

`cache-control` > `expires` > `etag` > `last-modified`

![缓存的优先级](/performance-h5-01.jpg)

#### cache-control

::: tip 
设置过期的时间⻓度(秒)，在这个时间范围内，浏览器请求都会直 接读缓存。当 expires 和 cache-control 都存在时，cache-control 的 优先级更高。
:::

#### expires

::: tip
expires: Thu, 16 May 2019 03:05:59 GMT
在 http 头中设置一个过期时间，在这个过期时间之前，浏览器的请求都不会发出，而是
自动从缓存中读取文件，除非缓存被清空，或者强制刷新。缺陷在于，服务器时间和用 户端时间可能存在不一致，所以 HTTP/1.1 加入了 cache-control 头来改进这个问题。
:::

####  etag / if-none-match

这也是一组请求/响应头   
响应头:etag: "D5FC8B85A045FF720547BC36FC872550"   
请求头:if-none-match: "D5FC8B85A045FF720547BC36FC872550" 

::: tip
原理类似，服务器端返回资源时，如果头部带上了 etag，那么资源下次请求时就会把值加入到请求头 if-none-match 中，服务器可以对比 这个值，确定资源是否发生变化，如果没有发生变化，则返回 304。
:::

#### last-modified / if-modified-since

这是一组请求/相应头  
响应头: last-modified: Wed, 16 May 2018 02:57:16 GMT 01   
请求头:if-modified-since: Wed, 16 May 2018 05:55:38 GMT  

::: tip
服务器端返回资源时，如果头部带上了 last-modified，那么 资源下次请求时就会把值加入到请求头 if-modified-since 中，服务器可以对比这个值，确定资源是否发生变化，如果 没有发生变化，则返回 304。
:::


### HTTP/2 多路复用

浏览器请求//xx.cn/a.js-->解析域名—>HTTP连接—>服务器处理文件—>返回数据-->浏览器解析、渲染文件。  

Keep-Alive解决的核心问 题就在此，一定时间内，同一域名多次请求数据，只建立一次HTTP请求，其他请求可复用每一次建立的连接通道，以达到提高请求 效率的问题。  

一定时间是可以配置的，HTTP1.1还是存在效率问题，第一个:串行的文件传输。第二个:连接数过多，对头阻塞问题。

HTTP/2对同一 域名下所有请求都是基于流，也就是说同一域名不管访问多少文件，也只建立一路连接。同样Apache的最大连接数为300，因为有了 这个新特性，最大的并发就可以提升到300，比原来提升了300倍!


## 三.渲染中性能优化

- 重绘影响

- 重排影响

- 如何规避

- 高效渲染

#### 代码演示

``` html
 slog
```

## 四.⻚面加载性能优化

`CSR` `FMP` `SSR` `TTI`

### 你必须知道的概念
|     EN     |   ZN                  |
|------------|------------------------|
| TTFB       |  首字节时间              |  
| FP         |  首次绘制                |     
| FCP        |  首次有内容的绘制         |  
| FMP        |  首次有意义的绘制         |
| Isomorphic Javascript | 同构化       |
| SSR&&CSR   |  服务端渲染和客户端渲染    |
| Long tasks |  超过50ms的任务          | 
| TTI        |  可交互时间              |

|     <div style="width:40px;">缩写</div>    |     <div style="width:180px">全称</div>       |       描述        |
|------------|----------------------------------------|-------------------|
| LCP        |  最大内容绘制  <br> Largest Contentful Paint |  用于记录视窗内最大的元素绘制时间，该时间会随着页面渲染变化而变化，因为页面中的最大元素在渲染过程中可能发生改变，另外该指标会在用户第一次交互后停止记录 |
| FID        |  首次输入延迟 <br>First Input Delay          |  记录在FCP 到 TTI之间用户首次与页面`交互时响应的延迟 `  |
| TBT        |  总阻塞时间  <br> Total Blocking Time       | 记录在 FCP 到 TTI 之间所有长任务的`阻塞时间总和`
| CLS        |  累计布局偏移 <br> Cumulative Layout Shift   |  记录页面上非预期的位移波动，使用按钮动态添加了某个元素，导致页面上其他位置的代码发生了偏移，

::: warning 核心的任务指标
 `LCP`代表了页面的速度指标，`LCP`能体现的东西更多一些，一是指标时时更新，数据更精确，二是代表着页面最大元素的渲染时间，最大元素的快速载入能让用户感觉性能还挺好。  

 `FID` 代表页面的交互体验指标，交互响应的快会让用户觉得网页流畅。  

 `CLS` 代表了页面的稳定指标，尤其在手机上这个指标更为重要，因为手机屏幕小，`CLS` 值大的话会让用户觉得页面体验做的很差。
:::

#### 2017-05 Google: User-centric Performance Metrics

![你必须知道的概念](/performance-h5-03.jpg)

#### 使用PerformanceObserver检测FP、FCP

``` html
<body>
  <div id="app">
    性能检测之FP、FCP
  </div>
  <script>
   const observer = new PerformanceObserver(function(list){
     for(let o of list.getEntries()){
       console.log(o.name)
       console.log(o.startTime)
       console.log(o.duration)
     }
   })
   observer.observe({entryTypes:['paint']})
  </script>

</body>
```

以上代码的结果为
``` text
first-paint
76.32999999987078
0
first-contentful-paint
76.32999999987078
0
```
::: warning 注意
当页面显示完全空白的时，不会触发FP和FCP  
当页面内容完全空白，但是存在有背景颜色元素显示时，会触发FP  
页面中只要存在显示的内容，会触发FP和FCP
:::

#### 为什么会出现白屏？

![你必须知道的概念](/performance-h5-05.jpg)

- 页面白屏原因
  - CSS & JS 文件获取
  - JS 文件解析
  - DOM 生成
  - CSSOM 生成

- 首帧包含HTML内容
  - 基本的DOM
  - 基本的CSS

<!-- #### FP -> 仅有一个div根结点。

``` html {2}
<body>
  <div id="app"></div>
</body>
```

#### FCP -> 包含⻚面的基本框架，但没有数据内容。

``` html {2-14}
<body>
  <div id="app">
    <div class="header">
      <div class="banner"></div>
    </div>
    <div class="content">
      <div class="info">
          <div class="title"></div>
          <div class="info"></div>
          <div class="contract"></div>
      </div> 
    </div>
    <div class="footer"></div>
  </div>
</body>
```


#### FMP -> 包含页面所有元素及数据。

``` html {2-14}
<body>
  <div id="app">
    <div class="header">
      <div class="banner">xxxxx</div>
    </div>
    <div class="content">
      <div class="info">
          <div class="title">星巴克（望京东路店）</div>
          <div class="info">xxxxx</div>
          <div class="contract">xxxxxx</div>
      </div> 
    </div>
    <div class="footer">xxxxx</div>
  </div>
</body>
``` -->

### 关于vue的执行

#### created
- 触发数据获取
- 页面内容为空节点

#### mounted
- 页面首次渲染、包含基本的框架结构

#### updated
- 数据获取完成，触发试图更新
- 试图内容会发生变化

### 总结

![总结](/performance-h5-06.png)

## 相关连接
[LCP（Largest Contentful Paint）-最大内容渲染](https://web.dev/lcp/)  
[FID（First Input Delay）-首次输入延迟](https://web.dev/fid/ )  
[TBT（Total Blocking Time）-总阻塞时间](https://web.dev/tbt/)  
[CLS（Cumulative Layout Shift）-累计布局偏移](https://web.dev/cls/)  
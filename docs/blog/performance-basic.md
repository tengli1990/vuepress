# 前端性能优化基础

## 浏览器渲染过程API
我们参照 Navigation Timing API 来梳理以下过程

![img](/blog/navigation-timing.png)

### Prompt for unload - 提示卸载
* navigationStart  
当访问一个新页面时，当前页面卸载完成所返回的时间点，如果没有当前页面，则返回fetchStart时间点。

### redirect-本地重定向
* redirectStart  
重定向开始时间（如果发生了HTTP重定向，每次重定向都和当前文档同域的话，就返回开始重定向的fetchStart的值。其他情况，则返回0）
* redirectEnd  
重定向结束时间（如果发生了HTTP重定向，每次重定向都和当前文档同域的话，就返回最后一次重定向接受完数据的时间。其他情况则返回0）

### unload
如果需要重定向那么在加载缓存文件的同时会unload。  
* unloadStart  
释放前置网页开始的时间  
* unloadEnd  
释放前置网页结束的时间，有些时候释放页面会挂载一些事件，等这些事件处理完之后才能释放。在页面显示的时候会占用内存，unload会把占用的内存释放出来。

### App Cache 
本地缓存，如果加载本地缓存，那么后续流程直接跳过DNS TCP Rrequest Response 阶段。
* fetchStart  
浏览器发起资源请求时，如果有缓存，则返回读取缓存的开始时间


### DNS
域名解析，再此阶段可以做网络优化。如何优化？
* domainLookupStart  
域名开始查询的时间  
* domainLookupEnd  
域名结束查询的时间  

### TCP
得到IP地址之后，再此建立TCP连接，它有三个时间节点，这里体现的是网络质量。
* connectStart  
开始建立TCP请求的时间。如果请求是keep-alive，缓存等，则返回domainLookupEnd
* secureConnectionStart - 可选  
如果在进行TLS或SSL，则返回握手时间    
* connectEnd  
完成TCP链接的时间。如果是keep-alive，缓存等，同connectStart

### Request -  发起请求
* requestStart  
请求开始时间  
* 为什么没有请求结束时间呢？  
数据发送出去在网络上传输，传输时间无法计算，浏览器无法知晓服务器什么时候接收到最后一个字节的数据。  

### Response - 响应请求
* responseStart  
接收到服务器响应的第一个字节的时候。  
* responseEnd  
接收到服务器响应的最后一个字节的时候。  

### Processing - HTML处理
* domLoading  
开始解析DOM的时间  
* domInteractive  
解析完DOM的时间 
* domContentLoadedEventStart  
DOM解析完开始加载依赖的资源（如CSS,JS）时，会触发DomContentLoadedEvent事件的时间  
* domContentLoadedEventEnd  
触发DomContentLoadedEvent事件结束的时间  
* domContentLoaded  
加载CSS JS完成的时间  
* domComplete  
DOM树渲染完毕  

### onLoad - 执行事件
* loadEventStart  
onload事件开始的时间  
* loadEventEnd  
onload事件结束的时间  

### 优化重点
1.DNS  
2.TCP  
3.Response  
4.Processing  


## 浏览器输入URL的处理流程

- 输入网址并回车
- 解析域名
- 浏览器发送HTTP请求
- 服务器处理请求
- 服务器返回HTML响应
- 浏览器处理HTML页面
- 继续请求其他资源

## 现代浏览器渲染过程

* 浏览器进化过程
* 现代浏览器的特征与结构
* Chrome浏览器架构
* Chrome浏览器的渲染过程
* 初探Webkit

### 现代浏览器的进化

1990年，蒂姆·伯纳斯·李开发了第一个网页浏览器WorldWideWeb，后改名为Nexus。WorldWideWeb浏览器支持早期的HTML标记 语言，功能比较简单，只能支持文本、简单的样式表、电影、声音、图片等资源的显示。  

1993年，马克·安德森领导的团开发了一个真正有影响力的浏览器Mosaic，这就是后来世界上最流行的浏览器Netscape Navigator。  

1995年，微软推出了闻名于世的浏览器Internet Explorer。**第一次浏览器大战开始，持续两年**  

1998年，Netscape公司开放Netscape Navigator源代码，成立了Mozilla基金会。**第二次浏览器大战开始，持续八年**  

2003年，苹果公司发布了Safari浏览器。  

2004年，Netscape公司发布了著名的开源浏览器Mozilla Firefox。  

2005年，苹果公司开源了浏览器中的核心代码，基于此发起了一个新的开源项目WebKit(Safari浏览器的内核)。  

2008年， Google公司已WebKit为内核，创建了一个新的浏览器项目Chromium。以Chromium为基础，谷歌发布了Chrome浏览器。 至于这两者的关系，可以简单地理解为:Chromium为实验版，具有众多新特性;Chrome为稳定版。  


### 现代浏览器的特征


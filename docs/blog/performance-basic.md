# 前端性能优化基础

我们参照 Navigation Timing API 来梳理以下过程
## 浏览器输入URL 发生了什么

### 第一阶段
keep-alive:长链接只建立1次TCP握手，长链接 节省的是I/O开销。


### 第二阶段

### 第三阶段

发生在浏览器端
``` js
domloading -> 解析DOM ->domInteractive -> 加载资源 -> domContentLoaded -> 处理css js html的关系 -> domComplete
```

最后是onload阶段

``` js
loadEventStart -> loadEventEnd
```

优化点位于
DNS、TCP、Response、Processing、Onload

## DNS详解

域名资源记录 域名 对应 ip

缓存算法
什么样的数据才能入缓存呢？谁决定的？ 算法决定的
算法通过数据命中率


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


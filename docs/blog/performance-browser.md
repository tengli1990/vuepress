# 现代浏览器的渲染过程

* 浏览器进化过程
* 现代浏览器的特征与结构
* Chrome浏览器架构
* Chrome浏览器的渲染过程
* 初探Webkit

## 现代浏览器的进化

1990年，蒂姆·伯纳斯·李开发了第一个网页浏览器WorldWideWeb，后改名为Nexus。WorldWideWeb浏览器支持早期的HTML标记 语言，功能比较简单，只能支持文本、简单的样式表、电影、声音、图片等资源的显示。  

1993年，马克·安德森领导的团开发了一个真正有影响力的浏览器Mosaic，这就是后来世界上最流行的浏览器Netscape Navigator。  

1995年，微软推出了闻名于世的浏览器Internet Explorer。**第一次浏览器大战开始，持续两年**  

1998年，Netscape公司开放Netscape Navigator源代码，成立了Mozilla基金会。**第二次浏览器大战开始，持续八年**  

2003年，苹果公司发布了Safari浏览器。  

2004年，Netscape公司发布了著名的开源浏览器Mozilla Firefox。  

2005年，苹果公司开源了浏览器中的核心代码，基于此发起了一个新的开源项目WebKit(Safari浏览器的内核)。  

2008年， Google公司已WebKit为内核，创建了一个新的浏览器项目Chromium。以Chromium为基础，谷歌发布了Chrome浏览器。 至于这两者的关系，可以简单地理解为:Chromium为实验版，具有众多新特性;Chrome为稳定版。  


## 现代浏览器的特征与结构

* 特征  

  `网络` `资源管理` `网页浏览` `多页面管理` `插件和扩展` `账户和同步` `安全机制` `开发者工具` 

* 结构

  用户界面(User Interface)   
  浏览器引擎(Browser Engine)  
  渲染引擎(Rendering Engine)  
  网络(Networking)  
  XML解析器(XML Parser)  
  显示后端(Display Backend)  
  数据持久层(Data Persistence) 

## 常见的渲染引擎

* 渲染引擎:能够能够将HTML/CSS/JavaScript文本及相应的资源文件转换成图像结果。
* 渲染引擎的种类:

|  渲染引擎   | 浏览器  |
|  ----  | ----  |
| Trident  |  IE、Edge（旧） |
| Gecko  | Firefox |
| WebKit | Safari |
| Blink(WebKit fork) | Chromium/Chrome，Opera，Edge(新) |


## 渲染引擎的结构与工作流程
 
![浏览器渲染引擎工作原理](/browser-workflow.png)

##  Chrome 架构

* Browser:控制程序的“chrome”部分，包括地 址栏，书签，后退和前进按钮。还处理Web浏 览器的不可见的，和特权部分，例如网络请求 和文件访问。

* Renderer:负责显示网站的选项卡内的所有内 容。

* Plugin:控制网站使用的所有插件，例如 flash。

* GPU:独立于其他进程的GPU处理任务。 它被 分成多个不同的进程，因为GPU处理来自多个 程序的请求并将它们绘制在同一个面中。

请看流程图：

<img src="/chrome-framework.png">


## 初探Webkit

* WebKit 官网:https://webkit.org/

* Blink 是未来

* Blink官方文档:http://www.chromium.org/blink

 






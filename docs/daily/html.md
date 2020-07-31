---
sidebarDepth: 1
---

# HTML 每日一题

## 01 减少DOM数量的方法以及大量DOM的优化

::: details 查看答案
  ### 方法
  - 使用伪元素。
  - 按需加载，减少不必要的渲染。
  - 结构合理、语义化标签。
  
  ### 大量DOM存在时如何优化
  #### 缓存DOM对象
  首先不管在什么场景下。操作DOM一般首先会去访问DOM。尤其是像循环遍历这种时间复杂度可能会比较高的操作。那么可以在循环之前就将主节点，不必循环的DOM节点先获取到，那么在循环里就可以直接引用，而不必去重新查询。
  ``` Javascript
    let rootElement = document.querySelector('#app')
    let childList = rootElement.child;
    for(let i=0;i<childList.length;i++){}
  ```

  #### 文档片段
  利用 `document.createDocumentFragment()` 方法创建文档碎片节点，创建的是一个虚拟的节点对象。 向这个节点添加DOM节点，修改DOM节点并不会影响到真实的DOM结构。

  我们可以利这一点先将我们需要修改的DOM一并修改完，保存至文档碎片中，然后用文档碎片一次性替换真实的DOM节点，与虚拟DOM类似，同样达到了不频繁修改DOM而导致的重排跟重绘的过程。
  ``` javascript 
  let fragment = document.createDocumentFragment()
  const operationDomHandle = (fragment)=>{
     // 操作
  }
  operationDomHandle(fragment)
  //然后在替换
  rootElem.replaceChild(fragment,oldDom)
  ```
  这样只会触发一次回流，效率会得到很大的提升。如果需要对元素进行复杂的操作（删除、添加自节点），那么我们应当先将元素从页面中移除，然后再对其进行操作，或者将其复制一个`cloneNode()`，在内存中进行操作后在替换原来的节点。
  ``` javascript 
  var clone = old.cloneNode(true);
  operationDomHandle(clone);
  rootElement.replaceChild(clone, oldDom
  ```

  #### 用innerHTML 代替高频的appendChild

  #### 最优layout方案
  批量读，一次性写。先对一个不在Render Tree上的节点进行操作，再把这个节点添加回Render Tree。这样只会触发一次DOM操作。 使用requestAnimationFrame(), 把任何导致重绘的操作放入requestAnimationFrame中。

  #### 虚拟DOM
  js模拟DOM树并对DOM树操作的一种技术。virtual DOM是一种纯js对象（字符串对象），所以对他操作会高效。

  利用virtual dom， 将DOM抽象为虚拟DOM，在DOM发生变化的时候先对虚拟DOM进行操作，通过DOM diff算法将虚拟DOM和原虚拟DOM的结构做对比，最终批量的去修改真实的DOM结构，尽可能的避免了频繁修改DOM而导致的频繁的重排和重绘。
:::
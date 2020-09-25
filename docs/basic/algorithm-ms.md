
# 算法面试题

## 抓最后的球
一个箱子里有100个小球,两个人轮流抓球,以抓到第100个的为赢家,每一次抓球最低要抓1个,最高不能超过5个,问一开始抓几个球能稳赢?

``` js
// 定义小球的数量 100
var counts = 100
// 最小抓的数量为 1
var min = 1
// 最多抓 5个
var max = 5 
// 如果余数大于0 那我我先拿余数 ，否则他先拿
counts%(max+1) > 0  
// 后续保证我们两个人拿球的数量和 等于 max + 1 即可,我拿的求就等于
max+1 - 他拿的球的数量
```
``` js
// 给N个球，最多拿max个，如果你先拿球，你能赢吗
var grabBall = function(counts,max){
  return !!(counts%(max+1))
}
```

## 字符串编译（一）

> 写一个算法 实现一个字符串的规则解析：例子：a(b)<2>c 输出：abbc，a(b(c)<3>de)<2>f 输出abcccdebcccdef；()代表重复内容，<>代表重复的次数

``` js 
function compile(str){
   var splitPos = str.indexOf(")<")
   if(splitPos === -1){
     return str
   }

   var i = splitPos
   var k = splitPos+1
   var content = ''
   var loopNum = ''
   var result = ''

    // 获得需要遍历的字符串
   while(str[i] !== '('){
     if(str[i] !== ')'){
       content = str[i] + content
     }
     i--
   }
    
   // 获得需要遍历的次数
   while(str[k] !== '>'){
     if(str[k] !== '<'){
       loopNum += str[k]
     }
     k++
   }
  
   for(var j=0;j<loopNum;j++){
      result+=content
   }
   var reg = `(${content})<${loopNum}>`
   return compile(str.replace(reg,result))
}

compile('a(b)<2>c')
compile('a(b(c)<3>de)<2>f')
```

## 二叉树（一）
给定一个二叉搜索树（Binary Search Tree），把它转换成为累加树（Greater Tree)，使得每个节点的值是原来的节点值加上所有大于它的节点值之和。
<!-- 链接：https://leetcode-cn.com/problems/convert-bst-to-greater-tree -->
``` js   
var convertBST = function(root) {
  
};
```


## 链表（二）
生成一个链表，保存100个随机生成的整数，整数不分正负。

``` js

function NodeList(value){
  this.value = value 
  this.next = null
}


function createRandomNode(n){
  var node = new NodeList('head');
  var i = 0
  while(i<n){
    i++
    var num = (100-Math.random()*200<<0)
    var newNode = new NodeList(num)
    newNode.next = node.next
    node.next = newNode
  }
  return node.next
}

createRandomNode(100)

```

## 数组
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和


## 数组转换为树
>  [{id:1, parentId: 0}, {id:2, parentId:1},{id:3, parentId:1}]把这个数组从顶级分类递归查找子分类，最终构建一个树状数组。结果输出如下[{id:1, parentId: 0,children:[{id:2, parentId:1},{id:3, parentId:1}]}]，parentId为0 的是根节点

``` js 
var list = [{
    id: 1,
    parentId: 0
}, {
    id: 2,
    parentId: 1
}, {
    id: 3,
    parentId: 1
},{
    id:4,
    parentId:3
}]
//  for 循环
function arrayToTree(list, parentId = 0) {
   var result = []
   for(var i=0;i<list.length;i++){
       if(list[i].parentId === parentId){
           result.push({
              ...list[i],
              children:arrayToTree(list,list[i].id)
           })
       }
   }
   return result
}

// filter

function arrayToTree(list,parentId = 0){
  return list.filter(item=>item.parentId === parentId).map(item=>({...item,children:arrayToTree(list,item.id)}))
}

arrayToTree(list)

```
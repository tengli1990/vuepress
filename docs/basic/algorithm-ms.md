
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



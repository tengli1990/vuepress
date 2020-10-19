# 哈希表

哈希表（Hash Table，也叫散列表）是根据键（Key）而直接访问在内存存储位置的数据结构。  

也就是说，它通过计算一个关于键值的函数，将所需查询的数据映射到表中一个位置来访问记录，这加快了查找速度。这个映射函数称做哈希函数，存放记录的数组称做哈希表。  

一个通俗的例子是，为了查找电话簿中某人的号码，可以创建一个按照人名首字母顺序排列的表（即建立人名 xx 到首字母 F(x)F(x) 的一个函数关系），在首字母为 WW 的表中查找 “王” 姓的电话号码，显然比直接查找就要快得多。这里使用人名作为关键字，“取首字母” 是这个例子中哈希函数的函数法则 F()F()，存放首字母的表对应哈希表。关键字和函数法则理论上可以任意确定。

哈希表是使用**O(1)**时间进行数据的插入删除和查找，但是哈希表不保证表中数据的有序性，这样在哈希表中查找最大数据或者最小数据的时间是 **O(N)** 实现。


### 代码实现
> 主要是以开裂法、霍纳法则、线性探测法实现
``` js 
function HashTable(type){
  this.type = type || 1 // 1 霍纳算法  2 开裂法 3 线性探测法
  this.table = new Array(137)
  this.simpleHash = simpleHash 
  this.betterHash = betterHash
  this.buildChains = buildChains
  this.put = put
  this.get = get
  this.showDistro = showDistro
}

function buildChains(){
  this.type = 2
  for(var i=0; i<this.table.length; i++){
     this.table[i] = new Array();
  }
}

function simpleHash(data){
   // 除留余数法
   var total = 0;
   for(var i = 0; i < data.length; i++){
     total += data.charCodeAt(i)
   }
   return total % this.table.length
}

function betterHash(data){
  // 霍纳法则
  var H = 31
  var total = 0
  for(var i = 0; i < data.length; i++){
    total += H*total+ data.charCodeAt(i)
  }

  if(total < 0){
    total += this.table.length-1
  }
  return total % this.table.length

}

function put(data){
   
   // 使用霍纳算法
  if(this.type === 1){
    this.table[this.betterHash(data)] = data
  }else if(this.type === 2){
    // 或者使用开裂法
    var ops = this.simpleHash(data)
     var index = 0
    while(this.table[ops][index] != undefined){
      ++index
    }
    this.table[ops][index] = data
   }
}

function get(key){
  return this.table[this.betterHash(key)]
}

function showDistro(){
  var index = 0
  for(var i = 0; i < this.table.length; i++){
    // 霍纳算法
    if(this.type === 1){
      if(this.table[i] != undefined){
        console.log(`健：${i}; 值：${this.table[i]}`)
      }
    }else if(this.type ===2){
      if(this.table[i][index] != undefined){
        console.log(`健：${i}; 值：`,this.table[i])
      }
    }

    // 开裂法
  }
}

var hTable = new HashTable()
// hTable.buildChains()
hTable.put('China')
hTable.put('Japan')
hTable.put('aJpan')
hTable.put('aChin')
hTable.put('123123')
hTable.put('4567')
hTable.put('45678')

hTable.showDistro()
```




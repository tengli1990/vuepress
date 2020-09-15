
# 列表

## 列表的概念和用途
- 日常生活中，我们使用购物清单、待办事项列表都是列表。计算中的列表也是一样
- 元素不是很多
- 不需要很长序列查找元素或排序
- 列表是一种自然的数据组织方式

## 列表关键概念的定义
- 列表是一组有序的数据，每个列表中的数据项称为 “元素”，元素的数量受内存控制。
- 不包含任何元素的列表称为 “空列表”。

## 迭代器的优点
- 访问元素是不必关心底层数据结构。
- 增加和删除元素要比for更加灵活。
- 迭代器访问列表离得元素提供了统一方法。

## 代码实现

``` js  
function List(){
  this.size = 0; // 列表元素个数 
  this.pos = 0;  // 列表当前位置
  this.dataStore = []; // 初始化一个空数组用来保存列表元素
  this.clear = clear; // 清空列表元素
  this.find = find; // 查找元素
  this.toString = toString; // 返回列表字符串形式
  this.insert = insert // 在现有元素后插入新元素
  this.append = append; // 在列表元素末尾增加新元素
  this.remove = remove; // 从列表中删除元素
  this.front = front; // 从列表当前位置移动到第一个元素
  this.end = end; // 从列表的当前位置移动到最后一个位置
  this.prev = prev; // 将当前位置后移一位
  this.next = next; // 将当前位置前移一位
  this.length = length; // 列表包含元素的个数
  this.currPos = currPos; // 返回列表当前位置
  this.moveTo = moveTo; // 将当前位置移动到指定位置
  this.getElement = getElement; // 显示当前元素
  this.contains = contains; // 是否包含该元素
}

function append(element){
   this.dataStore[this.size++] = element;
}

function insert(element,after){
   var insertPos = this.find(after);
   if(insertPos > -1){
     this.dataStore.splice(insertPos+1,0,element);
     ++this.size
     return true
   }
   return false
}

function contains(element){
  return this.find(element)> -1
}

function prev(){
  if(this.pos>0){
     --this.pos
   }
}

function next(){
  if(this.pos<this.size ){
    ++this.pos
  }
}

function currPos(){
  return this.pos
}

function front(){
  this.pos = 0
}

function end(){
  this.pos = this.size
}

function getElement(){
  return this.dataStore[this.pos]
}

function moveTo(position){
  return this.pos = position
}

function clear(){
   this.dataStore.length = 0
   this.size = this.pos = 0
}

function length(){
  return this.size;
}

function find(element){
  var len = this.length()
  for(var i = 0; i < len; i++){
    if(element === this.dataStore[i]){
      return i
    }
  }
  return -1
}

function remove(element){
  var findAt = this.find(element)
  if(findAt > -1){
    --this.size
    return this.dataStore.splice(findAt,1)
  }
  return false
}

function toString(){
  return this.dataStore;
}

var names = new List()

names.append('🍊橘子')
names.append('🍌香蕉')
names.append('🍎苹果')
names.append('🍐鸭梨')
// 便利迭代器
for(names.front();names.pos<names.size;names.next()){
  console.log(names.getElement(names))
}
```


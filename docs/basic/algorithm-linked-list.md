# 链表

- 概念和用途
- 定义
- 单向链表代码实现
- 双向链表代码实现

***

### 概念和用途

- 数组不是组织数据结构的最佳结构
- JavaScript中的数组被实现成了对象，与其他语言数组相比，效率低了很多。
- 如果你发现数组实际使用时很慢，就可以考虑链表代替他。除了对数据的随机访问，链表几乎可以用在任何可以使用一维数组的地方。

### 定义

- 链表是由一系列节点组成的集合，每个节点都使用一个对象的引用指向他的后继，指向另一个节点的引用叫链。
- 链表元素靠相互之间的关系进行引用A->B->C, B并不是链表的第二个元素，而是B跟在A后面，遍历链表就是跟着链接，从链接的首元素一直到尾元素，但不包含头节点，头元素常常被称为链表的接入点。（链表的尾元素指向一个null节点）


### 单向链表代码实现

``` js 
// 首先需要一个节点的构造函数，用它来创建节点对象
function Node(value){
  this.value = value
  this.next = null
}

function LList(){
  this.head = new Node('head')
  this.find = find
  this.insert = insert
  this.findPrev= findPrev
  this.display = display
  this.remove = remove
}

// 查找节点
function find(item){
  var currNode = this.head
  while(currNode.value != item){
    currNode = currNode.next
  }
  return currNode
}

function insert(newValue, item){
  var newNode = new Node(newValue)
  var currNode = this.find(item)

  newNode.next = currNode.next
  currNode.next = newNode
}

function display(){
  var currNode = this.head
  while(currNode.next !== null){
    console.log(currNode.next.value)
    currNode = currNode.next
  }
}

function findPrev(item){
   var currNode = this.head
   while(currNode.next&&currNode.next.value != item){
       currNode = currNode.next
   }
   return currNode
}

function remove(item){
    var currNode = this.find(item)
    var prevNode = this.findPrev(item)
    prevNode.next = currNode.next
    currNode.next = null
}


var nl = new LList()

nl.insert('first','head')
nl.insert('second','first')
nl.insert('third','second')
nl.remove('second')
nl.display()
```
### 双向链表代码实现

``` js
function Node(value){
  this.value = value
  this.next = null
  this.previous = null
}

function LList(){
  this.head = new Node('head')
  this.find = find
  this.insert = insert
  this.remove = remove
  this.display = display
  this.reverse = reverse
  this.findLast = findLast
}

function insert(newValue, item){
  var currNode = this.find(item);
  var newNode = new Node(newValue)

  newNode.next = currNode.next
  newNode.previous = currNode
  currNode.next = newNode
  if(newNode.next != null){
    newNode.next.previous = newNode
  }
}

function find(item){
  var currNode = this.head
  while(currNode.value != item){
    currNode = currNode.next
  }
  return currNode
}

function remove(item){
  var currNode = this.find(item)
  var prevNode = currNode.previous
  var nextNode = currNode.next

  if(nextNode != null){
    nextNode.previous = prevNode
    prevNode.next = nextNode
    currNode.previous = null
    currNode.next = null
  }else{
    prevNode.next = null
    currNode.previous = null
  }
}

function findLast(){
  var currNode = this.head
  while(currNode.next != null){
    currNode = currNode.next
  }
  return currNode
}

function reverse(){
  var head = this.head
  var prev = null
  var current = head
  while(head){
    [current.next,prev,current] = [prev,current,current.next]
  }
}

function display(){
  var currNode = this.head

  while(currNode != null){
    console.log(currNode.value)
    currNode = currNode.next
  }
}


var nl = new LList()

nl.insert('head','first')
nl.insert('first','second')
nl.insert('second','third')

nl.remove('second')

console.log(nl)
```
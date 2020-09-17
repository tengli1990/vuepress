# 队列

## 代码实现

``` js 
function Queue(){
  this.dataStore = []
  this.enqueue = enqueue
  this.dequeue = dequeue
  this.length = length
  this.front = front
  this.end = end
  this.clear = clear
  this.toString = toString
}

function enqueue(element){
  this.dataStore.push(element)
}

function dequeue(element){
  return this.dataStore.shift()
}

function length(){
  return this.dataStore.length
}

function front(){
  return this.dataStore[0]
}

function end(){
  return this.dataStore[this.length()-1]
}

function clear(){
  this.dataStore.length = 0
}

function toString(){
  return this.dataStore
}

var q = new Queue()

q.enqueue('🍎-苹果')
q.enqueue('🦕-恐龙')
q.enqueue('🐷-猪头')
console.log('出队',q.dequeue())

console.log('队首元素',q.front())
console.log('队尾元素',q.end())
console.log(q.toString())
```

## 实现优先队列

``` js 
function PriorityQueue(){
  this.dataStore = []
  this.enqueue = enqueue
  this.dequeue = dequeue
  this.length = length
  this.toString = toString
}
function enqueue(name,level){
  this.dataStore.push({
    name:name,
    code:level
  })
}
function dequeue(element){
  var pos = 0
  for(var i=0;i<this.dataStore.length;i++){
    if(this.dataStore[pos].code < this.dataStore[i].code){
      pos = i
    }
  }
  return this.dataStore.splice(pos,1)[0]
}
function length(){
  return this.dataStore.length
}
function toString(){
  return this.dataStore
}

var q = new PriorityQueue()

q.enqueue('🦕-恐龙',4)
q.enqueue('🐂-牛',10)
q.enqueue('🐸-青蛙',3)

console.log('出队',q.dequeue())
console.log(q.toString())

```


# 栈

## 概念和用途

- 首先，栈是一种特殊的列表。
- 栈是一种高效的数据结构，因为数据只能在栈顶删除或增加，操作很快。
- 栈的使用遍布程序语言实现的方方面面，从表达式求值到处理函数调用。


## 定义

- 栈内元素只能通过列表的一端访问，这一端称为 “栈顶”，反之 “栈底”。
- 栈是一种后入先出的数据结构，被称为“LIFO - last-in-first-out”。
- 插入新元素又称为 “进栈（入栈或压栈）”，从一个栈删除元素又称为“出栈或退栈”。

## 代码实现

``` js 
function Stack(){
  this.dataStore = []   // 存储栈元素
  this.top = 0          // 指针
  this.push = push      // 入栈
  this.pop = pop        // 出栈
  this.clear = clear    // 清空栈
  this.peek = peek      // 返回栈顶元素
  this.length = length  // 栈长度
}

// 入栈操作
function push(element){
  this.dataStore[this.top++] = element
}

// 出栈操作
function pop(){
  return this.dataStore.splice(--this.top,1)[0]
}

// 返回栈顶元素
function peek(){
  return this.dataStore[this.top-1]
}

// 清空栈
function clear(){
  this.dataStore = []
  this.top = 0
}

function length(){
  return this.top
}


var stack = new Stack()

stack.push("🍎，苹果")
stack.push("🍌，香蕉")
stack.push("♟，旗子")
stack.push("🌰，栗子")
console.log(stack)
console.log('出栈',stack.pop())
console.log('栈顶元素：',stack.peek())
console.log('长度：',stack.length())
```

## 利用栈的方法验证回文字符串

``` js  

var isPalindrome = function(str){
  var s = new Stack()
  for(var i=0;i<str.length;i++){
    s.push(str[i])
  }

  var reword = ''

  while(s.top>0){
    reword+=s.pop()
  }

  if(reword === str){
    return true
  }
  return false
}

isPalindrome('rewer') // true

```
---
sidebarDepth: 1
---

# Vue每日一题

## 01 v-model 是如何实现的，语法糖实际是什么？

::: details 查看答案
  
  ### 一、语法糖
  指计算机语言中添加的某种语法，这种语法对语言的功能并没有影响，但是更方便程序员使用。通常来说使用语法糖能够增加程序员可读性，从而减少程序代码出错的机会。糖在不改变其所在位置的语法结构的前提下，实现了运行时的等价。可以简单理解为，加糖后的代码编译后跟加糖前一样，代码更简洁流畅，代码更语义自然。

  ### 二、实现原理
  
  #### 1.作用在普通表单元素上
  动态绑定了 `input` 的 `value` 指向了 `message` 变量，并且在触发  `input`  事件的时候去动态把 `message` 设置为目标值

  ``` html
    <!-- v-model -->
    <input type="text" v-model="message" />

     <!--等同于  -->
    <input type="text" 
      v-bind:value="message" 
      v-on:input="message = $event.target.value"
    />
  ```

  #### 2.作用在组件上

在自定义组件中，v-model 默认会利用名为 `value` 的prop和名为 `input` 的事件。

**本质是一个父子组件通信的语法糖，通过`prop` 和 `$.emit` 实现**  

因此副组件 `v-model` 语法糖本质上可以修改为 
``` html
  <child :value="message" @input="function(e){message = e}" ></child>
```
在组件的实现中，可以通过 `v-model属性` 来配置子组件接收的prop名称，以及派发的事件名称

例子：
``` html
<!-- 父组件 -->
<aa-input v-model="aa"> </aa-input>
<!-- 等价于 -->
<aa-input :value="aa" @input="aa=$event.target.value"></aa-input>


<!-- 子组件 -->
<input :value="aa" @input="onmessage" type="text" />
 
<script>
  export default {
    props:{
      value:aa
    },
    methods:{
      onmessage(e){
        $emit('input',e.target.value)
      }
    }
  }
</script>

```

默认情况下，一个组件上的v-model 会把 value 作用prop且把input 作用event  

但是一些输入类型比如单选框 和 复选框 按钮可能想使用`value prop` 来达到不同的目的。 使用model 选项可以回避这些情况产生的冲突。  

js监听 input 输入框输入数据改变， 用 oninput，数据改变以后就会立刻触发这个事件

通过input事件把$emit 出去，在父组件接收。  

父组件设置v-model的值为 input $emit过来的值


:::


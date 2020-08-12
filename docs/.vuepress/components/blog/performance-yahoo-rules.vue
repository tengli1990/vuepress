<template>
  <div class="performance-yahoo-rules">
    <slot></slot>
      <template v-for="(item,index) in rules" >
        <div class="item" @click="onToggle(item)">
          <h3>{{++index}}、{{item.title}}</h3>
          <span class="btn" >{{item.show?'收起':'展开'}}</span>
        </div>
        <div class="content" v-show="item.show">
          <template v-if="item.content">
            {{item.content}}
          </template>
          <template v-else>
            <p align="center">暂无内容</p>
          </template>
        </div>
      </template>
  </div>
</template>

<script>
  export default {
    name:'YahooRules',
     data(){
       return {
         rules:[{
           title:'减少HTTP请求',
           content:'图片、css、script、flash等等这些都会增加http请求数，减少这些元素的数量就能减少响应时间。把多个JS、CSS在可能的情况下写进一个文件，页面里直接写入图片也是不好的做法，应该写进CSS里，利用 CSS sprites 将小图拼合后利用background来定位。'
         },{
           title:'利用CDN技术',
           content:''
         },{
           title:'设置头文件过期或者静态缓存',
           content:'浏览器会用缓存来减少http请求数来加快页面加载的时间，如果页面头部加一个很长的过期时间，浏览器就会一直缓存页面里的元素。不过这样如果 页面里的东西变动的话就要改名字了，否则用户端不会主动刷新，看自己衡量了~ 这项可以通过修改.htaccess文件来实现。'
         },{
           title:'Gzip压缩',
           content:'Gzip格式是一种很普遍的压缩技术，几乎所有的浏览器都有解压Gzip格式的能力，而且它可以压缩的比例非常大，一般压缩率为85%。压缩没压缩，可以到 这里 做下测试。'
         },{
           title:'把CSS放顶部',
           content:'让浏览者能尽早的看到网站的完整样式。'
         },{
           title:'把JS放底部',
           content:'网站呈现完毕后再进行功能设置，当然这些JS要在你的加载过程中不影响内容表现。'
         },{
           title:'避免CSS Expressions',
           content:'CSS表达式很可怕，这个只被IE支持的东西执行时候的运算量非常大，你移动一下鼠标它都要进行重计算的，但有时候为了做浏览器的兼容必须要用到这个'
         },
         {
           title:'减少DNS查找',
           content:'貌似是要减少网站从外部调用资源，我的Google分析和picasa的外链图片都算在里面了。'
         },{
           title:' 减小JS和CSS的体积',
           content:'写JS和CSS都是有技巧的，用最少的代码实现同样的功能，减少空白，增强逻辑性，用缩写方式等等，当然也有不少工具也能够帮你实现这一点。'
         },{
           title:'避免重定向',
           content:'再写入链接时，虽然”http://www. today-s-ooxx. com”和”http://www. today-s-ooxx. com/” 仅有一个最后的”/”只差，但是结果是不同的，服务器需要花时间把前者重定向为后者然后进行跳转，这个要自己注意，也可以在Apache里用Alias 或者mod_rewrite或者DirectorySlash解决。'
         },{
           title:'删除重复脚本',
           content:'重复调用的代码浏览器并不会识别忽略，而是会再次运算一遍，这当然是大大的浪费。'
         }]
       }
     },
     methods: {
       onToggle(item){
         this.$set(item,'show',!item.show)
       }
     }
  }
</script>

<style lang="css" scoped>
.performance-yahoo-rules{
  margin-top: 15px;
}
.performance-yahoo-rules h3{ 
  font-size:16px; 
  margin:0;
  flex: 1;
}
.performance-yahoo-rules .item{
  display:flex;
  background:#eee;
  line-height:1.25;
  padding: 10px;
  border-radius:10px;
  margin:10px 0;
  cursor: pointer;

}
.performance-yahoo-rules .content {
    line-height:1.7;
    margin-bottom: 20px;
    /* padding:0 0 0 30px; */
}
</style>
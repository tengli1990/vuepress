<template>
  <div class="css-transform">
     <div class="title">
        <div class="t1">
           animation<i>:</i><span>rotate</span>(1turn) <span>translateX</span>(50px)
        </div>
        <div class="t2">
          animation<i>:</i><span>translateX</span>(50px) <span>rotate</span>(1turn) 
        </div>
     </div>
     <div class="code">
       <div class="child one">
        
     </div>
     <div class="child two"></div>
     </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.css-transform{
  margin-top: 10px;
}
.title{
  display:flex;
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  font-size: 13px;
}
.title span{
  color:#f08d49;
}
.title i {
  color:#67cdcc;
  margin-right: 5px;
  font-weight: bold;
  font-style: normal;
}
.title>*{
  position: relative;
  background-color: #282c34;
  border-radius: 6px;
  color:#fff;
  padding: 1.25rem 1.2rem;
  flex:1;
}
.title .t1{
  margin-right: 10px;
}
.title .t2{
  margin-left: 10px;
}
.css-transform .code{
  display:flex;
   height:200px;
 
}
.css-transform .child{
  flex:1;
  margin: auto;
}

.css-transform .child:before{
  content:'';
  display:block;
  width: 50px;
  height:50px;
  margin: auto;
  background:#3eaf7c;
}

.one:before{
  animation: demo1  2s  0s linear infinite;
}

.two:before{
  animation: demo2 2s  0s linear infinite;
}
@keyframes demo1 {
  from{
    transform: rotate(0deg) translateX(50px);
  }
  to{
    transform: rotate(360deg) translateX(50px);
  }
}

@keyframes demo2 {
  from{
    transform:translateX(50px) rotate(0deg) ;
  }
  to{
    transform: translateX(50px) rotate(360deg);
  }
}
</style>
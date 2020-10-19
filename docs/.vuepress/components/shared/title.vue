<template>
  <div class="m-title" :class="initClass" :id="title">
   <slot><a class="header-anchor" :href="`#${title}`">#</a><span>{{title}}</span></slot>
  </div>
</template>

<script>
  export default {
    name:'title',
    props: {
      title:'',
      sub:{
        type:Boolean,
        default:false
      }
    },
    computed:{
      initClass() {
        return {
          'is-sub':this.sub
        }
      }
    },
    data(){
      return {

      }
    }
  }
</script>

<style lang="css" scoped>
.m-title{
  margin-top: -3rem;
  padding-top: 4rem;
  font-size:24px;
  line-height: 2;
  border-bottom:2px solid #FFA500
}
.m-title:hover .header-anchor{
  line-height:2;
  display:inline-block;
  opacity: 1;
  color:#DC5713
}
.m-title span{
  display: inline-block;
  background:linear-gradient(30deg,#FFA500,#DC5713);
  color:#fff;
  padding:0 20px;
  font-weight:bold;
}
.m-title.is-sub{
  font-size:20px;
  border:none;
}
.m-title.is-sub span{
  background:none;
  color:#DC5713;
  padding:0;
  font-weight:bold;
}

</style>
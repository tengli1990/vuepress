<template>
  <div class="daily-index">
      <div @click="onClick('javascript')">
        javascript
      </div>
      <div @click="onClick('css')">
        Css
      </div>
      <div @click="onClick('vue')">
        Vue
      </div>
  </div>
</template>

<script>
  export default {
    name:'blog-index',
    data(){
      return {
        title:'daily-index name'
      }
    },
    methods:{
      onClick(type){
        this.$router.push({
          path:`/daily/${type}.html`
        })
      }
    }
  }
</script>

<style lang="css" scoped>
.daily-index{
  display: flex;
  width:100%;
}
.daily-index>*{
  padding:30px 0;
  flex:1;
 text-align: center;
 background:#f2f2f2;
 border:1px solid #fff;
 cursor: pointer;
}
.daily-index>*:hover{
  background:#46bd87;
  color:#fff;

}
</style>
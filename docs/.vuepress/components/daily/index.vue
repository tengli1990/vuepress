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
      <div @click="onClick('engineering')">
        工程化
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
.daily-index>*{
  box-sizing: border-box;
}
.daily-index{
  display: flex;
  width:100%;
  flex-wrap:wrap;
  
}
.daily-index>*{
  padding:30px 0;
  text-align: center;
  background:#f2f2f2;
  border:1px solid #fff;
  cursor: pointer;
  
  width:25%;
}
.daily-index>*:hover{
  background:#46bd87;
  color:#fff;

}
</style>
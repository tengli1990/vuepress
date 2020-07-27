<template>
  <div class="test">
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
    name:'blog-test',
    data(){
      return {
        title:'test name'
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
.test{
  display: flex;
  width:100%;
}
.test>*{
  padding:30px 0;
  flex:1;
 text-align: center;
 background:#f2f2f2;
 border:1px solid #fff;
 cursor: pointer;
}
.test>*:hover{
  background:#46bd87;
  color:#fff;

}
</style>
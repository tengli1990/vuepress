<template>
  <div class="daily-index">
    <div v-for="(type, index) in typeList" :key="index" @click="onClick(type.key)">
      {{type.name}}
    </div>
  </div>
</template>

<script>
  export default {
    name:'blog-index',
    data(){
      return {
        title:'daily-index name',
        typeList:[
          {
            key:'javascript',
            name:'Javascript'
          },
          {
            key:'html',
            name:'HTML'
          },
          {
            key:'css',
            name:'CSS'
          },
          {
            key:'vue',
            name:'Vue'
          },
          {
            key:'engineering',
            name:'工程化'
          }
        ]
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
<template>
  <div>
    <MyHeader></MyHeader>
    <!-- 路由组件出口的地方 -->
  <router-view></router-view>
  <!-- 注意组件的显示与隐藏 -->
  <MyFooter v-show="$route.meta.show"></MyFooter>
  </div>
  
</template>

<script>
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'
export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter
  },
  computed:{
    // 一种解决footer组件显示与隐藏的方法，另一种方法是路由元信息
    show(){
      return this.$route.path=='/home' || this.$route.path=='/search'?true:false 
    }
  },
  mounted() {
     // 通知Vuex发请求，获取数据，存储与仓库中,避免多次请求
    this.$store.dispatch("categoryList");
    // 获取用户信息在首页展示
        this.$store.dispatch('getUserInfo')
  },
}
</script>

<style>

</style>

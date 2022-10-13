<template>
  <div>
    <!-- 全局组件不需要再引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- 要给floor子组件传递数据，用props -->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
export default {
  name:'',
  components:{
     ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
  },
    mounted() {
      // 派发action，获取floor组件的数据
        this.$store.dispatch('getFloorList')
        
    },
    computed: {
         ...mapState({
      floorList: state => state.home.floorList
    })
    },
}
</script>

<style>

</style>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// state:仓库存储数据的地方
// mutations:修改state的唯一手段
// actions:处理action,可以书写自己的业务逻辑，也可以处理异步
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据
// const state ={};
// const mutations ={};
// const actions ={};
// const getters ={};

// 引入小仓库
import home from './home'
import search from './search'
import shopcart from './shopcart'
import detail from './detail'
import user from './user'
import trade from './trade'
// 对外暴露Store类的一个实例
export default new Vuex.Store({
    // 实现vuex模块式存储数据
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})

import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入MockServer.js---mock数据
import '@/mock/mockServe'

// 引入swiper样式(多个地方可以一起用)
import 'swiper/css/swiper.css'

// 统一接口api文件夹里面全部请求函数
import * as API from '@/api';


// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
// 第一个参数:全局组件的名字 第二个参数:哪一个组件
// Vue.component('TypeNav',TypeNav)
Vue.component(TypeNav.name,TypeNav)


// 轮播图---全局组件
import Carousel from '@/components/Carousel'
Vue.component('Carousel',Carousel)

// 分页器---全局组件
import Pagination from '@/components/Pagination'
Vue.component('Pagination',Pagination)

import { Button,MessageBox} from 'element-ui';
//注册全局组件
Vue.component(Button.name,Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import atm from '@/assets/1.gif'
// 图片懒加载
import VueLazyload from  'vue-lazyload'
Vue.use(VueLazyload,{
  // 懒加载默认的片
  loading:atm
})

//引入表单校验插件
import "@/plugins/validate";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },

  // 注册路由  注册路由信息，这里书写router的时候，组件(路由组件与非路由组件)身上拥有$route,$router
  router,
  // 注册仓库 组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')
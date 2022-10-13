// 引入组件
import Home from '@/views/Home'
import Search from '@/views/Search'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import Center from '@/views/Center'
import PaySuccess from '@/views/PaySuccess'
// 引入二级路由组件
import MyOrder from '@/views/Center/myOrder'
import GroupOrder from '@/views/Center/groupOrder'

/* 
component: () => import('@/pages/Search')
1. import(modulePath): 动态import引入模块, 被引入的模块会被单独打包
2. 组件配置的是一个函数, 函数中通过import动态加载模块并返回, 
    初始时函数不会执行, 第一次访问对应的路由才会执行, 也就是说只有一次请求对应的路由路径才会请求加载单独打包的js
作用: 用于提高首屏的加载速度
*/

// 路由配置信息
export default [
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        /* 只能从交易界面, 才能跳转到支付界面 */
        beforeEnter(to, from, next) {
            if (from.path === '/trade') {
                next()
            } else {
                next('/trade')
            }
        }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true },
        // 路由独享守卫
        /* 只能从购物车界面, 才能跳转到交易界面 */
        beforeEnter(to, from, next) {
            if (from.path === '/shopcart') {
                next()
            } else {
                next('/shopcart')
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        // 路由元信息，用来控制footer组件显示与隐藏
        meta: { show: true },
        name: 'addcartsuccess'

    },
    {
        path: '/home',
        component: Home,
        // 路由元信息，用来控制footer组件显示与隐藏
        meta: { show: true }

    },
    {
        // params参数需要占位(后面这个问好可以控制params参数可传可不传)
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: 'search'
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: false }
    },
    {
        path: '*',
        redirect: "/home"
    }
]
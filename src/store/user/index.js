import { reqGetCode, reqUserRegister,reqUserLogin,reqUserInfo, reqLogout } from "@/api";

// 登录与注册的模块
const state = {
    code: '',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state){
        // 仓库中相关信息清空
        state.token = '';
        state.userInfo ={};
        // 本地存储清空
        localStorage.removeItem('TOKEN')
    }
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        console.log(result)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    // 用户登录
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user);
        // 服务器下发token,用户唯一标识符
        // 将来要带token找服务器要数据
        if (result.code == 200) {
           commit('USERLOGIN',result.data.token);
        //    持久化存储token
        localStorage.setItem('TOKEN',result.data.token)
           return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
       let result =  await reqUserInfo()
      if(result.code==200){
          commit('GETUSERINFO',result.data)
          return 'ok'
      }else{
        return Promise.reject(new Error('failure'))
      }
    },
    // 退出登录
    async userLogout({commit}){
        // 通知服务器清除token
      let result =   await reqLogout()
      if(result.code == 200){
          commit('CLEAR');
          return 'ok'
      }else{
        return Promise.reject(new Error('failure'))
      }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
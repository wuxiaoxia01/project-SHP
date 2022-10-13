import {reqGetSearchInfo} from '@/api'
// home模块的小仓库
const state = {
    searchList:{}
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
};
const actions = {
    // 获取search模块数据,params是当用户派发action的时候，第二个参数传递过来的
    async getSearchList({commit},params={}){
       let result =  await reqGetSearchInfo(params)
       if(result.code === 200){
           commit('GETSEARCHLIST',result.data)
       }
    }
};
// 计算属性，为了简化数据而生
const  getters = {
    goodList(state){
        // 这里至少返回一个数组[以防万一]
        return state.searchList.goodsList || [];
    },
    tradeMarkList(state){
        return state.searchList.trademarkList || [];
    },
    attrsList(state){
        return state.searchList.attrsList || [];
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api'
// 封装游客身份模块uuid-->生成一个随机字符串(不能再变)
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
};
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
};
const actions = {
    // 获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200){
            commit('GETGOODINFO',result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
     let result =    await reqAddOrUpdateShopCart(skuId,skuNum);
    //  代表服务器加入购物车成功
    if(result.code==200){
        return 'ok'
    }else{
        return Promise.reject(new Error('faile'));
    }
    
    }
};
// 简化数据而生
const getters = {
    // 路径导航简化的数据
    categoryView(state){
        // 至少是一个空对象
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }

};
export default{
    state,
    mutations,
    actions,
    getters
}
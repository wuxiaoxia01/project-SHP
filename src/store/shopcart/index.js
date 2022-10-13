import { reqCartList, reqDeleteCartById, reqUpdateCheckByid } from "@/api";

const state ={
    cartList:[]
};
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
};
const actions = {
    // 获取购物车列表数据
    async getCartList({commit}){
       let result =  await reqCartList()
    //  console.log(result)
        if(result.code==200){
            commit('GETCARTLIST',result.data)
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failure'))
        }
    },
    // 修改购物车某一个产品的选中状态
   async  updateCheckedById({commit},{skuId,isChecked}){
       let result =  await reqUpdateCheckByid(skuId,isChecked)
       if(result.code==200){
           return 'ok'
       }else{
           return Promise.reject(new Error('failure'))
       }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        // context:小仓库 commit,getters,dispatch,state
        // 获取的购物车中全部的产品(是一个数组)
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):'';
            PromiseAll.push(promise);
        })
        // 如果有一个失败，即返回失败结果
        return Promise.all(PromiseAll);
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        // 数组
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item)=>{
            let promise = dispatch("updateCheckedById",{
                skuId:item.skuId,
                isChecked
            })
            promiseAll.push(promise)
        });
        // 最终返回结果
        return Promise.all(promiseAll)
    }
};
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}
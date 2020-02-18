/*
间接更改数据状态
 */
import {reqAddress, reqFoodCategorys, reqUserInfo, reqShops, reqLogout} from "../api";
import {
  GET_ADDRESS,
  GET_CATEGORYS,
  GET_USER_INFO,
  GET_SHOP,
  RECORD_USER,
  LOGOUT,
  RECEIVE_SEARCH_SHOPS,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from "./mutation-type";
import {reqSearchShop, reqShopGoods, reqShopInfo} from "../../../gshop-client_final/src/api";

export default {

  async getAddress({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash);
    if (result.code === 0) {
      const address = result.data
      commit(GET_ADDRESS, {address})
    }
  },

  async getCategorys({commit}) {
    const result = await reqFoodCategorys();
    if (result.code === 0) {
      const categorys = result.data
      commit(GET_CATEGORYS, {categorys})
    }
  },

  async getShops({commit, state}) {
    const result = await reqShops(state.longitude, state.latitude);
    if (result.code === 0) {
      const shops = result.data
      commit(GET_SHOP, {shops})
    }
  },

  async getUserInfo({commit}) {
    const result = await reqUserInfo();
    if (result.code === 0) {
      const userInfo = result.data
      commit(GET_USER_INFO, {userInfo})
    }
  },

  recordUser({commit}, user) {
    commit(RECORD_USER, {user})
  },

  async logout({commit}) {
    const result = await reqLogout();
    if (result.code === 0) {
      commit(LOGOUT)
    }
  },
  // 异步获取商家商品列表
  async searchShops({commit, state}, keyword) {

    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  },
// 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit}, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },

  updateCartFood({commit}, {isAdd, food}){
    if (isAdd){
      commit(INCREMENT_FOOD_COUNT,{food})
    }else{
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },

  // 同步清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART)
  },

}

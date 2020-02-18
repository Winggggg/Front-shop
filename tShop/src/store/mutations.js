/*
直接更改数据状态
 */
import Vue from 'vue'
import {
  CLEAR_CART,
  DECREMENT_FOOD_COUNT,
  GET_ADDRESS,
  GET_CATEGORYS,
  GET_SHOP,
  GET_USER_INFO, INCREMENT_FOOD_COUNT,
  LOGOUT,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECORD_USER
} from "./mutation-type";
import {RECEIVE_SEARCH_SHOPS} from "../../../gshop-client_final/src/store/mutation-types";

export default {
  [GET_ADDRESS](state, {address}) {
    state.address = address
  },
  [GET_USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo
  },
  [GET_CATEGORYS](state, {categorys}) {
    state.categorys = categorys
  },
  [GET_SHOP](state, {shops}) {
    state.shops = shops
  },
  [RECORD_USER](state, {user}) {
    state.userInfo = user
  },
  [LOGOUT](state) {
    state.userInfo = {}
  },
  [RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
    state.searchShops = searchShops
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [INCREMENT_FOOD_COUNT](state, {food}) {
    if (!food.count) {
      //第一次添加
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food}) {
    if (food.count) {
      food.count--
      if (food.count == 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART](state) {
    state.cartFoods.forEach((food) => {
      food.count = 0
    })
    state.cartFoods = []
  }
}

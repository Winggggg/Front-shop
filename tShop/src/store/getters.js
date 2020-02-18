/*
包含多个基于state的getter计算属性的对象
 */

export default {
  totalCartCount(state){
    return state.cartFoods.reduce((preTotal, food)=>preTotal+food.count,0)
  },
  totalCartPrice(state){
    return state.cartFoods.reduce((preTotal, food)=>preTotal+food.count*food.price,0)
  },
}

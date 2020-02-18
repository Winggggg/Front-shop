<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li @click="clickMenuItem(index)" class="menu-item " :class="{current:index==currentIndex}" v-for="(item,index) in goods" :key="index">
              <span class="text bottom-border-1px">
              <img class="icon" v-if="item.icon"
                   :src="item.icon">
              {{item.name}}
              </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="ul">
          <li  class="food-list-hook" v-for="(item,index) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in item.foods" :key="index"
                  @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food="food" ref="food"/>
  </div>

</template>

<script>
    import {mapState} from 'vuex'
    import BScroll from 'better-scroll'
    import Food from "../../../components/Food/Food";
    import CartControl from "../../../components/CartControl/CartControl";
    import ShopCart from "../../../components/ShopCart/ShopCart";

    export default {
        name: "ShopGoods",
        data() {
            return {
                food: {},
                tops:[],
                scrollY:0,
            }
        },
        components: {
            ShopCart,
            Food,
            CartControl
        },
        mounted() {
            this.$store.dispatch('getShopGoods', () => {
                this.$nextTick(() => {
                    this._initScroll()
                    this._initTops()
                })
            })
        },
        methods: {
            _initScroll() {
                new BScroll('.menu-wrapper', {
                    click: true
                })

               this.foodScroll= new BScroll('.foods-wrapper', {
                    click: true,
                    probeType: 2,  // 因为惯性滑动不会触发
                })
                this.foodScroll.on('scroll',({x,y})=>{
                    console.log(x,y)
                    this.scrollY=Math.abs(y)
                })
                this.foodScroll.on('scrollEnd',({x,y})=>{
                    console.log('scrollEnd',x,y)
                    this.scrollY=Math.abs(y)
                })

            },
            _initTops(){
                const  lis=this.$refs.ul.children
                let height=0
                this.tops.push(height)
                Array.prototype.slice.call(lis).forEach((li)=>{
                    height+=li.clientHeight
                    this.tops.push(height)
                })
            },
            showFood(food) {
                this.food = food
                this.$refs.food.toggleShow()
            },
            clickMenuItem(index){
                const scrollY=this.tops[index]
                //立即刷新
                this.scrollY=scrollY
                this.foodScroll.scrollTo(0,-scrollY,300)
            }
        },
        computed: {
            ...mapState(['goods','cartFoods']),
            currentIndex() {
                const index= this.tops.findIndex((top,index)=>{
                    return this.scrollY>=top&&this.scrollY<this.tops[index+1]
                })
                return index
            }
        },

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7

      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px

        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700

          .text
            border-none()

        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat

        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px

    .foods-wrapper
      flex: 1

      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7

      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))

        &:last-child
          border-none()
          margin-bottom: 0

        .icon
          flex: 0 0 57px
          margin-right: 10px

        .content
          flex: 1

          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)

          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)

          .desc
            line-height: 12px
            margin-bottom: 8px

          .extra
            .count
              margin-right: 12px

          .price
            font-weight: 700
            line-height: 24px

            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)

            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)

          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

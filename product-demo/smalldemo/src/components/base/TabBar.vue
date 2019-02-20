<template>
  <div>
      <van-tabbar v-model="index">
        <van-tabbar-item icon="wap-home" to='/home'>首页</van-tabbar-item>
        <van-tabbar-item icon="orders-o" to='/list'>列表</van-tabbar-item>
        <van-tabbar-item icon="cart-o" info="5" to='/car'>购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o" to='/personal'>我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
export default {
  name:"TabBar",
  data(){
    return{

    }
  },
  props:['active'],
  computed: {
    index:{
      get(){return this.active},
      set(){}
    }
  },
}
</script>
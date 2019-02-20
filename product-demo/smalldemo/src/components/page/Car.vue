<template>
    <div>
    <h3>Car</h3>
    <tab-bar :active="1"></tab-bar>
    </div>
  </template>
  
  <script>
  import TabBar from '../base/TabBar.vue'
  export default {
    name:"Car",
    components:{
      tabBar:TabBar
    }
  }
  </script>
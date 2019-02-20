<template>
    <div>
    <h3>Personal</h3>
    <tab-bar :active="3"></tab-bar>
    </div>
  </template>
  
  <script>
  import TabBar from '../base/TabBar.vue'
  export default {
    name:"Personal",
    components:{
      tabBar:TabBar
    }
  }
  </script>
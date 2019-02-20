<template>
    <div>
    <h3>List</h3>
    <tab-bar :active="2"></tab-bar>
    </div>
  </template>
  
  <script>
  import TabBar from '../base/TabBar.vue'
  export default {
    name:"List",
    components:{
      tabBar:TabBar
    }
  }
  </script>
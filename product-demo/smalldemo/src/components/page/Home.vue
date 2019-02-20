<template>
  <div>
    <h3>Home</h3>
    <TabBar :active="0"></TabBar>
  </div>
</template>

<script>
import TabBar from '../base/TabBar.vue'
export default {
  name:"Home",
  components:{
    TabBar
  }
}
</script>

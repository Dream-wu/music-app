<template>
  <div class="home">
    <!-- 顶部导航 -->
   <top-nav></top-nav>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav.vue'

export default {
  name: 'Home',
  components: {
    TopNav
  }
}
</script>
<style lang="less" scoped>
.home {
  padding: 0 0.4rem;
}
</style>

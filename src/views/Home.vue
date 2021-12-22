<template>
  <div class="home">
    <!-- 顶部导航 -->
   <top-nav></top-nav>
   <Suspense>
      <home-swiper></home-swiper>
   </Suspense>
   <icon-list></icon-list>
   <music-list></music-list>
  </div>
</template>
<script>
import TopNav from '@/components/TopNav.vue'
import HomeSwiper from '@/components/HomeSwiper.vue'
import IconList from '@/components/IconList.vue'
import MusicList from '@/components/MusicList.vue'

export default {
  name: 'Home',
  components: {
    TopNav,
    HomeSwiper,
    IconList,
    MusicList
  }
}
</script>
<style lang="less" scoped>
.home {
  padding: 0 0.4rem;
}
</style>

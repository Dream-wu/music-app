<template>
  <div class="swiper-container home-swiper" id="home-swiper">
    <div class="swiper-wrapper">
      <!-- 为什么换成网络图片后，无法滑动？？ 已解决 -->
      <div class="swiper-slide" v-for="(item,i) in imgs" :key="i"><img :src="item.pic" /></div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import { reactive, onMounted, toRefs, onBeforeMount } from 'vue';
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import {getBanner} from '@/api/index.js'

export default {
  name: 'HomeSwiper',
  async setup() {
    const state = reactive({
      imgs: []
    });

    onMounted(() => {   // 当setup为async时，要先注册 生命周期钩子函数，并且父组件要加suspence标签
      var mySwiper = new Swiper('#home-swiper', {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
      })
    })
    
    let res = await getBanner(1);
    state.imgs = res.data.banners;
  
    
    return {
      ...toRefs(state),
    };
  },
};
</script>


<style lang="less" >
.swiper-container.home-swiper {
  width: 100%;
  height: 2.6rem;
  border-radius: 0.1rem;
  .swiper-slide {
    width: 100% !important;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .swiper-pagination-bullet-active {
    background-color: orangered;
  }
}
</style>
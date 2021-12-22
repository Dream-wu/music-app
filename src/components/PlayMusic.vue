<template>
  <div class="playMusic" v-if="playDetail && playDetail.al">
    <div class="bg" :style="{backgroundImage: `url(${playDetail.al.picUrl})`}"></div>
    <div class="playMusic-top">
      <div class="back" @click="$emit('back')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>
      <div class="center">
        <!-- <marquee behavior="scroll" direction="left">{{playDetail.al.name}}</marquee> -->
        {{playDetail.al.name}}
      </div>
      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="playMusic-content" v-show="!state.isLyric" @click="state.isLyric = !state.isLyric">
      <img class="needle" :class="{active: !state.paused}" src="../assets/img/needle-ip6.png">
      <img class="disc" src="../assets/img/disc_default.png">
      <img class="pic" :src="playDetail.al.picUrl">
    </div>
    <!-- 歌词 -->
    <div class="playMusic-lyric" v-show="state.isLyric" ref="lyricEle">
      <p v-for="(item,i) in $store.getters.lyricList" :key="i" :class=" {active: (currentTime*1000>=item.time && currentTime*1000 <item.nextTime) }">
        <!-- {{item.preTime}} - {{item.time}}- {{item.lyric}} -->
        {{item.lyric}}
      </p>
    </div>
    <div class="progress">
      
    </div>
    <div class="playMusic-footer">
      <svg  class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg  class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-before"></use>
      </svg>
      <svg v-if="paused" class="icon play" aria-hidden="true" @click="play">
          <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg v-else class="icon play" aria-hidden="true" @click="play">
          <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg  class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-next"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gf-playlist"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import {computed, watch, defineComponent, ref} from 'vue';
import {useStore} from 'vuex';
export default defineComponent({
  name: 'playMusic',
  props: ['playDetail', 'paused', 'play'],
  setup() {
    // 可以通过调用 useStore 函数，来在 setup 钩子函数中访问 store。这与在组件中使用选项式 API 访问 this.$store 是等效的。
    const store = useStore();
    // 为了访问 state 和 getter，需要创建 computed 引用以保留响应性，这与在选项式 API 中创建计算属性等效。
    let currentTime =  computed(() => store.state.currentTime);
    let lyric =  computed(() => store.state.lyric);
    let lyricEle = ref(null);
    let state = reactive({
      isLyric: false,
    });

    watch(currentTime, (oldVal, newVal) => {
      // console.log('watch currentTime',oldVal, newVal, [lyricEle.value])
      const h = lyricEle.value.offsetHeight;
      let p = document.querySelector('p.active');
      if(p) {
        lyricEle.value.scrollTop = p.offsetTop;
      }
    }, {
      deep: false
    })

    function goPlay(num) {
      let i = store.state.playCurrentIndex + num;
      if(i<0) {  // 上一首
        i = store.state.playlist.length - 1;
      }else if(i> store.state.playlist.length-1) {  // 下一首
        i= 0;
      }
      store.commit('setPlayIndex', i)
    }
    return {
      state,
      lyric,
      lyricEle,
      currentTime,
      goPlay
    }
  }
})
</script>
<style scoped lang="less">
.playMusic {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-size: auto 100%;
    background-position: center;
    filter: blur(60px);
  }
  &-top {
    width: 7.5rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    padding: 0 .4rem;
    .icon {
      width: .6rem;
      height: .6rem;
      fill: #fff;
    }
    marquee {
      width: 3rem;
      flex: 1;
    }
  }
  &-content {
    width: 7.5rem;
    height: 7.5rem;
    position: absolute;
    top: 1.5rem;
    left: 0;
    .needle {
      width: 2.2rem;
      position: absolute;
      left: 3.5rem;
      top: 0;
      z-index: 11;
      transform: rotate(-20deg);
      transform-origin: 0rem 0;
      transition: all 1s;
    }
    .needle.active {
      transform: rotate(15deg);
    }
    .disc {
      width: 5rem;
      position: absolute;
      left: 1.25rem;
      top: 2rem;
      border-radius: 50%;
    }
    .pic {
      width: 3.8rem;
      position: absolute;
      left: 1.85rem;
      top: 2.6rem;
      border-radius: 50%;
    }
  }
  &-lyric {
    width: 7.5rem;
    height: 8rem;
    position: absolute;
    top: calc(50% - 4rem);
    left: 0;
    overflow: scroll;
    text-align: center;
    color: #fff;
    padding: .2rem 0;
    .active {
      color: red;
    }
  }
  &-footer {
    width: 7.5rem;
    height: 1.5rem;
    padding: 0 .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    .icon {
      width: .6rem;
      height: .6rem;
      fill: #fff;
    }
    .play {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>

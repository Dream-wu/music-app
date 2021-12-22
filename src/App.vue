<template>
  <div>
    <router-view />
    <!-- 每个页面都用到的底部播放组件 -->
    <play-controller v-if="playlist&& playlist[playCurrentIndex]"></play-controller>
  </div>
</template>
<script>
import PlayController from '@/components/PlayController.vue'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  components: {
    PlayController
  },
  setup() {
    const store = useStore();
    return {
      playlist: computed(() => store.state.playlist),
      playCurrentIndex: computed(() => store.state.playCurrentIndex),
    }
  }
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.32rem;
  height: 0.32rem;
  fill: currentColor;
  overflow: hidden;
}
a {
  color: #333;
  text-decoration: none;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

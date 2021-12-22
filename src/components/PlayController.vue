<template>
    <!-- 每个页面都用到的组件，数据存储在store中 -->
    <div class="play-controller">
        <div class="left" v-if="playlist[playCurrentIndex] && playlist[playCurrentIndex].al" @click="isShow=true">
            <img :src="playlist[playCurrentIndex].al.picUrl" alt="">
            <div class="content">
                <div class="title ellipsis">{{playlist[playCurrentIndex].name}}</div>
                <div class="tips ellipsis">横滑可以切换上下首歌</div>
            </div>
        </div>
        <div class="right">
            <svg v-if="paused" class="icon" aria-hidden="true" @click="play">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg v-else class="icon" aria-hidden="true" @click="play">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gf-playlist"></use>
            </svg>
        </div>
        <play-music v-show="isShow" :paused="paused" :play="play" :playDetail="playlist[playCurrentIndex]" @back="isShow=false"></play-music>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`" v-if="playlist[playCurrentIndex]"></audio>
    </div>
</template>
<script>
import {mapState, mapMutations, useStore} from 'vuex';
import {computed, reactive, ref, onMounted, onUpdated} from 'vue';
import PlayMusic from '@/components/PlayMusic';
export default {
    name: 'playController',
    setup(props, ctx) {
        const store = useStore();
        const storeStateFns = mapState(['playlist', 'playCurrentIndex'])
        const storeState = {
            audio: ref(null),
            paused: ref(true),  // 应该存储在store中
            isShow: ref(false)
        }
        onMounted(() => {
            store.state.playlist[store.state.playCurrentIndex] && store.dispatch('reqLyric', {id: store.state.playlist[store.state.playCurrentIndex].id});
            updateTime();
        })
        onUpdated(() => {
            console.log('playcontrller onupdated')
            store.dispatch('reqLyric', {id: store.state.playlist[store.state.playCurrentIndex].id})
            
        })
        Object.keys(storeStateFns).forEach(fnKey => {
            // mapState在解析state的数据时，是需要通过this.$store去解析
            // 在setup里面是没有this的，所以我们给它的函数绑定ctx
            // this => {$store: store}
            const fn = storeStateFns[fnKey].bind({$store: store})
            // 遍历生成这种数据结构 => {name: ref(), age: ref()}
            storeState[fnKey] = computed(fn)
        })
        // 控制audio的播放与暂停
        function play() {
            const paused = storeState.audio.value.paused;
            if(paused) {
                storeState.audio.value.play();
                storeState.paused.value = false;
                updateTime();
            }else {
                storeState.audio.value.pause();
                storeState.paused.value = true;
                //  为何无法清除？？？ —— 定义了多个定时器，没全部清除
                window.clearInterval(store.state.timerId);
                store.commit('setTimerId', null);
            }
        }

        function updateTime() {
            // 必须清除一下之前的定时器，因为多次调用了updateTime方法，会导致生成多个定时器
            window.clearInterval(store.state.timerId);
            let timerId = window.setInterval(() => {
                if(storeState.audio && storeState.audio.value) {
                    // console.log(storeState.audio.value.currentTime *1000, store.state.timerId);
                    store.commit('setCurrentTime', storeState.audio.value.currentTime);
                }
            }, 1000)
            store.commit('setTimerId', timerId)
        }

        return {
            ...storeState,
            play,
            updateTime
        }
    },
    components: {
        PlayMusic
    }
}
</script>
<style lang="less" scoped>
.play-controller {
    width: 7.5rem;
    height: 1.2rem;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ccc;
    background: white;
    .left {
        width: 5.5rem;
        display: flex;
        align-items: center;
        padding: 0 .2rem;
        flex:1;
        img {
            width: 0.8rem;
            height: .8rem;
            border-radius: 50%;
        }
        .content {
            width: 4.7rem;
            padding: 0 0.2rem;
            .tips {
                font-size: .24rem;
                color: #999;
            }
        }
    }
    .right {
        width: 1.8rem;
        flex-grow: 0;
        .icon  {
            width: .4rem;
            height: .4rem;
            margin: 0 .2rem;
        }
    }
}
</style>
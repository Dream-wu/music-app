<template>
    <div class="playlist">
        <div class="playlist-top">
            <div class="left">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <div v-if="playlist.tracks" class="text">
                    <div class="title">播放全部</div>
                    <div class="num">（共{{playlist.tracks.length}}首）</div>
                </div>
            </div>
            <div class="right">
                + 收藏({{changeValue(playlist.subscribedCount)}})
            </div>
        </div>
        <div class="playlist-list">
            <div class="item" v-for="(item, index) in playlist.tracks" :key="item.id">
                <div class="left">
                    <span class="index">{{index+1}}</span>
                    <div class="content">
                        <div class="title ellipsis">{{item.name}}</div>
                        <div class="author ellipsis">
                            <span class="tag" v-for="(tag, i) in playlist.tags" :key="i">{{tag}}</span>
                            <span>{{item.al.name}}</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <svg class="icon" aria-hidden="true" @click="togglePlayIndex(index)">
                        <use xlink:href="#icon-bofang1"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-31liebiao"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations, useStore} from 'vuex';
export default {
    name: 'playList',
    props: ['playlist'],
    setup() {
        const store = useStore();
        function changeValue(num) {
            let res = 0;
            if (num >= 100000000) {
                res = num / 100000000;
                res = res.toFixed(2) + '亿';
            } else if (num >= 10000) {
                res = num / 10000;
                res = res.toFixed(2) + '万';
            }
            return res;
        }

        function togglePlayIndex(i) {
            store.commit('setPlayIndex', i);
            // 重新拿歌词
            store.dispatch('reqLyric', {id: store.state.playlist[store.state.playCurrentIndex].id});
        }
    return {
      changeValue,
      togglePlayIndex,
      ...mapMutations(['setPlayIndex'])
    }
  }
}
</script>
<style lang="less" scoped>
.playlist {
    width: 7.5rem;
    padding: 0 .4rem;
    margin-top: .4rem;
    background: white;
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
    .playlist-top {
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            display: flex;
            align-items: center;
            .icon {
                width: .5rem;
                height: .5rem;
            }
            .text {
                display: flex;
                align-items: center;
                margin-left: .2rem;
            }
            .title {
                font-size: .34rem;
            }
            .num {
                font-size: .28rem;
                color: #666;
            }
        }
        .right {
            height: .8rem;
            line-height: .8rem;
            padding: 0 .3rem;
            font-size: .28rem;
            color: white;
            background: orangered;
            border-radius: .4rem;
        }
    }
    .playlist-list {
        width: 6.7rem;
        .item {
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
                width: 5.5rem;
                display: flex;
                align-items: center;
                color: #666;
                .index {
                    width: .4rem;
                    flex: 0 0 auto;
                }
                .content {
                    width: 5rem;
                    display: flex;
                    flex-direction: column;
                    margin-left: .3rem;
                    flex-shrink: 1;
                    .title {
                        flex-shrink: 1;
                        font-size: .3rem;
                        font-weight: bold;
                        color: #222;
                        margin-bottom: .08rem;
                    }
                    .author {
                        color: #666;
                        font-size: .24rem;
                        .tag {
                            font-size: .2rem;
                            color: orangered;
                            border: 1px solid orangered;
                            padding: 0 .04rem;
                            border-radius: .05rem;
                            margin-right: .06rem;
                        }
                    }
                }
                
            }
            .right {
                width: 1.2rem;
                flex-grow: 0;
                flex-shrink: 0;
                .icon {
                    margin-left: .2rem;
                }
            }
        }
    }
}
</style>
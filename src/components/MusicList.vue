<template>
    <div class="musicList">
        <div class="musicList-top">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicList-bottom">
            <div class="swiper-container" id="musicList-swiper">
                <div class="swiper-wrapper">
                    <router-link class="swiper-slide" :to="{path: './listview', query: {id: item.id}}" v-for="item in list" :key="item.id">
                        <img :src="item.picUrl" :alt="item.name"/>
                        <div class="name">{{item.name}}</div>
                        <div class="count">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-play"></use>
                            </svg>
                            <span>{{changeValue(item.playCount)}}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {onMounted, reactive, toRefs, onUpdated} from 'vue';
import { useStore} from 'vuex'
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import {getMusicList} from '@/api/index.js';

export default {
    name: 'musicList',
    setup(ctx, props) {
        const state = reactive({
            list: []   // 若list为单独设置的reactive变量，不能直接复制，否则失去响应式，所以放在state对象里面
        });
        onMounted(async () => {
            let res = await getMusicList(10)
            state.list = res.data.result;
            
        })

        onUpdated(() => {
            // 接口拿到数据后触发该钩子函数
            var swiper = new Swiper("#musicList-swiper", {
                slidesPerView: 3,   // 一次显示3个
                spaceBetween: 10,   // 间距
            });
        })

        function changeValue(num) {
            let res = 0;
            if(num >= 100000000) {
                res = num/100000000;
                res = res.toFixed(2) + '亿';
            }else if(num >= 10000) {
                res = num/10000;
                res = res.toFixed(2) + '万';
            }
            return res;
        }

        return {
            ...toRefs(state),
            changeValue
        }
    }
}
</script>
<style lang="less" scoped>
.musicList {
    &-top {
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title{
            font-size: .4rem;
            font-weight: 900;
        }
        .more {
            width: 1.2rem;
            height: .5rem;
            line-height: .5rem;
            border: 1px solid #ccc;
            border-radius: .2rem;
            font-size: .24rem;
            text-align: center;
        }
    }
    &-bottom {
        .swiper-container {
            width: 100%;
            height: 3rem;
        }
        .swiper-slide {
            display: flex;
            flex-direction: column;
            position: relative;
            img  {
                width: 100%;
                border-radius: .1rem;
            }
            .name {
                height: .6rem;
                line-height: .4rem;
                font-size: .24rem;
            }
            .count {
                display: flex;
                align-items: center;
                position: absolute;
                right: .1rem;
                top: .1rem;
                color: #ccc;
                .icon {
                    fill: #cccccc;
                }
            }
        }
    }
}
</style>

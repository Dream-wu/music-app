<template>
  <div class="search-top">
    <div class="search-top-nav">
      <div class="back" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>
      <div class="right">
        <input type="text" v-model="keywords" @keydown.enter="search" :placeholder="placeholder"/>
      </div>
    </div>
    <div class="search-top-history">
      <div class="left">历史</div>
      <div class="right">
        <div class="keywordItem" @click="historySearch(item)" v-for="item in state.keywordList" :key="item">{{item}}</div>
      </div>
    </div>

    <div class="search-list" v-if="state.searchList && state.searchList.length" >
      <div class="search-list-top">
          <div class="left">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bofang"></use>
              </svg>
              <div class="text">
                  <div class="title">播放全部</div>
                  <div class="num">（共{{state.searchList.length}}首）</div>
              </div>
          </div>
      </div>
      <div v-for="(item, i) in state.searchList" :key="i" class="item">
        <div class="left">
          <div class="index">{{i+1}}</div>
          <div class="content">
            <div class="title">{{item.name}}</div>
            <div class="author">
              <div class="name">{{item.album.name}}</div>
            </div>
          </div>
        </div>
        <div class="right">
            <svg class="icon" aria-hidden="true" @click="setPlay(item, i)">
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
import {ref, onMounted, reactive} from 'vue'
import {searchMusic} from '@/api/index.js'
import {useStore} from 'vuex';
import { useRoute } from 'vue-router';
export default {
  name: 'SearchviewTop',
  // props: ['placeholder'],
  setup() {
    const store = useStore(); 
    const state = reactive({
      searchList: [],
      keywordList: []
    })
    let keywords = ref('');
    let placeholder = ref('陈奕迅');
    const historyStr = localStorage.getItem('keywordList');
    if(historyStr ) {
      JSON.parse(historyStr).map(item => {
        state.keywordList.push(item)
      })
    }

    function search() {
      state.keywordList.push(keywords.value);
      state.keywordList = Array.from(new Set(state.keywordList));
      if(state.keywordList.length>10) { // 只保留最近10条搜索历史记录
        state.keywordList = state.keywordList.slice(state.keywordList.length-10, state.keywordList);
      }
      localStorage.setItem('keywordList', JSON.stringify(state.keywordList));
      searchMusic(keywords.value).then(res => {
        state.searchList = res.data.result.songs;
        console.log('searchList:', state.searchList)
      })
    }
    // 点击历史记录，同样可以搜索
    function historySearch(keyword) {
      keywords.value = keyword;
      search();
    }
    // 播放列表中第i首歌
    function setPlay(item, i) {
      // 更新歌单，歌单中追加一首歌
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      console.log('item:', [item])
      store.commit('pushPlaylist', item); 
      // 更新当前播放index
      store.commit('setPlayIndex', store.state.playlist.length-1);
    }
    return {
      state,
      keywords,
      placeholder,
      search,
      historySearch,
      setPlay
    }
  }
}
</script>
<style lang="less" scoped>
.search-top {
  width: 7.5rem;
  padding: 0 0.4rem;
  padding-bottom: 1.2rem;
  &-nav {
    width: 7.5rem;
    height: 1.2rem;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    font-size: 0.4rem;
    background: white;
    padding: 0 .4rem;
    .back {
      .icon {
        width: 0.6rem;
        height: 0.6rem;
        fill: #333;
      }
    }
    .right {
      flex: 1;
      padding-left: .4rem;
      input {
        width: 100%;
        height: .5rem;
        border: none;
        outline: none;
        border-bottom: 1px solid #666;
      }
    }
  }
  &-history {
    display: flex;
    margin-top: 1.2rem;
    // height: .8rem;
    .left {
      width: 1.2rem;
      height: .6rem;
      line-height: .6rem;
      font-weight: bold;
      margin: .2rem 0;
      flex-shrink: 0;
    }
    .right {
      display: flex;
      flex-wrap: wrap;
      .keywordItem {
        color: #666;
        background-color: #eee;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        padding: 0 .2rem;
        border-radius: .4rem;
        margin: .2rem .1rem;
      }
    }
  }
  .search-list {
    &-top {
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
    .item {
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            display: flex;
            align-items: center;
            color: #666;
            .content {
                display: flex;
                flex-direction: column;
                margin-left: .3rem;
                .title {
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
            .icon {
                margin-left: .2rem;
            }
        }
    }
    }
}
</style>
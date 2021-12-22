<template>
  <div class="listview-top">
    <img :src="playlist.coverImgUrl" class="bg" />
    <div class="listview-top-nav">
      <div class="back" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span class="title">歌单</span>
      </div>
      <div class="right">
        <svg class="icon search" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
    <div class="listview-top-content">
      <div class="left">
        <img :src="playlist.coverImgUrl">
        <div class="count">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play"></use>
            </svg>
            <span>{{changeValue(playlist.playCount)}}</span>
        </div>
      </div>
      <div class="right">
        <h3>{{playlist.name}}</h3>
        <div class="author" v-if="playlist.creator">
          <img :src="playlist.creator.avatarUrl"/>
          <span>{{playlist.creator.nickname}}</span>
        </div>
        <div class="description">
          {{playlist.description}}
        </div>
      </div>
    </div>
    <div class="iconList">
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liaotian"></use>
        </svg>
        <span>{{playlist.commentCount}}</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{playlist.shareCount}}</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListviewTop',
  props: ['playlist'],
  setup() {
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
    return {
      changeValue
    }
  }
}
</script>
<style lang="less" scoped>
.listview-top {
  width: 7.5rem;
  // height: 6rem;
  padding: 0 0.4rem;
  .bg {
    width: 7.5rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(40px); // 设置滤镜 模糊度
  }
  &-nav {
    height: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.4rem;
    .back,
    .right {
      display: flex;
      align-items: center;
      color: white;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
        fill: #fff;
      }
      .title {
        margin-left: 0.4rem;
      }
      .search {
        margin-right: 0.5rem;
      }
    }
  }
  &-content {
    display: flex;
    justify-content: space-between;
    padding: .6rem 0rem;
    .left {
      position: relative;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: .2rem;
      }
      .count {
        display: flex;
        align-items: center;
        position: absolute;
        right: .1rem;
        top: .1rem;
        color: #ccc;
        font-size: .24rem;
        .icon {
            fill: #cccccc;
        }
      }
    }
    .right {
      width: 3.5rem;
      color: #ccc;
      h3 {
        color: white;
      }
      .author {
        display: flex;
        align-items: center;
        margin: .2rem 0;
        font-size: .26rem;
        img {
          width: .6rem;
          height: .6rem;
          border-radius: 50%;
          margin-right: .2rem;
        }
      }
      .description {
        font-size: .24rem;
        color: #ccc;
        overflow: hidden;
        text-overflow: ellipsis;
        // 方法适用于WebKit浏览器及移动端；
        display: -webkit-box;  // 将对象作为弹性伸缩盒子模型显示
        -webkit-line-clamp: 2;  // -webkit-line-clamp用来限制在一个块元素显示的文本的行数。
        -webkit-box-orient: vertical;  // 设置或检索伸缩盒对象的子元素的排列方式该
      }
    }
  }
  .iconList {
    display: flex;
    justify-content: space-around;
    .iconItem {
      display: flex;
      flex-direction: column;
      color: #fff;
      text-align: center;
      .icon {
        width:.6rem;
        height: .6rem;
        fill: #fff;  // 多色的svg图标用fill填充颜色无效果
      }
      span {
        font-size: .28rem;
        padding-top: .2rem;
      }
    }
  }
}
</style>
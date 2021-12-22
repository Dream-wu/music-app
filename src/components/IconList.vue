<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-faxian_meirituijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-faxian_gedan"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-faxian_paihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-faxian_zhibo"></use>
      </svg>
      <span>直播</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IconList'
}
</script>
<style lang="less" scoped>
.iconList {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0;
    .iconItem {
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        .icon {
            width: 1.2rem;
            height: 1.2rem;
        }
        span{
            font-size: .28rem;
        }
    }
}
</style>
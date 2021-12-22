<template>
  <div class="top-nav">
    <div class="top-nav-left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <div class="top-nav-center">
        <span class="top-nav-center-item" @click="$router.push('/me')">我的</span>
        <span class="top-nav-center-item active">发现</span>
        <span class="top-nav-center-item">云村</span>
        <span class="top-nav-center-item">视频</span>
    </div>
    <div class="top-nav-right" @click="$router.push('./searchview')">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
        </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TopNav',
}
</script>
<style lang="less" scoped>
.top-nav {
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left {

    }
    .icon {
        width: 0.45rem;
        height: 0.45rem;
    }
    &-center {
        width: 4.5rem;
        display: flex;
        justify-content: space-around;
        .active {
            font-weight: 900;
        }
    }
}
</style>
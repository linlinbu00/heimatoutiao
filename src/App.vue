<template>
  <!-- <div id="app">
    <h1>黑马头条a</h1>
    <h1 class="toutiao toutiao-wode"></h1>
    <router-view />
  </div> -->
  <div>
    <!-- <Icon icon="wode"></Icon>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <h1 class="back">你快回来~~</h1> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped lang="less">
.back {
  font-size: 20px;
}
</style>

<template>
  <div>
    <span class="toutiao toutiao-wode"></span>

    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <div class="box"></div>
  </div>
</template>

<script>
// 1.下载vant
// - yarn add vant@latest-v2 -S

// 2.引入组件和css
// - main.js

// 3.测试

// rem适配
// 1.让rem动起来
//  - yarn add amfe-flexible
// 2.盒子使用rem
// - 自动的识别css中px,并将其转成rem.

// post-css css的预处理器
// - postcss 自己能干的事很少，下载插件

// 1.下载yarn add postcss-pxtorem
// 2.告诉postcss,我要使用这个插件，，postcssrc.js
export default {}
</script>

<style scoped>
.box {
  width: 2rem;
  height: 2rem;
  background-color: pink;
}
</style>

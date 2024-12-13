<template>
  <!-- 头部组件 -->
  <div class="header">
    <AppHeader />
    <!-- 频道组件 -->
  </div>
  <!-- 轮播组件 -->
  <div class="main-content">
    <HomeChannel  class="channel"/>
  </div>

</template>

<script setup lang="ts">
// 使用setup语法糖后就无需注册了(这是vue2.7和vue3的特点)
import AppHeader from '@/components/app-header.vue'
import HomeChannel from '@/views/Home/components/home-channel.vue'

</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  
}
.main-content{
  padding-top: 18vmin;

}
</style>

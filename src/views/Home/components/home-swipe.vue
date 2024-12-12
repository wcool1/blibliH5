<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in list" :key="item.imgSrc" @click="handleClick(item)" v-lazy="item" class="swipe">
      <img :src="item.imgSrc" alt="欢迎来到哔哩哔哩" />
    </van-swipe-item>
  </van-swipe>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { AxiosResponse } from 'axios'

// 接口定义
interface Iswiper {
  imgSrc: string
  link: string
}

// 响应式数据类型声明
const list = ref<Iswiper[]>([])

// 点击处理
const handleClick = (item: Iswiper): void => {
  window.location.href = item.link
}

// 获取轮播数据
const getSwiperList = async (): Promise<void> => {
  try {
    const { data }: AxiosResponse = await axios({
      url: '/swiperList',
      method: 'get'
    })
    list.value = data.result
  } catch (error) {
    console.error('获取轮播图数据失败:', error)
  }
}

// 生命周期钩子
onMounted(() => {
  getSwiperList()
})
</script>

<style lang="less" scoped>
:deep(.swipe) {
  width: 100%;
  height: 30vh;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
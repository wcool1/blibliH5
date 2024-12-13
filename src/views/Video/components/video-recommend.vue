<template>
  <div class="list">
    <AppVideoItem v-for="item in list" :key="item.id" :video="item" />
  </div>
</template>

<script setup lang="ts">
import { ref ,watch} from 'vue'
import axios from 'axios'
import AppVideoItem from '@/components/app-video-item.vue'
import { useRoute ,useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

interface IVideoItem {
  id: number
  imgSrc: string
  desc: string
  playCount: string
  commentCount: string
  videoSrc: string
}

const list = ref<IVideoItem[]>([])
// 修改获取数据方法
const fetchData = async () => {
  try {
    const { data } = await axios({
      method: 'get',
      url: '/recommendList',
      params: {
        videoId: route.params.id
      }
    })
    list.value = data.result
  } catch (error) {
    console.error('获取推荐视频失败:', error)
  }
}

// 添加路由参数监听
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchData()
    }
  }
)
// 初始加载
fetchData()
</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 1vw;
}
</style>

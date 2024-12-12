<template>
  <div class="video-list">
    <AppVideoItem v-for="item in list" :key="item.id" :video="item" />
    <div ref="loadMore" class="load-more">
      <div v-if="loading" class="spinner"></div>
      让子弹飞一会
      <div v-if="error">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import AppVideoItem from '@/components/app-video-item.vue'

const props = defineProps<{
  channelId: string
}>()

interface IVideoItem {
  id: number
  imgSrc: string
  desc: string
  playCount: string
  commentCount: string
  videoSrc: string
}

const list = ref<IVideoItem[]>([])
const page = ref(1)
const loading = ref(false)
const error = ref('')
const loadMore = ref(null)

const channelPages = new Map<string, number>() // 存储每个频道的页码

const fetchVideos = async (currentPage: number) => {
  if (loading.value) return 
  loading.value = true
  error.value = ''
  
  try {
    const response = await axios.get('/videosList', {
      params: {
        page: currentPage,
        pageSize: 14,
      }
    })
    
    const { data: { data: videos } } = response.data
    list.value = [...list.value, ...videos]
    page.value = currentPage + 1
  } catch (err) {
    error.value = '加载失败，请重试'
    console.error('加载数据失败:', err)
  } finally {
    loading.value = false
  }
}

// 修改 watch
watch(() => props.channelId, (newId) => {
  list.value = []
  // 根据频道ID设置起始页码
  const startPage = parseInt(newId) + 1
  page.value = startPage
  fetchVideos(startPage)
})




// options是一个配置对象
const options = {
    root: null, // 根元素为浏览器视口
    rootMargin: '35px', // 在视口外扩展35px的区域
    threshold: 0.3 // 目标元素可见部分达到30%时触发回调

}

// IntersectionObserver是一个构造函数，用于监听元素是否进入视口，自带节流功能
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !loading.value ) {
      fetchVideos(page.value) 
      console.log('滚动')
    }
  })
}, options)

const createObserver = () => {
  if (loadMore.value) {
    observer.observe(loadMore.value) // 监听 loadMore 元素
  }
}

onMounted(() => {
  fetchVideos(page.value)
  createObserver()
})
</script>

<style scoped>
.video-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;
}

.load-more {
  width: 100%;
  text-align: center;
  padding: 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
<template>
  <!-- 头部 -->
  <AppHeader />
  <!-- 视频播放 -->
  <VideoPlay :videoInfo="videoInfo" />
  <!-- 视频详情 -->
  <VideoInfo :videoInfo="videoInfo" />
  <!-- 相关推荐/评论 -->
  <VideoBottom />
</template>

<script lang="ts" setup>
import axios from 'axios'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/app-header.vue'
import VideoPlay from './components/video-play.vue'
import VideoInfo from './components/video-info.vue'
import VideoBottom from './components/video-bottom.vue'
import { IVideoInfo } from './types'
// 🔔 初始化空对象，空对象不需要指定键名称了
const videoInfo = ref<IVideoInfo>({})
// 获取路由对象
const route = useRoute()

// 封装获取视频详情的函数
const fetchData = () => {
  axios({
    url: '/videoDetail',
    method: 'get',
    params: { id: route.params.id }
  }).then(({ data }) => {
    videoInfo.value = data.result
    console.log('视频详情数据', data.result)
  })
}
// 添加页面刷新方法
const refreshPage = () => {
  window.location.reload()
}
// 初始化获取数据
fetchData()

// 监听路由参数 id 的变化
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchData()
      refreshPage()
    }
  }
)
</script>

<style lang="less" scoped>
.video-info {
  padding: 3vw 2vw;
  border-bottom: 1px solid #ddd;
  .title {
    font-size: 4vw;
    line-height: 6vw;
    margin: 3vw 0;
  }
  .author-info {
    display: flex;
    align-items: center;
    font-size: 3vw;
    color: #999;
    .author {
      flex: 1;
      .author-avatar {
        width: 5vw;
        height: 5vw;
        object-fit: cover;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 1vw;
        background: url(~@/assets/images/loading.png) no-repeat center #e7e7e7;
      }

      .author-name {
        color: #212121;
      }
    }
    > span {
      margin: 0 2vw;
    }
    .iconfont {
      font-size: 5vw;
      color: #757575;
      margin-right: 2vw;
    }
  }
}
</style>

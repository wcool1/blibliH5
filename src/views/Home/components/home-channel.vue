<template>
  <div class="tabs">
    <van-tabs v-model:active="active" @change="handleTabChange">
      <van-tab class="van-tab" v-for="item in list" :key="item.id" :title="item.text"></van-tab>
      <div class="arrow-btn" @click="showPopup">
        <van-icon name="arrow-down" />
      </div>
    </van-tabs>
    
    <!-- 弹出层 -->
    <van-popup v-model:show="isShowPopup" position="bottom" round>
      <div class="channel-list">
        <div 
          v-for="item in list" 
          :key="item.id"
          class="channel-item"
          :class="{ active: item.id === currentChannelId }"
          @click="switchChannel(item)"
        >
          {{ item.text }}
        </div>
      </div>
    </van-popup>
  </div>
  <HomeSwipe v-if="currentChannelId === '0'"></HomeSwipe>
  <HomeVideoList :channelId="currentChannelId" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'
import HomeVideoList from './home-video-list.vue'
import HomeSwipe from './home-swipe.vue'
import { Icon, Popup } from 'vant'

const active = ref(0)
const isShowPopup = ref(false)

interface INavItem {
  id: string
  text: string
}

const list = ref<INavItem[]>([])

const currentChannelId = computed(() => {
  return list.value[active.value]?.id || '0'
})

const handleTabChange = (index: number) => {
  active.value = index
}

// 显示弹出层
const showPopup = () => {
  isShowPopup.value = true
}

// 切换频道
const switchChannel = (item: INavItem) => {
  const index = list.value.findIndex(channel => channel.id === item.id)
  if (index !== -1) {
    active.value = index
    isShowPopup.value = false
  }
}

axios({
  url: '/navList',
  method: 'get'
}).then((res) => {
  list.value = res.data.result
})
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  top: 12vmin;
  height: 6vmin;
  line-height:  6vmin;
  left: 0;
  width: 100%;
  z-index: 9999;

  .arrow-btn {
    position: absolute;
    right: -1vmin;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, transparent, #fff);
    z-index: 1;
  }

  :deep(.van-tab) {
    width: 20vw;
    height: 100%;
    line-height:  6vmin;

  }

  :deep(.van-tab--active) {
    color: #fb7299;
    font-weight: 700;
    font-size: 15px;
  }
}

.channel-list {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  .channel-item {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f7;
    border-radius: 4px;
    font-size: 14px;
    
    &.active {
      color: #fb7299;
      background-color: #fde9ef;
    }
  }
}
</style>
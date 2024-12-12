<template>
  <div class="video-play">
       <iframe
      ref="playerIframe"
      allowfullscreen="allowfullscreen"
      style="width:100%; min-height:480px"
      scrolling="no"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
      sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups allow-presentation"
      :src="videoInfo.videoSrc"
    >
    </iframe>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, onMounted } from 'vue'
import { IVideoInfo } from '../types'

const props = defineProps({
  videoInfo: {
    type: Object as PropType<IVideoInfo>,
    required: true
  }
})

onMounted(() => {
  window.addEventListener('message', (e) => {
    if (e.data.type === 'player.ready') {
      const iframe = document.querySelector('iframe')
      // 静音播放
      iframe?.contentWindow?.postMessage({ method: 'setVolume', value: 0 }, '*')
      // 调整播放进度，例如跳转到第60秒
      iframe?.contentWindow?.postMessage({ method: 'seek', value: 60 }, '*')
    }
  })
})
</script>

<style lang="less" scoped>
.video-play {
  background-color: #000;
}
</style>
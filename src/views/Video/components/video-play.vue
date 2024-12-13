<template>
  <div class="video-play">
       <iframe
      :key="videoInfo.videoSrc"
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

</script>

<style lang="less" scoped>
.video-play {
  background-color: #000;
}
</style>
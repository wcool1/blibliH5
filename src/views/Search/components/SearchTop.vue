<template>
  <form action="/">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Toast用于提示
import { Toast, ToastOptions } from 'vant'
import { useRouter } from 'vue-router'

const value = ref('')
const router = useRouter()

const onSearch = (val: string | ToastOptions | undefined) => Toast(val) // 显示用户输入的搜索关键词。
const onCancel = () => {
  Toast('取消') // 显示取消提示。
  router.push('/') // 跳转到首页
}
</script>

<style scoped>
::v-deep .van-search__action {
  color: #fb72a6;
}
</style>
<template>
  <header class="app-header">
    <!-- logo -->
    <div class="left">
      <a class="logo" href="#" @click="goHome">
        <i class="iconfont Navbar_logo"></i>
      </a>
    </div>

    <div class="right">
      <!-- 搜索 -->
      <a class="search" href="#/search">
        <i class="iconfont ic_search_tab"></i>
      </a>

      <!-- 头像 -->
      <a class="face" href="#/login">
        <img :src="store.login" alt="" />
      </a>
      <!-- 下载按钮 -->
      <div class="down-app">
        <a
          href="https://dl.hdslb.com/mobile/fixed/bili_win/bili_win-install.exe?t=20220722&spm_id_from=333.47.b_646f776e6c6f61642d6c696e6b.9">下载App</a>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { mainStore } from '../stores/user'
import { useRouter } from 'vue-router';

const store = mainStore()
const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>
<style lang="less" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.2vmin 0 4.8vmin;
  line-height: 11.73333vmin;
  background-color: #fff;

  .logo {
    flex: 1;

    .Navbar_logo {
      color: #f65988;
      font-size: 7.46667vw;
    }
  }

  .right {
    display: flex;
    align-items:center;
    .search {
      margin-right: 5.86667vmin;

      .ic_search_tab {
        color: #ccc;
        font-size: 5.86667vw;
      }
    }

    .face {
      margin-right: 5.86667vmin;

      img {
        width: 6.4vw;
        height:6.4vmin;
      }
    }

    .down-app {
      font-size: 3.3vw;
      width: 19.2vmin;
      height: 6.4vmin;
      line-height: 6.4vmin;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fb7299;
      color: #fff;
      border-radius: 5px;
      padding: 5px 10px;
    }
  }

}
</style>

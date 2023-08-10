<template>
  <div class="main">
    <h2>Main</h2>
    <button @click="loginOut">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants';
import useCounterStore from '@/store/counter'
import { localCache } from '@/utils/cache';
import { useRouter } from 'vue-router';

const counterStore = useCounterStore()
const router = useRouter()

function loginOut() {
  // 1. 清除token
  localCache.removeCache(LOGIN_TOKEN)

  // 2. 跳回login
  router.push("/login")
}
</script>

<style lang="less" scoped>
.main {
  color: red;
}
</style>

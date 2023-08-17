<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '210px'" class="aside">
        <MainAside  :is-col="isFold"/>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @trigger="handleFold"/>
        </el-header>
        <el-main class="main">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import MainAside from "@/components/main-aside/main-aside.vue"
import MainHeader from "@/components/main-header/main-header.vue";
import { ref } from "vue";


const isFold = ref(false)
const handleFold = (trigger: boolean) => {
  console.log(trigger);

  isFold.value = trigger
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
    /* IE 10+ */

    transition: width 0.3s ease;

    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}</style>


<template>
  <div class="main-header">
    <div class="trigger" @click="handleTrigger">
      <el-icon size="28px">
        <component :is="isFold ? 'expand' : 'fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">面包屑</div>
      <div class="info">个人信息</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


// 管理trigger状态
const isFold = ref(false)
// 处理trigger 将状态同步到父组件
  // 拿到emit 抛出事件
const emit = defineEmits(['trigger'])
const handleTrigger = () => {
  isFold.value = !isFold.value
  emit('trigger', isFold.value)
}

</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .trigger {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>

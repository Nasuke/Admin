<template>
  <div class="crumb">
    <el-breadcrumb :separator-icon="CaretRight">
      <template v-for="item in crumbInfos" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { CaretRight } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { mapPathToCrumb } from '../../../utils/map-menu';

import useLoginStore from '@/store/login/login';


const route = useRoute()
const userMenu = useLoginStore().userMenu

const crumbInfos = computed(() => {
  return mapPathToCrumb(route.path, userMenu)
})
</script>

<style lang="less" scoped>
.crumb {

}
</style>

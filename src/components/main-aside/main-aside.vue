<template>
  <div class="main-menu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="">
      <h2 v-show="!isCol" class="title">Nasuke</h2>
    </div>
    <div class="menu">
      <el-menu :collapse="isCol" @open="handleOpen" :default-active="defaultActive" text-color="#b7bdc3" active-text-color="#fff"
        background-color="#001529" style="height: 100%;">
        <template v-for="(item, index) in userMenu" :key="item.id">
          <!-- 此处index是string类型 需要转换一下 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <!-- 使用动态组件来完成 字符串到组件的映射 -->
                <component :is="item.icon?.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group v-if="item.children && item.children.length > 0">
              <template v-for="(subItem, idx) in item.children" :key="subItem.id">
                <el-menu-item :index="subItem.id + ''" @click="handleChange(subItem)">{{ subItem.name }}</el-menu-item>
              </template>
            </el-menu-item-group>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  ref } from 'vue';
import useLoginStore from '@/store/login/login';
import { useRoute, useRouter } from 'vue-router';
import {  mapPathToMenu } from '../../utils/map-menu';
// 使用store
const loginStore = useLoginStore()
const userMenu = loginStore.userMenu

// 菜单显示的默认值
const router = useRouter()
const route = useRoute()
const pathMenu = mapPathToMenu(route.path, userMenu)
const defaultActive = ref(pathMenu.id + '')


// 定义属性
defineProps({
  isCol: {
    type: Boolean,
    default: false
  }
})



// 菜单展开时
const handleOpen = (key: string, keyPath: string[]) => {
  console.log("---", "菜单发生了open");
}


const handleChange = (item: any) => {
  console.log("---", item.url);
  router.push(item.url)
}


</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>

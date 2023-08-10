
<template>
  <div class="panel-phone">
    <el-form
        :model="mobile"
        :rules="mobileRules"
        label-width="65px"
        size="large"
        status-icon
        ref="formRef"
        >
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="mobile.phoneNumber" />
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input v-model="mobile.captcha" show-password />
        </el-form-item>
      </el-form>
    </div>
  </template>

<script setup lang="ts">

import type { FormRules, ElForm } from 'element-plus';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

// 定义数据
const mobile = reactive({
  phoneNumber: "",
  captcha: ""
})

// 定义规则
const mobileRules: FormRules = {
    phoneNumber: [
    { required: true, message: '必须输入手机号码~', trigger: 'blur' },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '手机号码位数不正确~',
      trigger: 'blur'
    }
  ],
  captcha: [
    { required: true, message: '必须输入验证码~', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6}$/,
      message: '验证码有误~',
      trigger: 'blur'
    }
  ]
}

// 定义处理逻辑
const formRef = ref<InstanceType<typeof ElForm>>()

function loginAction() {
  formRef.value?.validate(valid => {
    if (valid) {
      const phone = mobile.phoneNumber
      const captcha = mobile.captcha
    } else {

      ElMessage.error("Oops, 请您输入正确的格式后再操作~~.")
    }
  })
}

// 将处理逻辑暴露出去
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.panel-phone {
  color: red;
}
</style>

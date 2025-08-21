<template>
  <div>
    <el-form :model="formData" label-width="auto" v-if="formData">
      <el-form-item label="google_app_id">
        <el-input v-model="formData.google_app_id" />
      </el-form-item>
      <el-form-item label="google_app_password">
        <el-input v-model="formData.google_app_password" />
      </el-form-item>
      <el-form-item label="google_app_base_url">
        <el-input v-model="formData.google_app_base_url" />
      </el-form-item>
    </el-form>
    <div class="d-flex align-items-center justify-content-end">
      <el-button @click="clear">Clear</el-button>
      <el-button type="primary" @click="sub">Submit</el-button>
    </div>
  </div>
</template>

<script setup>
import {ref,reactive} from 'vue'
import api from '../assets/js/api.js'
import global from '../assets/js/global.js'

const formData=ref({
  'google_app_id':null,
  'google_app_password':null,
  'google_app_base_url':null,
})

async function getInit() {
  formData.value=await api.getAppInfo()
}

async function clear() {
  formData.value={
    'google_app_id':null,
    'google_app_password':null,
    'google_app_base_url':null,
  }
}

async function sub() {
  await api.putAppInfo(formData.value)
  await getInit()
}

getInit()
</script>
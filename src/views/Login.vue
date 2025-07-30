<template>
  <div class="login">
    <div class="loginBox">
      <div class="loginBoxTitle">LOGIN</div>
      <el-form :model="formData" label-width="auto" style="max-width: 600px">
        <el-form-item label="Account">
          <el-input v-model="formData.account" @keyup.enter="login" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="formData.password" show-password @keyup.enter="login" />
        </el-form-item>
      </el-form>
      <div class="d-flex align-items-center justify-content-end">
        <el-button>Clear</el-button>
        <el-button type="primary" @click="login">Login</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import api from '../assets/js/api.js'

const formData=ref({
  account:null,
  password:null
})

async function login() {
  let res=await api.login(formData.value)
  if(res) {
    localStorage.token=res
    location.href='./articles'
  }

}
</script>
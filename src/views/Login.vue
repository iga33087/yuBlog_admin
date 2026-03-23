<template>
  <div class="login">
    <div class="loginBox" >
      <template v-if="hasAdmin">
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
          <el-button @click="clear">Clear</el-button>
          <el-button type="primary" @click="login">Login</el-button>
        </div>
      </template>
      <template v-else>
        <div class="loginBoxTitle">Create an administrator account</div>
        <el-form :model="formDataCreate" label-width="auto" style="max-width: 600px">
          <el-form-item label="Account">
            <el-input v-model="formDataCreate.account" @keyup.enter="createAdmin" />
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="formDataCreate.password" show-password @keyup.enter="createAdmin" />
          </el-form-item>
          <el-form-item label="Confirm Password">
            <el-input v-model="formDataCreate.repassword" show-password @keyup.enter="createAdmin" />
          </el-form-item>
        </el-form>
        <div class="d-flex align-items-center justify-content-end">
          <el-button @click="clearCreate">Clear</el-button>
          <el-button type="primary" @click="createAdmin">Create</el-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import api from '../assets/js/api.js'

const hasAdmin=ref(false)

const formData=ref({
  account:null,
  password:null
})

const formDataCreate=ref({
  account:null,
  password:null,
  repassword:null
})

async function login() {
  let res=await api.login(formData.value)
  if(res) {
    localStorage.token=res
    location.href='./articles'
  }

}

async function createAdmin() {
  await api.postMembersCreateFirstAdmin(formDataCreate.value)
  location.reload()
}

async function getInit() {
  hasAdmin.value=await api.getMembersNone()
}

function clear() {
  formData.value.account=null
  formData.value.password=null
}

function clearCreate() {
  formDataCreate.value.account=null
  formDataCreate.value.password=null
  formDataCreate.value.repassword=null
}

getInit()
</script>
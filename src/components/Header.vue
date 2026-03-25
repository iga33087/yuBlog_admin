<template>
  <div class="header">
    <div class="headerBox">
      <div class="headerBoxPath" v-if="store.path">{{store.path}}</div>
      <el-dropdown trigger="click">
        <div class="headerBoxUser" v-if="store.userData">{{store?.userData?.data?.name}}</div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '../store/index.js'
const store = useStore();

function logout() {
  localStorage.token=null
  location.href='./login'
}
</script>
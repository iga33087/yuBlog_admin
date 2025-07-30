<template>
  <div class="header">
    <div class="headerBox">
      <div class="headerBoxPath" v-if="store.path">{{store.path}}</div>
      <div class="headerBoxUser" v-if="store.userData">{{store?.userData?.data?.name}}</div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '../store/index.js'
const store = useStore();
</script>
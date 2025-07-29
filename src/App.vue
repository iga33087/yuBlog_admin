<template>
  <div class="app">
    <LeftMenu />
    <div class="content">
      <Header />
      <router-view class="contentBox" />
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import LeftMenu from './components/LeftMenu.vue'
</script>
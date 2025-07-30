<template>
  <div id="articles">
    <VueEditor v-model="content" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueEditor } from "vue3-editor";

const content=ref(null)
</script>
<template>
  <div class="uploadImg">
    <el-button class="mb-2" type="primary" @click="fileUpload.click()">Upload</el-button>
    <input type="file" ref="fileUpload" @change="upload" v-show="false">
    <div class="uploadImgBox" v-if="objectURL">
      <cropper ref="cropperBox" class="cropper mb-2" :src="objectURL" :stencil-props="{ aspectRatio: 3/2 }" @change="changeCrop"></cropper>
      <div class="d-flex align-items-center justify-content-end">
        <el-button @click="clear">Clear</el-button>
        <el-button type="primary" @click="emitImg">OK</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
const emit = defineEmits(['getImgUrl']);

const fileUpload=ref(null)
const cropperBox=ref(null)
const objectURL=ref(null)
const base64URL=ref(null)

function upload(e) {
  objectURL.value=URL.createObjectURL(e.target.files[0])
}

function changeCrop({ coordinates, canvas }) {
  base64URL.value=canvas.toDataURL()
}

function clear() {
  fileUpload.value.value=null
  objectURL.value=null
  base64URL.value=null
}

function emitImg() {
  emit('getImgUrl', base64URL.value);
  clear()
}


</script>
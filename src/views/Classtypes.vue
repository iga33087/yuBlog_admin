<template>
  <div class="classtypes">
    <el-dialog v-model="showDialog" :title="isAdd ? 'Add' : 'Edit'" width="500">
      <el-form :model="formData" label-width="auto">
        <el-form-item label="Title">
          <el-input v-model="formData.title" />
        </el-form-item>
      </el-form>
      <div class="d-flex align-items-center justify-content-end">
        <el-button @click="showDialog=false">Close</el-button>
        <el-button type="primary" @click="sub">Submit</el-button>
      </div>
    </el-dialog>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div></div>
      <div>
        <el-button>Clear</el-button>
        <el-button type="success" @click="add">Add</el-button>
      </div>
    </div>
    <el-table :data="tableData.data" style="width: 100%" v-if="tableData">
      <el-table-column prop="title" label="Title" />
      <el-table-column prop="date" label="Date">
        <template #default="scope">
          <div>{{global.timeFormat(scope.row.date,'YYYY/MM/DD HH:mm')}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="menu" label="Menu">
        <template #default="scope">
          <div class="d-flex align-items-center justify-content-end">
            <el-button type="warning" circle @click="edit(scope.row)">
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button type="danger" circle @click="del(scope.row)">
              <el-icon><Delete /></el-icon>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {ref,reactive} from 'vue'
import api from '../assets/js/api.js'
import global from '../assets/js/global.js'

const isAdd=ref(false)
const tableData=ref(null)
const showDialog=ref(false)
const formData=ref({
  title: null,
})

async function add() {
  clear()
  isAdd.value=true
  showDialog.value=true
}

async function edit(x) {
  formData.value=JSON.parse(JSON.stringify(x))
  isAdd.value=false
  showDialog.value=true
}

async function del(x) {
  await api.delClasstypes({_id:x['_id']})
  await getInit()
}

async function sub() {
  if(isAdd.value) await api.postClasstypes(formData.value)
  else await api.putClasstypes(formData.value)
  await getInit()
  showDialog.value=false
}

async function getInit() {
  tableData.value=await api.getClasstypes({})
}

function clear() {
  formData.value={
    title: null,
  }
}



getInit()
</script>
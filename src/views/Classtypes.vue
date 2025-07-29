<template>
  <div class="classtypes">
    <div class="d-flex align-items-center justify-content-between">
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

async function add() {
  isAdd.value=true
  let title=prompt('新增 - 請輸入Title')
  if(!title) return 0
  await sub({title})
}

async function edit(x) {
  isAdd.value=false
  let title=prompt('修改 - 請輸入Title',x.title)
  if(!title) return 0
  await sub({_id:x['_id'],title})
}

async function del(x) {
  await api.delClasstypes({_id:x['_id']})
  await getInit()
}

async function sub(data) {
  if(isAdd.value) await api.postClasstypes(data)
  else await api.putClasstypes(data)
  await getInit()
}

async function getInit() {
  tableData.value=await api.getClasstypes({})
}

getInit()
</script>
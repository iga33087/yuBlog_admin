<template>
  <div class="commentBox">
    <el-dialog v-model="showDialog" :title="isAdd ? 'Add' : 'Edit'" width="500">
      <el-form :model="formData" label-width="auto">
        <el-form-item label="content">
          <el-input v-model="formData.content" />
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
      <el-table-column prop="member_id" label="Member">
        <template #default="scope">
          <div>{{membersObj[scope.row.member_id]?.name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="content" />
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
import {ref,reactive,computed} from 'vue'
import api from '../assets/js/api.js'
import global from '../assets/js/global.js'

const props=defineProps(['articleID','membersObj'])
const isAdd=ref(false)
const tableData=ref(null)
const showDialog=ref(false)
const formData=ref({
  article_id:props.articleID,
  content:null
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
  if(!confirm(`Are you sure to delete?`)) return 0
  await api.delComments({_id:x['_id']})
  await getInit()
}

async function sub() {
  if(isAdd.value) await api.postComments(formData.value)
  else await api.putComments(formData.value)
  await getInit()
  showDialog.value=false
}

async function getInit() {
  tableData.value=await api.getComments({article_id:props.articleID,sort:"-date"})
}

function clear() {
  formData.value={
    article_id:props.articleID,
    content:null
  }
}

getInit()
</script>
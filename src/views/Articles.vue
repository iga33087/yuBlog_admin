<template>
  <div class="articles">

    <el-dialog v-model="showDialog" :title="isAdd ? 'Add' : 'Edit'" width="1000">
      <el-form :model="formData" label-width="auto">
        <el-form-item label="Classtype">
          <el-select v-model="formData.classtype_id" style="width: 240px">
            <el-option v-for="item in classtypesData.data" :key="item._id" :label="item.title" :value="item._id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Tag">
          <el-select v-model="formData.tag_id" style="width: 240px" multiple>
            <el-option v-for="item in tagsData.data" :key="item._id" :label="item.title" :value="item._id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Title">
          <el-input v-model="formData.title" />
        </el-form-item>
        <el-form-item label="Content">
          <VueEditor v-model="formData.content" />
        </el-form-item>
      </el-form>
      <div class="d-flex align-items-center justify-content-end">
        <el-button @click="showDialog=false">Close</el-button>
        <el-button type="primary" @click="sub">Submit</el-button>
      </div>
    </el-dialog>

    <el-dialog v-model="showCommentDialog" :title="'Comment List'" width="1000">
      <CommentBox :articleID="articleID" :membersObj="membersObj" v-if="showCommentDialog" />
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
      <el-table-column prop="member_id" label="Member">
        <template #default="scope">
          <div>{{membersObj[scope.row.member_id]?.name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="classtype_id" label="Classtype">
        <template #default="scope">
          <div>{{classtypesObj[scope.row.classtype_id]?.title}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Date">
        <template #default="scope">
          <div>{{global.timeFormat(scope.row.date,'YYYY/MM/DD HH:mm')}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="menu" label="Menu">
        <template #default="scope">
          <div class="d-flex align-items-center justify-content-end">
            <el-button type="primary" circle @click="showComment(scope.row)">
              <el-icon><ChatLineSquare /></el-icon>
            </el-button>
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
import { VueEditor } from "vue3-editor";
import CommentBox from "../components/CommentBox.vue";

const isAdd=ref(false)
const tableData=ref(null)
const classtypesData=ref(null)
const tagsData=ref(null)
const membersData=ref(null)
const showDialog=ref(false)
const showCommentDialog=ref(false)
const articleID=ref(null)
const formData=ref({
  classtype_id: null,
  title: null,
  content: null,
})

const membersObj=computed(()=> {
  let res={}
  if(!membersData.value) return res
  for(let item of membersData.value.data) {
    if(!res[item._id]) res[item._id]=item
  }
  return res
})

const classtypesObj=computed(()=> {
  let res={}
  if(!classtypesData.value) return res
  for(let item of classtypesData.value.data) {
    if(!res[item._id]) res[item._id]=item
  }
  return res
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
  if(!confirm(`Are you sure to delete ${x.title}?`)) return 0
  await api.delArticles({_id:x['_id']})
  await getInit()
}

async function sub() {
  if(isAdd.value) await api.postArticles(formData.value)
  else await api.putArticles(formData.value)
  await getInit()
  showDialog.value=false
}

async function getInit() {
  tableData.value=await api.getArticles({})
  classtypesData.value=await api.getClasstypes({})
  tagsData.value=await api.getTags({})
  membersData.value=await api.getMembers({})
}

async function showComment(x) {
  articleID.value=x._id
  showCommentDialog.value=true
}

function clear() {
  formData.value={
    classtype_id: null,
    tag_id: [],
    title: null,
    content: null,
  }
}

getInit()
</script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import {useStore} from '../../store/index.js'

const instance = axios.create();
instance.defaults.baseURL = "/api"

instance.interceptors.request.use((config)=> {
  config.headers.Authorization = localStorage.token;
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use((response)=> {
  if(response.data?.status<0) {
    throw response
  }
  return response;
}, function (error) {
  const store = useStore();
  console.log(error?.response?.data.message)
  if(error?.response?.data.message&&error.response.data.message==='Authentication failed!') localStorage.token=''
  ElMessage.error(error?.response?.data ? JSON.stringify(error.response.data) : error.message)
  store.$patch({loading:false})
  return Promise.reject(error);
});

export default {
  check() {
    return instance.get(`/`).then(res=>res.data)
  },
  login(x) {
    return instance.post(`/auth/login`,x).then(res=>res.data)
  },
  verify() {
    return instance.post(`/auth/verify`).then(res=>res.data)
  },
  getArticles(x) {
    return instance.get(`/articles`,{params:x}).then(res=>res.data)
  },
  postArticles(x) {
    return instance.post(`/articles`,x).then(res=>res.data)
  },
  putArticles(x) {
    return instance.put(`/articles`,x).then(res=>res.data)
  },
  delArticles(x) {
    return instance.delete(`/articles`,{params:x}).then(res=>res.data)
  },
  getClasstypes(x) {
    return instance.get(`/classtypes`,{params:x}).then(res=>res.data)
  },
  postClasstypes(x) {
    return instance.post(`/classtypes`,x).then(res=>res.data)
  },
  putClasstypes(x) {
    return instance.put(`/classtypes`,x).then(res=>res.data)
  },
  delClasstypes(x) {
    return instance.delete(`/classtypes`,{params:x}).then(res=>res.data)
  },
  getMembers(x) {
    return instance.get(`/members`,{params:x}).then(res=>res.data)
  },
  postMembers(x) {
    return instance.post(`/members`,x).then(res=>res.data)
  },
  putMembers(x) {
    return instance.put(`/members`,x).then(res=>res.data)
  },
  delMembers(x) {
    return instance.delete(`/members`,{params:x}).then(res=>res.data)
  },
  getComments(x) {
    return instance.get(`/comments`,{params:x}).then(res=>res.data)
  },
  postComments(x) {
    return instance.post(`/comments`,x).then(res=>res.data)
  },
  putComments(x) {
    return instance.put(`/comments`,x).then(res=>res.data)
  },
  delComments(x) {
    return instance.delete(`/comments`,{params:x}).then(res=>res.data)
  },
}
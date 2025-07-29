import { defineStore } from 'pinia'
import api from '../assets/js/api.js'
import dayjs from 'dayjs'

export const useStore = defineStore('store', {
  state: () => ({
    loading: false,
    path: null,
  }),
  getters: {
    /*cpuChart:(state) => {
      if(!state?.systemInfo?.data?.cpuUsage) return null
      let res= {
        total: 100,
        usePer: state.systemInfo.data.cpuUsage[state.systemInfo.data.cpuUsage.length-1],
      }
      res.useNum=(res.total * Number((res.usePer*0.01)).toFixed(2))
      return res
    },*/
  },
  actions: {
    /*async initData() {
      if(!this.cookieLogTotal) this.updateCookieLogTotal()
      if(!this.version) this.version=await api.getVersion()
      if(!this.rulesList) this.rulesList=await api.getIPSRules()
      if(!this.licenseData) this.licenseData=await api.systemLicenseInfo()
    }*/
  }
})
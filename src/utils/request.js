import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
  // 在开发环境中，获取到的是 /api ，会开一个反向代理
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  // config 一定要返回，不然会停在这里
  return config
},
error => {
  return Promise.reject(error)
})
// 相应拦截器
service.interceptors.response.use(
  // 相应成功
  response => {
    // 结构三个数据，因为 axios 默认在数据外层加了 data
    const { success, message, data } = response.data
    // 如何 success 为true，说明响应成功，则返回响应的 data 数据
    if (success) {
      return data
    } else { // success 为 fales，响应失败，则提示一个错误消息，并且promise.reject进入错误阶段
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 响应失败
  error => {
    Message.error(error.message)
    return Promise.reject(error)
  })
export default service

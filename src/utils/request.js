import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'
// create an axios instance
const service = axios.create({
  // 在开发环境中，获取到的是 /api ，会开一个反向代理
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
const TimeOut = 3600

// 请求拦截器
service.interceptors.request.use(config => {
  // 注入token
  if (store.getters.token) {
    // isCheckTimeOut为true，说明token超时
    if (isCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token已过期'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  // config 一定要返回，不然会停在这里
  return config
},
error => {
  return Promise.reject(error)
})
// 响应拦截器
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
    // 前端被动接收一个错误消息
    // error信息里面的response的对象code
    if (error.response && error.response.data && error.response.data.code === 10002) {
      // 此时说明token超时，要登出
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token已过期'))
    } else {
      Message.error(error.message)
      return Promise.reject(error)
    }
  })
// 判断token是否超时
function isCheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service

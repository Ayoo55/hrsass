import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
const state = {
  // 设置token初始状态
  token: getToken(),
  userInfo: {}
}
const mutations = {
  // 设置 token
  setToken(state, token) {
    // 改变vuex
    state.token = token
    // 改变本地缓存
    setToken(token)
  },
  // 删除缓存
  removeToken(state) {
    // 改变vuex
    state.token = null
    // 改变本地缓存
    removeToken()
  },
  // 设置用户信息
  setUserInfo(state, result) {
    state.userInfo = result
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 登录
  async login(context, data) {
    // 登录成功，登录token
    const result = await login(data)
    // 保存token
    context.commit('setToken', result)
    // 写入时间戳
    setTimeStamp()
  },
  // 获取用户信息
  async getUserInfo(context) {
    const result = await getUserInfo()
    const detail = await getUserDetailById(result.userId)
    context.commit('setUserInfo', { ...result, ...detail })
    return result
  },
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

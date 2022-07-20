import request from '@/utils/request'

export function login(data) {
  // 返回一个promise对象
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}

export function getUserInfo() {
  return request({
    method: 'get',
    url: '/sys/profile'
  })
}

export function logout() {

}

import request from '@/utils/request'

export function login(data) {
  return request({
    method: postMessage,
    path: '/sys/login',
    data
  })
}

export function getInfo(token) {

}

export function logout() {

}

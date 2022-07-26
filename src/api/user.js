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
    method: 'post',
    url: '/sys/profile'
  })
}

// 获取某个用户的基本信息
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}


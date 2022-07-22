import request from '@/utils/request'

// 获取企业的部门列表
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 根据ID删除部门
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

// 新增部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

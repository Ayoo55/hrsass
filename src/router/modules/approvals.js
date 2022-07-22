import Layout from '@/layout'
export default {
  path: '/approvals', // 路由地址
  name: 'approvals',
  component: Layout,
  children: [{
    path: '', // 二级路由的默认路由
    component: () => import('@/views/approvals'),
    meta: {
      title: '审批'
    }
  }]
}

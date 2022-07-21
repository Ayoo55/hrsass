import Layout from '@/layout'
export default {
  path: '/departments', // 路由地址
  name: 'departments',
  component: Layout,
  children: [{
    paht: '', // 二级路由的默认路由
    component: () => import('@/views/departments'),
    meta: {
      title: '组织架构'
    }
  }]
}

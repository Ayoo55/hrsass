import Layout from '@/layout'
export default {
  path: '/departments', // 路由地址
  name: 'departments',
  component: Layout,
  children: [{
    path: '', // 二级路由的默认路由
    name: 'departments',
    component: () => import('@/views/departments'),
    meta: {
      title: '组织架构',
      icon: 'tree'
    }
  }]
}

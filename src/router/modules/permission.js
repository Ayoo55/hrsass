import Layout from '@/layout'
export default {
  path: '/permission', // 路由地址
  name: 'permissions',
  component: Layout,
  children: [{
    path: '', // 二级路由的默认路由
    name: 'permissions',
    component: () => import('@/views/permission'),
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }]
}

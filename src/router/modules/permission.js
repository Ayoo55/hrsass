import Layout from '@/layout'
export default {
  path: '/permission', // 路由地址
  name: 'permission',
  component: Layout,
  children: [{
    paht: '', // 二级路由的默认路由
    component: () => import('@/views/permission'),
    meta: {
      title: '权限管理'
    }
  }]
}

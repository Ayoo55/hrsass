import Layout from '@/layout'
export default {
  path: '/social', // 路由地址
  name: 'social',
  component: Layout,
  children: [{
    path: '', // 二级路由的默认路由
    component: () => import('@/views/social'),
    meta: {
      title: '社保'
    }
  }]
}

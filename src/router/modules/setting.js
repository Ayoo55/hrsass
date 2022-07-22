import Layout from '@/layout'
export default {
  path: '/setting', // 路由地址
  name: 'setting',
  component: Layout,
  children: [{
    path: '', // 二级路由的默认路由
    component: () => import('@/views/setting'),
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]
}

import Layout from '@/layout'
export default {
  path: '/attendances', // 路由地址
  name: 'attendances',
  component: Layout,
  children: [{
    paht: '', // 二级路由的默认路由
    component: () => import('@/views/attendances'),
    meta: {
      title: '考勤'
    }
  }]
}

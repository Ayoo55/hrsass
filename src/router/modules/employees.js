// 导出员工的路由规则
import Layout from '@/layout'
export default {
  path: '/employess', // 路由地址
  name: 'employess',
  component: Layout,
  children: [{
    paht: '', // 二级路由的默认路由
    component: () => import('@/views/employess'),
    meta: {
      title: '员工管理'
    }
  }]
}

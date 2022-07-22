// 导出员工的路由规则
import Layout from '@/layout'
export default {
  path: '/employees', // 路由地址
  name: 'employees',
  component: Layout,
  children: [{
    path: '', // 二级路由的默认路由
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理'
    }
  }]
}

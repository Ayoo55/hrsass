// 导出员工的路由规则
import Layout from '@/layout'
export default {
  path: '/employees', // 路由地址
  name: 'employees',
  component: Layout,
  children: [{
    path: '', // 二级路由的默认路由
    name: 'employees',
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  }, {
    path: 'detail/:id?',
    hidden: true,
    component: () => import('@/views/employees/detail.vue'),
    meta: {
      title: '员工详情'
    }
  }, {
    path: 'print/:id?',
    hidden: true,
    component: () => import('@/views/employees/print.vue'),
    meta: {
      title: '打印'
    }
  }]
}

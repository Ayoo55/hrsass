import Layout from '@/layout'
export default {
  path: '/salarys', // 路由地址
  name: 'salarys',
  component: Layout,
  children: [{
    paht: '', // 二级路由的默认路由
    component: () => import('@/views/salarys'),
    meta: {
      title: '工资'
    }
  }]
}

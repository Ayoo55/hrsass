// 权限拦截在路由跳转中做
// 导航守卫（路由守卫）可以拦截到路由跳转
import store from '@/store'
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']

router.beforeEach(function(to, from, next) {
  NProgress.start()
  if (store.getters.token) {
    // 在有token的情况下，如果去登录页面，会跳转到主页
    if (to.path === '/login') {
      next('/')
    } else {
      next() // 直接放行
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done()
})
router.afterEach(function() {
  NProgress.done()
})

// 权限拦截在路由跳转中做
// 导航守卫（路由守卫）可以拦截到路由跳转
import store from '@/store'
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']

router.beforeEach(async function(to, from, next) {
  NProgress.start()
  if (store.getters.token) {
    // 在有token的情况下，如果去登录页面，会跳转到主页
    if (to.path === '/login') {
      next('/')
    } else {
      // 如果已有用户ID，则不需要再次获取用户信息
      if (!store.state.user.userInfo.userId) {
        // 如果没有用户ID，则调用store下的子模块的 actions，用 dispatch
        const { roles } = await store.dispatch('user/getUserInfo')
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        router.addRoutes(routes)
        next(to.path)
      } else {
        next() // 直接放行
      }
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

import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// import *  as  变量  得到的是一个对象{ 变量1：对象1，变量2： 对象2 ...   }, 所以可以采用对象遍历的方法进行处理
import * as directives from '@/directives'
import * as filters from '@/filters' // 引入工具类
import Component from '@/components'
import CheckPermission from '@/mixin/checkPermission'

import i18n from '@/lang'

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
// 注册全局的过滤器
Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})

// set ElementUI lang to EN
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key)
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(Component)

Vue.mixin(CheckPermission)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

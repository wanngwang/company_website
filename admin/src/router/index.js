import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import RoutesConfig from './config'
import store from '../store/index'



const routes = [

  {
    path: "/",
    redirect: "/login"
  }
  ,
  {

    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: MainBox,

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
RoutesConfig.forEach(item => {
  router.addRoute("mainbox", item)
})
// 每次路由跳转之前
// 路由导航守卫 
router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next()
  } else {
    if (!localStorage.getItem("token")) {
      next({
        path: "/login",

      })
    } else {
      if (!store.state.isGetterRouter) {
        // 删除所有的嵌套路由
        router.removeRoute("mainbox")
        ConfigRouter()
        next(
          {
            path: to.fullPath
          }
        )
      } else {
        next()
      }
    }
  }
})

const ConfigRouter = () => {
  if (!router.hasRoute("mainbox")) {
    router.addRoute({
      path: "/mainbox",
      name: "mainbox",
      component: MainBox,

    })
  }
  RoutesConfig.forEach(item => {
    checkPermission(item) && router.addRoute("mainbox", item)
  })

  // 改变isGetterRouter =true
  store.commit("changeGetterRouter", true)
}

const checkPermission = (item) => {
  if (item.requireAdmin) {

    return store.state.userInfo.role == 1
  }
  return true
}
export default router

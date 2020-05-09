import Vue from 'vue'
import VueRouter from 'vue-router'

// 在 VueCLI 创建的项目中 @ 表示 src 目录
// 它是 src 目录的路径别名
// 好处：它不受当前文件路径影响
// 注意：@ 就是 src 路径，后面别忘了写那个斜杠
// 使用建议：如果加载的资源路径就在当前目录下，那就正常写
//       如果需要进行父级路径查找的都使用 @
const Login = () => import('@/views/login/')
const home = () => import('@/views/home/')
const layout = () => import('@/views/layout')
const active = () => import('@/views/active/')
const publish = () => import('@/views/publish/')
const image = () => import('@/views/image')
const comment = () => import('@/views/comment')
const setting = () => import('@/views/settings')
const fans = () => import('@/views/fans')
Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'home',
    component: layout,
    children: [
      {
        path: '',
        name: 'home',
        component: home
      },
      {
        path: '/active',
        name: 'active',
        component: active
      },
      {
        path: '/publish',
        name: 'publish',
        component: publish
      },
      {
        path: '/image',
        name: 'image',
        component: image
      },
      {
        path: '/commit',
        name: 'comment',
        component: comment
      },
      {
        path: '/setting',
        name: 'setting',
        component: setting
      },
      {
        path: '/fans',
        name: 'fans',
        component: fans
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
const user = JSON.parse(window.localStorage.getItem('user'))
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router

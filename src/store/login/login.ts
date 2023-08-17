import { defineStore } from 'pinia'
import { accountLoginRequest, getMenuInfoById, getUserInfoById } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN, USER_INFO, USER_MENU } from '@/global/constants'
import router from '@/router'
import { mapMenuToRoutes } from '@/utils/map-menu'

interface ILoginState {
  token: string,
  userInfo: any,
  userMenu: any
}

const useLoginStore = defineStore('login', {
  state: ():ILoginState => ({
    token: '',
    userInfo: {},
    userMenu: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1. 账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token

      // 2. 本地缓存token 之后在请求的拦截器中带上
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3. 获取用户登录详细信息
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data

      // 4. 查询及存储菜单信息
      const userMenuResult = await getMenuInfoById(id)
      this.userMenu = userMenuResult.data
        // 4.1 存储
      localCache.setCache(USER_MENU, this.userMenu)
      localCache.setCache(USER_INFO, this.userInfo)


      // 动态匹配路由
      const dynamicRoutes = mapMenuToRoutes(this.userMenu)
      // 此种方式需要有 name: main 不然不会成为子路由
      dynamicRoutes.map(item => router.addRoute("main", item))


      // 5. 跳转到首页
      router.push("/main")
    },
    async loadLocalData() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const userMenu = localCache.getCache(USER_MENU)
      if (token && userInfo && userMenu) {
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenu
        // refresh后再次注册路由
        const dynamicRoutes = mapMenuToRoutes(userMenu)
        dynamicRoutes.forEach(route => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore

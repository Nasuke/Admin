import { defineStore } from 'pinia'
import { accountLoginRequest, getMenuInfoById, getUserInfoById } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN, USER_INFO, USER_MENU } from '@/global/constants'
import router from '@/router'

interface ILoginState {
  token: string,
  userInfo: any,
  userMenu: any
}

const useLoginStore = defineStore('login', {
  state: ():ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache(USER_INFO) ?? {},
    userMenu: localCache.getCache(USER_MENU) ?? []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1. 账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      // this.name = loginResult.data.name
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



      // 5. 跳转到首页
      router.push("/main")
    }
  }
})

export default useLoginStore

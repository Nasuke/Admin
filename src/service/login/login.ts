import { localCache } from '@/utils/cache'
import hyRequest from '..'
import type { IAccount } from '@/types'
import { LOGIN_TOKEN } from '@/global/constants'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`,
  })
}

export function getMenuInfoById(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}

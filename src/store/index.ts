import { createPinia } from 'pinia'
import useLoginStore from './login/login'
import type { App } from 'vue'

const pinia = createPinia()


export default function registerStore(app:App<Element>) {
  app.use(pinia)
  const loginStore = useLoginStore()
  loginStore.loadLocalData()
}


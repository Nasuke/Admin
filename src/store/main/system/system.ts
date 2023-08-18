import { defineStore } from "pinia";
import type { ISystemState } from "./type";
import { getUserList } from "@/service/main/system";


const useSystemStore = defineStore("system", {
  state: ():ISystemState => ({
    userLists: [],
    userTotalCount: 0
  }),
  actions: {
    async getUserListAction() {
      const userLists = await getUserList()
      const { list, totalCount } = userLists.data
      this.userLists = list
      this.userTotalCount = totalCount
    }
  }
})

export default useSystemStore

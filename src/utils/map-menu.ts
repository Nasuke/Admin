import type { RouteRecordRaw } from 'vue-router';




function loadLocalRouteObj() {
  const localRoutes: RouteRecordRaw[] = []
  /**
   *  /** => 嵌套文件也会匹配
   *  eager:true  默认是懒加载 加了之后就是同步的
   */
  const files: Record<string, any> = import.meta.glob("../router/main/**/*.ts", {
    eager: true
  })
  for (const file in files) {
    const module = files[file]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstShow:any = null


/**
*  跳转前 我们需要完成路由的注册
*  有以下步骤:
*  1. 拿到菜单(上面已经拿到)
*  2. 动态获取所有路由对象 并放入数组中 需要用到import.meta.glob
*  3. 将两者进行匹配
*/
export function mapMenuToRoutes(userMenu:any[]) {
  const localRoutes = loadLocalRouteObj()
  const routes:RouteRecordRaw[] = []
  // 完成匹配
  for (const menu of userMenu) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find(item => item.path === subMenu.url)
      // 类型缩小
      if (route) {
        // 顶层菜单添加重定向(每个菜单只有一次)
        if (!routes.find(item => item.path === menu.url)) {
          routes.push({path: menu.url, redirect: route.path})
        }
        // 二级菜单对应路由
        routes.push(route)
      }
      // 找到并导出第一个子路由
      if (route && !firstShow) {
        firstShow = subMenu
      }
    }
  }
  return routes
}


/**
 * 根据路径去匹配当前菜单
 * @param {string} path 当前路径
 * @param {any[]} userMenu 所有菜单
 */
export function mapPathToMenu(path: string, userMenu: any[]) {
  for (const item of userMenu) {
    for (const subItem of item.children) {
      if (subItem.url === path) {
        return subItem
      }
    }
  }
}


interface ICrumb {
  name: string,
  path?: string
}
/**
 * 根据路径展示面包屑
 * @param {string} path 当前路径
 * @param {any[]} userMenu 所有菜单
 */
export function mapPathToCrumb(path:string, userMenu: any[]) {
  const crumbInfos: ICrumb[] = []
  for (const item of userMenu) {
    for (const subItem of item.children) {
      if (subItem.url === path) {
        crumbInfos.push({name: item.name, path: item.url})
        crumbInfos.push({name: subItem.name, path: subItem.url})
      }
    }
  }
  return crumbInfos
}

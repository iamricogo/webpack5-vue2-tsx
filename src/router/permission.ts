/**
 * 路由守卫，如果有什么权限配置拦截路由的，或者异步路由配置
 * 可在此集中处理。
 * 此处只是把配置的菜单路由存入vuex变量中
 */
import 'nprogress/nprogress.css'
import { AppModule } from '@/store/modules/app'
import NProgress from 'nprogress'
import VueRouter from 'vue-router'
import i18n from '@/lang'
import settings from '@/settings'
NProgress.configure({ showSpinner: false })
const getPageTitle = (key: string): string => {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`)
    return `${pageName} - ${settings.title}`
  }
  return `${settings.title}`
}

export const guards = (router: VueRouter): void => {
  router.beforeEach((to, from, next) => {
    NProgress.start()

    AppModule.SET_ROUTES([])

    next()
  })

  router.afterEach((to) => {
    NProgress.done()

    to?.meta?.title && (document.title = getPageTitle(to.meta.title))
  })
}

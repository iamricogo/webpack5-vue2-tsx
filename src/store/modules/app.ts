import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule
} from 'vuex-module-decorators'
import { Language, defaultLanguage, setI18nLanguage } from '@/lang'
import { RouteConfig } from 'vue-router'
import { constantRoutes } from '@/router'
import store, { getVuexStorage } from '@/store'
export enum DeviceType {
  Mobile = 'mobile',
  Desktop = 'desktop'
}

export interface IAppState {
  device: DeviceType
  navbar: {
    opened: boolean
    withoutAnimation: boolean
  }
  language: Language
  size: string
  routes: RouteConfig[]
}

const vuexStorage = getVuexStorage()['app']
@Module({
  dynamic: true,
  store,
  name: 'app'
})
class App extends VuexModule implements IAppState {
  public scrollOverTop = false //滚动是否超过了导航栏高度
  public device: DeviceType = DeviceType.Desktop
  public routes: IAppState['routes'] = []
  public language: IAppState['language'] = defaultLanguage
  public size: IAppState['size'] = vuexStorage?.size || 'medium'
  public navbar: IAppState['navbar'] = vuexStorage?.navbar || {
    opened: false,
    withoutAnimation: false
  }

  @Mutation
  public TOGGLE_SCROLLOVERTOP(isOverTop: boolean) {
    this.scrollOverTop = isOverTop
  }

  @Mutation
  private TOGGLE_NAVBAR(withoutAnimation: boolean) {
    this.navbar.opened = !this.navbar.opened
    this.navbar.withoutAnimation = withoutAnimation
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device
  }

  @Mutation
  private SET_LANGUAGE(language: Language) {
    this.language = language
    setI18nLanguage(language)
  }

  @Mutation
  private SET_SIZE(size: string) {
    this.size = size
  }

  @Action
  public ToggleNavBar(withoutAnimation: boolean) {
    this.TOGGLE_NAVBAR(withoutAnimation)
  }

  @Action
  public ToggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device)
  }

  @Action
  public SetLanguage(language: Language) {
    this.SET_LANGUAGE(language)
  }

  @Action
  public SetSize(size: string) {
    this.SET_SIZE(size)
  }

  @Mutation
  public SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes)
  }
}

export const AppModule = getModule(App)

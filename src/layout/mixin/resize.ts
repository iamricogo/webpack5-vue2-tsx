import { AppModule, DeviceType, IAppState } from '@/store/modules/app'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Debounce } from '@/utils/Decorator'
import style from '../style.module.scss'
const WIDTH = parseInt(style.responsiveWidth) // refer to Bootstrap's responsive design
const TOP = parseInt(style.menuHeight) * 1
@Component({
  name: 'ResizeMixin'
})
export default class extends Vue {
  get navbar(): IAppState['navbar'] {
    return AppModule.navbar
  }

  get device(): IAppState['device'] {
    return AppModule.device
  }

  @Watch('$route')
  protected onRouteChange(): void {
    if (this.device === DeviceType.Mobile && this.navbar.opened) {
      AppModule.ToggleNavBar(true)
    }
  }

  beforeMount(): void {
    window.addEventListener('resize', this.resizeHandler)
    window.addEventListener('scroll', this.scrollHandler)
  }

  mounted(): void {
    this.resizeHandler()
  }

  beforeDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler)
    window.removeEventListener('scroll', this.scrollHandler)
  }

  private isMobile(): boolean {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  @Debounce(300, { leading: true })
  private resizeHandler(): void {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      const device = isMobile ? DeviceType.Mobile : DeviceType.Desktop
      AppModule.ToggleDevice(device)
      document.querySelector('html')?.setAttribute('data-device', device)
      if (isMobile && AppModule.navbar.opened) {
        AppModule.ToggleNavBar(true)
      }
    }
  }

  // @Debounce(300, { leading: true, trailing: true })
  private scrollHandler(): void {
    if (!document.hidden) {
      if (window.pageYOffset > TOP && !AppModule.scrollOverTop) {
        AppModule.TOGGLE_SCROLLOVERTOP(true)
      } else if (window.pageYOffset <= TOP && AppModule.scrollOverTop) {
        AppModule.TOGGLE_SCROLLOVERTOP(false)
      }
    }
  }
}

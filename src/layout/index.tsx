import { AppFooter, AppHeader, AppMain, NavBar } from './components'
import { AppModule, DeviceType } from '@/store/modules/app'
import { Component, Mixins } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import ResizeMixin from './mixin/resize'
import style from './style.module.scss'
@Component({
  name: 'Layout',
  components: {
    AppMain,
    AppHeader,
    AppFooter,
    NavBar
  }
})
export default class extends Mixins(ResizeMixin) {
  private handleClickOutside() {
    if (!AppModule.navbar.opened) return
    AppModule.ToggleNavBar(false)
  }

  render(): VNode {
    return (
      <div
        class={[
          style['app-wrapper'],
          {
            mobile: this.device === DeviceType.Mobile,
            withoutAnimation: this.navbar.withoutAnimation
          }
        ]}
      >
        {/* 移动端导航栏 */}
        <transition name="fade-inner-height">
          {this.device === DeviceType.Mobile && this.navbar.opened && (
            <div class={[style['drawer-bg']]} onClick={this.handleClickOutside}>
              <div
                onClick={(e: Event) => e.stopPropagation()}
                class={[style['mobile-menu-container']]}
              >
                <div class={[style['scroll-container']]}>
                  <div class={[style['scroll-scroller']]}>
                    <nav-bar />
                  </div>
                </div>
              </div>
            </div>
          )}
        </transition>
        <div class={[style['main-container']]} page={this.$route.path}>
          <app-header />
          <app-main />
          <app-footer />
        </div>
      </div>
    )
  }
}

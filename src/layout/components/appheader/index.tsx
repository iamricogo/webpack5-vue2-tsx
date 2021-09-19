import { AppModule, DeviceType } from '@/store/modules/app'
import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import Animation from '@/utils/Animation'
import AppContainer from '../appcontainer'
import LangSelect from '@/components/langselect'
import NavBar from '../navbar'
import settings from '@/settings'
import style from './style.module.scss'

const animation: Record<'toTop', Animation | null> = {
  toTop: null
}

@Component({
  name: 'AppHeader',
  components: {
    LangSelect,
    NavBar,
    AppContainer
  }
})
export default class extends Vue {
  private onLogoClick(): void {
    if (this.$route.path == '/home/index') {
      const from = document.documentElement.scrollTop || document.body.scrollTop
      if (animation.toTop && animation.toTop.isAnimating) return
      animation.toTop = new Animation({ top: from })
        .to({ top: 0 }, 500)
        .on('update', (target) => {
          window.scrollTo(0, target.top)
        })
      return
    }
    this.$router.push('/home')
  }

  render(): VNode {
    return (
      <header
        class={[
          style['app-header'],
          {
            'fixed-header': settings.fixedHeader,
            'scroll-over-top': AppModule.scrollOverTop
          }
        ]}
      >
        <app-container>
          <div class={[style['app-header-container']]}>
            <span class={[style.logo]} onClick={this.onLogoClick}></span>
            {AppModule.device === DeviceType.Desktop && <nav-bar />}
            <div class={[style['header-right']]}>
              <lang-select />
              {AppModule.device === DeviceType.Mobile && (
                <i
                  class={['el-icon-s-operation', style['menu-switch']]}
                  onClick={() => {
                    AppModule.ToggleNavBar(false)
                  }}
                ></i>
              )}
            </div>
          </div>
        </app-container>
      </header>
    )
  }
}

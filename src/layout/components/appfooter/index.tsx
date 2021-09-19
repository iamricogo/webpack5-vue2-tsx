import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import AppContainer from '../appcontainer'
import settings from '@/settings'
import style from './style.module.scss'
@Component({
  name: 'AppFooter',
  components: { AppContainer }
})
export default class extends Vue {
  render(): VNode {
    return (
      <footer class={[style['app-footer']]}>
        <app-container>
          <section class={[style['app-footer-container']]}>
            <div class={[style['foot-left']]}>
              <span class={[style['logo']]}></span>
              <div class={[style['text']]}>
                <p>
                  {`${this.$t(`common.address`)}`}: {settings.address}
                </p>

                <p>Whatsapp: {settings.whatsapp}</p>
              </div>
            </div>
            <div class={[style['foot-right']]}>
              {/* <img src={resources.common.maps} alt="" /> */}
            </div>
          </section>
        </app-container>
      </footer>
    )
  }
}

import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import resources from '@/resources'
import style from './style.module.scss'
@Component({
  name: 'Download'
})
export default class extends Vue {
  render(): VNode {
    return (
      <div class={style['download-box']}>
        <div class={[style['main-box']]}>
          <div class={[style['mobile-preview']]}>
            <div class={[style['img-box']]}>
              <img src={resources.download.preview} alt="" />
            </div>
          </div>

          <div class={[style['advertise']]}>
            <div class={[style['text-box']]}>
              <p>{this.$t(`download.join`)}</p>
            </div>
            <div class={[style['down-box']]}>
              <div class={[style['app-box']]}>
                <div class={[style['img-box']]}>
                  <img src={resources.download.huawei} alt="" />
                </div>
                <div class={[style['img-box']]}>
                  <img src={resources.download.google} alt="" />
                </div>
                <div class={[style['img-box']]}>
                  <img src={resources.download.apple} alt="" />
                </div>
              </div>
              <div class={[style['qr-box']]}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

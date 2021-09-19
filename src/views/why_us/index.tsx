import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import resources from '@/resources'
import style from './style.module.scss'
@Component({
  name: 'WhyUs'
})
export default class extends Vue {
  render(): VNode {
    return (
      <div class={style['whyus-box']}>
        <section class={[style['text-box']]}>
          <div>
            <h4>{this.$t(`navbar.why_us`)}?</h4>
            <p>{this.$t(`why_us.text1`)}</p>
          </div>
          <section>
            {['merchants', 'customers', 'riders'].map((key) => (
              <div>
                <span class={[style['icon-box']]}>
                  <i data-type={key}></i>
                </span>
                <div>
                  <h4>{this.$t(`why_us.groups.${key}.title`)}</h4>
                  <p>{this.$t(`why_us.groups.${key}.content`)}</p>
                </div>
              </div>
            ))}
          </section>
        </section>
        <section class={[style['img-box']]}>
          <img src={resources.why_us.bg} alt="" />
        </section>
      </div>
    )
  }
}

import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import AppContainer from '../appcontainer'
import style from './style.module.scss'
@Component({
  name: 'AppMain',
  components: {
    AppContainer
  }
})
export default class extends Vue {
  get key(): string {
    return this.$route.path
  }
  render(): VNode {
    return (
      <main class={[style['app-main']]}>
        <app-container>
          <section class={[style['app-main-container']]}>
            <transition name="fade-transform" mode="out-in">
              <router-view key={this.key} />
            </transition>
          </section>
        </app-container>
      </main>
    )
  }
}

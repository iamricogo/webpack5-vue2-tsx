import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
@Component({
  name: 'App'
})
export default class extends Vue {
  render(): VNode {
    return (
      <div id="app">
        <router-view />
      </div>
    )
  }
}

import { AppModule } from '@/store/modules/app'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Language } from '@/lang'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'

@Component({
  name: 'LangSelect'
})
export default class extends Vue {
  @Prop({
    default: () => ({
      en: 'English',
      'zh-CN': '中文'
    })
  })
  readonly lanConfig!: Record<Language, string>

  get language(): Language {
    return AppModule.language
  }

  private handleSetLanguage(lang: Language): void {
    AppModule.SetLanguage(lang)
  }
  render(): VNode {
    return (
      <el-dropdown
        trigger="click"
        class={[style.international]}
        onCommand={this.handleSetLanguage}
      >
        <div>
          {this.lanConfig[this.language]}{' '}
          <span class="el-icon-arrow-down el-icon--right"></span>
        </div>
        <el-dropdown-menu slot="dropdown">
          {Object.entries(this.lanConfig).map(([command, label]) => (
            <el-dropdown-item
              disabled={this.language === command}
              command={command}
            >
              {label}
            </el-dropdown-item>
          ))}
        </el-dropdown-menu>
      </el-dropdown>
    )
  }
}

import { AppModule, DeviceType, IAppState } from '@/store/modules/app'
import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import style from './style.module.scss'

@Component({
  name: 'NavBar'
})
export default class extends Vue {
  get routes(): IAppState['routes'] {
    return AppModule.routes
  }

  render(): VNode {
    const reduceStart: VNode[] = []

    return AppModule.device === DeviceType.Desktop ? (
      <el-menu
        class={[style.menu]}
        default-active={this.$route.path}
        mode="horizontal"
        background-color="transparent"
        text-color={style.menuText}
        active-text-color={style.menuActiveText}
        unique-opened={true}
        router={true}
      >
        {this.routes.map(({ children, meta, path: basePath }) => {
          const hasChildren = children && children?.length > 1
          const firstChild = children?.[0]
          const title = meta?.title
            ? this.$t(`navbar.${meta?.title}`)
            : firstChild
            ? this.$t(`navbar.${firstChild?.meta?.title}`)
            : ''
          return hasChildren ? (
            <el-submenu index={basePath} popper-class={style['sub-menu-box']}>
              <template slot="title">{title}</template>
              {children?.map(({ meta, path }) => {
                const title = meta?.title
                  ? this.$t(`navbar.${meta?.title}`)
                  : ''
                return (
                  <el-menu-item index={`${basePath}/${path}`}>
                    {title}
                  </el-menu-item>
                )
              })}
            </el-submenu>
          ) : (
            <el-menu-item index={`${basePath}/${firstChild?.path}`}>
              {title}
            </el-menu-item>
          )
        })}
      </el-menu>
    ) : (
      <section class={[style['menu-mobile']]}>
        {this.routes.reduce((pre, { children, path: basePath }) => {
          const list = (children || []).map(({ meta, path }) => {
            const title = meta?.title ? this.$t(`navbar.${meta?.title}`) : ''
            const key = `${basePath}/${path}`

            return (
              <div
                key={key}
                class={{
                  [style.active]: this.$route.path === key
                }}
                onClick={() => {
                  if (this.$route.path === key)
                    return AppModule.ToggleNavBar(false)
                  this.$router.push(key)
                }}
              >
                <span>{title}</span>
              </div>
            )
          })
          pre.push(...list)
          return pre
        }, reduceStart)}
      </section>
    )
  }
}

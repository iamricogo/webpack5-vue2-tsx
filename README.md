## 项目介绍

本外卖官网项目用到的技术栈 tsnode + webpack5 + vue2 生态 + typescriptX + sass

项目搭建未用 vue-cli 等主流脚手架，用 webpack 原生手撸。css 预编译 sass 语法采用 dart sass,非 node sass, dart sass 已直接更名为 sass

## commit 规范

[husky](https://typicode.github.io/husky/#/) 是 git 一些行为的钩子依赖，高版本 首次需要显式 执行 npx husky install 以 开启 git 钩子

```json
  "scripts": {
    "prepare": "husky install",
  },
```

上述配置会在 npm i 或 yarn 执行时 自动执行 husky install

注意：Yarn 2 不支持 scripts 的 prepare 生命周期,需手动执行一次 .

```bash
npx husky install
```

开启 git hooks 后

会对提交时的消息体进行拦截，如果不符合规范会拦截该次提交行为，同时还会执行代码相关的 lint，能自动修复的就自动修复，不能修复的也会阻止提交并做出相应错误的提示

```
${action}: xxxx
xxxxxxxxxxx
```

例如

```
feat: 添加xxx页面
```

所有可用的 action 在 commitlint.config.js 中做配置

```js
;[
  'init' /**初次提交 */,

  'ci' /**CI持续集成修改 */,
  'test' /**增加测试 */,
  'build' /**更新打包文件 */,
  'release' /**发布/版本标签 */,

  'docs' /**撰写文档 */,
  'chore' /**其他修改, 比如改变构建流程、或者增加依赖库、工具等 */,
  'feat' /**引入新特性 */,
  'fix' /**修复 bug */,
  'perf' /**提升性能 */,
  'revert' /**代码回滚 */,
  'refactor' /**重构 */,
  'style' /**改进代码的结构格式/样式 */,
  'delete' /**删除代码或文件 */
]
```

## 项目脚本

本项目中维护的 yarn.lock 非 npm 的 package-lock.json 文件
而 lock 文件对依赖的小版本固定起到关键作用，建议团队统一包管理工具，运维部署时也使用对应的包管理器
本项目默认 yarn 做包管理工具

### 依赖安装

```bash
npm i
```

### development 模式

```bash
npm run dev:dev #代理 dev 环境 api
npm run dev:test #代理 test 环境 api
npm run dev:pre #代理预发布环境 api

yarn dev:dev
yarn dev:test
yarn dev:pre
```

### production 模式

```bash
npm run build #传统构建，代码 es5 化，能兼容到 IE11，目前 jenkins 中用的是此种构建，更稳一点

npm run build:modern #现代化构建，es6 及更高版本 modules 规范，支持现代化高级浏览器，class 等语法均不会换成基于原型链的构造函数

npx cross-env report=true npm run build #传统构建，构建完成后启动依赖分析报告

npx cross-env report=true npm run build:modern #现代化构建，构建完成后启动依赖分析报告
```

## 技术点

- 熟悉 webpack 系列生态。

  [webpack 配置如何用 typescript 写？（即如何用 typescript 写 nodejs）](https://webpack.js.org/guides/typescript/)

  [webpack 项目中精灵图方案 webpack-spritesmith ](https://www.npmjs.com/package/webpack-spritesmith)

- 熟悉 typescript 语法。

- 对 typescript 下的 vue 生态熟悉，为最大限度发挥 ts 的效果，传统 vue 项目中的 componens（组件）部分& store（vuex 状态管理）部分均借助第三方依赖换成了 Class 配合修饰器的写法

  class Component demo (依赖 [vue-property-decorator](https://www.npmjs.com/package/vue-property-decorator)，vue-property-decorator 中的 Component 来自 [vue-class-component](https://github.com/vuejs/vue-class-component) )

  ```tsx
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
  ```

  class Vuex demo (依赖 [vuex-module-decorators](https://www.npmjs.com/package/vuex-module-decorators))

  ```tsx
  import {
    Action,
    Module,
    Mutation,
    VuexModule,
    getModule
  } from 'vuex-module-decorators'
  import { Language, defaultLanguage, setI18nLanguage } from '@/lang'
  import { RouteConfig } from 'vue-router'
  import { constantRoutes } from '@/router'
  import store, { getVuexStorage } from '@/store'
  export enum DeviceType {
    Mobile = 'mobile',
    Desktop = 'desktop'
  }

  export interface IAppState {
    device: DeviceType
    navbar: {
      opened: boolean
      withoutAnimation: boolean
    }
    language: Language
    size: string
    routes: RouteConfig[]
  }

  const vuexStorage = getVuexStorage()['app']
  @Module({
    dynamic: true,
    store,
    name: 'app'
  })
  class App extends VuexModule implements IAppState {
    public scrollOverTop = false //滚动是否超过了导航栏高度
    public device: DeviceType = DeviceType.Desktop
    public routes: IAppState['routes'] = []
    public language: IAppState['language'] = defaultLanguage
    public size: IAppState['size'] = vuexStorage?.size || 'medium'
    public navbar: IAppState['navbar'] = vuexStorage?.navbar || {
      opened: false,
      withoutAnimation: false
    }

    @Mutation
    public TOGGLE_SCROLLOVERTOP(isOverTop: boolean) {
      this.scrollOverTop = isOverTop
    }

    @Mutation
    private TOGGLE_NAVBAR(withoutAnimation: boolean) {
      this.navbar.opened = !this.navbar.opened
      this.navbar.withoutAnimation = withoutAnimation
    }

    @Mutation
    private TOGGLE_DEVICE(device: DeviceType) {
      this.device = device
    }

    @Mutation
    private SET_LANGUAGE(language: Language) {
      this.language = language
      setI18nLanguage(language)
    }

    @Mutation
    private SET_SIZE(size: string) {
      this.size = size
    }

    @Action
    public ToggleNavBar(withoutAnimation: boolean) {
      this.TOGGLE_NAVBAR(withoutAnimation)
    }

    @Action
    public ToggleDevice(device: DeviceType) {
      this.TOGGLE_DEVICE(device)
    }

    @Action
    public SetLanguage(language: Language) {
      this.SET_LANGUAGE(language)
    }

    @Action
    public SetSize(size: string) {
      this.SET_SIZE(size)
    }

    @Mutation
    public SET_ROUTES(routes: RouteConfig[]) {
      this.routes = constantRoutes.concat(routes)
    }
  }

  export const AppModule = getModule(App)
  ```

- 熟悉 tsx 语法&vue2 生态下的 template 语法糖与 tsx 的等价转化。

  [vue2 jsx 官网文档](https://cn.vuejs.org/v2/guide/render-function.html#JSX)

  [vuejs-jsx,不用显式安装，已集成到@vue/babel-preset-app，可参内部 demo 语法](https://github.com/vuejs/jsx)

  [babel-plugin-transform-vue-jsx，不用显式安装，已集成到@vue/babel-preset-app，可参考内部 demo 语法](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection)

  [vue-tsx-support，vue2 生态 tsx 语法 render 函数调用大写开头的组件时的类型校验](https://github.com/wonderful-panda/vue-tsx-support)

  - 本项目尚未启用
  - tsx 的 render 函数中引入组件和 jsx 还是有一定的差异，jsx 中原本只需要 import 后 直接 在 render 函数里面使用即可，在 tsx 中如果用大写开头当变量，render 函数中会进行（props，events，slots）类型校验

  ```tsx
  /**
   * 配合vue-tsx-support后，可以对LangSelect在<LangSelect/> 被调用时 是否漏传了 必要的 props 或者 events 名称是否匹配等进行校验
   */
  import LangSelect from '@/components/langselect'
  class extends Vue {
    render() {
      return <LangSelect />
    }
  }
  ```

  - 由于项目中未引用 vue-tsx-support，直接向上面那样 import 后注入会爆红，因为没有对<LangSelect/>进行类型约束，所以提供下面两种方式避免类型检测（核心就是调用时小写开头）

  ```tsx
  /**
   * 利用components进行组件局部注册，render函数中用小写及-拼接
   */
  import { Component, Vue } from 'vue-property-decorator'
  import LangSelect from '@/components/langselect'

  @Component({
    components: {
      LangSelect
    }
  })
  class extends Vue {
    render() {
      return <lang-select />
    }
  }

  /**
   * 直接用小写开头的变量进行import
   */
  import { Component, Vue } from 'vue-property-decorator'
  import langSelect from '@/components/langselect'

  @Component
  class extends Vue {
    render() {
      return <langSelect />
    }
  }
  ```

- 需对 sass 语法熟悉 及 css 冲突另一种解决方案 css modules 方案熟悉

  ```scss
  //./style.module.scss
  @mixin sprite-scale($sprite, $scaleX: 1, $scaleY: $scaleX) {
    width: nth($sprite, 5) * $scaleX;
    height: nth($sprite, 6) * $scaleY;
    background-image: url(nth($sprite, 9));
    background-position: nth($sprite, 3) * $scaleX nth($sprite, 4) * $scaleY;
    background-size: nth($sprite, 7) * $scaleX nth($sprite, 8) * $scaleY;
  }
  .abc {
    .cde {
      color: red;
    }
  }
  ```

  css modules

  ```tsx
  import style from './style.module.scss'

  const render = () => (
    <div class={[style.abc]}>
      <div class={[style.cde]}>123</div>
    </div>
  )
  ```

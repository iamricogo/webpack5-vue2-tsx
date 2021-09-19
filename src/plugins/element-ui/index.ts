import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Icon,
  Input,
  Menu,
  MenuItem,
  Submenu
} from 'element-ui'
import { PluginObject } from 'vue'
const ElementUIPlugin: PluginObject<unknown> = {
  install: (Vue): void => {
    Vue.use(Button)
      .use(Icon)
      .use(Menu)
      .use(Submenu)
      .use(Submenu)
      .use(MenuItem)
      .use(Dropdown)
      .use(DropdownItem)
      .use(DropdownMenu)
      .use(Form)
      .use(FormItem)
      .use(Input)
  }
}

interface ElFormItem extends FormItem {
  validateMessage: string | null
}
interface ElForm extends Form {
  fields?: ElFormItem[]
}

export { ElFormItem, ElForm }

export default ElementUIPlugin

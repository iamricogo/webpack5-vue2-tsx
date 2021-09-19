import { getVuexStorage } from '@/store'
import Vue from 'vue'
import VueI18n, { LocaleMessages } from 'vue-i18n'
// element-ui built-in lang
import eleLocale from 'element-ui/lib/locale'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'

import enLocale from './en'
import zhLocale from './zh-CN'

const languageStorage = getVuexStorage()['app']?.language

export const language = ['en', 'zh-CN'] as const

export const defaultLanguage = language.includes(languageStorage)
  ? languageStorage
  : 'en'

export type Language = typeof language[number]

Vue.use(VueI18n)

const messages: LocaleMessages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  'zh-CN': {
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  locale: defaultLanguage,
  messages
})

eleLocale.i18n((key: string, value: string) => i18n.t(key, value))

export const setI18nLanguage = (
  locale: Language,
  instance: VueI18n = i18n
): void => {
  instance.locale = locale
}

export default i18n

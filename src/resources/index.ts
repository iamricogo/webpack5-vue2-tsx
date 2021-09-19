/**
 * 所有资源引入的集中管理，要么返回base64字符串，要么返回emit到dist目录后的路径
 */

import download_apple from '@/assets/images/download_apple.png'
import download_bg from '@/assets/images/download_bg.png'
import download_bg_m from '@/assets/images/download_bg_m.jpg'
import download_google from '@/assets/images/download_google.png'
import download_huawei from '@/assets/images/download_huawei.png'
import download_preview from '@/assets/images/app_preview.png'
import en_about_us from '@/assets/images/en/aboutus.png'
import en_about_us1 from '@/assets/images/en/aboutus1.jpg'
import en_about_us2 from '@/assets/images/en/aboutus2.png'
import en_banner1 from '@/assets/images/en/banner1.jpg'
import en_banner2 from '@/assets/images/en/banner2.jpg'
import en_banner3 from '@/assets/images/en/banner3.jpg'
import en_banner4 from '@/assets/images/en/banner4.jpg'
import en_banner5 from '@/assets/images/en/banner5.jpg'
import en_contactus from '@/assets/images/en/contactus.jpg'
import map_png from '@/assets/images/map.png'
import whyusbg from '@/assets/images/whyus.png'
import zh_about_us from '@/assets/images/zh-CN/aboutus.png'
import zh_about_us1 from '@/assets/images/zh-CN/aboutus1.jpg'
import zh_about_us2 from '@/assets/images/zh-CN/aboutus2.png'
import zh_banner1 from '@/assets/images/zh-CN/banner1.jpg'
import zh_banner2 from '@/assets/images/zh-CN/banner2.jpg'
import zh_banner3 from '@/assets/images/zh-CN/banner3.jpg'
import zh_banner4 from '@/assets/images/zh-CN/banner4.jpg'
import zh_banner5 from '@/assets/images/zh-CN/banner5.jpg'
import zh_contactus from '@/assets/images/zh-CN/contactus.jpg'

export default {
  why_us: {
    bg: whyusbg
  },
  download: {
    bg: download_bg,
    bg_m: download_bg_m,
    huawei: download_huawei,
    google: download_google,
    apple: download_apple,
    preview: download_preview
  },
  common: {
    maps: map_png
  },
  en: {
    banners: [en_banner1, en_banner2, en_banner3, en_banner4, en_banner5],
    about_us: en_about_us,
    about_us1: en_about_us1,
    about_us2: en_about_us2,
    contactus: en_contactus
  },
  'zh-CN': {
    banners: [zh_banner1, zh_banner2, zh_banner3, zh_banner4, zh_banner5],
    about_us: zh_about_us,
    about_us1: zh_about_us1,
    about_us2: zh_about_us2,
    contactus: zh_contactus
  }
} as Record<string, Record<string, string | string[]>>

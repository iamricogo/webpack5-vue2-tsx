import { loadScripts } from '@/utils/Loader'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
;(async () => {
  NProgress.start()
  await loadScripts({
    remove: 'remove', //加载后移除script标签避免直接暴露key
    id: 'google-map-api',
    src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyDcwGyRxRbcNGWOFQVT87A1mkxEOfm8t0w&libraries=places,geometry,drawing&channel=GMPSB_locatorplus_v3_cABCDE`
  })

  await import(/* webpackChunkName: "main-async" */ '@/main.async')
  NProgress.done()
})()

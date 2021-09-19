/**
 * 开发模式时本地的代理配置
 */

export default {
  ...['/api'].reduce((pre, cur) => {
    pre[cur] = {
      target: 'https://tt.cg5.co/',
      changeOrigin: true
    }
    return pre
  }, {})
}

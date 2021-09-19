// CSS后处理
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: process.env.MODERN_BUILD ? [] : [postcssPresetEnv({ stage: 0 })]
}

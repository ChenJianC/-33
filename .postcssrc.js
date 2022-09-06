module.exports = {
  // 插件
  plugins: {
    'postcss-pxtorem': {
      // 根节点字体大小
      // 如果是vant 37.5如果自己的代码 75
      // file当前编译的css的文件路径
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'] // 所有属性都转成rem
    }
  }
}

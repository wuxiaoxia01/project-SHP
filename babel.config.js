module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // elementUi实现按需加载时需要加入的
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
}

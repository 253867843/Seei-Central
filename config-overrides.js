const {override, fixBabelImports, addLessLoader, addDecoratorsLegacy} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css',
    style: true
  }),
  addLessLoader({ // 自定义主题
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#d9482f'},
  }),
  addDecoratorsLegacy()
);
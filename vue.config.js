const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  // babel node_modules 进行转义，安全性， 缺点： 耗时
  transpileDependencies: true,
  // 关闭eslint， build serve将不会进行eslint检查
  lintOnSave: false,
  // 书写原生的webpack配置项
  configureWebpack: {
    devServer: {
      open: true,
      port: 8888,
      host: "localhost",
    },
    resolve: {
      alias: {
        "#": path.join(__dirname, "src/components"),
      },
    },
  },
  // 更改标题
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "黑马头条";
      return args;
    });
  },
  // vant组件库里定制主题 可覆盖原本样式进行更改
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.join(
              __dirname,
              "src/styles/theme.less"
            )}";`,
          },
        },
      },
    },
  },
});

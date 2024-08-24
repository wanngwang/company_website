const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 解决跨域问题，自己访问自己
  devServer: {
    proxy: {
      "/webapi": {
        target: "http://localhost:3000",
        changeOrigin: true
      },
    }
  }
})

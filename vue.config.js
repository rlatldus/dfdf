const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  runtimeCompiler: true,

  publicPath:'/gooduser',
  devServer: {
    proxy: {
      '/gooduser/api': { 
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/attachment': { 
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/web': { 
        target: 'https://qa.golfsamsung.com',
        changeOrigin: true,
      }
    },
  }
  
})

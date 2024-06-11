import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '127.0.0.1', //前端vue项目的IP地址
    port: '5173',  //前端vue项目的端口号
    open: true,  //表示在启动开发服务器时，会自动打开浏览器并访问指定的地址
    proxy: {
      '/k8sdemo': {
        target: 'localhost:5173',//后端springboot项目地址
        changeOrigin: true,   //是否跨域
        ws: true,   //是否代理websockets
        pathRewrite: {
          '^/k8sdemo': ''  //假如我们的地址是 /k8sdemo/login 会转化为 /login
        }
      }
    }
  }
})
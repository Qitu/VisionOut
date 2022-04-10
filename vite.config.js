import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'

/**
 * @type {import('vite').UserConfig}
 */
 export default defineConfig({
  root: path.resolve(__dirname, './src'),
  resolve: {
    alias: {
    '@': path.resolve(__dirname, './src')
    },
  },
  plugins: [
    legacy({
      targets: [
          'Android > 39',
          'Chrome >= 60',
          'Safari >= 10.1',
          'iOS >= 10.3',
          'Firefox >= 54',
          'Edge >= 15',
        ],
    })
  ],
  // server: {
  //   host: 'localhost',
  //   port: 3000,
  //   open: true,
  //   strictPort: false,
  //   https: false,
    // 反向代理
    // proxy: {
    //   '/admin': {
    //     target: 'http://api.vite-admin.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/admin/, '')
    //   },
    // }    

    //proxy: {
    //   // string shorthand
    //   '/foo': 'http://localhost:4567/foo',
    //   // with options
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   },
    //   // with RegEx
    //   '^/fallback/.*': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/fallback/, '')
    //   }
    // }
  // },
  // publicDir: 'public', // 静态资源目录
  build:{
    outDir: 'dist',
  }
})
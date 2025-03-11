import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {prismjsPlugin} from 'vite-plugin-prismjs';
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    prismjsPlugin({
      languages: 'all',
      // 配置行号插件
      plugins: ['line-numbers'],
      // 主题名
      theme: 'coy',
      css: true
    }),
    importToCDN({
      modules: [
        {
          name: "katex",
          var: "katex",
          path: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js",
          css: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
        }
      ],
    }),
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})

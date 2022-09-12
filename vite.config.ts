import { defineConfig, loadEnv } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path, { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import postcssNesting from 'postcss-nesting'
import autoprefixer from 'autoprefixer'
import flexbugsFixes from 'postcss-flexbugs-fixes'
// import { viteMockServe } from "vite-plugin-mock";

function resolvePath(src: string) {
  return path.resolve(__dirname, src)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    DefineOptions(),
    // viteMockServe({
    //   supportTs: true, 
    // }),
    vueJsx(),
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
    createSvgIconsPlugin({
      iconDirs: [resolvePath('src/svgs')],
      symbolId: 'svg-[dir]-[name]',
    })
  ],

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    postcss: {
      plugins: [
        postcssNesting,
        autoprefixer({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8',
            '> 1%',
          ],
          grid: true,
        }),
        flexbugsFixes
      ]
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'), // 路径别名
    },
    extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减

  },
  server: {
    hmr: true,
    open: false,
    port: 7777,
    proxy: {
      "/api": {
        target: 'https://mbt-dev.oppo.itealab.net/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path: string) => {
          return path.replace(/^\/api/, '')
        }
      },
      //   "/mbtapi": {
      //     target: 'https://flows.iteatechnologies.com',
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: (path:string) => {
      //       return path.replace(/^\/mbtapi/, '')}

      //   }
    }
  }
})

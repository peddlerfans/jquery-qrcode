import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path, { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import postcssNesting from 'postcss-nesting'
import autoprefixer from 'autoprefixer'
import flexbugsFixes from 'postcss-flexbugs-fixes'

function resolvePath(src: string) {
  return path.resolve(__dirname, src)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    vueJsx(),
    Components({
<<<<<<< HEAD
=======
      dirs: ['src/components', 'src/views'],
>>>>>>> cfb6473... 解析树形数据渲染表格
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
    open: false,
    port: 7777,
    proxy: {
      "/api": {
<<<<<<< HEAD
        // target: 'https://mbt-dev.oppo.itealab.net/api/',
        target:'https://www.baidu.com',
        changeOrigin: true,
        secure: false,
        // headers: {                  
        //   Referer: 'https://mbt-dev.oppo.itealab.net'
        // },
        rewrite: (path:string) => {
          console.log('...kkkkkk....',path)
          return path.replace(/^\/api/, '')}
=======
        target: 'https://mbt-dev.oppo.itealab.net/api/',
        changeOrigin: true,
        secure: false,
        rewrite: (path: string) => {
          return path.replace(/^\/api/, '')
        }
>>>>>>> cfb6473... 解析树形数据渲染表格
      }
    }
  }
})

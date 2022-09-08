import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { mock, mockEnv } from './appConfig'
import enableMock from '../mock'
import 'ant-design-vue/es/message/style/index.css' // antdv message样式
import 'ant-design-vue/es/modal/style/index.css' // antdv message样式
import 'ant-design-vue/dist/antd.less';
import 'ant-design-vue/dist/antd.variable.min.css';
import 'dayjs/locale/zh-cn';
import '@/styles/index.postcss' // 全局样式
import 'virtual:svg-icons-register'
import './permission'
import { EnvType } from 'types/app'

<<<<<<< HEAD

=======
>>>>>>> 3e242a4... 更新
mockEnv.includes(import.meta.env.MODE as EnvType) && mock === 'on' && enableMock()

createApp(App).use(createPinia()).use(router).mount('#app')

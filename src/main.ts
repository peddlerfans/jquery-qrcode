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

import {Form,Input,InputNumber,Button,Drawer,Switch,Slider,Select,SelectOption,Space,Radio} from 'ant-design-vue';
 
mockEnv.includes(import.meta.env.MODE as EnvType) && mock === 'on' && enableMock()

createApp(App).use(Form)
.use(Input)
.use(InputNumber)
.use(Button)
.use(Switch)
.use(SelectOption)
.use(Select)
.use(Space)
.use(Slider)
.use(Drawer)
.use(Radio)
.use(createPinia()).use(router).mount('#app')

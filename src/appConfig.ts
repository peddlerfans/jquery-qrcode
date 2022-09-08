import { EnvType, SwitchType } from "types/app"
<<<<<<< HEAD
=======
<<<<<<< HEAD

/**
 * app标题
 */
export const appTitle = 'Clownfish Admin'

=======
>>>>>>> 3e242a4... 更新
import {ref} from 'vue';
/**
 * app标题
 */
export const appTitle = 'MBTesting @ ITEA Technologies'
/** 提供动态固定头部 */
export const fixedHeader = ref(true)
<<<<<<< HEAD
=======
>>>>>>> cfb6473... 解析树形数据渲染表格
>>>>>>> 3e242a4... 更新
/**
 * 使用mock代理api请求：on开，off关  
 */
export const mock: SwitchType = 'on'

/**
 * mock是否开启namespace，开启后文件名将作为前缀拼接在url
 */
export const mockNamespace: boolean = true
<<<<<<< HEAD
// export const mockNamespace: boolean = false
=======
>>>>>>> 3e242a4... 更新

/**
 * mock代理指定环境
 * 只在开发环境且appConfig的mock字段为‘on’的情况启动mock
 */
export const mockEnv: EnvType[] = ['development', 'staging', 'production']

/**
 * 过渡动画类型
 */
export enum transitions {
  fade = 'fade',
  fadeScale = 'fade-scale',
  slideLeft = 'slide-left',
  slideRight = 'slide-right',
  slideUp = 'slide-up',
  slideDown = 'slide-down',
}

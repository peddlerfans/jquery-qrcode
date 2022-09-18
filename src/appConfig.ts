import { EnvType, SwitchType } from "types/app"
import {ref} from 'vue';
/**
 * app标题
 */
export const appTitle = 'MBTesting @ ITEA Technologies'
/** 提供动态固定头部 */
export const fixedHeader = ref(true)
/**
 * 使用mock代理api请求：on开，off关  
 */
export const mock: SwitchType = 'on'

/**
 * mock是否开启namespace，开启后文件名将作为前缀拼接在url
 */
export const mockNamespace: boolean = true
// export const mockNamespace: boolean = false

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

/**
 * 使用mock代理MBT api请求：
 */
 export const mockMBTUrl= '/mbtlist/mbt-models'


/**
 * 使用真实后台 api请求：
 */
 export const realMBTUrl= '/api/test-models'

 
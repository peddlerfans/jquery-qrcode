import { message } from 'ant-design-vue'
import axios from 'axios'
import { getCookie } from '.'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // withCredentials: true,
  timeout: 60000
})

const token = getCookie('token')

request.interceptors.request.use(
  config => {
    if (config.headers && token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const { code, msg } = response.data
    // if (code !== 200) {
    //   message.error(`错误码${code}：${msg || '未知错误'}`, 5)
    //   return Promise.reject(new Error(msg || '未知错误'))
    // } else {
    return response.data
    // }
  },
  error => {
    console.error(error)
    message.error(error.message, 5)
    return Promise.reject(error)
  }
)
export default request
/*
import axios from 'axios';
import { message as $message } from 'ant-design-vue';
import { uniqueSlash } from './urlUtils';
import type { AxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';
// import { useUserStore } from '@/store/modules/user';
// import {ExclamationCircleOutlined} from '@ant-design/icons'

// const request = axios.create({
//   baseURL: import.meta.env.VITE_APP_BASE_API,
//   withCredentials: true,
//   timeout: 60000
// })

export interface RequestOptions {
  /** 当前接口权限, 不需要鉴权的接口请忽略， 格式：sys:user:add */
//   permCode?: string;
//   /** 是否直接获取data，而忽略message等 */
//   isGetDataDirectly?: boolean;
//   /** 请求成功是提示信息 */
//   successMsg?: string;
//   /** 请求失败是提示信息 */
//   errorMsg?: string;
//   /** 是否mock数据请求 */
//   isMock?: boolean;
// }

// const UNKNOWN_ERROR = '未知错误，请重试';
// // 是否生产环境
// // const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
// /** 真实请求的路径前缀 */
// const baseApiUrl = import.meta.env.VITE_APP_BASE_API;
// /** mock请求路径前缀 */
// const baseMockUrl = import.meta.env.VUE_APP_MOCK_API;

// const service = axios.create({
//   // baseURL: baseApiUrl,
//   timeout: 6000,
// });

// service.interceptors.request.use(
//   (config) => {
//     const token = Storage.get(ACCESS_TOKEN_KEY);
//     if (token && config.headers) {
//       // 请求头token信息，请根据实际情况进行修改
//       config.headers['Authorization'] = token;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   },
// );

// service.interceptors.response.use(
//   (response) => {
//     const res = response.data;

//     // if the custom code is not 200, it is judged as an error.
//     if (res.code !== 200) {
//       $message.error(res.message || UNKNOWN_ERROR);

//       // Illegal token
//       if (res.code === 11001 || res.code === 11002) {
//         window.localStorage.clear();
//         window.location.reload();
//         // to re-login
//         // Modal.confirm({
//         //   title: '警告',
//         //   content: res.message || '账号异常，您可以取消停留在该页上，或重新登录',
//         //   okText: '重新登录',
//         //   cancelText: '取消',
//         //   onOk: () => {
//         //     localStorage.clear();
//         //     window.location.reload();
//         //   }
//         // });
//       }

//       // throw other
//       const error = new Error(res.message || UNKNOWN_ERROR) as Error & { code: any };
//       error.code = res.code;
//       return Promise.reject(error);
//     } else {
//       return res;
//     }
//   },
//   (error) => {
//     // 处理 422 或者 500 的错误异常提示
//     const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
//     $message.error(errMsg);
//     error.message = errMsg;
//     return Promise.reject(error);
//   },
// );

// export type Response<T = any> = {
//   code: number;
//   message: string;
//   data: T;
// };

// export type BaseResponse<T = any> = Promise<Response<T>>;

// /**
//  *
//  * @param method - request methods
//  * @param url - request url
//  * @param data - request data or params
//  */
// export const request = async <T = any>(
//   config: AxiosRequestConfig,
//   options: RequestOptions = {},
// ): Promise<T> => {
//   try {
//     const { successMsg, errorMsg, permCode, isMock, isGetDataDirectly = true } = options;
//     // 如果当前是需要鉴权的接口 并且没有权限的话 则终止请求发起
//     // if (permCode && !useUserStore().perms.includes(permCode)) {
//     //   return $message.error('你没有访问该接口的权限，请联系管理员！');
//     // }
//     // const fullUrl = `${(isMock ? baseMockUrl : baseApiUrl) + config.url}`;
//     // const fullUrl = import.meta.env.VITE_APP_BASE_API+ config.url;
//     const fullUrl =  'https://1esse.github.io/vue-clownfish-admin#login';
//     console.log('fullurl in request:',fullUrl);
//     // config.url = uniqueSlash(fullUrl);
//     // if (IS_PROD) {
//     //   // 保持api请求的协议与当前访问的站点协议一致
//     //   config.url.replace(/^https?:/g, location.protocol);
//     // }
//     const res = await service.request(config);
//     successMsg && $message.success(successMsg);
//     errorMsg && $message.error(errorMsg);
//     return isGetDataDirectly ? res.data : res;
//   } catch (error: any) {
//     return Promise.reject(error);
//   }
// };

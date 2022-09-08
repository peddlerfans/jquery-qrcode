import request from "@/utils/request"
import { ref, shallowRef } from "vue"
import type { RequestFail } from '../../types/request'

export function requestGet<T = any>(url: string, useRef: boolean = false) {
    const data = useRef ? ref<T | RequestFail | null>(null) : shallowRef<T | RequestFail | null>(null)
<<<<<<< HEAD
=======
    // request({
    //     url: url,
    //     method: 'get',
        
    //   })
    //   .then((res:any) => {
>>>>>>> 3e242a4... 更新
    request.get<T>(url).then((res:any) => {
        data.value = res.data
    }).catch((err:any) => {
        console.error(err)
        data.value = 'fail'
    })
    return data
}

export function requestPost<T = any>(url: string, body: unknown, useRef: boolean = false) {
    const data = useRef ? ref<T | RequestFail | null>(null) : shallowRef<T | RequestFail | null>(null)
<<<<<<< HEAD
=======
    // request({
    //     url: url,
    //     method: 'post',
    //     data:body
    //   })
    //   .then((res:any) => {
>>>>>>> 3e242a4... 更新
    request.post<T>(url, body).then((res:any) => {
        data.value = res.data
    }).catch((err:any) => {
        console.error(err)
        data.value = 'fail'
    })
    return data
}
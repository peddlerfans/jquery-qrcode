import {Rule} from "ant-design-vue/es/form";
import { i18n } from "@/locales";

// // 正则
// const

// 表单校验
const { t } = i18n.global

export const checkUrl = async (_rule: Rule, value: string) => {
    if (!value) return Promise.reject(t('component.message.emptyUrl'))
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
    let res = reg.test(value)
    if (!res) {
        return Promise.reject(t('component.message.realUrl'))
    } else {
        return Promise.resolve()
    }
}

// 检查字符串是否符合变量名格式
export function checkVarName(_rule: any, value: string) {
    if (!value) return Promise.resolve()
    const reg = /^[a-zA-Z_][a-zA-Z0-9_]*$/
    if (!reg.test(value)) {
        return Promise.reject(t('component.message.varNameCheck'))
    } else return Promise.resolve()
}
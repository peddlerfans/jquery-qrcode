import {Rule} from "ant-design-vue/es/form";
import { i18n } from '@/locales'

const { t } = i18n.global

// 检查字符串是否符合变量名格式
export function checkVarName(_rule: any, value: string) {
    if (!value) return Promise.resolve()
    const reg = /^[a-zA-Z_][a-zA-Z0-9_]*$/
    if (!reg.test(value)) {
        return Promise.reject(t('component.message.varNameCheck'))
    } else return Promise.resolve()
}
import {Rule} from "ant-design-vue/es/form";
import { i18n } from "@/locales";

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
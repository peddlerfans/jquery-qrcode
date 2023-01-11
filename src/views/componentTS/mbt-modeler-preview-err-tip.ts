import {
    errTipTool
} from '@/stores/modules/modeler-preview-err-msg'
import { Item } from 'ant-design-vue/lib/menu'
import _ from 'lodash'

const store = errTipTool()

interface errMsg {
    no_data: string,
    no_meta: string,
    no_templates_define: string,
    not_start_end: string
    textErr: string
    scriptErr: string
    uncaught_exception: string
}

// 错误信息的属性名对应的原因
const errObj: errMsg = {
    no_data: '模板没有数据，可双击画布空表界面，进入 Data pool 页进行编辑',
    no_meta: '模板没有设置meta数据，可双击画布空表界面，进入 Meta 页进行编辑',
    no_templates_define: '模板没有设置模板引擎，可双击画布空表界面，进入 Attributes 页进行设置 Output Text 和 Output Script',
    not_start_end: '模型连接线连接节点有断点，请仔细检查',
    textErr: '代码生成文本模板出错',
    scriptErr: '代码生成脚本模板出错',
    uncaught_exception: '当前模型部分Aw无数据'
}

const getReason = (err: string) => {
    switch (err) {
        case 'no_data':
        case 'no_meta':
        case 'no_templates_define':
        case 'textErr':
        case 'scriptErr':
        case 'uncaught_exception':
        case 'not_start_end': {
            return errObj[err]
        }
    }
}

export const showErrCard = (errMsg: any) => {
    let errAttrList = Object.keys(errMsg)
    let errTem: any
    let temp: any = []
    if (!errAttrList || !errAttrList.length) return
    if (errMsg.hasOwnProperty('errors')) {
        errMsg.errors.forEach((item: any) => {
            if (item.results && item.results.length > 0 && item.results[0].hasOwnProperty('error')) {
                if (item.outputLang == 'yaml') {
                    errTem = 'textErr'
                } else {
                    errTem = 'scriptErr'
                }
            }
            temp.push({ err: errTem, reason: getReason(errTem) })
        });

        // if(errTem){
        //     temp = [{errTem , reason: getReason(errTem)}]
        // }

    } else {
        temp = errAttrList.map((err: string) => {
            return {
                err,
                reason: getReason(err)
            }
        })
    }
    store.setErrList(temp)
    store.setVisible(true)
}

export function CodegenErr(errmsg: any, codegenMsg: string): any {
    let outputLang
    let vaceErr
    if (codegenMsg == 'textErr') {
        let codegenErr = errmsg.errors.filter((item: any) => item.outputLang == 'yaml')
        codegenErr.forEach((obj: any) => {
            if (obj.results[0].hasOwnProperty('error') && obj.outputLang) {
                outputLang = obj.outputLang
                vaceErr = obj.results[0].error
            }
        })
    } else {
        errmsg.errors.filter((item: any) => item.outputLang !== 'yaml').forEach((obj: any) => {
            if (obj.results[0].hasOwnProperty('error') && obj.outputLang) {
                outputLang = obj.outputLang
                vaceErr = obj.results[0].error
            }
        })
    }
    return { outputLang, vaceErr }
}

export function setErrData(msg: any) {
    store.setErrmsg(msg)
}
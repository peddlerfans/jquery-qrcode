import {
    errTipTool
} from '@/stores/modules/modeler-preview-err-msg'

const store = errTipTool()

interface errMsg {
    no_data: string,
    no_meta: string,
    no_templates_define: string,
    not_start_end: string
}

// 错误信息的属性名对应的原因
const errObj: errMsg = {
    no_data: '模板没有数据，可双击画布空表界面，进入 Data pool 页进行编辑',
    no_meta: '模板没有设置meta数据，可双击画布空表界面，进入 Meta 页进行编辑',
    no_templates_define: '模板没有设置模板引擎，可双击画布空表界面，进入 Attributes 页进行设置 Output Text 和 Output Script',
    not_start_end: '模型连接线连接节点有断点，请仔细检查'
}

const getReason = (err: string) => {
    switch (err) {
        case 'no_data':
        case 'no_meta':
        case 'no_templates_define':
        case 'not_start_end': {
            return errObj[err]
        }

    }
}

export const showErrCard = (errMsg: errMsg) => {
    let errAttrList = Object.keys(errMsg)
    let temp = errAttrList.map((err: string) => {
        return {
            err,
            reason: getReason(err)
        }
    })
    store.setErrList(temp)
    store.setVisible(true)
}
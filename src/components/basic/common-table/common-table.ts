import {ref} from "vue";
import {
    SelectProps,
    Table
} from "ant-design-vue";

export interface statesTs {
    tags: Array<string>
    inputVisible: boolean;
    inputValue: string,
    enum: Array<string>,
    enumInputVisible: boolean,
    enumInputValue: string,
    values: Array<string>,
    valueInputVisible: boolean,
    valueInputValue: string,
}

// 表格 type 可选类型1
export const typeOptions = ref<SelectProps['options']>([
    {
        value: 'str',
        label: 'str',
    },
    {
        value: 'float',
        label: 'float',
    },
    {
        value: 'boolean',
        label: 'boolean',
    },
    {
        value: 'number',
        label: 'number',
    },
    {
        value: 'int',
        label: 'int',
    },
    {
        value: 'SUT',
        label:'SUT'
    }
])

// 表格 type 可选类型2
export const typeOptions2 = ref<SelectProps['options']>([
    {
        value: 'string',
        label: 'String',
    },
    {
        value: 'number',
        label: 'Number',
    }
])

// 表格复选框设置常量
export const tableSelectParams = {
    all: Table.SELECTION_ALL,
    invert: Table.SELECTION_INVERT,
    none: Table.SELECTION_NONE
}

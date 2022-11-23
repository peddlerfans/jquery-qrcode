import {ref} from "vue";
import { SelectProps } from "ant-design-vue";

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

export interface DataItem {
    editing?: any;
    key?: string;
    enum: Array<string>;
    name: string;
    category: string;
    description: string;
    tags: Array<string>;
}

export interface Props {
    fetchObj: any,
    columns: any,
    tableRef: any,
    isGlobal: boolean
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

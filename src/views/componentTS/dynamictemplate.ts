// 定义数据双向绑定的数据

export interface tableSearch {
    search: string
    size: number
}
// 查询表单的数据
export interface FormState {
    search: string;
}
// 模态窗表单
export interface paramsobj {
    name: string,
    type: string;
}
export interface ModelState {
    name: string;
    description: string;
    _id: string;
    tags: Array<string>;
    editing: Boolean;
    inputVisible?: Boolean;
    inputValue?: string;
}
export interface Factor {
    name: string;
    type: string;
    values: Array<any>;
    editing?: Boolean;
    inputVisible?: Boolean;
    inputValue?: string
}

export interface Constraint {
    if:any
    then:thenobj
    keys?:string
}
export interface Constraintif {
    if:any
    then:string
    keys?:number
}
export interface thenobj{
    thenName:string
    thenOperator:string
    thenValue:string
}
export interface Model{
    option: any,
    factor: Array<Factor>,
    constraint: Array<Constraint>
    constraintif:Array<Constraintif>
}

// 添加的表单tags
export interface statesTs {
    tags: Array<any>
    inputVisible: Boolean;
    inputValue: any
}

export interface valueStatesTs {
    values: Array<any>
    inputVisible: Boolean;
    inputValue: any
}


interface DataItem {
    key: string;
    name: string;
    description: string
}

// 定义数据双向绑定的数据

export interface ModelState {
    model: {
        templateEngine: string;
        outputLanguage: string;
    };
    templateText: string;
}

export interface Model {
    _id: any;
    name: any;
    category: any;
    description: any;
    tags?: Array<any>;
    model: {
        templateEngine: any;
        outputLanguage: any;
        data: any;
        outputType: string
        history: Array<any>;
    };
    templateText: any;
}

export interface AceState {
    theme: string;
    lang: string;
    result: string;
}

export interface AceEditor {
    _editor: any;
}
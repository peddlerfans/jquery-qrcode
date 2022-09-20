import { Stores } from '../../types/stores'
import { MockApi } from '../mockapi'

const mbtlist: Stores.mbt[] = [

    {
        _id:'uuid1',
        name: "multimedia",
        description: "Play multimedia files locally",
        tags: ["Multimedia", "OS"],
        // keep modelData open right now
        modelDefinition: {  },
        dataDefinition: {
            resources: [
                {
                    name: "phone1",
                    type: "sut"
                },
                {
                    name: "phone2",
                    type: "sut"
                }
            ],
            // static or dynamic(Pairwise), default is static
            dataType: "number",

            // either use dataUrl or data
            dataUrl: "http://localhost",


            data: [],
            // meta 
            metaTemplate: "template{}",
            meta: []
        }
    }
    
    
,
{
    _id:'uuid2',
    name: "camera",
    description: "Take photos when lock screen",
    tags: ["Camera", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType:  "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [Object],
        // meta 
        metaTemplate:  "template{}",
        
        meta: [],
    }


},
{
    _id:'uuid3',
    name: "multimedia",
    description: "Play multimedia files locally",
    tags: ["multimedia", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType: "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [],
        // meta 
        metaTemplate: "",
        meta: [],
    }
}
,
{
    _id:'uuid4',
    name: "multimedia",
    description: "Play multimedia throw wifi",
    tags: ["multimedia", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType: "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [],
        // meta 
        metaTemplate: "",
        meta: [],
    }
}
,
{
    _id:'uuid5',
    name: "multimedia",
    description: "Play multimedia files output by bluetooth",
    tags: ["multimedia", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType: "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [],
        // meta 
        metaTemplate: "",
        meta: [],
    }
}
,
{
    _id:'uuid6',
    name: "multimedia",
    description: "Play multimedia files  output by speaker",
    tags: ["multimedia", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType: "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [],
        // meta 
        metaTemplate: "",
        meta: [],
    }
}
,
{
    _id:'uuid7',
    name: "multimedia",
    description: "Play multimedia files output by earphone",
    tags: ["multimedia", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType: "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [],
        // meta 
        metaTemplate: "",
        meta: [],
    }
}
,{
    _id:'uuid8',
    name: "Microphone",
    description: "Recording voice call",
    tags: ["Microphone", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType: "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [],
        // meta 
        metaTemplate: "",
        meta: [],
    }
}
,{
    _id:'uuid9',
    name: "Microphone",
    description: "Recording environment sounds",
    tags: ["Microphone", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType: "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [],
        // meta 
        metaTemplate: "",
        meta: [],
    }



}]


export default <MockApi.obj[]>[
    {
        url: '/mbt-models',
        type: 'post',
        response: (options) => {
            const failRes: MockApi.response = {
                code: 500,
                msg: '生成mbt失败,重复记录',
                data: null
            }
            if (!options.body) return failRes
            const { name } = options.body
            const mbt = mbtlist.find(mbt => mbt.name === name)
            if (mbt ) return failRes
            return {
                code: 200,
                msg: 'Create Mbt Successfully',
                data: null
            }
        }
    },
    {
        url: '/mbt-models?page=1&perPage=5',
        type: 'get',
        response: {
            code: 200,
            msg: '获取mbt成功',
            data: mbtlist.slice(1,6)
        }
    },
    {
        url: '/mbt-models',
        type: 'get',
        response: {
            code: 200,
            msg: '获取mbtlist成功',
            data: mbtlist
        }
    },
    {
        url: '/mbt-models?search=*',
        type: 'get',
        response: (options) => {
            const failRes: MockApi.response = {
                code: 400,
                msg: '获取mbt失败',
                data: null
            }
            const mbt_name = options.url.slice(options.url.indexOf('/') + 1)
            if (!mbt_name) return failRes
            const mbt = mbtlist.find(mbt => mbt.name === mbt_name)
            if (mbt ) return failRes
            return {
                code: 200,
                msg: 'Get Mbt Successfully',
                data: mbt
            }
        }
    },
    {
        
        url:'/mbt-models/*',
        type: 'get',
        response: (options) => {
            const failRes: MockApi.response = {
                code: 400,
                msg: '获取mbt失败',
                data: null
            }
            const mbt_id = options.url.slice(options.url.indexOf('/') + 1)
            
            if (!mbt_id) return failRes
            
            const mbt = mbtlist.find(mbt => mbt._id === mbt_id)
            if (mbt ) return failRes
            return {
                code: 200,
                msg: 'Get Mbt Successfully',
                data: mbt
            }
            

        }
    },
    {
        
        url:'/mbt-models/*',
        type: 'delete',
        response: (options) => {
            const failRes: MockApi.response = {
                code: 400,
                msg: '删除mbt失败',
                data: null
            }
            const mbt_id = options.url.slice(options.url.lastIndexOf('/') + 1)
            console.log('....mbt_id:',mbt_id);
            if (!mbt_id) return failRes
            
            const mbt = mbtlist.find(mbt => mbt._id === mbt_id)
            if (!mbt ) return failRes
            return {
                code: 200,
                msg: 'Delete Mbt Successfully',
                data: mbtlist.filter(mbt=>{
                    console.log('mbt:',mbt,"mbt.id",mbt._id,"mbt_id:",mbt_id)
                    if(mbt._id!=mbt_id) return mbt;
                })
            }
            

        }
    }

]


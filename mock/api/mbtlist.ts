import { Stores } from '../../types/stores'
import { MockApi } from '../mockapi'

const mbtlist: Stores.mbt[] = [

    {
        _id: 'uuid1',
        name: "multimedia",
        description: "Play multimedia files locally",
        tags: ["Multimedia", "OS"],
        // keep modelData open right now
        modelDefinition: {},
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
        _id: 'uuid2',
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
            dataType: "number"
            ,
            // either use dataUrl or data
            dataUrl: "http://localhost"

            ,
            data: [Object],
            // meta 
            metaTemplate: "template{}",

            meta: [],
        }


    },
    {
        _id: 'uuid3',
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
            dataUrl: "http://localhost"

            ,
            data: [],
            // meta 
            metaTemplate: "",
            meta: [],
        }
    }
    ,
    {
        _id: 'uuid4',
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
            dataUrl: "http://localhost"

            ,
            data: [],
            // meta 
            metaTemplate: "",
            meta: [],
        }
    }
    ,
    {
        _id: 'uuid5',
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
            dataUrl: "http://localhost"

            ,
            data: [],
            // meta 
            metaTemplate: "",
            meta: [],
        }
    }
    ,
    {
        _id: 'uuid6',
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
            dataUrl: "http://localhost"

            ,
            data: [],
            // meta 
            metaTemplate: "",
            meta: [],
        }
    }
    ,
    {
        _id: 'uuid7',
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
            dataUrl: "http://localhost"

            ,
            data: [],
            // meta 
            metaTemplate: "",
            meta: [],
        }
    }
    , {
        _id: 'uuid8',
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
            dataUrl: "http://localhost"

            ,
            data: [],
            // meta 
            metaTemplate: "",
            meta: [],
        }
    }
    , {
        _id: 'uuid9',
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
            dataUrl: "http://localhost"

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
                code: 200,
                msg: '获取mbt失败',
                data: null
            }
            if (!options.body) return failRes
            const { mbtname } = options.body
            const mbt = mbtlist.find(mbt => mbt.name === mbtname)
            if (!mbt) return failRes
            return {
                code: 200,
                msg: 'Get Mbt Successfully',
                data: mbt
            }
        }
    },
    {
        url: '/mbt-models?page=1&perPage=20',
        type: 'get',
        response: {
            code: 200,
            msg: '登出成功',
            data: 'logout success'
        }
    },
    {
        // url: '/info\\?token=.*',
        url: '/mbt-models*',
        type: 'get',
        response: (options) => {
            const failRes: MockApi.response = {
                code: 200,
                msg: '获取mbt失败',
                data: null
            }
            // 获取token

            const mbtname = options.url.slice(options.url.indexOf('/') + 1)

            if (!mbtname) return failRes

            const mbt = mbtlist.values
            if (!mbt) return failRes
            return {
                code: 200,
                msg: '获取mbt信息成功',
                data: mbtlist
            }
        }
    }
]


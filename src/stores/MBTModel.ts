import { removeCookie, setCookie } from "@/utils"
import { defineStore } from "pinia"
import request from "@/utils/request"
import { message } from "ant-design-vue"
import { Stores } from "types/stores"
import { EnumBody } from "@babel/types"
import { realMBTUrl } from "@/appConfig";

interface IElementType {
  mbtData: mbtmodel
  schema: any
  awData: any
}

interface codegen {
  codegen_text: string
  codegen_script: string
}
interface dataDafinition {
  data: data
  meta: meta
  resources: any
}

interface data {
  dataFrom: string
  tableColumns: any
  tableData: any
}

interface meta {
  schema: any
  data: object
}
interface cellsinfo {
  paperscale: any
  cellsinfo: any
}

interface mbtmodel {
  attributes: codegen
  dataDefinition: dataDafinition
  modelDefinition: cellsinfo
  name: string
  _id: string
  tags?: Array<string>
  description: string,

}
export const MBTStore = defineStore('mbtmodel', {
  state: (): IElementType => {
    return {
      mbtData: {
        attributes: {
          codegen_script: '',
          codegen_text: ''
        },
        dataDefinition: {
          data: {
            dataFrom: '',
            tableColumns: [],
            tableData: []
          },
          meta: {
            schema: {},
            data: {}
          },
          resources: []
        },
        modelDefinition: {
          cellsinfo: {},
          paperscale: ''
        },
        name: "",
        _id: "",
        tags: [],
        description: "",
      },
      schema: {},
      awData: {}
    }

  }
  ,
  getters: {
    getAlldata: state => state.mbtData,
    getcells: state => state.mbtData.modelDefinition.cellsinfo,
    getDafintion: (state) => state.mbtData.dataDefinition,
    changeTemplate(state) {
      let obj = {
        _id: "",
        name: '',
        description: '',
        codegen_script: '',
        codegen_text: ''
      }
      //  return state.mbtData._id
      if (state.mbtData._id.length > 0) {
        // return state.mbtData
        obj._id = state.mbtData._id
        obj.name = state.mbtData.name
        obj.description = state.mbtData.description
        if (state.mbtData.attributes &&
          state.mbtData.attributes.codegen_script &&
          state.mbtData.attributes.codegen_script.length > 0) {
          obj.codegen_script = state.mbtData.attributes.codegen_script
          obj.codegen_text = state.mbtData.attributes.codegen_text
        }
        return obj;
      }
    },
    showMetaSchema(state) {
      if (state.mbtData.dataDefinition?.meta?.schema) {
        return state.mbtData.dataDefinition.meta.schema
      }
    },
    showMetaData(state) {
      if (state.mbtData.dataDefinition?.meta?.data) {
        return state.mbtData.dataDefinition.meta.data
      }
    }
  },
  actions: {
    setMbtData(data: any) {
      this.mbtData = { ...JSON.parse(JSON.stringify(data)) }
    },
    // 获取后台所有的mbt数据
    async getMbtmodel(id: any) {
      
      
      let res = await request.get(`${realMBTUrl}/${id}`)
      this.setMbtData(res)
    },
    // 存入后台的数据
    async saveMbtData() {
      if (this.mbtData._id) {
        request.put(`${realMBTUrl}/${this.mbtData._id}`, this.mbtData).then(() => {
          return '保存成功'
        }).catch(() => {
          return '保存失败'
        })
      }

    },
    // 添加attributes的函数
    saveattr(data: any) {
      this.mbtData._id = data._id
      this.mbtData.name = data.name
      this.mbtData.description = data.description
      if (data.codegen_text) {
        this.mbtData.attributes.codegen_script = data.codegen_script
        this.mbtData.attributes.codegen_text = data.codegen_text
      }
    },
    saveMeta(schema: any, data: any) {

      if (this.mbtData.dataDefinition.hasOwnProperty('meta')) {
        this.mbtData.dataDefinition.meta['schema'] = { ...schema }
        this.mbtData.dataDefinition.meta['data'] = { ...data }
      } else {
        this.mbtData.dataDefinition['meta'] = { schema: schema, data: data }
      }

    },
    saveData(data: any, column: any, dataFrom: string) {
      if (this.mbtData.dataDefinition &&
        this.mbtData.dataDefinition.data &&
        this.mbtData.dataDefinition.data.dataFrom
      ) {
        this.mbtData.dataDefinition.data.dataFrom = dataFrom
        this.mbtData.dataDefinition.data.tableData = data
        this.mbtData.dataDefinition.data.tableColumns = column
      } else {
        this.mbtData.dataDefinition['data'] = { dataFrom: dataFrom, tableData: data, tableColumns: column }
      }

    },
    saveResources(data: any) {
      this.mbtData.dataDefinition.resources = data
    },
    saveAwData(data: any, schema: any) {
      this.schema = schema
      this.awData = data
    },
    setGraph(value: any) {
      if (value &&
        this.mbtData.modelDefinition &&
        this.mbtData.modelDefinition.cellsinfo
      ) {
        this.mbtData.modelDefinition.cellsinfo = value
      } else {
        this.mbtData['modelDefinition'] = { cellsinfo: value, paperscale: 1 }
      }
    }
  }
})

export default MBTStore



//  选择AW、 选择预期 修改Aw
// 点击上一个  aw之后，新加的一个aw无法编辑


// cd 文件夹
//crontab-1  修改每天修改信息
// less pull 进入文件中查看
// vim 为编辑文件内容
//ls -ltr查看当前文件夹中的文件
//zai  code下直接执行  ./redeploy.sh

  // modelSchema
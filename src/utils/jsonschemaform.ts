// 输入array,生成jsonschemaform支持的样式
//  [{
//     "key": 0,
//     "name": "testcase_id",
//     "type": "str",
//     "enum": "",
//     "description": "用例编号"
// }]

// 输出：
// [{
//    "testcase_id": {
//   "type": "string",
//   "title": "用例编号"
//    }]
import * as _ from "lodash";

const generateSchema = (inputArr: Array<Object>,metaId?:string) => {

  let outputArr: any[] = [];

  inputArr.forEach((mod: any) => {
    // let keyname = mod.name;
    let typeinschema = "";
    let enumVal: any[] = [];
    switch (mod.type) {
      case "int":
        typeinschema = "number";
        break;
      case "str":
        typeinschema = "string";
        break;
      case "float":
        typeinschema = "number";
        break;
      case "number":
        typeinschema = "number";
        break;
      case "boolean":
        typeinschema = "boolean";
        break;
      case "SUT":
        typeinschema = "SUT";
        break;
      case 'condition':
        typeinschema = 'condition'
        break
      default:
        break;
    }
    let tempobj;
    if (
      mod.hasOwnProperty("enum") &&
      mod.enum.length > 0 &&
      typeinschema == "string"
    ) {
      enumVal = _.split(mod.enum, ",");
      if (mod._id) {
        tempobj = {
          [mod._id]: {
            type: `${typeinschema}`,
            // description: mod.description,
            "ui:hidden": true,
            title: mod._id,
            // enum: enumVal,
            // enumNames: enumVal,
          },
        };
      }
      if (mod.name) {
        tempobj = {
          [mod.name]: {
            type: `${typeinschema}`,
            // description: mod.description,
            title: mod.name,
            // enum: enumVal,
            // enumNames: enumVal,
          },
        };
      } else if (mod.description) {
        tempobj = {
          [mod.description]: {
            type: `${typeinschema}`,
            // description: mod.description,
            title: mod.description,
            // enum: enumVal,
            // enumNames: enumVal,
          },
        };
      }
    } else if (
      mod.hasOwnProperty("enum") &&
      mod.enum.length > 0 &&
      typeinschema == "number"

    ) {
      let tempenumVal = _.split(mod.enum, ",");
      let len = tempenumVal.length;
      for (let i = 0; i < len; i++) {
        enumVal.push(parseInt(tempenumVal[i]));
      }
      if (mod.description) {
        tempobj = {
          [mod.name]: {
            type: `${typeinschema}`,
            // description: mod.description,
            title: mod.description,
            // enum: enumVal,
            // enumNames: enumVal,
          },
        };

      } else {
        tempobj = {
          [mod.name]: {
            type: `${typeinschema}`,
            // description: mod.description,
            title: mod.name,
            // enum: enumVal,
            // enumNames: enumVal,
          },
        };

      }

    } else {
      if (mod.name) {
        tempobj = {
          [mod.name]: {
            type: `${typeinschema}`,
            // description: mod.description,
            title: mod.name,
          }
        }
      } else if (mod.description) {
        tempobj = {
          [mod.name]: {
            type: `${typeinschema}`,
            // description: mod.description,
            title: mod.description,
          }
        }
      }

    }
    Object.assign({tempobj} , {_id:{type:'string' , title:metaId ,"ui:hidden":true , default : metaId}})
    outputArr.push(tempobj);
  });

  return outputArr;
};

// let ss = ref(true)

const generateObj = (refObj: any) => {


  let obj = {};
  if (typeof refObj == 'object' && refObj.hasOwnProperty('_rawValue') && refObj.hasOwnProperty('_value')) {
    _.keys(refObj['_value']).forEach((k: string) => {


      // console.log('kkkkkkkk   ', [k], refObj['_value'][k]);
      let tempobj = {
        [k]: refObj['_value'][k]
      }

      Object.assign(obj, tempobj);


    })

  }
  return obj;
}
export { generateSchema, generateObj };

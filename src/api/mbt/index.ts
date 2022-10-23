// import type { BaseResponse } from '@/utils/request';
// import  request  from '@/utils/request';
import { requestGet } from '@/composables/useRequest'
import request from "@/utils/request";
import { generateSchema, generateObj } from "@/utils/jsonschemaform";
import * as _ from 'lodash';
// import {ref} from 'vue'
export const arr = (dataArr: any) =>
  dataArr.map((item: any, index: string) => ({ ...item, key: index }));
export interface IJSONSchema {
  type?:string,
  properties?:object
}

/**
 * If doing query for a specific meta templates, it will generate and return a schema for JSONSchema form
 * If not specify which to query, it will fetch all meta template and return columns and records
 * @param data 
 */
export async function getMetatemplate(metaId:any){
  let currentschema = {
    type: "object",
    properties: {},
  };
  // let metatemplaterecordobj = ref();  
    let rst1 = await request.get(`/api/templates/${metaId}`, {
      params: { q: "category:meta", search: "" },
    });
    // metatemplaterecordobj.value = rst1;
    if (rst1.model) {
      // metatemplaterecordobj.value.model = rst1.model;  
      let temparr = rst1.model;     
      if (_.isArray(temparr)) {
        let schemafileds = generateSchema(temparr);
        schemafileds.forEach((schemafield: any) => {
          Object.assign(currentschema.properties, schemafield);
        });      
      }
    }
    console.log('result of schema:',currentschema);
    return currentschema; 
}

export async function getAllMetatemplates(){
  let metatemplatetableData:any[] =[]   
    let strsql = `/api/templates?q=category:meta&search=`;
    let rst: [] = [];

    await request
      .get(strsql)
      .then((record: any) => {
        rst = record.data;
        if (rst.length > 0) {
        metatemplatetableData = arr(rst);
        }
      })
    return metatemplatetableData;
}

export function getMBTList() {    
    
    const data = requestGet<{ data: any[], total: number }>(`/api2/mbt-models`)
    // 只监听一次，在取到值之后移除监听器
    return data;
   
  }
// export function updateAccountInfo(data: any) {
//   return request<BaseResponse<any>>({
//     url: 'account/update',
//     method: 'post',
//     data,
//   });
// }

// export function updatePassword(data: any) {
//   return request({
//     url: 'account/password',
//     method: 'post',
//     data,
//   });
// }

// export function getInfo() {
//   return request<API.AdminUserInfo>({
//     url: 'account/info',
//     method: 'get',
//   });
// }

// export function permmenu() {
//   return request<API.PermMenu>({
//     url: 'account/permmenu',
//     method: 'get',
//   });
// }

// export function logout() {
//   return request({
//     url: 'account/logout',
//     method: 'post',
//   });
// }
export {}
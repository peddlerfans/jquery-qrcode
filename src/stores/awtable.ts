import { defineStore } from "pinia"
import { RouteRecordRaw } from "vue-router"
import request from "@/utils/request"

export const awStore = defineStore(
    "awstore",
    {
        state: () => {
            return {
                treeData: [],
                tableData: []
            }
        },
        actions: {
            // 获取基础数据的接口
            async query(data: any) {
                return new Promise((resolve, reject) => {
                    request.get("/api/hlfs", { params: data }).then(
                        (res) => {
                            console.log(res);
                        }
                    )
                })
            },

            // 获取属性结构的数据
            async queryTree() {
                return new Promise((resolve, reject) => {
                    request.get<any>("/api/hlfs/_tree").then((res) => {
                        if (res) {
                            this.treeData = res
                            console.log(this.treeData);
                        } else {
                            reject(new Error("请求失败"))
                        }

                    })
                })
            }
        }
    }
)
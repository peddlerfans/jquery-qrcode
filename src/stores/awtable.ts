import { defineStore, Store } from "pinia"
import { RouteRecordRaw } from "vue-router"
import request from "@/utils/request"
import { Stores } from "types/stores"

export const awStore = defineStore(
    "awstore",
    {
        state: (): Stores.awdata => ({
            searchobj: {
                search: "",
                size: 20
            },
            treeDatas: [],
            tableData: []

        }),
        actions: {
            // 获取基础数据的接口
            async query(data?: any) {
                return new Promise((resolve, reject) => {
                    request.get("/api/hlfs", { params: data || this.searchobj }).then(
                        (res) => {
                            this.tableData = res.data
                            console.log(this.tableData);
                        }
                    )
                })
            },

            // 获取属性结构的数据
            async queryTree() {
                return new Promise((resolve, reject) => {
                    request.get<any>("/api/hlfs/_tree").then((res) => {
                        if (res) {
                            this.treeDatas = res
                            console.log(this.treeDatas);
                        } else {
                            reject(new Error("请求失败"))
                        }

                    })
                })
            }
        },
        persist: {
            enabled: true,
            strategies: [
                {
                    key: "tableData",
                    storage: window.localStorage,
                    paths: ["tableData"]
                }
            ]
        }
    }
)
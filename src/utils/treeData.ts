import _ from "lodash";
import {uuid} from "@/utils/Uuid";

// 对象转数组
export function objToArr(obj: any) {
    const arr = []
    if (_.isObject(obj)) {
        for (let i in obj) {
            let oo: any = {
                title: i,
                key: uuid(),
                children: objToArr(obj[i as keyof typeof objToArr])
            };
            if(i === ""){
                i = "/"
                oo = {
                    title: i,
                    key: uuid(),
                    children: objToArr(obj["" as keyof typeof objToArr])
                }
            }
            arr.push(oo)
        }
    }
    return arr
}

/**
 * 文件目录结构转化为树结构
 * */
export function arr2Tree(arr: Array<string>) {
    let treeDTO: any = []
    arr.forEach((item: string) => {
        const nodeArray = item.split('/')
        let children = treeDTO
        // 循环构建子节点
        for (const i of nodeArray) {
            const node = {
                title: i || '/'
            }
            if (children.length === 0) {
                children.push(node)
            }
            let isExist = false
            for (const j in children) {
                if (children[j].title === node.title) {
                    if (!children[j].children) {
                        children[j].children = []
                    }
                    children = children[j].children
                    isExist = true
                    break
                }
            }
            if (!isExist) {
                children.push(node)
                if (!children[children.length - 1].children) {
                    children[children.length - 1].children = []
                }
                children = children[children.length - 1].children
            }
        }
    })
    return treeDTO
}
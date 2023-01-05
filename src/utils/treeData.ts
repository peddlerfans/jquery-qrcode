// 对象转数组
import _ from "lodash";
import {uuid} from "@/utils/Uuid";

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
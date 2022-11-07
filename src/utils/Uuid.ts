


import shortid from 'js-shortid'

const inst = shortid.inst({
    salts:4,
    initTime:'1587025320000'
})


export function uuid(){
    return inst.gen();
}//暴露出一个函数
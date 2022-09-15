import { Stores } from '../../types/stores'
import { MockApi } from '../mockapi'

const treeData: Array<Stores.topTree> = [
    {
        title: 'Setup',
        key: '0-0',
        children: [
            {
                title: 'Display and brightness',
                key: '0-0-0',
                children: [
                    { title: 'Rest screen style', key: '0-0-0-0' },
                    {
                        title: 'screen style', key: '0-0-0-1',
                    },
                    { title: 'Auto lock', key: '0-0-0-2' },
                ],
            },
            {
                title: 'Portable tools',
                key: '0-0-1',
                children: [{ title: 'gesture', key: '0-0-1-0' }],
            },
            {
                title: 'System settings',
                key: '0-0-2',
                children: [
                    { title: 'Reset system', key: '0-0-2-0' },
                    {
                        title: 'Background refresh',
                        key: '0-0-2-1',
                    },
                ],
            },
        ],
    },
    {
        title: 'test',
        key: '0-1',
        children: [
            {
                title: 'Audio and video test',
                key: '0-1-0',
                children: [
                    { title: 'Function panel', key: '0-1-0-0' },
                    { title: 'Collect sound', key: '0-1-0-1' },
                ],
            },
        ],
    },
]
export default <MockApi.obj[]>[
    {
        url: '/hlfs/_tree',
        type: 'get',
        response: (options) => {
            const failRes: MockApi.response = {
                code: 200,
                msg: '获取mbt失败',
                data: null
            }
            if (!options.body) return failRes
            const { mbtname } = options.body
            const mbt = treeData.find(mbt => mbt.title === mbtname)
            if (!mbt) return failRes
            return {
                code: 200,
                msg: 'Get Mbt Successfully',
                data: mbt
            }
        }
    },
    {
        url: '/hlfs/_tree/delet',
        type: 'delete',
        response: (options) => {
            let key = options.body.split("=")[1]
            let index = getTreeDataByItem(treeData, key)

            treeData.splice(index, 1)
            return {
                code: 200,
                msg: 'Get Mbt Successfully',
                data: treeData
            }
        }

    }
]
const getTreeDataByItem = (childs: any, findKey: any): any => {
    let finditem = null;
    for (let i = 0, len = childs.length; i < len; i++) {
        let item = childs[i]
        if (item.key !== findKey && item.children && item.children.length > 0) {
            finditem = getTreeDataByItem(item.children, findKey)
        }
        if (item.key == findKey) {
            finditem = item
        }
        if (finditem != null) {
            break
        }
    }
    return finditem
}
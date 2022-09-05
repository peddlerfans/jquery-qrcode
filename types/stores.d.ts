export namespace Stores {
  interface user {
    name: string
    age: number | null
    sex?: 'male' | 'female' | 'unknown'
    token?: string
  }
  interface awdata {
    searchobj: {
      search: string,
      size: number
    }
    treeDatas: Array<string>
    tableData: Array<any>
  }
}
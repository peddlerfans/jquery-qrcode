export namespace Stores {
  interface user {
    name: string
    age: number | null
    sex?: 'male' | 'female' | 'unknown'
    token?: string
  }

  interface aw {
    name: string,
    description: string,
    path?: string,
    tags?: string[],
    params?: string[],
    name_hash?: string,
    description_hash?: string,
    _id?: string,
    _highlight?: {
      description?: string[]
    }
  }

  interface awView {
    name: string,
    description: string,    
    tags: string,
    params: string 
    
  }


  interface resourceschema {
    name: string,
    type: string
  }
  interface mbt {
    _id: string,
    name: string,
    description: string,
    tags?: string[],
    modelDefinition?: object,
    dataDefinition?: {
      resources: resourceschema[],
      dataType?: string,
      dataUrl?: string,
      data: object,
      metaTemplate?: string,
      meta: object

    }
  }

  interface mbtView {
    _id: string,
    name: string,
    description: string,
    tags: string,
    dataDefinition?: {
      resources: resourceschema[],
      dataType?: string,
      dataUrl?: string,
      data: object,
      metaTemplate?: string,
      meta: object

    }
  }

  interface children {
    title: string,
    key: string
  }
  interface parentTree {
    title: string,
    key: string,
    children?: children[]
  }
  interface topTree {
    title: string,
    key: string,
    children?: parentTree[]
  }

}
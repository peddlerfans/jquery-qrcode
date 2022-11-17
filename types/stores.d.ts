export namespace Stores {
  interface user {
    name: string
    age?: number | null
    sex?: 'male' | 'female' | 'unknown'
    token?: string,
    email?: string,
    avatar_url?: string,
  }

  interface aw {
    name: string,
    description: string,
    path?: string,
    tags?: string[],
    params?: string[],
    name_hash?: string,
    description_hash?: string,
    _id: string,
    template?:string,
    templdate_en?:string,
    _highlight?: {
      description?: string[]
    }
  }

  interface awView {
    _id:string,
    name: string,
    description: string,  
    template?:string,  
    tags: string,
    params?: any 
    
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
    descriptions: string,
    tags?: string,
    codegen_text?:any,
    codegen_script?:any,
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
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
    path: string,
    tags: string[],
    params: string[],
    name_hash: string,
    description_hash: string,
    _id: string,
    _highlight: {
        description: string[]            
    }
  }
}
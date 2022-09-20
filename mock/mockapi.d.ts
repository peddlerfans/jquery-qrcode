export namespace MockApi {
  type type = Lowercase<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>
  type responseFunc = (options: request) => response
  interface request {
    url: string
    type: type
    body: any
    params: unknown
  }
  interface response {
    code?: number
    msg?: string
    data: any
    total?: any

  }
  interface obj {
    url: string
    type?: type
    response: responseFunc | response
  }
}
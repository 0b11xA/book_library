export interface GetBooks {
  data: Book[]
  status: number
  statusText: string
  headers: {}
  config: {}
  request: {}
  [k: string]: unknown
}

export interface Book {
  id: number
  title: string
  author: string
  genre: string
  description: string
  [k: string]: unknown
}


export interface PutBooks {
  data: Book
  status: number
  statusText: string
}

export interface Book {
  id: number
  title: string
  author: string
  genre: string
  description: string
  [k: string]: unknown
}


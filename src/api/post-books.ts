export interface PostBooks {
  data: Book & {id: number}
  status: number
  statusText: string
}

export interface Book {
  title: string
  author: string
  genre: string
  description: string
  [k: string]: unknown
}


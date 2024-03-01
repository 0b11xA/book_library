import { GetBooks } from "./get-books"
import { Book, PostBooks } from "./post-books"
import { PutBooks } from "./put-books"

export type API = {
  fetchBooks: () => Promise<GetBooks>
  addBook: (object: Book) => Promise<PostBooks>
  updateBook: (id: number, object: Book) => Promise<PutBooks>
  deleteBook: (id: number) => Promise<PutBooks>
}

export default API
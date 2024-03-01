import API from "."
import axios from "axios"
import { GetBooks } from "./get-books"
import { Book } from './post-books'
import { PostBooks } from "./post-books"
import { PutBooks } from "./put-books"

export const API_URL = "http://localhost:3001/books"

const fetchBooks = async (): Promise<GetBooks> => {
  return axios.get(API_URL)
}

const addBook = async (object: Book): Promise<PostBooks> => {
  return axios.post(API_URL, object)
}

const updateBook = async (id: number, object: Book): Promise<PutBooks> => {
  return axios.put(`${API_URL}/${id}`, object)

}

const deleteBook = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`)
}

const api: API = {
  fetchBooks,
  addBook,
  updateBook,
  deleteBook,
}

export default api
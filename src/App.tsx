import React, { useCallback, useEffect, useState } from 'react'
// import axios from 'axios'
import { AppBar } from '@mui/material'
import Header  from './components/Header'
import TableControls from './components/TableControls'
import AddEditBook from './components/AddEditBook'
import BookList from './components/BookList'
import api from './api/api'
import './App.css'
import { Book } from './api/get-books'

const App = () => {
  const [data, setData] = useState<Book[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [actionType, setActionType] = useState<'edit' | 'add'>('add')
  const [bookToEdit, setBookToEdit] = useState<Book>()
  const [loadData, setLoadData] = useState<boolean>(true)
 
  useEffect(() => {
    if(loadData) {
      api.fetchBooks()
      .then((response: any) => {
        setData(response.data)
        setLoadData(false)
      })
      .catch((error) => {
        console.log(error)
        setLoadData(false)
      })
    }
  }, [loadData])

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handlClose = useCallback(() => {
    setOpen(false)
    setBookToEdit(undefined)
  }, [])

  const handleEdit = useCallback((bookId: number) => {
    setActionType('edit')
    setBookToEdit(data.filter((element: Book) => element.id === bookId)[0])
    setOpen(true)
  }, [data])


  return (
    <div className="App">
      <AppBar style={{
        background: "#181d2a"
      }}>
        <Header />
        <TableControls handleOpen={handleOpen}/>
      </AppBar>
      <AddEditBook 
        action={actionType}
        open={open}
        handleClose={handlClose}
        book={bookToEdit}
        handleReloadData={setLoadData}
      />
      <BookList 
        books={data} 
        handleEdit={handleEdit}
        handleReloadData={setLoadData}
      />
    </div>
  );
}

export default App;

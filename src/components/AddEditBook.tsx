import React from 'react'
import {
    Button,
    Dialog,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import * as yup from 'yup'
import api from '../api/api'
import { Formik, FormikHelpers } from 'formik'
import { Book } from '../api/post-books'
import { Book as BookToEdit } from '../api/put-books' 

const LABEL = {
    title: "Title",
    author: "Author",
    genre: "Genre",
    description: "Description"
  }


type Props = {
    action: "edit" | "add"
    open: boolean
    handleClose: () => void,
    book?: BookToEdit,
    handleReloadData: (arg: boolean) => void
}

const AddEditBook = ({
    action,
    open,
    handleClose,
    book,
    handleReloadData,
}: Props) => {

    const formInitialValues: Book = {
        title: book?.title ?? "",
        author: book?.author ?? "",
        genre: book?.genre ?? "",
        description: book?.description ?? ""
    }
    
    const validateBookInfo = yup.object().shape({
        title: yup
        .string()
        .required('Book title is required'),
        author: yup
        .string()
        .required('Book author is required'),
        genre: yup
        .string()
        .required('Book genre is required'),
        description: yup
        .string()
        .required('Book description is required')
    })

    const submitForm = async (
        values: {
            title: string
            author: string
            genre: string
            description: string
        },
        { setSubmitting }: FormikHelpers<Book>

    ) => {
        setSubmitting(true)
        if(action === 'add') {
            api.addBook(values)
                .then(response => {
                    setSubmitting(false)
                    handleClose()
                    handleReloadData(true)
                })
                .catch(e => {
                    setSubmitting(false)
                })
        } else {
            const updateBook: BookToEdit = {...values, ...{id: Number(book?.id)}}
            api.updateBook(Number(book?.id), updateBook)
                .then(response => {
                    setSubmitting(false)
                    handleClose()
                    handleReloadData(true)
                })
                .catch(e => {
                    setSubmitting(false)
                })
        }
    }

    return (
        <div>
            <Dialog 
                open={open} 
            >
                <DialogTitle>{action === "add" ? "Add Book" : "Edit Book"}</DialogTitle> 
                <DialogContent>
                    <Formik
                        initialValues={formInitialValues}
                        onSubmit={submitForm}
                        validationSchema={validateBookInfo}
                        enableReinitialize={true}
                    >
                        {(props: any) => {
                            const {
                                values,
                                touched,
                                errors,
                                isSubmitting,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                            } = props
                            return (
                                <form 
                                    onSubmit={handleSubmit}
                                    style={{
                                        display: 'flex',
                                        flexFlow: "column"
                                    }}
                                >
                                    <div>
                                        <TextField
                                            error={errors.title && touched.title}
                                            label={LABEL.title}
                                            name={LABEL.title.toLowerCase()}
                                            value={values.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={errors.title && touched.title && errors.title}
                                            margin={"normal"}
                                            disabled={isSubmitting}
                                            fullWidth={true}
                                        />
                                        <TextField
                                            error={errors.author && touched.author}
                                            label={LABEL.author}
                                            name={LABEL.author.toLowerCase()}
                                            value={values.author}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={errors.author && touched.author && errors.author}
                                            margin={"normal"}
                                            disabled={isSubmitting}
                                            fullWidth={true}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            error={errors.genre && touched.genre}
                                            label={LABEL.genre}
                                            name={LABEL.genre.toLowerCase()}
                                            value={values.genre}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={errors.genre && touched.genre && errors.genre}
                                            margin={"normal"}
                                            disabled={isSubmitting}
                                            fullWidth={true}
                                        />
                                        <TextField
                                            error={errors.description && touched.description}
                                            label={LABEL.description}
                                            name={LABEL.description.toLowerCase()}
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={errors.description && touched.description && errors.description}
                                            margin={"normal"}
                                            disabled={isSubmitting}
                                            fullWidth={true}
                                        />
                                    </div>
                                    <div>
                                        <DialogActions>
                                            <Button
                                                type="button"
                                                variant="outlined"
                                                className="outline"
                                                onClick={handleClose}
                                                disabled={isSubmitting}
                                                color='secondary'
                                            >
                                                {'CLOSE'}
                                            </Button>
                                            <Button 
                                                type="submit" 
                                                variant={"outlined"}
                                                disabled={isSubmitting}
                                                color='secondary'
                                            >
                                                {'ADD'}
                                            </Button>
                                        </DialogActions>
                                    </div>
                                </form>
                            )
                        }}
                    </Formik>
                </DialogContent>
                
            </Dialog>
        </div>
    )
}

export default AddEditBook;
import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import api from '../api/api'
import { Book } from '../api/get-books'

type Props = {
    books?: Book[] 
    handleEdit: (arg: number) => void,
    handleReloadData: (arg: boolean) => void
}

const BookList = ({
    books,
    handleEdit,
    handleReloadData,
}: Props) => {

    const handleDelete = async (bookId: number) => {
        api.deleteBook(bookId)
        .then((response: any) => {
            handleReloadData(true)
        })
    }


    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                maxHeight: 600,
                overflow: 'scroll',
                marginTop: 140
            }}
        >
            <List sx={{ 
                width: '100%', 
                padding: '0px 10px', 
                alignContent: 'center',
                justifyContent: 'center', 
                bgcolor: '#a9b7cb',
            }}>
                {books?.map((book) => (
                    <div
                        key={book.id}
                    >
                        <ListItem
                            alignItems="flex-start"
                            key={book?.id}
                            disableGutters
                            style={{
                                background: '#181d2a',
                                borderRadius: 5,
                                margin: '5px 0',
                                padding: '0 10px'
                            }}
                            secondaryAction={
                                <React.Fragment>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexFlow: 'column'
                                        }}
                                    >
                                        <IconButton 
                                            onClick={() => handleEdit(book.id)}
                                            size={'small'} 
                                            aria-label="edit"
                                        >
                                            <EditIcon htmlColor={'#9c27b0'} fontSize={'small'}/>
                                        </IconButton>
                                        <IconButton 
                                            onClick={() => handleDelete(book.id)}
                                            size={'small'} 
                                            aria-label="view"
                                        >
                                            <DeleteIcon htmlColor={'#9c27b0'} fontSize={'small'}/>
                                        </IconButton>
                                    </div>
                                </React.Fragment>
                            }
                        >
                            <ListItemText
                                primary={book?.title}
                                sx={{ maxWidth: '85%', alignContent: 'center',justifyContent: 'center', bgcolor: 'efd604', color: '#95d3e9' }}
                                secondary={
                                    <React.Fragment>
                                        <div>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color={'#95d3e9'}
                                            >
                                                By {book.author}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color={'#95d3e9'}
                                            >
                                                Genre: {book.genre}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color={'#95d3e9'}
                                            >
                                                Description: {book.description}
                                            </Typography>
                                        </div>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </div>
                ))}
            </List>
        </div>
    )
}

export default BookList;

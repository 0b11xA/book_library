import React from 'react'
import { Button } from '@mui/material';

type Props = {
    handleOpen: () => void
}

const TableControls = ({
    handleOpen
}: Props) => {
    
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 10
            }}
        >
            <Button
                size={'large'}
                sx={{
                    width: 200,
                }}
                color='secondary'
                variant={'outlined'}
                onClick={() => handleOpen()}
            >
                {'+Add Book'}
            </Button>
        </div>
    )
}

export default TableControls;
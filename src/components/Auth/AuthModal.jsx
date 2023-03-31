import React, {useState} from 'react'
import {connect} from '../../websocket/websocket'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField
} from '@mui/material'

const AuthModal = ({name, setName}) => {
    const [open, setOpen] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        connect(name, setOpen, setLoading, setError)
    }

    const handleOnChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Welcome</DialogTitle>
            <DialogContent>
                <Stack direction={'column'} spacing={2}>
                    <DialogContentText>
                        Enter your username
                    </DialogContentText>
                    <TextField
                        helperText={error}
                        autoFocus
                        label="Username"
                        type='name'
                        fullWidth
                        value={name}
                        onChange={handleOnChange}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    aria-busy={loading}
                    onClick={handleSubmit}>Start mailing</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AuthModal
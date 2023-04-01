import React, {useState} from 'react'
import {Autocomplete, Box, Button, Input, Stack, TextField} from '@mui/material'
import {client, setUsersSetter} from '../../websocket/websocket'
import {Send} from '@mui/icons-material'

const NewMessage = () => {
    const [receiver, setReceiver] = useState('')
    const [users, setUsers] = useState([])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleReceiverChange = (event, value) => {
        setReceiver(value)
    }

    const handleTitleChange = (e) =>{
        const target = e.target
        setTitle(target.value)
    }

    const handleBodyChange = (e) => {
        const target = e.target
        setBody(target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        client.send(JSON.stringify({
            action: 'sendMessage',
            data: {
                receiver: receiver,
                title: title,
                body: body,
            }
        }))
        setTitle('')
        setBody('')
        setReceiver('')
    }

    const getUsers = () => {
        setUsersSetter(setUsers)
        client && client.send(JSON.stringify({action: 'getUsers'}))
    }

    return (
        <Box component="form" onSubmit={handleSubmit} padding={'20px'}>
            <Stack direction="column" spacing={2}>
                <Autocomplete
                    freeSolo
                    renderInput={(params) => (
                        <TextField
                            variant='standard'
                            required
                            onClick={getUsers}
                            {...params}
                            label={'To'}/>
                    )}
                    getOptionLabel={(option) => {
                        if (typeof option === 'number') {
                            return users[option]
                        }
                        return option
                    }}
                    onInputChange={handleReceiverChange}
                    options={users} label="Receiver name"/>
                <Input
                    required
                    onChange={handleTitleChange}
                    value={title}
                    label="Title"
                    placeholder="Title"
                />
                <Input
                    required
                    onChange={handleBodyChange}
                    value={body}
                    multiline
                    minRows={7}
                    maxRows={150}
                    label="Message text"
                    placeholder="Message text"
                />
                <Button startIcon={<Send/>} variant="contained" type="submit">Send a Message</Button>
            </Stack>
        </Box>
    )
}

export default NewMessage
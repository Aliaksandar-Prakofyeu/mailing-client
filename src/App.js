import NavBar from './components/Navbar/NavBar'
import {Alert, Box, Snackbar, Stack} from '@mui/material'
import AuthModal from './components/Auth/AuthModal'
import {setInitialMessagesSetter, setTriggerPopup} from './websocket/websocket'
import React, {useState} from 'react'
import NewMessage from './components/Messages/NewMessage'
import Messages from './components/Messages/Messages'

const App = () => {
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])
    const [snack, setSnack] = useState('')

    setInitialMessagesSetter(messages, setMessages)
    setTriggerPopup(setSnack)

    return (<Box height="100vh" display="flex" flexDirection="column">
            <Snackbar
                open={snack !== ''}
                autoHideDuration={4000}
                onClose={() => setSnack('')}>
                <Alert
                    onClose={() => setSnack('')}
                    severity="error"
                    sx={{width: '100%'}}>
                    {snack}
                </Alert>
            </Snackbar>
            <NavBar name={name}/>
            <AuthModal name={name} setName={setName}/>
            <Stack flex={1} overflow="auto" direction="column" spacing={2}>
                <NewMessage/>
                <Messages name={name} messages={messages}/>
            </Stack>
        </Box>

    )
}

export default App
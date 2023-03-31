import React from 'react'
import {Box, Stack} from '@mui/material'
import Message from './Message'

const Messages = ({messages, name}) => {
    return (
        <Box padding={'20px'}>
            <Stack direction={'column-reverse'}>
                {messages.map((message) => {
                    if (message.receiver !== name) {
                        return undefined
                    }
                    return (
                        <Message message={message}/>
                    )
                })}
            </Stack>
        </Box>

    )
}

export default Messages
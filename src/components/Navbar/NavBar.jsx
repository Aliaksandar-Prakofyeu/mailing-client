import React from 'react'
import {AppBar, Box, Toolbar, Typography} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'

const NavBar = ({name}) => {
    return (
        <AppBar position="sticky" >
            <Toolbar>
                <EmailIcon fontSize={'large'}/>
                <Typography variant={'h5'} sx={{ flexGrow: 1 }}>Mail</Typography>
                <Box>
                    <Typography variant={'h6'} alignSelf={'flex-end'}>Current user: {name}</Typography>
                </Box>
            </Toolbar>

        </AppBar>
    )
}

export default NavBar
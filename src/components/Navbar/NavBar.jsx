import React from 'react'
import {AppBar, Toolbar, Typography} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'

const NavBar = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <EmailIcon fontSize={'large'}/>
                <Typography variant={'h5'}>Mail</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
import React, {useState} from 'react'
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from '@mui/material'
import TimeAgo from 'timeago-react'
import {ExpandMore} from '@mui/icons-material'


const Message = ({message}) => {
    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (e, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <Box>
            <Accordion expanded={expanded === message.id} onChange={handleChange(message.id)}>
                <AccordionSummary
                    expandIcon={<ExpandMore/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header">
                    <Typography sx={{width: '15%', flexShrink: 0}}>
                        From: {message.sender}
                    </Typography>
                    <Typography sx={{width: '55%', flexShrink: 0}}>
                        Title: {message.title}
                    </Typography>
                    <Typography sx={{width: '30%', color: 'text.secondary'}} alignSelf={'flex-end'}><TimeAgo
                        datetime={message.createdAt}/></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {message.body}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>

    )
}

export default Message
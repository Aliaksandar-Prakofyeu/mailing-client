export let client

let messagePoller
let setInitMessages
let messages
let setUsers
let setSnack

export const setTriggerPopup = (setSnackFunc) => {
    setSnack = setSnackFunc
}

export const setInitialMessagesSetter = (initialMessages, setInitialMessagesFunc) => {
    messages = initialMessages
    setInitMessages = setInitialMessagesFunc

    if (messagePoller === undefined) {
        messagePoller = setInterval(() => {
            if (client) {
                client.send(
                    JSON.stringify({
                        action: 'getMessages',
                    })
                )
            }
        }, 5000)
    }
}

export const setUsersSetter = (setUsersFunc) => {
    setUsers = setUsersFunc
}

function handleErrorMessage(message) {
    if (setSnack) {
        setSnack(message)
    }
}

const handleMessages = (messagesData) => {
    messages = sortMessagesByDate(messagesData)
    if (setInitMessages) {
        setInitMessages(messages)
    }
}

const handleUsers = (usersData) => {
    const sortedUsers = usersData.sort()
    if (setUsers) {
        setUsers(sortedUsers)
    }
}

const normalMessageHandler = (e) => {
    const messageData = JSON.parse(e.data)
    const {result, data} = messageData
    switch (result) {
        case 'error':
            handleErrorMessage(data)
            break
        case 'messages':
            handleMessages(data)
            break
        case 'userList':
            handleUsers(data)
            break
        default:
            break
    }
}

const sortMessagesByDate = (messages) => {
    return messages.sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt))
}

export const connect = async (name, setOpen, setLoading, setError) => {
    client = new WebSocket('ws://mailing-server-production.up.railway.app/websocket')

    client.onopen = () => {
        client.send(
            JSON.stringify({
                action: 'setName',
                data: name,
            })
        )
    }

    client.onclose = () => {
        clearInterval(messagePoller)
        setOpen(true)
        setLoading(false)
        setError('Disconnected')
    }

    client.onmessage = (event) => {
        const req = JSON.parse(event.data)
        if (req.result === 'success' && setOpen && setInitMessages) {
            setOpen(false)
            let messages = req.data
            messages = messages.sort((a, b) => {
                return parseInt(b.date) - parseInt(a.date)
            })
            setInitMessages(messages)
            client.onmessage = normalMessageHandler
        } else {
            setOpen(true)
            setError(req.data)
        }
        setLoading(false)
    }
}

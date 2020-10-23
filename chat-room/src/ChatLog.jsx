import React, { useState } from 'react'
import ChatBar from './ChatBar'

const ChatLog = (props) => {
    const [currentLog, setLog] = useState([])

    const updateChat = (chat) => {
        console.log(chat);
        props.connection.send(chat);
        setLog([...currentLog, chat]);
    }
    
    props.connection.onmessage = function(e) {
        setLog([...currentLog, e.data]) 
    }

    console.log("CL", currentLog);

    return (
        <div>
            {currentLog.map((value) => <h2>{value}</h2>)}
            <ChatBar updateChat={updateChat}/>
        </div>
    )

}

export default ChatLog
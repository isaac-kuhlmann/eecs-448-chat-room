import React, { useState } from 'react';

const ChatBar = (props) => {
    const [chatInput, setInput] = useState("");
    
    const input = <input 
    value={chatInput} 
    onChange={e => setInput(e.target.value)} 
    onKeyDown={(e) => {
        if (e.key === "Enter") {
            props.updateChat(chatInput)
            setInput("")
        }
    }} 
    type="text" />

    return (
        <>
            {input}
        </>
    )
}

export default ChatBar
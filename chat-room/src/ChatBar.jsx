import React, { useState } from 'react';

const ChatBar = ({ updateChat }) => {
    const [chatInput, setInput] = useState("");

    const input = <input
        id="messageBox"
        value={chatInput}
        onChange={e => setInput(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === "Enter") {
                updateChat(chatInput)
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
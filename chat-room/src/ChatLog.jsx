import React, { useState } from 'react'
import ChatBar from './ChatBar'
import fire from "./fire"
// import { Chat } from "./Chat"

const ChatLog = ({ user, connection }) => {
    const [currentLog, setLog] = useState([])

    const updateChat = (chat) => {
        console.log(chat);
        connection.send(chat);
        let newChat = fire.database().ref("Chats").push({
            user: user,
            content: chat
        });
        let users = fire.database().ref("Users");
        users.child(user.name).update({
            user: user,
            guid: newChat.key
        })
        setLog([...currentLog, { name: user.name, chat: chat }]);
    }

    connection.onmessage = function (e) {
        setLog([...currentLog, { name: "Stranger", chat: e.data }])
    }

    console.log("CL", currentLog);

    return (
        <div id="chatLog">
            <div>
                {/* {currentLog.map(({ name, chat }) => <Chat name={name} chat={chat} />)} */}
            </div>
            <ChatBar updateChat={updateChat} />
        </div>
    )

}

/* Potential Retreiving data 
firebase
      .database()
      .ref(
        firebase_basepath + `${tenantId}/${userId}/task/product/${referenceId}`
      )
      .on("value", snapshot => {
        console.log("FireB ",snapshot)
        if (snapshot && snapshot.exists()) {
           //Set values in state which can be extracted in jsx in render. 
        }})
*/

export default ChatLog
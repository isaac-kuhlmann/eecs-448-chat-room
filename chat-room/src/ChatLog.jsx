import React, { useState } from 'react'
import ChatBar from './ChatBar'
import fire from "./fire" 

const ChatLog = (props) => {
    const [currentLog, setLog] = useState([])

    const updateChat = (chat) => {
        console.log(chat);
        props.connection.send(chat);
        fire.database().ref("Push").push({
            name: "Trial users",
            content: chat,
            age: "13"
        });
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
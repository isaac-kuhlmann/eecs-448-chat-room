import React, { useEffect, useState } from 'react';
import './App.css'
import Login from './Login'
import fire from './fire'
import Dashboard from './Dashboard';

const App = () => {
  const [user, setUser] = useState({ name: "defacto" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [chats, setChats] = useState([]);
  const [channels, setChannels] = useState(["Chatroom", "Chatroom 2"]);
  const [currentChannel, setCurrentChannel] = useState("Chatroom");

  const handleLogin = (username) => {
    setUser({ name: username });
    setLoggedIn(true);
  }

  // Update chats based upon currentChannel
  useEffect(() => {
    const oldChats = fire.database().ref(currentChannel);
    oldChats.on("value", function(snapshot) {
      let oldChatLog = [];
      console.log(snapshot.val());
        if(snapshot.val()){
            Object.entries(snapshot.val()).forEach((key) => {
              console.log(key);
              oldChatLog.push({ name: key[1].user.name, chat: key[1].content});
            });
        }
        setChats(oldChatLog);
    })
  }, [currentChannel]);

  console.log("CC", currentChannel);

  return (
    <div className="App">
      {
        loggedIn ?
        <Dashboard 
          user={user} 
          setUser={setUser} 
          chats={chats} 
          channels={channels} 
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
        /> :
        <Login onLogin={handleLogin} />
      }
    </div>
  );
}

export default App;

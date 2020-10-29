import React, { useEffect, useState } from 'react';
import './App.css'
import Login from './Login'
import fire from './fire'
import Dashboard from './Dashboard';

const App = (props) => {
  const [user, setUser] = useState({ name: "defacto" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [chats, setChats] = useState([]);

  const handleLogin = (username) => {
    setUser({ name: username });
    setLoggedIn(true);
  }

  useEffect(() => {
    console.log("USING EFFECT");
    const oldChats = fire.database().ref("Chatroom");
    oldChats.on("value", function(snapshot) {
      let oldChatLog = [];
      console.log(snapshot.val());
        if(snapshot.val()){
            Object.entries(snapshot.val()).forEach((key) => {
              console.log(key);
              oldChatLog.push({ name: key[1].user.name, chat: key[1].content});
            });
        }
        console.log("OLD", oldChatLog);
        setChats(oldChatLog);
    })

  }, []);

  return (
    <div className="App">
      {
        loggedIn ?
        <Dashboard user={user} chats={chats} /> :
        <Login onLogin={handleLogin} />
      }
    </div>
  );
}

export default App;

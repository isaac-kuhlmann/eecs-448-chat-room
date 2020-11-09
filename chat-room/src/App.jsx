import React, { useEffect, useState } from 'react';
import './App.css'
import Login from './Login'
import fire from './fire'
import Dashboard from './Dashboard';

const DEFAULT_CHANNEL = "Chatroom";
/*
* Pre: NA
* Params: NA
* Post: App has succesfully rendered, user is either redirected to Login, or Chat page depending
      on current state of User Login
* Return: The App React Component
*/
const App = () => {
  const [user, setUser] = useState({ name: "defacto", lastChannel: DEFAULT_CHANNEL });
  const [loggedIn, setLoggedIn] = useState(false);
  const [chats, setChats] = useState([]);
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState();


  /*
  * Pre: App component rendering
  * Params: Username: username for logging in; Success, whether or not the login was successful
  * Post: User state is updated to reflect the logged in user
  * Return: None
  */
  const handleLogin = (username, success) => {
    if (success) {
      let users = fire.database().ref(`Users/${username}`);
      users.once("value", (snap) => {
        let currentUser = snap.val();
        if (!currentUser) {
          console.log("New User Created");
          users.child(username).update({
            name: username,
            lastChannel: DEFAULT_CHANNEL
          });

          setUser({ name: username, lastChannel: DEFAULT_CHANNEL });
          setCurrentChannel(DEFAULT_CHANNEL);
          return;
        }
        console.log("user", currentUser, currentUser.lastChannel);
        if (channels.includes(currentUser.lastChannel)) {
          setUser({ name: username, lastChannel: currentUser.lastChannel });
        } else {
          setCurrentChannel(currentUser.lastChannel);
          console.error("Last Channel Missing From Database");
          setUser({ name: username, lastChannel: DEFAULT_CHANNEL });
          setCurrentChannel(DEFAULT_CHANNEL);
        }
      });
      setLoggedIn(true);
    }
    else {
      console.error("Login Failed")
    }
  }

  useEffect(() => {
    retrieveChannels();
  }, []);

  /*
  * Pre: Called when start new channel 
  * Params: no parameters passed
  * Post: Push name of channel and put into firebase 
  * Return: nothing  
  */
  const retrieveChannels = () => {
    let chatrooms = fire.database().ref("Chatrooms");
    chatrooms.on("value", function (snapshot) {
      let currentRooms = [];
      console.log("ChatRoom Snap: ", snapshot.val());
      if (snapshot.val()) {
        Object.entries(snapshot.val()).forEach((key) => {
          // Push the Chatroom name/key
          currentRooms.push(key[0]);
        })
      }
      setChannels(currentRooms);
    })
  }

  /*
  * Pre: Called in main
  * Params: none
  * Post: Update chats based upon currentChannel
  * Return: returns a new chat
  */
  useEffect(() => {
    const oldChats = fire.database().ref("Chatrooms/" + currentChannel);
    oldChats.on("value", function (snapshot) {
      let oldChatLog = [];
      console.log(snapshot.val());
      if (snapshot.val()) {
        Object.entries(snapshot.val()).forEach((key) => {
          console.log(key);
          oldChatLog.push({ name: key[1].user.name, chat: key[1].content });
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
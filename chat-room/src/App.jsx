import React, { useState } from 'react';
import './App.css'
// import ChatLog from './ChatLog'
import Login from './Login'

import Dashboard from './Dashboard';

const App = (props) => {
  const [user, setUser] = useState({ name: "defacto" });
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = (username) => {
    setUser({ name: username });
    setLoggedIn(true);
  }



  return (
    <div className="App">
      {
        loggedIn ?
        <Dashboard user={user} connection={props.conn} /> :
        <Login onLogin={handleLogin} />
      }
    </div>
  );
}

export default App;

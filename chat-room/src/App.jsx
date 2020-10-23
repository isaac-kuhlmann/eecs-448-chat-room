import './App.css'
import ChatLog from './ChatLog'

const App = (props) => {
  return (
    <div className="App">
      <ChatLog connection={props.conn}/>
    </div>
  );
}

export default App;

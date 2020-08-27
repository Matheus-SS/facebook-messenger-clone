import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import database from './config/firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

import Message from './components/Message';


function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');

  // load the data from database
  useEffect(() => {
    database.collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      })
  }, [])


  useEffect(() => {
    setUserName(prompt('Por favor entre com seu nome'))
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();

    database.collection('messages').add({
      message: input,
      username: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('');
  }
  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt="facebook-messenger" />
      <h1>Facebook messenger clone 🚀 !</h1>
      <h2>Bem vindo {userName}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)} />
          <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" onClick={sendMessage} type="submit">
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <div className="container__message">
        <FlipMove>
          {
            messages.map(({ id, message }) => (
              <Message key={id} username={userName} message={message} />
            ))
          }
        </FlipMove>
      </div>


    </div>
  );
}

export default App;

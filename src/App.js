import React, {Fragment, useState} from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import NewUserPage from './pages/NewUserPage';

function App() {
  const [newUser, setNewUser] = useState(null)
  const [friends, setFriends] = useState([])

  const handleClick = () => {
    fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(json => {
          const {gender, name, email, picture} = json.results[0]
          setNewUser({
          gender,
          name,
          email,
          picture
        })
      })
  }
 
  const handleAddToFriends = () => {
    if (!friends.includes(newUser)) {
      setFriends([...friends, newUser])
    }
  }

  return (
    <>

        <Route exact path="/" render={() => <NewUserPage />} />
        <Route exact path="/friends/email" render={() => <h1>friends posts</h1>} />
        <Route exact path="/posts" render={() => <h1>All Posts</h1>} />
    </>
  );
}



export default App;

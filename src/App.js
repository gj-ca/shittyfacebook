import React, {Fragment, useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import NewUserPage from './pages/NewUserPage';
import NewPostPage from './pages/NewPostPage';

function App() {
  useEffect(() => {
    // database fetching friends from
    setTimeout(() => {
      setFriends([
        {
          name: {
            first: "Glen",
            last: "Johnson"
          },
          email: "foo@bar.com",
          picture: {
            large: ""
          },
          gender: "male"
        }, 
        {
          name: {
            first: "Brayden",
            last: "O'Gorman"
          },
          email: "b@g.com",
          picture: {
            large: ""
          },
          gender: "male"
        }, 
        {
          name: {
            first: "Chris",
            last: "Baker"
          },
          email: "c@b.com",
          picture: {
            large: ""
          },
          gender: "male"
        }, {
          name: {
            first: "Kate",
            last: "Brandley"
          },
          email: "potato@potato.com",
          picture: {
            large: ""
          },
          gender: "female"
        }, {
          name: {
          first: "Noe",
          last: "Hsu"
          },
          email: "noe@hsu.com",
          picture: {
          large: ""
          },
          gender: "male"
          }
      ])
    }, 2000)
  }, [])

  const [newUser, setNewUser] = useState(null)
  const [friends, setFriends] = useState([])
  const [posts, setPosts] = useState([])

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

  const addToPosts = newPost => {
    setPosts([...posts, newPost])
  }

  return (
    <>
        <Link to="/posts/new">New Post</Link>
        <Link to="/">Home</Link>
        <Route exact path="/" render={() => <NewUserPage {
          ...{handleAddToFriends, handleClick, friends, newUser}
          }/>} 
        />
        <Route exact path="/friends/:name" render={() => <h1>friends posts</h1>} />
        <Route exact path="/posts" render={() => <h1>All Posts</h1>} />
        <Route exact path="/posts/new" render={() => <NewPostPage {
          ...{addToPosts, friends}
          }/>} 
        />
    </>
  );
}

export default App;

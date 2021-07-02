import React, {Fragment, useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import NewUserPage from './pages/NewUserPage';
import NewPostPage from './pages/NewPostPage';
import PostsIndexPage from './pages/PostsIndexPage'
import FriendsPostsPage from './pages/FriendsPostsPage'

function App() {
  // State Declarations
  const [newUser, setNewUser] = useState(null)
  const [friends, setFriends] = useState([])
  const [posts, setPosts] = useState([])

  // Component Mounting
  useEffect(() => {
    // database fetching friends from
    fetch(`${process.env.REACT_APP_BACKEND_URL}/friends`)
      .then(res => res.json())
      .then(json => setFriends(json))
    fetch(process.env.REACT_APP_BACKEND_URL + "/posts")
        .then(res => res.json())
        .then(json => setPosts(json))
  }, [])

  const handleClick = () => {
    fetch(process.env.REACT_APP_API_URL)
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
      <nav style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
        <Link to="/posts/new">New Post</Link>
        <Link to="/posts">All Posts</Link>
        <Link to="/">Home</Link>
      </nav>
        <Route exact path="/" render={() => <NewUserPage {
          ...{handleAddToFriends, handleClick, friends, newUser}
          }/>} 
        />
        <Route exact path="/friends/:name" render={() => <FriendsPostsPage />} />
        <Route exact path="/posts" render={() => <PostsIndexPage posts={posts}/>} />
        <Route exact path="/posts/new" render={() => <NewPostPage {
          ...{addToPosts, friends}
          }/>} 
            
        />
    </>
  );
}

export default App;

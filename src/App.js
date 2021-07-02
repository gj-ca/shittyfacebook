import React, {Fragment, useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import NewUserPage from './pages/NewUserPage';
import NewPostPage from './pages/NewPostPage';
import PostsIndexPage from './pages/PostsIndexPage'
import FriendsPostsPage from './pages/FriendsPostsPage'
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  // State Declarations
  const [newUser, setNewUser] = useState(null)
  const [friends, setFriends] = useState([])
  const [posts, setPosts] = useState([])
  const [authenticated, setAuthenticated] = useState(false)

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
        {authenticated ? (
          <button onClick={() => setAuthenticated(false)}>Sign Out</button>
          ) : (
            <>
              <Link to="/users/sign_up">Sign Up</Link>
              <Link to="/users/sign_in">Sign In</Link>
            </>
          )}
      </nav>
      {/* User signed in ? false */}
      <Route exact path="/users/sign_up" render={() => <SignUpPage setAuthenticated={setAuthenticated}/>} />
      <Route exact path="/users/sign_in" render={() => <SignInPage setAuthenticated={setAuthenticated}/>} />
      {/* User signed in ? true */}
      <PrivateRoute exact path="/" authenticated={authenticated}>
        <NewUserPage {...{handleAddToFriends, handleClick, friends, newUser}} />
      </PrivateRoute>
      <PrivateRoute exact path="/friends/:name" authenticated={authenticated}>
        <FriendsPostsPage />
      </PrivateRoute> 
      <PrivateRoute exact path="/posts" authenticated={authenticated}>
        <PostsIndexPage posts={posts}/>
      </PrivateRoute> 
      <PrivateRoute exact path="/posts/new" authenticated={authenticated}>
        <NewPostPage {...{addToPosts, friends}}/>
      </PrivateRoute>
    </>
  );
}

function PrivateRoute({authenticated, children, ...rest}) {
  return (
    <Route 
      {...rest}
      render={({ location }) => 
        authenticated ? (children) : (<h1>You are not logged in</h1>)
      } />
  )
}

export default App;

import React, {useEffect, useState, useReducer, useContext} from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import NewUserPage from './pages/NewUserPage';
import NewPostPage from './pages/NewPostPage';
import PostsIndexPage from './pages/PostsIndexPage'
import FriendsPostsPage from './pages/FriendsPostsPage'
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Context, {reducer, initialValue} from "./context"

function App() {
  // State Declarations
  const [friends, setFriends] = useState([])
  const [posts, setPosts] = useState([])
  const [context, dispatch] = useReducer(reducer, initialValue)

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
          console.log("foo")
          dispatch({
            type: "setUser",
            value: {
              gender,
              name,
              email,
              picture
            }
          })
      })
  }
 
  const handleAddToFriends = () => {
    const {newUser} = context
    if (!friends.includes(newUser)) {
      setFriends([...friends, newUser])
    }
  }

  const addToPosts = newPost => {
    setPosts([...posts, newPost])
  }

  return (
    <>
      <Context.Provider value={{...context, dispatch}}>
        <nav style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
          <Link to="/posts/new">New Post</Link>
          <Link to="/posts">All Posts</Link>
          <Link to="/">Home</Link>
          {context.authenticated ? (
            <button onClick={() => dispatch({
              type: "setAuthenticated",
              value: false
            })}>Sign Out</button>
            ) : (
              <>
                <Link to="/users/sign_up">Sign Up</Link>
                <Link to="/users/sign_in">Sign In</Link>
              </>
            )}
        </nav>
        {/* User signed in ? false */}
        <Route exact path="/users/sign_up" render={() => <SignUpPage />} />
        <Route exact path="/users/sign_in" render={() => <SignInPage />} />
        {/* User signed in ? true */}
        <PrivateRoute exact path="/" >
          <NewUserPage {...{handleAddToFriends, handleClick, friends}} />
        </PrivateRoute>
        <PrivateRoute exact path="/friends/:name" >
          <FriendsPostsPage />
        </PrivateRoute> 
        <PrivateRoute exact path="/posts" >
          <PostsIndexPage posts={posts}/>
        </PrivateRoute> 
        <PrivateRoute exact path="/posts/new" >
          <NewPostPage {...{addToPosts, friends}}/>
        </PrivateRoute>
      </Context.Provider>
    </>
  );
}

function PrivateRoute({children, ...rest}) {
  const {authenticated } = useContext(Context)
  return (
    <Route 
      {...rest}
      render={({ location }) => 
        authenticated ? (children) : (<h1>You are not logged in</h1>)
      } />
  )
}

export default App;

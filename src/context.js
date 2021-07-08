import React, {createContext} from 'react'

export const initialValue = {
    newUser: null,
    friends: [],
    posts: [],
    authenticated: false
}

export function reducer(state, action) {
    console.log(state)
    console.log(action)
    switch (action.type) {
        case "setAuthenticated":
            return {...state, authenticated: action.value}
        case "setUser":
            return {...state, newUser: action.value}
    }
}

export default createContext(initialValue)
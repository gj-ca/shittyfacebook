import React from 'react'

export default function Person({friend}) {
    const {name, gender, picture} = friend
    return (
      <dl>
        <dt>Name:</dt>
        <dd>{name.first} {name.last}</dd>
        <dt>Gender:</dt>
        <dd>{gender}</dd>
        <dt>Picture:</dt>
        <dd><img src={picture.large} /></dd>
      </dl>
    )
  }
import React from 'react'

const Post = ({ url }) => {
  return (
    <img
      src={url}
      alt="food"
      width="200"
      height="200"
      className="post"
    />
  )
}

export default Post

// src/pages/UpdatePost.jsx
import React from 'react'
import { Form } from '../components'

const UpdatePost = () => {
  const post = {
    id: 1,
    title: 'Existing Post Title',
    content: 'Existing post content...',
    image: '' // Existing image URL
  }

  const handleUpdatePost = (values) => {
    // Function to handle post update
    console.log('Update post with values:', values)
  }

  return <Form post={post} onSubmit={handleUpdatePost} />
}

export default UpdatePost

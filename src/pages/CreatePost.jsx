// src/pages/CreatePost.jsx
import React from 'react'
import { Form } from '../components'

const CreatePost = () => {
  const handleCreatePost = (values) => {
    // Function to handle post creation
    console.log('Create post with values:', values)
  }

  return <Form onSubmit={handleCreatePost} />
}

export default CreatePost

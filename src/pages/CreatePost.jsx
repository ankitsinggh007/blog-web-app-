// src/pages/CreatePost.jsx
import React from 'react'
import { Form } from '../components'
import { useDispatch } from 'react-redux'

const CreatePost = () => {
  const dispatch = useDispatch()
  const handleCreatePost = (values) => {
    // Function to handle post creation
    // dispatch(values, token);
    console.log(values)
  }

  return <Form onSubmit={handleCreatePost} />
}

export default CreatePost

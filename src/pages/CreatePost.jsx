import React, { useEffect } from 'react'
import { Form } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../features/posts/postApi'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import {
  resetCurrentPost,
  resetCreatePost,
  clearfetchAllPosts,
  clearfetchMyPosts
} from '../features/posts/postSlice'
const CreatePost = () => {
  const dispatch = useDispatch()
  const { createPost: creatingPost } = useSelector((state) => state.posts)
  const { status, error, message } = creatingPost
  const navigate = useNavigate()

  useEffect(() => {
    // Clear the post state when the component is unmounted
    return () => {
      dispatch(resetCreatePost())
    }
  }, [dispatch])

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('Post created successfully!')
      setTimeout(() => {
        navigate('/')
      }, 2000) // Redirect after 2 seconds
    }

    if (status === 'failed') {
      toast.error(`Error: ${error || message}`)
    }
  }, [status, error, navigate])

  const handleCreatePost = (values) => {
    try {
      dispatch(createPost(values)).unwrap()
      dispatch(clearfetchAllPosts())
      dispatch(clearfetchMyPosts())
    } catch (error) {
      toast.error(error.message || 'Failed to create post')
    }
  }

  return (
    <div>
      <Toaster /> {/* Toast notifications */}
      <Form onSubmit={handleCreatePost} />
    </div>
  )
}

export default CreatePost

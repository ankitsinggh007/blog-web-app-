import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form } from '../components'
import { useDispatch } from 'react-redux'
import { updatePost } from '../features/posts/postApi'
import { toast, Toaster } from 'react-hot-toast'

const UpdatePost = () => {
  const location = useLocation()
  let post = location.state?.post || {} // Fallback to an empty object if no post is passed
  const id = location.state?.post._id // Get post ID from location
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Handle updating the post
  const handleUpdatePost = async (values) => {
    try {
      // Dispatch the updatePost action
      await dispatch(updatePost({ values, id })).unwrap()

      // Show success notification
      toast.success('Post updated successfully')
      // Navigate back to homepage after 3 seconds
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (error) {
      // Show error notification
      toast.error(error.message || 'Failed to update post')
    }
  }

  return (
    <>
      <Toaster /> {/* Toast notifications */}
      <Form post={post} onSubmit={handleUpdatePost} />
    </>
  )
}

export default UpdatePost

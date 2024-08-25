import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form } from '../components'
import { useDispatch } from 'react-redux'
import { updatePost, fetchAllPosts } from '../features/posts/postApi'
import {
  clearfetchAllPosts,
  clearfetchMyPosts
} from '../features/posts/postSlice'
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
      // clear status of fetchAllPost
      dispatch(clearfetchAllPosts())
      dispatch(clearfetchMyPosts())
      // Navigate back to homepage after 2 seconds
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      // Show error notification
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to update post'
      )
    }
  }

  return (
    <>
      <Toaster />
      <Form post={post} onSubmit={handleUpdatePost} />
    </>
  )
}

export default UpdatePost

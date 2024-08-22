import { asyncThunkCreator, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// Thunk for fetching all posts
export const fetchAllPosts = createAsyncThunk('posts/fetchAll', async () => {
  const response = await axios.get('http://localhost:5000/api/posts/all')

  return response.data
})

// Thunk for fetching a single post by ID (fallback if post not found in state)

export const fetchPostById = createAsyncThunk(
  'posts/fetchById',
  async (id, { getState }) => {
    const { posts } = getState()
    const { allPosts } = posts
    const { data } = allPosts

    // Try to find the post in allPosts array first
    const existingPost = data?.find((post) => post?._id === id)
    if (existingPost) {
      return existingPost // Return the post if found
    }

    // If not found, make an API call
    const response = await axios.get(`http://localhost:5000/api/posts/${id}`)
    return response.data
  }
)

// Thunk for creating a post

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    console.log('i am here how did you find me')
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'http://localhost:5000/api/posts/create', // Your post creation API
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create post'
      )
    }
  }
)

export const updatePost = createAsyncThunk(
  "'posts/updatePosts",

  async (updateData, { rejectWithValue }) => {
    try {
      const { values, id } = updateData

      const token = localStorage.getItem('token')
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${id}`, // Your post update API
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update post'
      )
    }
  }
)

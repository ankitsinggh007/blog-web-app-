import { asyncThunkCreator, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/axios'

// Thunk for fetching all posts
export const fetchAllPosts = createAsyncThunk('posts/fetchAll', async () => {
  const response = await api.get('posts/all')
  return response.data
})

// Thunk for fetching a single post by ID (fallback if post not found in state)
export const fetchPostById = createAsyncThunk(
  'posts/fetchById',
  async (id, { getState }) => {
    const { posts } = getState()
    const { allPost } = posts
    const { data } = allPost

    // Try to find the post in allPosts array first
    const existingPost = data?.find((post) => post?._id === id)
    if (existingPost) {
      return existingPost // Return the post if found
    }

    // If not found, make an API call
    const response = await api.get(`posts/${id}`)
    return response.data
  }
)

// Thunk for creating a post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await api.post('posts/create', postData)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create post'
      )
    }
  }
)

// Thunk for updating a post
export const updatePost = createAsyncThunk(
  'posts/updatePosts',
  async (updateData, { rejectWithValue }) => {
    try {
      const { values, id } = updateData
      console.log('i am inside')
      const response = await api.patch(`posts/${id}`, values)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update post'
      )
    }
  }
)

// Thunk for deleting a post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`posts/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete post'
      )
    }
  }
)

// Thunk for fetching user's own posts
export const fetchAllMyPost = createAsyncThunk(
  'posts/fetchMyPost',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('posts/my-post')
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch your posts'
      )
    }
  }
)

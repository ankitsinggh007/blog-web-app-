import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
    // Try to find the post in allPosts array first
    const existingPost = posts.allPosts.find((post) => post._id === id)
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
  async ({ postData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/posts/create',
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}` // Use token for future authentication
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    allPosts: [],
    currentPost: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch all posts
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.allPosts = action.payload
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // Handle fetch post by ID (fallback)
      .addCase(fetchPostById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentPost = action.payload
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createPost.pending,(state,action)=>{
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.allPosts.push(action.payload) // Add new post to the state
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.payload
      })
  }
})

export default postsSlice.reducer

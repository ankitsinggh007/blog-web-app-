import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { fetchPostById, fetchAllPosts, createPost, updatePost } from './postApi'

const initialState = {
  allPosts: {
    data: [],
    status: 'idle',
    error: null,
    message: null
  },
  currentPost: {
    data: null,
    status: 'idle',
    error: null,
    message: null
  },
  createPost: {
    status: 'idle',
    error: null,
    message: null
  },
  updatePost: {
    status: 'idle',
    error: null,
    message: null
  },
  fetchPosts: {
    status: 'idle',
    error: null,
    message: null
  }
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetCurrentPost: (state) => {
      state.currentPost = {
        data: null,
        status: 'idle',
        error: null,
        message: null
      }
    },
    resetCreatePost: (state) => {
      // NEW ACTION
      state.createPost = {
        status: 'idle',
        error: null,
        message: null
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch all posts
      .addCase(fetchAllPosts.pending, (state) => {
        state.allPosts.status = 'loading'
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.allPosts.status = 'succeeded'
        state.allPosts.data = action.payload
        state.allPosts.message = 'Posts fetched successfully'
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.allPosts.status = 'failed'
        state.allPosts.error = action.error.message
        state.allPosts.message = action.payload || 'Failed to fetch posts'
      })
      // Handle fetch post by ID (fallback)
      .addCase(fetchPostById.pending, (state) => {
        state.currentPost.status = 'loading'
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPost.status = 'succeeded'
        state.currentPost.data = action.payload
        state.currentPost.message = 'Post fetched successfully'
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.currentPost.status = 'failed'
        state.currentPost.error = action.error.message
        state.currentPost.message = action.payload || 'Failed to fetch post'
      })
      // Handle create post
      .addCase(createPost.pending, (state) => {
        state.createPost.status = 'loading'
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createPost.status = 'succeeded'
        state.allPosts.data.unshift(action.payload.post) // Add new post to the start
        state.createPost.message = 'Post created successfully'
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createPost.status = 'failed'
        state.createPost.error = action.payload
        state.createPost.message = action.payload || 'Failed to create post'
      })
      // Handle update post
      .addCase(updatePost.pending, (state) => {
        state.updatePost.status = 'loading'
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.updatePost.status = 'succeeded'
        const index = state.allPosts.data.findIndex(
          (post) => post._id === action.payload._id
        )
        if (index !== -1) {
          state.allPosts.data[index] = action.payload
        }
        state.updatePost.message = 'Post updated successfully'
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updatePost.status = 'failed'
        state.updatePost.error = action.payload
        state.updatePost.message = action.payload || 'Failed to update post'
      })
  }
})
export const { resetCurrentPost, resetCreatePost } = postsSlice.actions
export default postsSlice.reducer

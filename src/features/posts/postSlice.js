import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import {
  fetchPostById,
  fetchAllPosts,
  createPost,
  updatePost,
  deletePost,
  fetchAllMyPost
} from './postApi'
import { data } from 'autoprefixer'

const initialState = {
  allPost: {
    data: [],
    status: 'idle',
    error: null,
    message: null
  },
  currentPost: {
    data: [],
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
  },
  deletPost: {
    status: 'idle',
    error: null,
    message: null
  },
  myPost: {
    data: [],
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
    },
    clearfetchAllPosts: (state) => {
      state.allPost.status = 'idle'
    },
    clearfetchMyPosts: (state) => {
      state.myPost.status = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch all posts
      .addCase(fetchAllPosts.pending, (state) => {
        state.allPost.status = 'loading'
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.allPost.status = 'succeeded'
        state.allPost.data = action.payload
        state.allPost.message = 'Posts fetched successfully'
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.allPost.status = 'failed'
        state.allPost.error = action.error.message
        state.allPost.message = action.payload || 'Failed to fetch posts'
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
        state.allPost.data.unshift(action.payload.post) // Add new post to the start
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
        state.updatePost.message = 'Post updated successfully'
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updatePost.status = 'failed'
        state.updatePost.error = action.payload
        state.updatePost.message = action.payload || 'Failed to update post'
      })
      // Handle delete post action
      .addCase(deletePost.pending, (state, action) => {
        state.deletPost.status = 'loading'
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deletPost.status = 'succeeded'
        const index = state.allPost.data.findIndex(
          (post) => post._id === action.payload.id
        )
        if (index !== -1) {
          state.allPost.data.splice(index, 1)
        }
        state.deletPost.message = 'Post deleted successfully'
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.deletPost.status = 'failed'
        state.deletPost.error = action.payload
        state.deletPost.message = action.payload || 'Failed to delete post'
      })
      // Handle fetch my posts
      .addCase(fetchAllMyPost.pending, (state) => {
        state.myPost.status = 'loading'
      })
      .addCase(fetchAllMyPost.fulfilled, (state, action) => {
        state.myPost.status = 'succeeded'
        state.myPost.data = action.payload // Add new post to the start
        state.myPost.message = 'Post created successfully'
      })
      .addCase(fetchAllMyPost.rejected, (state, action) => {
        state.myPost.status = 'failed'
        state.myPost.error = action.payload
        state.myPost.message = action.payload || 'Failed to create post'
      })
  }
})
export const {
  resetCurrentPost,
  clearfetchAllPosts,
  clearfetchMyPosts,
  resetCreatePost
} = postsSlice.actions
export default postsSlice.reducer

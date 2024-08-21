import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Thunk for registering a new user
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData) => {
    const response = await axios.post(
      'http://localhost:5000/api/users/register',
      userData
    )
    return response.data
  }
)

// Thunk for logging in a user
export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(
    'http://localhost:5000/api/users/login',
    credentials
  )
  return response.data
})

// Thunk for logging out a user
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  const response = await axios.post('http://localhost:5000/api/users/logout')
  return response.data
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Stores user info like token
    status: 'idle',
    error: null
  },
  reducers: {
    // Manually log out without API call
    clearUserState: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'succeeded'
        state.user = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { clearUserState } = authSlice.actions
export default authSlice.reducer

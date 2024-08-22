import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Register user
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/register',
        userData
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to register'
      )
    }
  }
)

// Login user
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        credentials
      )
      const { token, user } = response.data
      localStorage.setItem('token', token) // Store token
      return { user }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to login')
    }
  }
)

// Logout user
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/logout'
      )
      localStorage.removeItem('token') // Remove token
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to logout'
      )
    }
  }
)

// Fetch user from token
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/users/profile', // Endpoint to get user info
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user'
      )
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {
    clearAuthState: (state) => {
      state.user = null
      state.status = 'idle'
      state.error = null
      localStorage.removeItem('token') // Ensure token is removed
    }
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'succeeded'
        state.user = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Fetch user
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.user = null
        state.error = action.payload
      })
  }
})

export const { clearAuthState } = authSlice.actions
export default authSlice.reducer

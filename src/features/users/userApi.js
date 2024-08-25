import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/axios.js'

// Register user
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('users/register', userData)
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
      const response = await api.post('users/login', credentials)
      const { user } = response.data
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
      const response = await api.post('users/logout')
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
      const response = await api.get('http://localhost:5000/api/users/profile')
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user'
      )
    }
  }
)

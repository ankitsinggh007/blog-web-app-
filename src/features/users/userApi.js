import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Register user
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('users/register', userData)
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
      const response = await axios.post('users/login', credentials)
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
    const token = localStorage.getItem('token')
    try {
      const response = await axios.post(
        'users/logout',

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
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

import { useEffect } from 'react'
import {
  CreatePost,
  HomePage,
  LoginPage,
  SignupPage,
  UpdatePost,
  NotFoundPage // Import the new NotFoundPage
} from './pages'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import PostDetails from './components/PostDetails'
import { fetchUser } from './features/users/userApi'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}

axios.defaults.baseURL = apiUrl || 'http://localhost:5000/api/'

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUser()) // Only fetch user if token is present
    }
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-posts" element={<HomePage isMyPosts={true} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/posts/:id" element={<PostDetails />} />

        <Route
          path="/create-post"
          element={
            <ProtectedRoute user={user}>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-posts/"
          element={
            <ProtectedRoute user={user}>
              <HomePage isMyPosts={true} user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-post/:id"
          element={
            <ProtectedRoute user={user}>
              <UpdatePost />
            </ProtectedRoute>
          }
        />

        {/* Fallback route for undefined paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App

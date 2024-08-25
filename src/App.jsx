import { useEffect } from 'react'
import {
  CreatePost,
  HomePage,
  LoginPage,
  SignupPage,
  UpdatePost,
  NotFoundPage // Import the new NotFoundPage
} from './pages'
import { Navbar, Layout } from './components'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import PostDetails from './components/PostDetails'
import { fetchUser } from './features/users/userApi'
import { useDispatch, useSelector } from 'react-redux'

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}

function App() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const { user } = users
  useEffect(() => {
    if (users.status != 'succeeded') dispatch(fetchUser()) // No need to check for token in localStorage
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

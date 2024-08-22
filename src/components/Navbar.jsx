import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/users/userSlice'
import { toast } from 'react-hot-toast'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.users) // Adjust the state path as needed

  const handleAvatarClick = () => {
    setIsAvatarMenuOpen(!isAvatarMenuOpen)
  }

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      toast.success('Logged out successfully!')
      navigate('/login')
    } catch (error) {
      toast.error('Logout failed: ' + error.message)
    }
  }

  return (
    <nav className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 p-4 text-white md:p-6">
      <div className="container mx-auto flex items-center justify-between">
        <div
          onClick={() => navigate('/')}
          className="cursor-pointer text-2xl font-bold md:text-3xl"
        >
          Blogger
        </div>
        <div className="hidden flex-1 items-center justify-center md:flex">
          <input
            type="text"
            placeholder="Search"
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          {/* Conditional rendering based on user authentication */}
          {user ? (
            <>
              <div className="hidden space-x-4 md:flex">
                <button
                  onClick={() => navigate('/create-post')}
                  className="text-indigo-200 hover:text-white"
                >
                  Create Post
                </button>
                <button
                  onClick={() => navigate('/my-posts')}
                  className="text-indigo-200 hover:text-white"
                >
                  My Posts
                </button>
              </div>

              <div className="relative md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <div
                  className={`absolute right-0 top-8 w-48 rounded-md bg-white text-black shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}
                >
                  <Link
                    to="/create-post"
                    className="block p-4 text-indigo-600 hover:bg-gray-200"
                  >
                    Create Post
                  </Link>
                  <Link
                    to="/my-posts"
                    className="block p-4 text-indigo-600 hover:bg-gray-200"
                  >
                    My Posts
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full p-4 text-left text-red-600 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              </div>

              <div className="relative hidden md:flex">
                <button
                  onClick={handleAvatarClick}
                  className="text-white focus:outline-none"
                >
                  <FaUserCircle className="h-8 w-8" />
                </button>
                {isAvatarMenuOpen && (
                  <div className="absolute right-0 top-10 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                    <Link
                      to="/my-posts"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 md:hidden"
                    >
                      My Posts
                    </Link>
                    <Link
                      to="/create-post"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 md:hidden"
                    >
                      Create Post
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="text-indigo-200 hover:text-white"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

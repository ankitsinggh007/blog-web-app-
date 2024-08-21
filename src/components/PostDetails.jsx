import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostById } from '../features/posts/postSlice'
import {
  FaThumbsUp,
  FaComment,
  FaEye,
  FaEllipsisV,
  FaTrashAlt,
  FaEdit
} from 'react-icons/fa'

const PostDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Fetch post data from Redux store
  const post = useSelector((state) => state.posts.currentPost)
  const loggedInUserId = 1 // Example logged-in user ID for demo
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchPostById(id))
  }, [dispatch, id])

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleDelete = () => {
    console.log('Delete post with ID:', post?.id)
    // Add your delete logic here (API call)
  }

  const handleUpdate = () => {
    navigate(`/update-post/${post?.id}`, { state: { post } })
  }

  return (
    <div className="relative mx-auto max-w-4xl p-6">
      {/* Dropdown Button */}
      {loggedInUserId === post?.ownerId && (
        <div className="relative mb-6">
          <button
            onClick={handleDropdownToggle}
            className="absolute right-4 top-4 rounded-full bg-gray-300 p-2 text-gray-600 hover:bg-gray-400"
            aria-label="Post Options"
          >
            <FaEllipsisV />
          </button>

          {dropdownOpen && (
            <div className="absolute right-4 top-12 w-40 rounded-md border border-gray-200 bg-white shadow-lg">
              <button
                onClick={handleUpdate}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
              >
                <FaEdit className="mr-2" /> Update Post
              </button>
              <button
                onClick={handleDelete}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
              >
                <FaTrashAlt className="mr-2" /> Delete Post
              </button>
            </div>
          )}
        </div>
      )}

      {/* Show post details */}
      {post ? (
        <>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="text-lg leading-relaxed md:text-xl lg:text-[1.45rem]">
            {post.content}
          </p>

          <div className="mt-6 flex flex-col text-xl sm:flex-row sm:space-x-8">
            {/* Like */}
            <div className="group relative mb-4 flex items-center space-x-2 sm:mb-0">
              <FaThumbsUp className="cursor-pointer text-gray-600 hover:text-blue-600" />
              <span>{post.likes}</span>
              <span className="absolute bottom-full mb-2 hidden rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
                Like
              </span>
            </div>

            {/* Comment */}
            <div className="group relative mb-4 flex items-center space-x-2 sm:mb-0">
              <FaComment className="cursor-pointer text-gray-600 hover:text-green-600" />
              <span>{post.comments}</span>
              <span className="absolute bottom-full mb-2 hidden rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
                Comment
              </span>
            </div>

            {/* Impression */}
            <div className="group relative flex items-center space-x-2">
              <FaEye className="cursor-pointer text-gray-600 hover:text-purple-600" />
              <span>{post.impressions}</span>
              <span className="absolute bottom-full mb-2 hidden rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
                Impression
              </span>
            </div>
          </div>
        </>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  )
}

export default PostDetails

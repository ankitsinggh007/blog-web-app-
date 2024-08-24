import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostById, deletePost } from '../features/posts/postApi'
import { resetCurrentPost } from '../features/posts/postSlice'
import {
  FaThumbsUp,
  FaComment,
  FaEye,
  FaEllipsisV,
  FaTrashAlt,
  FaEdit,
  FaCheckCircle
} from 'react-icons/fa'
import {
  clearfetchAllPosts,
  clearfetchMyPosts
} from '../features/posts/postSlice'
import { Toaster, toast } from 'react-hot-toast'

const PostDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentPost } = useSelector((state) => state.posts)
  const { data, status, error } = currentPost
  const [dropdownOpen, setDropdownOpen] = useState(false)

  let { user } = useSelector((state) => state.users)
  user = user?.user

  useEffect(() => {
    dispatch(fetchPostById(id))
    return () => dispatch(resetCurrentPost())
  }, [dispatch, id])

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleDelete = () => {
    dispatch(deletePost(data?._id))
      .unwrap()
      .then(() => {
        setDropdownOpen(!dropdownOpen)
        toast.success('Post deleted successfully')
        dispatch(clearfetchAllPosts())
        dispatch(clearfetchMyPosts())
        setTimeout(() => {
          navigate('/') // Redirect to homepage after deletion
        }, 400)
      })
      .catch((err) => {
        toast.error(`Error deleting post: ${err.message}`)
      })
  }

  const handleUpdate = () => {
    navigate(`/update-post/${data?._id}`, { state: { post: data } })
  }

  if (status === 'loading') {
    return <p>Loading post details...</p>
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>
  }
  return (
    <div className="relative mx-auto max-w-4xl p-6">
      {/* Dropdown Button */}
      <Toaster />
      {user?._id === data?.author?._id && (
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
      {data ? (
        <>
          <div className="">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              {data.title}
            </h1>
            <p className="text-lg leading-relaxed md:text-xl lg:text-[1.45rem]">
              {data.content}
            </p>

            <div className="bottom-4 left-4 m-4 flex items-center space-x-4">
              {/* Circular Avatar */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                {/* Placeholder for future image */}
                <span className="text-xl font-bold text-white">
                  {data?.author?.username.charAt(0).toUpperCase()}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-600">
                  Posted by {data?.author?.username}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(data.createdAt).toLocaleDateString()}
                </p>

                {/* Edited Label */}
                {/* {data.__v > 0 && (
                  <div className="flex items-center space-x-1 text-xs text-blue-500">
                    <FaCheckCircle />
                    <span>
                      Edited on {new Date(data.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-row items-baseline space-x-8 text-xl">
            {/* Like */}
            <div className="group relative mb-4 flex items-center space-x-2 sm:mb-0">
              <FaThumbsUp className="cursor-pointer text-gray-600 hover:text-blue-600" />
              <span>{data.likes?.length}</span>
              <span className="absolute bottom-full mb-2 hidden rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
                Like
              </span>
            </div>

            {/* Comment */}
            <div className="group relative mb-4 flex items-center space-x-2 sm:mb-0">
              <FaComment className="cursor-pointer text-gray-600 hover:text-green-600" />
              <span>{data.comments?.length}</span>
              <span className="absolute bottom-full mb-2 hidden rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
                Comment
              </span>
            </div>

            {/* Impression */}
            <div className="group relative flex items-center space-x-2">
              <FaEye className="cursor-pointer text-gray-600 hover:text-purple-600" />
              <span>{data.impressions}</span>
              <span className="absolute bottom-full mb-2 hidden rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
                Impression
              </span>
            </div>
          </div>

          {/* Author and metadata */}
        </>
      ) : (
        <p>No post found</p>
      )}
    </div>
  )
}

export default PostDetails

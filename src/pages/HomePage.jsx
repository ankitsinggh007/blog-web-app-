import React, { useEffect } from 'react'
import { Card } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllMyPost, fetchAllPosts } from '../features/posts/postApi'
import { Toaster, toast } from 'react-hot-toast'

const Home = ({ isMyPosts = false }) => {
  const dispatch = useDispatch()

  const { status, data, error } = useSelector((state) =>
    isMyPosts ? state.posts.myPost : state.posts.allPost
  )

  useEffect(() => {
    if (status === 'idle') {
      isMyPosts ? dispatch(fetchAllMyPost()) : dispatch(fetchAllPosts())
    }

    if (status === 'failed' && error) {
      toast.error(error)
    }
  }, [dispatch, status, isMyPosts, error])

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster /> {/* Ensure only one Toaster is used globally */}
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
        {isMyPosts ? 'Your Posts' : 'All Posts'}
      </h1>
      {status === 'loading' && <p>Loading posts...</p>}
      {status === 'succeeded' && data.length > 0
        ? data.map((post) => <Card key={post._id} post={post} />)
        : status === 'succeeded' && (
            <p className="text-center text-gray-600">No posts available</p>
          )}
    </div>
  )
}

export default Home

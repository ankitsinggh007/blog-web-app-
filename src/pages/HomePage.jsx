// src/pages/Home.jsx
import React, { useEffect, useState } from 'react'
import { Card } from '../components'
import dummyPosts from '../../data'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllPosts } from '../features/posts/postApi'
const Home = () => {
  const dispatch = useDispatch()

  const { allPosts } = useSelector((state) => state.posts)

  const { status, data, error, message } = allPosts

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllPosts())
    }
  }, [dispatch, status])
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
        Blog Posts
      </h1>
      {status === 'loading' && <p>Loading posts...</p>}

      {status == 'succeeded' && data.length > 0 ? (
        data.map((post) => <Card key={post._id} post={post} />)
      ) : (
        <p className="text-center text-gray-600">No posts available</p>
      )}
    </div>
  )
}

export default Home

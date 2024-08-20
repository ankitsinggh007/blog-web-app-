// src/pages/Home.jsx
import React, { useEffect, useState } from 'react'
import { Card } from '../components'
import dummyPosts from '../../data'

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // Fetch posts from the backend (replace the URL with your API endpoint)

    setPosts(dummyPosts)

    // fetch('/api/posts')
    // .then((response) => response.json())
    // .then((data) => setPosts(data))
    // .catch((error) => console.error('Error fetching posts:', error))
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
        Blog Posts
      </h1>
      {posts.length > 0 ? (
        posts.map((post) => <Card key={post.id} post={post} />)
      ) : (
        <p className="text-center text-gray-600">No posts available</p>
      )}
    </div>
  )
}

export default Home

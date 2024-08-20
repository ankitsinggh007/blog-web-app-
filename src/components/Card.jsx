// src/components/PostCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
  const { title, content, id } = post

  return (
    <div className="my-4 overflow-hidden rounded-lg bg-white shadow-md">
      {/* Future image can be added here */}
      {/* <img src={post.imageUrl} alt={title} className="w-full h-48 object-cover"/> */}

      <div className="p-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">{title}</h2>
        <p className="mb-4 text-gray-600">
          {content.length > 100 ? `${content.slice(0, 100)}...` : content}
        </p>
        <Link
          to={`/posts/${id}`}
          className="text-indigo-600 hover:text-indigo-800"
        >
          Read more
        </Link>
      </div>
    </div>
  )
}

export default PostCard

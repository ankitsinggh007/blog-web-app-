import { useState } from 'react'
import {
  CreatePost,
  HomePage,
  LoginPage,
  SignupPage,
  UpdatePost
} from './pages'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import PostDetails from './components/PostDetails'
import dummyPosts from '../data'
// import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/posts/:id" element={<PostDetails posts={dummyPosts} />} />

        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:id" element={<UpdatePost />} />
      </Routes>
    </Layout>
  )
}

export default App

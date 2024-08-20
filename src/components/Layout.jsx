// src/components/Layout.jsx
import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-grow">
        {/* Main content */}
        <main className="px-34 flex-grow p-4">{children}</main>
        <aside className="hidden w-64 bg-gray-100 lg:block">
          {/* Sidebar content can be added here later */}
        </aside>
      </div>
    </div>
  )
}

export default Layout

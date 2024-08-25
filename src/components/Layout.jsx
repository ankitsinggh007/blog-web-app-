// src/components/Layout.jsx
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Ticker from './Ticker'

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Ticker />
      <div className="flex flex-grow">
        {/* Main content */}
        <main className="lg:px-34 flex-grow p-4 px-8 md:px-16">{children}</main>
        <aside className="hidden w-64 bg-gray-100 lg:block">
          {/* Sidebar content can be added here later */}
        </aside>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout

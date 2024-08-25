import { Link } from 'react-router-dom'

const NotFoundPage = () => {
 

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-5xl font-bold text-gray-800">
        404 - Page Not Found
      </h1>
      <p className="mb-6 text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-500"
      >
        Go back to Homepage
      </Link>
    </div>
  )
}

export default NotFoundPage

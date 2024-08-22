import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/users/userSlice'
import { toast, Toaster } from 'react-hot-toast'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error, user } = useSelector((state) => state.users)
  console.log([status, error, user])
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  })

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUser(values)).unwrap()
    } catch (error) {
      // Error handled by useEffect
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (status === 'succeeded' && user) {
      toast.success('Login successful!')
      navigate('/')
    }
    if (status === 'failed' && error) {
      toast.error(`${error}`)
    }
  }, [status, error, user])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />{' '}
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-8 md:p-10 lg:p-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Login
        </h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || status === 'loading'}
                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white transition duration-300 hover:bg-indigo-700"
              >
                {status === 'loading' ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New here?{' '}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

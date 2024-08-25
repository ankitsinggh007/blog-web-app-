import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const FormPage = ({ post = {}, onSubmit }) => {
  const [isFormDirty, setIsFormDirty] = useState(false)

  const initialValues = {
    title: post.title || '',
    content: post.content || '',
    image: post.image || '' // For future use
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    image: Yup.string() // For future use
  })

  // Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    onSubmit(values)
    setSubmitting(false)
    setIsFormDirty(false)
    resetForm()
  }
  const handleBeforeUnload = (event) => {
    if (isFormDirty) {
      event.preventDefault()
      event.returnValue = ''
    }
  }
  useEffect(() => {
    // Add the event listener on component mounts
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isFormDirty])

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">
        {post.id ? 'Update Post' : 'Create Post'}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form
            onChange={() => {
              // Mark the form as dirty if any field is changed
              setIsFormDirty(true)
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <Field
                as="textarea"
                name="content"
                rows="4"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Image field for future use */}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL (for future use)
              </label>
              <Field
                type="text"
                name="image"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white transition duration-300 hover:bg-indigo-700"
            >
              {post._id ? 'Update Post' : 'Create Post'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormPage

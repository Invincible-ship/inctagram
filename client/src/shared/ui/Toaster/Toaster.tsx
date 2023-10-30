'use client'

import { Toaster as ToasterInstance } from 'react-hot-toast'

export const Toaster = () => (
  <ToasterInstance
    toastOptions={{
      style: {
        color: 'var(--primary-text-color)',
      },
      error: {
        style: {
          backgroundColor: 'var(--danger-color-500)',
        },
        iconTheme: {
          primary: 'var(--primary-text-color)',
          secondary: 'var(--danger-color-500)',
        },
      },
      success: {
        style: {
          backgroundColor: 'var(--success-color-700)',
        },
        iconTheme: {
          primary: 'var(--primary-text-color)',
          secondary: 'var(--success-color-700)',
        },
      },
    }}
  />
)

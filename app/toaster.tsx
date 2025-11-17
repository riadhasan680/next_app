'use client'

import { Toaster } from 'react-hot-toast'

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: { background: '#111827', color: '#ffffff' },
        success: { duration: 2500 },
        error: { duration: 3000 }
      }}
    />
  )
}
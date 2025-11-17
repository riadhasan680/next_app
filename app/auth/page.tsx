'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Icon } from '@iconify/react'

export const dynamic = 'force-dynamic'

function AuthContent() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const sp = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
    const tp = sp?.get('toast')
    if (tp) {
      import('react-hot-toast').then((m) => m.toast.success(tp))
    }
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
      if (res.ok) {
        router.push('/?toast=Logged%20in')
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        const msg = data.message || 'Invalid token'
        setError(msg)
        toast.error(msg)
      }
    } catch {
      setError('Network error')
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
          <Icon icon="mdi:lock-check" className="w-6 h-6 text-brand" />
          Login
        </h1>
        <p className="mt-2 text-sm text-gray-600 text-center">Enter the provided access token</p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium">Access Token</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter token"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark transition disabled:opacity-60"
          >
            {loading ? 'Verifying...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center text-xs text-gray-500">Login will not proceed without the correct token</div>
      </div>
    </main>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <AuthContent />
    </Suspense>
  )
}
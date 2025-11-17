'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'

export const dynamic = 'force-dynamic'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const sp = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
    const tp = sp?.get('toast')
    if (tp) {
      import('react-hot-toast').then((m) => m.toast.success(tp))
      router.replace('/')
    }
  }, [router])

  async function onLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/auth?toast=Logged%20out')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button aria-label="Toggle sidebar" className="lg:hidden p-2 rounded-md border border-gray-200" onClick={() => setSidebarOpen((v) => !v)}>
              <span className="sr-only">Toggle sidebar</span>
              <Icon icon="mdi:menu" className="w-5 h-5 text-gray-700" />
            </button>
            <a href="/" className="text-lg font-semibold text-gray-900">Secure Dashboard</a>
          </div>
          <div className="flex-1 mx-4 hidden md:block">
            <div className="relative">
              <input className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Search" />
              <span className="absolute left-2 top-2.5 text-gray-400">
                <Icon icon="mdi:magnify" className="w-4 h-4" />
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onLogout} className="hidden sm:inline-flex px-3 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-50">Logout</button>
            <div className="w-8 h-8 rounded-full bg-brand text-white grid place-items-center">U</div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={`fixed lg:static inset-y-16 lg:inset-auto left-0 w-64 bg-white border-r border-gray-200 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <nav className="p-4 space-y-1">
            <a className="flex items-center gap-2 px-3 py-2 rounded-md bg-brand/10 text-brand font-medium" href="/">
              <Icon icon="mdi:view-dashboard-outline" className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100" href="/flag">
              <Icon icon="mdi:flag-outline" className="w-5 h-5 text-gray-700" />
              <span>Flag</span>
            </a>
            <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100" href="#">
              <Icon icon="mdi:folder-outline" className="w-5 h-5 text-gray-700" />
              <span>Projects</span>
            </a>
            <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100" href="#">
              <Icon icon="mdi:file-chart-outline" className="w-5 h-5 text-gray-700" />
              <span>Reports</span>
            </a>
            <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100" href="#">
              <Icon icon="mdi:cog-outline" className="w-5 h-5 text-gray-700" />
              <span>Settings</span>
            </a>
          </nav>
        </aside>

        <main className="flex-1 w-full lg:mr-64">
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  )
}
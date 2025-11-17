"use client"

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Icon } from '@iconify/react'

export const dynamic = 'force-dynamic'

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toastParam = useMemo(() => searchParams.get('toast'), [searchParams])

  useEffect(() => {
    if (toastParam) {
      import('react-hot-toast').then((m) => m.toast.success(toastParam))
      router.replace('/')
    }
  }, [toastParam, router])

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
            <a className="flex items-center gap-2 px-3 py-2 rounded-md bg-brand/10 text-brand font-medium" href="#">
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
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-sm text-gray-500">Home / Dashboard</div>
            <div className="mt-2 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <div className="hidden sm:flex items-center gap-2">
                <button className="px-3 py-2 rounded-md bg-brand text-white text-sm hover:bg-brand-dark">New Project</button>
                <button className="px-3 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-50">Invite</button>
              </div>
            </div>

            <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Total Users</div>
                  <Icon icon="mdi:account" className="w-5 h-5 text-gray-400" />
                </div>
                <div className="mt-2 text-2xl font-bold">1,245</div>
                <div className="mt-1 text-xs text-green-600">+4.3% this week</div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Active Sessions</div>
                  <Icon icon="mdi:chart-line" className="w-5 h-5 text-gray-400" />
                </div>
                <div className="mt-2 text-2xl font-bold">87</div>
                <div className="mt-1 text-xs text-green-600">+2.1% today</div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Revenue</div>
                  <Icon icon="mdi:cash" className="w-5 h-5 text-gray-400" />
                </div>
                <div className="mt-2 text-2xl font-bold">$12,430</div>
                <div className="mt-1 text-xs text-red-600">-1.2% this month</div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Errors</div>
                  <Icon icon="mdi:alert" className="w-5 h-5 text-gray-400" />
                </div>
                <div className="mt-2 text-2xl font-bold">5</div>
                <div className="mt-1 text-xs text-gray-500">Stable</div>
              </div>
            </section>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <section className="lg:col-span-8 bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-medium">Recent Activity</h3>
                  <button className="px-3 py-1.5 rounded-md border border-gray-300 text-sm hover:bg-gray-50">View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600">
                        <th className="text-left px-4 py-2">User</th>
                        <th className="text-left px-4 py-2">Action</th>
                        <th className="text-left px-4 py-2">Status</th>
                        <th className="text-left px-4 py-2">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { user: 'Alice', action: 'Created project', status: 'Success', time: '10:24 AM' },
                        { user: 'Bob', action: 'Deployed build', status: 'Success', time: '09:55 AM' },
                        { user: 'Eve', action: 'Updated settings', status: 'Pending', time: 'Yesterday' },
                        { user: 'Mallory', action: 'Invited user', status: 'Success', time: '2 days ago' },
                        { user: 'Trent', action: 'Removed member', status: 'Warning', time: '3 days ago' },
                      ].map((row, i) => (
                        <tr key={i} className="border-t border-gray-100">
                          <td className="px-4 py-2">{row.user}</td>
                          <td className="px-4 py-2">{row.action}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-0.5 rounded text-xs ${row.status === 'Success' ? 'bg-green-100 text-green-700' : row.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : row.status === 'Warning' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>{row.status}</span>
                          </td>
                          <td className="px-4 py-2 text-gray-500">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="lg:col-span-4 space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium">Quick Actions</h3>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">Create</button>
                    <button className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">Upload</button>
                    <button className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">Invite</button>
                    <button className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">Settings</button>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium">Announcements</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    <li>System maintenance on Friday 9 PM.</li>
                    <li>New analytics dashboard released.</li>
                    <li>Invite teammates to collaborate.</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
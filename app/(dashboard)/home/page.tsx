"use client"

import { Suspense } from 'react'

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
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
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="mt-2 text-2xl font-bold">1,245</div>
          <div className="mt-1 text-xs text-green-600">+4.3% this week</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-500">Active Sessions</div>
          <div className="mt-2 text-2xl font-bold">87</div>
          <div className="mt-1 text-xs text-green-600">+2.1% today</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-500">Revenue</div>
          <div className="mt-2 text-2xl font-bold">$12,430</div>
          <div className="mt-1 text-xs text-red-600">-1.2% this month</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-500">Errors</div>
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
    </Suspense>
  )
}

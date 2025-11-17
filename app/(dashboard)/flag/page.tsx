'use client'

import { Suspense } from 'react'

export default function FlagPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white h-[calc(100vh-128px)]">
        <div className="bg-white   p-6">
          <p className="font-mono text-lg text-white">{'BNCTF{WH1TE_ON_WH1TE_IN_TR4FF1K}'}</p>
        </div>
      </div>
    </Suspense>
  )
}
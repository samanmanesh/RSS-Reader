import React, { ReactElement } from 'react'

interface Props {
  children: React.ReactElement
}

export default function AppLayout({
  children
}: Props): ReactElement {
  return (
    <div className="flex w-full h-screen">
      <div className="w-64 h-full bg-red-200">
        NAVIGATION
      </div>
      <main className="w-full">
        <div className="h-12 w-full bg-blue-200">Search Bar</div>
        {children}
      </main>
    </div>
  )
}

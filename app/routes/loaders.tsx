import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/loaders')({
  component: BlockingAndStreaming,
})

export default function BlockingAndStreaming() {
  const [cacheBust, setCacheBust] = useState('' + Math.random())
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Loaders and Prefetching</h2>
          <p>
            But the cooler bit of React Query integration is preloading a query
            in a loader! Loaders in Start are isomorphic: they run on the server
            during SSR and the run on the client the rest of the time.
          </p>
          <p>
            TODO six different pages. All are cache-busted. How useQuery wiht no
            loader, useQuer with waiting, and awaiting ensureQueryData
          </p>
          <p>
            This page shows all the messages in a channel. You can change
            channels! You can see ensureQuery and preloadQuery working
            differently.
          </p>
          <p>Watch Tanner's video for more!</p>
          <nav className="flex flex-col space-y-4">
            <Link
              to="/loaders/ensure"
              search={{ cacheBust: cacheBust + 'a' }}
              onClick={() => setCacheBust('' + Math.random())}
            >
              ensure (plus prefetch on mouseover)
            </Link>
            <Link
              to="/loaders/prefetch"
              search={{ cacheBust: cacheBust + 'b' }}
              onClick={() => setCacheBust('' + Math.random())}
            >
              prefetch on mouseover
            </Link>
            <Link
              to="/loaders/no-loader"
              search={{ cacheBust: cacheBust + 'c' }}
              onClick={() => setCacheBust('' + Math.random())}
            >
              no loader
            </Link>
          </nav>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/loaders')({
  component: BlockingAndStreaming,
})

import { useState } from 'react'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'

export default function BlockingAndStreaming() {
  const [currentPage, setCurrentPage] = useState('blocking')

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Loaders and Prefetching</h2>
      <p>
        But the cooler bit of React Query integration is preloading a query in a
        loader! Loaders in Start are isomorphic: they run on the server during
        SSR and the run on the client the rest of the time.
      </p>
      TODO six different pages. All are cache-busted. How useQuery wiht no
      loader, useQuer with waiting, and awaiting ensureQueryData
      <p>
        This page shows all the messages in a channel. You can change channels!
        You can see ensureQuery and preloadQuery working differently.
      </p>
      <p>Watch Tanner's video for more!</p>
      <Card>
        <CardHeader>
          <CardTitle>Code Example</CardTitle>
          <CardDescription>
            A simple example of blocking vs streaming data fetching
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

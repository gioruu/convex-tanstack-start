import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blocking-and-streaming')({
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
      <h2 className="text-3xl font-bold">Blocking and Streaming</h2>
      <p className="text-lg">
        This example demonstrates the difference between blocking and streaming
        data fetching. Click on the buttons below to see how each approach
        affects page loading.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Code Example</CardTitle>
          <CardDescription>
            A simple example of blocking vs streaming data fetching
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`
// Blocking fetch
export async function BlockingComponent() {
  const data = await fetchData() // This blocks rendering until data is fetched
  return <div>{data}</div>
}

// Streaming fetch
import { Suspense } from 'react'

export function StreamingComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AsyncDataComponent />
    </Suspense>
  )
}

async function AsyncDataComponent() {
  const data = await fetchData() // This doesn't block rendering
  return <div>{data}</div>
}
            `}</code>
          </pre>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <Button onClick={() => setCurrentPage('blocking')}>
            Blocking Page
          </Button>
          <Button onClick={() => setCurrentPage('streaming')}>
            Streaming Page
          </Button>
        </div>
        <Card>
          <CardContent className="p-4">
            {currentPage === 'blocking' && (
              <div>
                This is the blocking page. In a real application, it would load
                all data before rendering.
              </div>
            )}
            {currentPage === 'streaming' && (
              <div>
                This is the streaming page. In a real application, it would
                render immediately and stream in data as it becomes available.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

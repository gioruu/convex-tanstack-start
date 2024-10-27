import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/query-caching-prefetching')({
  component: QueryCaching,
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

export default function QueryCaching() {
  const [currentPage, setCurrentPage] = useState('page1')

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Query Caching and Prefetching</h2>
      <p className="text-lg">
        TanStack Query provides powerful caching and prefetching capabilities.
        This allows you to optimize your application's performance by reducing
        unnecessary network requests and providing a smoother user experience.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Navigation Example</CardTitle>
          <CardDescription>
            Click the buttons to navigate between pages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Button onClick={() => setCurrentPage('page1')}>Page 1</Button>
            <Button onClick={() => setCurrentPage('page2')}>Page 2</Button>
            <Button onClick={() => setCurrentPage('page3')}>Page 3</Button>
          </div>
          <div className="p-4 bg-muted rounded-md">
            {currentPage === 'page1' && <div>Content for Page 1</div>}
            {currentPage === 'page2' && <div>Content for Page 2</div>}
            {currentPage === 'page3' && <div>Content for Page 3</div>}
          </div>
        </CardContent>
      </Card>

      <p className="text-lg">
        In a real application, each page would fetch its own data. TanStack
        Query would cache this data, making subsequent navigations instant. You
        could also implement prefetching to load data for other pages in
        advance.
      </p>
    </div>
  )
}

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

export const Route = createFileRoute('/gcTime')({
  component: QueryCaching,
})

export default function QueryCaching() {
  const [currentPage, setCurrentPage] = useState('page1')

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Query Caching and Prefetching</h2>
      <p className="text-lg">
        As a user navigages around a site or dynamically mounts and unmounts
        components, some data is no longer needed. For fetch requests the React
        Query option{' '}
        <a href="https://tanstack.com/query/latest/docs/framework/react/guides/caching">
          <code>gcTime</code>
        </a>{' '}
        is the length of time to hold on to a stale result before dropping it
        out of cache.
      </p>
      <p className="text-lg">
        For a convexQuery this means something else: how long to say subscribed
        to a query while it is not mounted. The default is to remain subscribed
        to a query for 60 seconds after the last component using tha query
        unmounts.
      </p>
      <p className="text-lg">
        Try navigating between these channel pages. If you've visited one in the
        last 10 seconds it won't be loading when you return to it.
      </p>
      <p className="text-lg">
        Open up the TanStack Query Devtools to watch these query subscriptions
        end.
      </p>
      TODO I gotta figure out subroutes? subpages? for this.
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

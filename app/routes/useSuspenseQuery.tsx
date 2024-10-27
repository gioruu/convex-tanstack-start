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

export const Route = createFileRoute('/useSuspenseQuery')({
  component: QueryCaching,
})

export default function QueryCaching() {
  const [currentPage, setCurrentPage] = useState('page1')

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">
        <code>useSuspenseQuery</code>
      </h2>
      <p className="text-lg">
        Sometimes it's hard to hoist a query into a page. Sometimes component
        locality is very useful! To block during SSR, use `useSuspenseQuery()`.
        "Isomorphic data fetching with a single hook" -Tanner Linsley Tanner's
        tweet https://twitter.com/tannerlinsley/status/1803524593505935591 and
        Theo's video https://youtu.be/lcLbYictX3k?t=1573 Multiple
        `useSuspenseQuery()` hook calls that depend on each other will result in
        server-side request waterfalls. Multiple `useSuspenseQuery()` hook calls
        for _client_ navigations will result in _client-side waterfalls_! So you
        might want to load this data early if you have any way to do that: use
        the query client and call `prefetchQuery()`. Just like before, you can
        still preload a query! useSuspenseQuery() is like ensureQueryData. Demo:
        a profile page for a user! useSuspenseQuery for user data.
      </p>
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/useSuspenseQuery')({
  component: QueryCaching,
})

export default function QueryCaching() {
  const [currentPage, setCurrentPage] = useState('page1')

  return (
    <>
      <h2>
        <code>useSuspenseQuery</code>
      </h2>
      <p>
        Sometimes it's hard to hoist a query into a page. Sometimes component
        locality is very useful! To block during SSR, use{' '}
        <code>useSuspenseQuery()</code>. "Isomorphic data fetching with a single
        hook" -Tanner Linsley{' '}
        <a href="https://twitter.com/tannerlinsley/status/1803524593505935591">
          Tanner's tweet
        </a>{' '}
        and <a href="https://youtu.be/lcLbYictX3k?t=1573">Theo's video</a>.
        Multiple <code>useSuspenseQuery()</code> hook calls that depend on each
        other will result in server-side request waterfalls. Multiple{' '}
        <code>useSuspenseQuery()</code>
        hook calls for <em>client</em> navigations will result in{' '}
        <em>client-side waterfalls</em>! So you might want to load this data
        early if you have any way to do that: use the query client and call{' '}
        <code>prefetchQuery()</code>. Just like before, you can still preload a
        query! useSuspenseQuery() is like ensureQueryData. Demo: a profile page
        for a user! useSuspenseQuery for user data.
      </p>
      <p className="text-lg">
        Using useSuspenseQuery doesn't necessarily block the page; a suspense
        boundary will cause that part of the page to be streamed in.
      </p>
    </>
  )
}

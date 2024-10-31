import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/faq')({
  component: FAQ,
})

export default function FAQ() {
  return (
    <>
      <h1>Frequently Asked Questions</h1>
      <h3>How do I avoid duplication with my queries?</h3>
      <p>Centralize queries with Query Factories if you need to.</p>

      <h3>Can I mix and match Convex React hooks? Where is pagination?</h3>
      <p>
        Standard Convex hooks are still available to be imported from{' '}
        <code>"convex/react"</code> so be careful: there are two{' '}
        <code>useQuery()</code> hooks now. This may change in future version of
        the integration and the Convex hooks are also available at aliases like{' '}
        <code>useConvexPaginatedQuery()</code>.
      </p>

      <h3>
        Won't <code>useSupsenseQuery</code> cause data waterfalls?
      </h3>
      <p>Yes.</p>
      <p>
        There's some conflict between component locality (component requesting
        the data they need) and loading data as soon as possible.
      </p>
      <p>
        Here's a <a href="https://youtu.be/lcLbYictX3k?t=1573">Theo clip</a>.
      </p>
      <h3>Consistent SSR, how do you do that?</h3>
      <p>Today this is done by adding a round-trip.</p>
      <h3>Are you using an FAQ section to hide all the footnotes?</h3>
      <p>This integration is usable today but there's more work to do.</p>
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
      <h3>How does all of this work?</h3>
      <p>
        The gist of the integration is:
        <ul>
          <li>
            Create a React Query Client on the server for each initial pageload,
            the first pageload of the site for the browsing session.
          </li>
          <li>Get a timestamp from the Convex backend.</li>
          <li>
            Load any Convex queries mentioned in loaders or useSuspenseQueries
            at that same timestamp
          </li>
          <li>
            Serialize that Query Client and send it to the browser for hydration
          </li>
          <li>Hydrate (re-render with the same data) the page</li>
          <li>On client navigation, continue to use the same Query Client</li>
        </ul>
      </p>
      <p>DEMO: Use a suspense boundary here</p>
      <p className="text-lg">
        Using useSuspenseQuery doesn't necessarily block the page; a suspense
        boundary will cause that part of the page to be streamed in.
      </p>
    </>
  )
}

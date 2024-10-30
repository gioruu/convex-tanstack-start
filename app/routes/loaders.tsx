import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import CodeSample from '../components/CodeSample'

export const Route = createFileRoute('/loaders')({
  component: BlockingAndStreaming,
})

export default function BlockingAndStreaming() {
  const [cacheBust, setCacheBust] = useState('' + Math.random())
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2>Loaders and Prefetching</h2>
          <p>
            Every TanStack Start route can have an isomorphic `loader` function
            that runs on initial page render and subsequent client-side renders.
            You can run whatever you want in here, but TanStack Router has just
            the right pieces.
          </p>
          <CodeSample code={`loader`} />
          <p>
            When debugging data being loaded it's important to be aware of
            prefetching behavior.
          </p>
          <p>
            This page shows all the messages in a channel. You can change
            channels! You can see ensureQuery and preloadQuery working
            differently.
          </p>
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
        <div className="bg-slate-100 overflow-scroll rounded-lg p-4 max-h-[80vh] text-black text-sm">
          <Outlet />
        </div>
      </div>
      <h2>Resources / Learning More</h2>
      <p>Watch Tanner's video for more!</p>
      <p>
        <a href="https://tanstack.com/router/latest/docs/framework/react/guide/preloading">
          TanStack Router Preloading Guide
        </a>
      </p>
    </>
  )
}

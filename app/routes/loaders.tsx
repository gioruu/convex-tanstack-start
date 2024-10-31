import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import CodeSample from '../components/CodeSample'
import { Button } from '~/components/ui/button'

export const Route = createFileRoute('/loaders')({
  component: BlockingAndStreaming,
})

export default function BlockingAndStreaming() {
  const [cacheBust, setCacheBust] = useState('' + Math.random())
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="mt-0">Loaders and Prefetching</h2>
          <p>
            TanStack Start routes can have isomorphic loader functions that run
            on the server for the initial pageload and on the client for
            subsequent client-side navigations.
          </p>
          <p>
            If <code>useSuspenseQuery</code> provides isomorphic data fetching,
            what are loaders for? Three things:
            <ol className="list-decimal list-inside [&>li]:marker:font-bold [&>li]:marker:text-slate-500">
              <li>
                Loaders are used to <a href="">prefetch</a> data for a page. By
                default this happens on mousing into a link.
              </li>
              <li>Loaders can prevent data waterfalls by fetching data</li>
              <li>
                Blocking in loaders on data being loaded results in
                `useSuspenseQuery`-like behavior, data during SSR and before
                navigating, but configured at the route level instead of the
                component.
              </li>
            </ol>
            Let's focus on prefetching here and blocking here.
          </p>
          <p>
            These three links lead to subpages that show chat messages from
            different channels. Notice how client navigations between these
            pages work differently.
          </p>

          <p>
            Awaiting <code>ensureQueryData</code> will block rendering of the
            page until that data is available.
          </p>
          <CodeSample
            code={`export const Route = createFileRoute('/loaders')({
  loader: async (opts) => {
    await opts.context.queryClient.ensureQueryData(
      convexQuery(api.messages.list, {}),
    );
  };
  component: () => {
    const { data } = useSuspenseQuery(
      convexQuery(api.messages.list, {})
    );
  },
})`}
          />
        </div>
        <div>
          <nav className="flex flex-col space-y-4">
            <Button asChild>
              <Link
                to="/loaders/ensure"
                search={{ cacheBust: cacheBust + 'a' }}
                onClick={() => setCacheBust('' + Math.random())}
              >
                <code>await queryClient.ensureQueryData</code> blocks for data
                and preloads on mouseenter
              </Link>
            </Button>
            <Button asChild>
              <Link
                to="/loaders/prefetch"
                search={{ cacheBust: cacheBust + 'b' }}
                onClick={() => setCacheBust('' + Math.random())}
              >
                <code>queryClient.preloadQuery()</code> loads on mouseenter but
                doesn't block
              </Link>
            </Button>
            <Button asChild>
              <Link
                to="/loaders/no-loader"
                search={{ cacheBust: cacheBust + 'c' }}
                onClick={() => setCacheBust('' + Math.random())}
              >
                no loader, so mouseover does nothing
              </Link>
            </Button>
          </nav>
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

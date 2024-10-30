import { Link, createFileRoute } from '@tanstack/react-router'
import CodeSample from '~/components/CodeSample'
import Chat from '~/components/Chat'
import { Button } from '~/components/ui/button'
import { convexQuery, useConvexMutation } from '@convex-dev/react-query'
import { api } from 'convex/_generated/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ReloadIcon } from '@radix-ui/react-icons'

export const Route = createFileRoute('/react-query')({
  component: ReactQuery,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(
      convexQuery(api.messages.isSimulatingTraffic, {}),
    )
  },
})

export default function ReactQuery() {
  const sendTraffic = useConvexMutation(api.messages.simulateTraffic)
  const { data: simulationRunning } = useSuspenseQuery(
    convexQuery(api.messages.isSimulatingTraffic, {}),
  )
  return (
    <>
      <h2>
        <code>
          {'{'} data, isPending, error {'} = useQuery(convexQuery(...))'}
        </code>
      </h2>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2  ">
        <div>
          <p>
            In TanStack Start apps you can use React Query (TanStack Query for
            React) hooks instead of the standard Convex hooks through{' '}
            <a href="https://tkdodo.eu/blog/the-query-options-api">
              query options factories
            </a>{' '}
            like <code>convexQuery()</code>.
          </p>
          <p>
            Instead of React Query's standard interval and activity-based
            polling and manual invalidation, query results received from a
            WebSocket update the TanStack Query cache directly.
          </p>

          <Button onClick={() => sendTraffic()}>
            Simulat{simulationRunning ? 'ing' : 'e'} chat traffic{' '}
            {simulationRunning ? (
              <ReloadIcon className="h-4 w-4 animate-spin inline" />
            ) : null}
          </Button>
          <Chat useSuspense={true} showCode={false} />
        </div>
        <div>
          <p>
            <CodeSample
              code={`import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../convex/_generated/api";

const messagesQuery = convexQuery(
  api.messages.listMessages,
  { channel: "chatty" }
)
const { data, isPending } = useQuery(messagesQuery);`}
            />
          </p>
          <p>
            <CodeSample code={`queryClient.prefetchQuery(messagesQuery);`} />
          </p>
          <p>
            <CodeSample
              code={`const { data } = useQuery(convexQuery(
  api.messages.listMessages,
  { channel: "chatty" }
))`}
            />
          </p>
        </div>
      </div>

      <p>Even if you're not failiar with React Query, it will feel familiar.</p>
      <p>
        It's hooks in the <code>useQuery()</code> family return an object
        instead of the data directly.
      </p>
      <p>
        <code>convexQuery()</code> return a "query options" object which you can
        spread your own options into. Relevant settings when using convexQuery:
        `gcTime`,{' '}
      </p>
      <p>
        There are lots of other things React Query handles for fetch() endpoints
        that won't be consistent like Convex queries but can be kept up to date
        with interval or activity-based polling.
      </p>

      <p>
        Standard Convex hooks are still available to be imported from{' '}
        <code>"convex/react"</code> so be careful: there are two `useQuery()`
        hooks now. This micould change in future version of the integration and
        the Convex hooks are also available at aliases like{' '}
        <code>useConvexPaginatedQuery()</code>.
      </p>

      <h2>Resources / Learn More</h2>
      <p>
        <a href="https://github.com/get-convex/convex-react-query">
          @convex-dev/react-query
        </a>
      </p>
      <p>Read about TanStack Query</p>
      <p>https://docs.convex.dev/client/tanstack-query</p>
      <p>React Query's integration with TanStack Start</p>
      <p>
        <a href="https://tanstack.com/router/latest/docs/framework/react/start/ssr">
          TanStack Start SSR Guide
        </a>
      </p>
    </>
  )
}

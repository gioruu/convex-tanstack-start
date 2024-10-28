import { Link, createFileRoute } from '@tanstack/react-router'
import CodeBlock from '~/components/CodeSample'
import Chat from '~/components/Chat'
import { Button } from '~/components/ui/button'
import { convexQuery, useConvexMutation } from '@convex-dev/react-query'
import { api } from 'convex/_generated/api'
import { useQuery } from '@tanstack/react-query'
import { ReloadIcon } from '@radix-ui/react-icons'

export const Route = createFileRoute('/react-query')({
  component: LiveQueriesSSR,
})

export default function LiveQueriesSSR() {
  const sendTraffic = useConvexMutation(api.messages.simulateTraffic)
  const { data: simulationRunning } = useQuery(
    convexQuery(api.messages.isSimulatingTraffic, {}),
  )
  return (
    <div className="space-y-2">
      <p>
        <a href="https://github.com/get-convex/convex-react-query">
          @convex-dev/react-query
        </a>{' '}
        makes Convex queries update live in React Query. Instead of the standard
        interval and activity-based polling, updates are pushed to the browser
        over a WebSocket. Try it,
        <Button variant="link" onClick={() => sendTraffic()}>
          click here to simulate chat traffic
        </Button>
        {simulationRunning ? (
          <ReloadIcon className="h-4 w-4 animate-spin inline mr-2" />
        ) : null}
        to see these queries update live.
      </p>
      <p>
        This is how Convex queries normally work, but TanStack Start makes it
        easier than ever to server-side render this data as well.
      </p>
      <p>
        To SSR the data, either add a <Link to="/loaders">loader</Link> to the
        page use the{' '}
        <Link to="/useSuspenseQuery">
          <code>useSuspenseQuery()</code>
        </Link>{' '}
        hook.
      </p>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Chat useSuspense={true} />
          <Chat useSuspense={false} />
        </div>
      </div>
      <CodeBlock
        code={`const { data, loading } = useQuery(convexQuery(
  api.messages.listMessages,
  { channel: "chatty" }
))`}
      />
    </div>
  )
}

import { Link, createFileRoute } from '@tanstack/react-router'
import CodeBlock from '~/components/CodeSample'
import Chat from '~/components/Chat'
import { Button } from '~/components/ui/button'
import { useConvexMutation } from '@convex-dev/react-query'
import { api } from 'convex/_generated/api'

export const Route = createFileRoute('/react-query')({
  component: LiveQueriesSSR,
})

export default function LiveQueriesSSR() {
  const sendTraffic = useConvexMutation(api.messages.simulateTraffic)
  return (
    <div className="space-y-2">
      <p>
        <a href="https://github.com/get-convex/convex-react-query">
          @convex-dev/react-query
        </a>{' '}
        makes Convex queries update live in React Query.
        <Button variant="link" onClick={() => sendTraffic()}>
          Simulate chat traffic (TODO)
        </Button>
        to see these queries update live.
      </p>
      <p>
        The useQuery hook loads data only on the client. To include data in SSR
        add a <Link to="/loaders">loader</Link> to the page or use the{' '}
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

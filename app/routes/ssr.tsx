import { Link, createFileRoute } from '@tanstack/react-router'
import CodeSample from '~/components/CodeSample'
import Chat from '~/components/Chat'
import { Button } from '~/components/ui/button'
import { convexQuery, useConvexMutation } from '@convex-dev/react-query'
import { api } from 'convex/_generated/api'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { ReloadIcon } from '@radix-ui/react-icons'

export const Route = createFileRoute('/ssr')({
  component: LiveQueriesSSR,
})

export default function LiveQueriesSSR() {
  const sendTraffic = useConvexMutation(api.messages.simulateTraffic)
  const { data: simulationRunning } = useSuspenseQuery(
    convexQuery(api.messages.isSimulatingTraffic, {}),
  )
  return (
    <>
      <h2>SSR and Live Queries</h2>
      <p>
        TanStack Start is a server-rendered framework. Standard Convex{' '}
        <code>useQuery()</code> hook returns undefined on the server, so using
        TanStack Query hooks instead comes in handy here. The React Query client
        can be serialized so whatever data was loaded on the server is available
        at hydration time too. This makes rendering on the server and updating
        on the client is a one-step process.
      </p>
      <p>
        Waiting for this data to load in a <Link to="/loaders">loader</Link> or
        using the{' '}
        <Link to="/useSuspenseQuery">
          <code>useSuspenseQuery()</code>
        </Link>{' '}
        hook opts into server-side rendering. Try{' '}
        <a
          href="./"
          onClick={(e) => {
            e.preventDefault()
            window.location.reload()
          }}
        >
          reloading
        </a>{' '}
        the page to see the difference between <code>useSuspenseQuery()</code>{' '}
        and <code>useQuery()</code>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Chat useSuspense={true} showCode={true} />
        <Chat useSuspense={false} showCode={true} />
      </div>

      <p>Of course these queries are also live:</p>
      <Button onClick={() => sendTraffic()}>
        Simulat{simulationRunning ? 'ing' : 'e'} chat traffic{' '}
        {simulationRunning ? (
          <ReloadIcon className="h-4 w-4 animate-spin inline" />
        ) : null}
      </Button>

      <h2>Resources / Learning More</h2>
      <p>
        <a href="https://github.com/get-convex/convex-react-query">
          @convex-dev/react-query
        </a>
      </p>
      <p>Read about TanStack Query</p>
      <p>React Query's integration with TanStack Start</p>
    </>
  )
}

import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'

export const Route = createFileRoute('/live-queries-ssr')({
  component: LiveQueriesSSR,
})

export default function LiveQueriesSSR() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Live Queries that SSR</h2>
      <p className="text-lg">
        Convex React hooks can be used in TanStack Start as usual with React.
      </p>
      <p className="text-lg">
        Data from Convex can be loaded on the server with fetchQuery or can
        provide initial data to a client-side query with preloadQuery(). This
        works in TanStack Start Server Functions and loaders.
      </p>
      <p className="text-lg">
        But there's a better way to use Convex with TanStack Start by using
        TanStack Query that only requires the query be specified in one
        location: useSuspenseQuery().
      </p>
      <Card>
        TODO example of useSuspenseQuery() rendering a list of chat channels.
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>useSuspenseQuery Example</CardTitle>
          <CardDescription>
            A simple example of using useSuspenseQuery with Convex
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`
import { useSuspenseQuery } from '@tanstack/react-query'
import { api } from '~/convex/_generated/api'

export function MyComponent() {
  const { data } = useSuspenseQuery(api.messages.list)
  return <div>{data}</div>
}
            `}</code>
          </pre>
        </CardContent>
      </Card>
      <p className="text-lg">
        Multiple useSuspenseQuery calls will block on the server, potentially
        causing server-side data fetching waterfalls.
      </p>
      <p className="text-lg">
        To skip rendering on the server, use useQuery().
      </p>
      <p className="text-lg">
        To stream data in (so avoiding blocking the page render), add a suspense
        boundary around the components.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>useQuery Example</CardTitle>
          <CardDescription>
            A simple example of using useQuery with Convex
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`
import { useQuery } from '@tanstack/react-query'
import { api } from '../convex/_generated/api'

export function MyComponent() {
  const { data, isLoading, error } = useQuery(api.myQuery)
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return <div>{data}</div>
}
            `}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}

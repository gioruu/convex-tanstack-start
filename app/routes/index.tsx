import { Link, createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { CheckCircledIcon } from '@radix-ui/react-icons'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

export default function LandingPage() {
  const tools = [
    {
      name: 'TanStack Start',
      description:
        'A new React framework focused on routing, caching, and type safety.',
    },
    {
      name: 'Convex',
      description:
        'A typesafe database with live-updating queries with automatic invalidation.',
    },
    {
      name: 'TanStack Query',
      description:
        'AKA React Query. Asynchronous state management for server-side state like queries and mutations.',
    },
  ]

  const features = [
    {
      title: 'Live-updating Queries',
      description: 'Supercharging React Query with live updates from Convex.',
      link: '/react-query',
    },
    {
      title: 'Loaders and prefetching',
      description: 'Preload or wait for data in the loader.',
      link: '/loaders',
    },
    {
      title: 'Staying subscribed to queries',
      description: "Data not currently rendered doesn't need to be stale.",
      link: '/use-suspense-query',
    },
    {
      title: 'useSuspenseQuery',
      description:
        'Block on the server and client. Isomorphic data fetching with a single hook.',
      link: '/use-suspense-query',
    },
    {
      title: 'Consistent Client Views',
      description:
        'Convex ensures consistent, logical timestamp views of the database.',
      link: '/consistent-views',
    },
    {
      title: 'Recommended Patterns',
      description:
        'Best practices for using React Query, Convex, and TanStack Start together.',
      link: '/recommended-patterns',
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Render on the server, update in the browser.
      </h1>
      <p className="text-lg">
        Convex queries update without polling so your data is never out of sync.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
        {tools.map((tool, index) => (
          <Card
            key={index}
            className="bg-background/80 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300"
          >
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold text-primary text-center">
                {tool.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                {tool.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-lg mb-4">
        This is a TanStack Start site demonstrating patterns for using Convex
        with TanStack Start. Check out the{' '}
        <a
          href="https://github.com/get-convex/tanstack-start-guide/"
          className="text-primary hover:underline"
        >
          source on GitHub
        </a>
        .
      </p>
      <h2 className="text-2xl font-bold mb-8">
        <a
          href="https://docs.convex.dev/quickstart/tanstack"
          className="text-primary hover:underline"
        >
          Follow the Quickstart to get going
        </a>
      </h2>

      <p className="text-lg mb-4">
        Details about how things work once they're hooked up.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <Link to={feature.link}>
            <Card
              key={index}
              className="bg-background/80 backdrop-blur-sm border-primary/10"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

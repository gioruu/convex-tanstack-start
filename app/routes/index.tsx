import { Link, createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { ExternalLinkIcon } from '@radix-ui/react-icons'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

export default function LandingPage() {
  const tools = [
    {
      name: 'TanStack Start',
      description:
        'A new React framework focused on routing, caching, and type safety.',
      href: 'https://tanstack.com/start',
    },
    {
      name: 'Convex',
      description:
        'A typesafe database with live-updating queries with automatic invalidation.',
      href: 'https://www.convex.dev/',
    },
    {
      name: 'TanStack Query',
      description:
        'AKA React Query. Asynchronous state management for server-side state like queries and mutations.',
      href: 'https://tanstack.com/query',
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
    <div className="flex flex-col gap-8">
      <div className="flex flex-col max-w-2xl gap-4 my-8 not-prose">
        <h1 className="text-6xl font-bold text-balance text-white">
          Render on the server, update in the browser.
        </h1>
        <p className="text-xl font-light text-slate-300">
          Convex queries update without polling so your data is never out of
          sync.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
        {tools.map((tool) => (
          <a key={tool.href} href={tool.href} target="_blank" rel="noreferrer">
            <Card className="hover:bg-slate-800 transition-colors not-prose">
              <CardHeader className="relative">
                <CardTitle className="text-3xl font-bold text-center">
                  {tool.name}
                </CardTitle>
                <ExternalLinkIcon className="w-4 h-4 absolute top-1 right-2 text-slate-400" />
              </CardHeader>
              <CardContent>
                <p className="text-center text-slate-400 leading-tight text-balance text-base">
                  {tool.description}
                </p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
      <div>
        <p>
          This is a TanStack Start site demonstrating patterns for using Convex
          with TanStack Start. Check out the{' '}
          <a href="https://github.com/get-convex/tanstack-start-guide/">
            source on GitHub
          </a>{' '}
          or{' '}
          <a href="https://docs.convex.dev/quickstart/tanstack">
            follow the Quickstart
          </a>{' '}
          to get going.
        </p>
        <p>Details about how things work once they're hooked up.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
        {features.map((feature, index) => (
          <Link key={index} to={feature.link}>
            <Card className="hover:bg-slate-800 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 leading-tight text-base">
                {feature.description}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

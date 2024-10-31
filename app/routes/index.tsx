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
        'A typesafe database that live-updates and automatically invalidates queries.',
      href: 'https://www.convex.dev/',
    },
    {
      name: 'TanStack Query',
      description:
        'Asynchronous state management for server-side state like queries and mutations. AKA React Query.',
      href: 'https://tanstack.com/query',
    },
  ]

  const features = [
    {
      title: 'React Query hooks',
      description: 'Supercharging React Query with live updates from Convex.',
      link: '/react-query',
    },
    {
      title: 'Render on the server, update in the browser',
      description:
        'Hydrating the Query Client in the browser makes SSR take no extra steps.',
      link: '/ssr',
    },
    {
      title: 'Loaders and prefetching',
      description: 'Preload or wait for data in the loader.',
      link: '/loaders',
    },
    {
      title: 'Staying subscribed to queries',
      description: "Data not currently rendered doesn't need to be stale.",
      link: '/gcTime',
    },
    {
      title: 'Consistent Client Views',
      description:
        'Convex ensures consistent, logical timestamp views of the database.',
      link: '/consistent-views',
    },
    {
      title: 'Data loading philosophy',
      description:
        'Block on the server and client. Isomorphic data fetching with a single hook.',
      link: '/use-suspense-query',
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col max-w-2xl gap-4 my-8 not-prose">
          <h1 className="text-6xl font-bold text-balance text-white">
            TanStack Start, TanStack Query, and Convex
          </h1>
          <p className="text-xl font-light text-slate-300">
            TanStack Start is coming. Instead of the Convex React hooks you're
            used to, we recommend using Convex to supercharge TanStack Query's
            excellent Start integration.
          </p>

          <p className="text-xl font-light text-slate-300">
            This site is written with Start{' '}
            <a href="https://github.com/get-convex/tanstack-start-guide/">
              (see source)
            </a>{' '}
            using this setup. It goes over just the tip of the Start iceburg so
            also check out the{' '}
            <a href="https://tanstack.com/router/latest/docs/framework/react/start/overview">
              official guide
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col max-w-2xl gap-4 my-8 not-prose justify-center">
          <p className="text-xl font-light text-slate-300">
            Try out TanStack Start with Convex
          </p>
          <h2 className="text-2xl font-bold text-balance text-white">
            <a href="https://docs.convex.dev/quickstart/tanstack-start">
              Convex TanStack Quickstart
            </a>
          </h2>
          <p className="text-xl font-light text-slate-300">or run</p>
          <p className="text-xl font-light text-slate-300">
            <code>npm create convex@latest -- -t tanstack-start</code>
          </p>
        </div>
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
      <p>Read more about these projects</p>
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
    </div>
  )
}

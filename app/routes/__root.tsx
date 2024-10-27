import { QueryClient } from '@tanstack/react-query'
import { Link, createRootRouteWithContext } from '@tanstack/react-router'
import { Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'
import * as React from 'react'

import appCss from '../styles/app.css?url'
import { Button } from '~/components/ui/button'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    meta: () => [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: () => [{ rel: 'stylesheet', href: appCss }],
    component: RootComponent,
  },
)

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        <RootLayout>{children}</RootLayout>
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const activeProps = {
    className: 'bg-muted text-primary font-semibold',
  } as const
  const inactiveProps = {
    className: 'text-muted-foreground hover:text-primary',
  } as const
  const linkProps = { activeProps, inactiveProps } as const
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl font-bold">Convex with TanStack Start</h1>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/react-query" {...linkProps}>
                  <Button variant="ghost">Live Queries and SSR</Button>
                </Link>
              </li>
              <li>
                <Link to="/loaders" {...linkProps}>
                  <Button variant="ghost">Loaders</Button>
                </Link>
              </li>
              <li>
                <Link to="/gcTime" {...linkProps}>
                  <Button variant="ghost">Staying subscribed</Button>
                </Link>
              </li>
              <li>
                <Link to="/useSuspenseQuery" {...linkProps}>
                  <Button variant="ghost">useSuspenseQuery</Button>
                </Link>
              </li>
              <li>
                <Link to="/consistent-views" {...linkProps}>
                  <Button variant="ghost">Consistent Views</Button>
                </Link>
              </li>
              <li>
                <Link to="/recommended-patterns" {...linkProps}>
                  <Button variant="ghost">Recommendations</Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto px-4 py-4">{children}</div>
      </main>
    </div>
  )
}

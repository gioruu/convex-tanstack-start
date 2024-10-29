import { QueryClient } from '@tanstack/react-query'
import {
  Link,
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'
import * as React from 'react'
import { Button } from '~/components/ui/button'
import appCss from '../styles/app.css?url'
import { cn } from '~/lib/utils'

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
  const baseClasses = 'pb-1 font-medium px-3 py-2 transition-colors rounded-md'
  const activeProps = {
    className: cn(baseClasses, 'bg-slate-700'),
  } as const
  const inactiveProps = {
    className: cn(baseClasses, 'hover:bg-slate-800'),
  } as const
  const linkProps = { inactiveProps, activeProps } as const
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto py-4 flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">
          <Link to="/">
            <h1 className="text-2xl font-bold">Convex with TanStack Start</h1>
          </Link>
          <nav>
            <ul className="flex gap-4 xl:flex-row flex-col xl:gap-1">
              <li>
                <Link to="/react-query" {...linkProps}>
                  Live Queries and SSR
                </Link>
              </li>
              <li>
                <Link to="/loaders" {...linkProps}>
                  Loaders
                </Link>
              </li>
              <li>
                <Link to="/gcTime" {...linkProps}>
                  Staying subscribed
                </Link>
              </li>
              <li>
                <Link to="/useSuspenseQuery" {...linkProps}>
                  useSuspenseQuery
                </Link>
              </li>
              <li>
                <Link to="/consistent-views" {...linkProps}>
                  Consistent Views
                </Link>
              </li>
              <li>
                <Link to="/recommended-patterns" {...linkProps}>
                  Recommendations
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto py-16 prose-xl prose-slate prose-headings:font-bold prose-a:underline prose-a:underline-offset-3 prose-p:leading-snug transition-colors hover:prose-a:text-white">
        {children}
      </main>
    </div>
  )
}

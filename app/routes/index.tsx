import { createFileRoute } from '@tanstack/react-router'
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
      description: 'Asynchronous state management with queries and mutations.',
    },
  ]

  const benefits = [
    'Data that server-side renders and updates live: updates come in over a WebSocket instead of requiring polling',
    'Live Convex queries can be used with TanStack Query useQuery, useSuspenseQuery, etc. hooks',
    'Automatic query invalidation: when a mutation succeeds all queries it affects update automatically',
    "Consistent snapshot reads of database state: /messages will never return a foreign key for a /user that doesn't exist until the next fetch",
    'Selective optimistic update rollback: when a mutation succeeds only its update will be rolled back, with other optimistic updates reapplied',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <p className="text-lg">
          This page site is writte with TanStack Start, check out the code to
          see the source.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
        <h2 className="text-3xl font-bold text-center mb-8">
          Use Convex with TanStack Start and Query to get
        </h2>
        This should just be a list of the other pages.
        <Card className="bg-background/80 backdrop-blur-sm border-primary/10">
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircledIcon className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <h1 className="text-3xl font-bold">Getting Started</h1>
        <p className="text-lg">Add Reat Query to TanStack</p>
        <p className="text-lg">Add Convex</p>
        <p className="text-lg">
          Add @convex-dev/react-query
          https://github.com/get-convex/convex-react-query
        </p>
      </div>
    </div>
  )
}

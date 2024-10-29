import { convexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'

export const Route = createFileRoute('/loaders/no-loader')({
  component: Messages,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      cacheBust: typeof search.cacheBust === 'string' ? search.cacheBust : '',
    }
  },
})

function Messages() {
  const { cacheBust } = Route.useSearch()
  const { data } = useQuery(
    convexQuery(api.messages.listMessages, { cacheBust }),
  )
  return (
    <div>
      <div>Hello /loaders/ensure! Channel {cacheBust}</div>
      {data?.map((msg) => <div>{JSON.stringify(msg)}</div>)}
    </div>
  )
}

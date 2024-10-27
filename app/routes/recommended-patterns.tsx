import { Link, createFileRoute } from '@tanstack/react-router'
import CodeBlock from '~/components/CodeSample'

export const Route = createFileRoute('/recommended-patterns')({
  component: Recommendations,
})

export default function Recommendations() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Recommended Patterns</h2>
      <p className="text-lg">
        Centralize queries with Query Factories if you need to.
      </p>
    </div>
  )
}

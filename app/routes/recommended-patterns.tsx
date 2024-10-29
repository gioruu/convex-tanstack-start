import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recommended-patterns')({
  component: Recommendations,
})

export default function Recommendations() {
  return (
    <>
      <h2>Recommended Patterns</h2>
      <p>Centralize queries with Query Factories if you need to.</p>
    </>
  )
}

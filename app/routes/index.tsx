import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

export default function LandingPage() {
  return <div>Hello</div>
}

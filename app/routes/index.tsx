import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        <h1 className="text-6xl font-bold text-balance text-white m-0">
          TanStack <span className="text-cyan-500">Start</span>, TanStack
          <span className="text-red-500"> Query</span>, and{' '}
          <span className="text-[#F3B01C]">Convex</span>
        </h1>
        <div className="flex flex-col gap-4 not-prose lg:row-start-2">
          <p className="text-xl font-light text-slate-300">
            TanStack Start is coming. The best way to use Convex with Start is
            via React Query's excellent Start integration. This site is{' '}
            <a href="https://github.com/get-convex/convex-tanstack-start/">
              written with Start
            </a>{' '}
            using this setup.
          </p>

          <p className="text-xl font-light text-slate-300">
            You can jump straight to the quickstart or read more to learn about
            using Convex with Start. There's a lot more to TanStack Start so
            also check out the{' '}
            <a href="https://tanstack.com/router/latest/docs/framework/react/start/overview">
              official Start guide
            </a>
            .{' '}
          </p>
        </div>
        <div className="flex flex-col not-prose text-slate-300 lg:row-start-2">
          <p className="text-sm font-medium">
            Try out TanStack Start with Convex:
          </p>
          <p className="text-2xl font-bold mb-8">
            <a href="https://docs.convex.dev/quickstart/tanstack-start">
              Convex TanStack Quickstart
            </a>
          </p>
          <p className="text-sm font-bold mb-2">Or run:</p>
          <p className="text-lg font-light">
            <code className="bg-slate-700 block px-4 py-2 rounded-md border border-slate-600">
              npm create convex@latest -- -t tanstack-start
            </code>
          </p>
        </div>
      </div>
    </div>
  )
}

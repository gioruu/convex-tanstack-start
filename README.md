# Using Convex with TanStack Start

TanStack Start is a React framework that provides full-stack routing. There's a lot to love!

Convex is a typesafe database with live-updating queries that are never stale.

Using Convex with TanStack Start provides a few extras:

- Data that server-side renders, but also updates live: updates come in over a WebSocket instead of requiring polling
- Live Convex queries can be used with TanStack Query `useQuery`, useSuspenseQuery`, etc. hooks
- Automatic query invalidation: when a mutation succeeds all queries it affects update automatically
- Selective optimistic update rollback: when a mutation succeeds only its update will be rolled back, with other optimistic updates reapplied
- Consistent snapshot reads of database state: /messages will never return a foreign key for a /user that doesn't exist until the next fetch

# Examples

This app is written in TanStack Query, you can see the source!

## React Query navigation: preload or wait for load in the loader!

General React Query integration. This is the first thing to show.

Convex queries can be used with TanStack hooks. Just like Convex queries should,
they update live! This is provided by @convex-dev/react-query.

(simple demo: list of messages in a channel. New messages are being sent so we can tell it's live.)

### Loaders and prefetching

But the cooler bit of React Query integration is that you can preload in a loader!
Loaders in Start are isomorphic:
they run on the server during SSR and the run on the client the rest of the time.

This page shows all the messages in a channel. You can change channels!
You can see ensureQuery and preloadQuery working differently.

Demo: Look, it's messages in a channel!

In order to cache-bust, use a different random channel each time.
Two sets of "change channel" buttons:

- random channel #dogs (no loader)
- random channel #dogs (preloadQuery)
- random channel #dogs (ensureQuery)

Note the prefetching! Loaders can load ahead of time.

Loaders are isomorphic, they run on the server for server navigations.

- random channel #dogs (FULL REFRESH no loader)
- random channel #dogs (FULL REFRESH preloadQuery)
- random channel #dogs (FULL REFRESH ensureQuery)

Watch Tanner talk more about this in the video.

### Queries Caching

In the previous example we loaded a new channel each time
so you could see the difference between preloadQuery and ensureQuery.

But now try hopping back and forth: the default is for subscriptions to be held on to for
60 seconds. If you want different behavior you can get it.

And it's not cached data! It's live, changing data.

Check out the TanStack Query devtools: you can see which queries are active!

They'll stack up.

Demo: finite list of channels

## useSuspenseQuery blocks on the server and the client

Sometimes it's hard to hoist a query into a page. Sometimes component locality is very useful!

To block during SSR, use `useSuspenseQuery()`.

"Isomorphic data fetching with a single hook" -Tanner Linsley

Tanner's tweet https://twitter.com/tannerlinsley/status/1803524593505935591
and Theo's video https://youtu.be/lcLbYictX3k?t=1573

Multiple `useSuspenseQuery()` hook calls that depend on each other will result in server-side request waterfalls.

Multiple `useSuspenseQuery()` hook calls for _client_ navigations will result in _client-side waterfalls_!

So you might want to load this data early if you have any way to do that: use the query client
and call `prefetchQuery()`.

Just like before, you can still preload a query! useSuspenseQuery() is like ensureQueryData.

Demo: a profile page for a user! useSuspenseQuery for user data.

### Consistent client views

Server-side rendering is a special case: in order to build the HTML, Convex uses a single render.

For client-side navigations, Convex always presents a consistent, at-the-same-logical-timestamp
view of the database.

Consistency is useful!

Demo: a client-side join of channel users and channel messages.
Quickly have many clients join and send a message.
It works! Or just use number of users, number of messages matching (boo)

### Recommended Patterns

Use React Query, it's just too convenient!

Use useSuspenseQuery and add loaders as useful.
You can always optimize perforance where it's important.

Preload things as appropriate.

For infinite queries: use normal Convex hooks.

For non-reactive queries, treat it like a normal React Query query.

# Plan

Make this site look good somehow. Spend a weekend caring about CSS.

host this at https://labs.convex.dev/tanstack-start

Make this a public demo!

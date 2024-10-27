import { action, mutation } from './_generated/server'
import { query } from './_generated/server'
import { api } from './_generated/api.js'
import { v } from 'convex/values'

export const list = query(async (ctx, { cacheBust }) => {
  const _unused = cacheBust
  return await ctx.db.query('messages').collect()
})

export const listMessages = query({
  args: { cacheBust: v.any() },
  handler: async (ctx, args) => {
    const _unused = args.cacheBust
    const messages = await ctx.db.query('messages').order('desc').take(100)
    const messagesWithAuthor = await Promise.all(
      messages.map(async (message) => {
        const user = await ctx.db.get(message.user)
        // Join the count of likes with the message data
        return { ...message, user: user?.name || 'anonymous' }
      }),
    )
    return messagesWithAuthor
  },
})

export const count = query(async (ctx, { cacheBust }) => {
  const _unused = cacheBust
  return (await ctx.db.query('messages').collect()).length
})

export const listUsers = query(async (ctx, { cacheBust }) => {
  const _unused = cacheBust
  return await ctx.db.query('users').collect()
})

export const countUsers = query(async (ctx, { cacheBust }) => {
  const _unused = cacheBust
  return (await ctx.db.query('users').collect()).length
})

function choose(choices: string[]): string {
  return choices[Math.floor(Math.random() * choices.length)]
}

function madlib(strings: TemplateStringsArray, ...choices: any[]): string {
  return strings.reduce((result, str, i) => {
    return result + str + (choices[i] ? choose(choices[i]) : '')
  }, '')
}

const greetings = ['hi', 'Hi', 'hello', 'hey']
const names = ['James', 'Jamie', 'Emma', 'Nipunn']
const punc = ['...', '-', ',', '!', ';']
const text = [
  'how was your weekend?',
  "how's the weather in SF?",
  "what's your favorite ice cream place?",
  "I'll be late to make the meeting tomorrow morning",
  "Could you let the customer know we've fixed their issue?",
]

export const sendGeneratedMessage = mutation(async (ctx) => {
  const body = madlib`${greetings} ${names}${punc} ${text}`
  const user = await ctx.db.insert('users', {
    name: 'user' + Math.floor(Math.random() * 1000),
  })
  await ctx.db.insert('messages', { body, user: user })
})

// TODO concurrency here
export const sendGeneratedMessages = action({
  args: { num: v.number() },
  handler: async (ctx, { num }: { num: number }) => {
    await ctx.runMutation(api.messages.clear)
    for (let i = 0; i < num; i++) {
      await ctx.runMutation(api.messages.sendGeneratedMessage)
    }
  },
})

export const clear = mutation(async (ctx) => {
  await Promise.all([
    ...(await ctx.db.query('messages').collect()).map((message) => {
      ctx.db.delete(message._id)
    }),
    ...(await ctx.db.query('users').collect()).map((user) => {
      ctx.db.delete(user._id)
    }),
  ])
  for (const user of await ctx.db.query('users').collect()) {
    await ctx.db.delete(user._id)
  }
})

export const sendMessage = mutation(
  async (ctx, { user, body }: { user: string; body: string }) => {
    // userId ought to match User /d+
    // until every user gets their own channel, use simulated messages
    const cleanBody = madlib`${greetings} ${names}${punc} ${text}`
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_name')
      .filter((q) => q.eq(q.field('name'), user))
      .unique()
    let userId =
      existingUser?._id || (await ctx.db.insert('users', { name: user }))
    await ctx.db.insert('messages', { user: userId, body: cleanBody })
  },
)

export const simulateTraffic = mutation(async (ctx) => {
  // enable traffic simulation
  //ctx.scheduler.runAfter(0, functionReference)
})

/*
export const simulateTraffic = mutation(async (ctx) => {})
*/

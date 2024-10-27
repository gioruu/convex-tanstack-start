import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  messages: defineTable({
    body: v.string(),
    user: v.id('users'),
  }),
  users: defineTable({
    name: v.string(),
  }).index('by_name', ['name']),
  channel: defineTable({
    name: v.string(),
  }),
})

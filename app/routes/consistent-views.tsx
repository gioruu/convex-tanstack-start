import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/consistent-views')({
  component: ConsistentClientViews,
})

import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'

export default function ConsistentClientViews() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', user: 'User1' },
    { id: 2, text: 'Hi there!', user: 'User2' },
    { id: 3, text: 'How are you?', user: 'User1' },
  ])
  const [users, setUsers] = useState(['User1', 'User2', 'User3'])

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, user: 'CurrentUser' },
      ])
      setMessage('')
    }
  }

  const handleAddUsers = () => {
    // This is where you'd implement the logic to add many users
    console.log('Adding many users...')
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Consistent Client Views</h2>
      <p className="text-lg">
        Server-side rendering is a special case: in order to build the HTML,
        Convex uses a single render. For client-side navigations, Convex always
        presents a consistent, at-the-same-logical-timestamp view of the
        database. Consistency is useful!
      </p>
      <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>General</li>
              <li>Random</li>
              <li>Tech Talk</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {messages.map((msg) => (
                <div key={msg.id} className="p-2 bg-muted rounded-md">
                  <strong>{msg.user}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul>
              {users.map((user) => (
                <li key={user}>{user}</li>
              ))}
            </ul>
            <Button onClick={handleAddUsers}>Add Many Users</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

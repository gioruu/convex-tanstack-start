import { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery, useConvexMutation } from '@convex-dev/react-query'
import { api } from 'convex/_generated/api'
import { Skeleton } from './ui/skeleton'

const Message = ({
  user,
  body,
  _creationTime,
}: {
  user: string
  body: string
  _creationTime: number
}) => (
  <div className="flex items-start space-x-2 mb-4">
    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
      {user.toLowerCase().startsWith('user ') ? user[5] : user[0].toUpperCase()}
    </div>
    <div className="flex-1">
      <div className="flex items-baseline">
        <span className="font-semibold mr-2">{user}</span>
        <span className="text-xs text-muted-foreground">
          {new Date(_creationTime).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm mt-1">{body}</p>
    </div>
  </div>
)

const MessageSkeleton = () => (
  <div className="flex items-start space-x-2 mb-4">
    <Skeleton className="w-8 h-8 rounded-full" />
    <div className="flex-1">
      <div className="flex items-baseline">
        <Skeleton className="h-4 w-20 mr-2" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="h-4 w-full mt-1" />
    </div>
  </div>
)

export default function Component({ useSuspense }: { useSuspense: boolean }) {
  const useWhicheverQuery: typeof useQuery = useSuspense
    ? (useSuspenseQuery as typeof useQuery)
    : useQuery

  const { data, isPending, error } = useWhicheverQuery(
    convexQuery(api.messages.listMessages, { cacheBust: useSuspense }),
  )

  const [name] = useState(() => 'User ' + Math.floor(Math.random() * 10000))
  const [newMessage, setNewMessage] = useState('')
  const sendMessage = useConvexMutation(api.messages.sendMessage)

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage({ user: name, body: newMessage })
      setNewMessage('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="border-b">
          <h2 className="text-lg font-semibold">
            {useSuspense
              ? "SSR'd component pops in finished"
              : 'Client-only data initially renders skeletons'}
          </h2>
        </CardHeader>
        <CardContent className="h-[250px] overflow-y-auto">
          {isPending || error ? (
            <>
              <MessageSkeleton />
              <MessageSkeleton />
              <MessageSkeleton />
            </>
          ) : (
            data.map((msg) => (
              <Message
                key={msg._id}
                user={msg.user}
                body={msg.body}
                _creationTime={msg._creationTime}
              />
            ))
          )}
        </CardContent>
        <CardFooter className="border-t">
          <div className="flex w-full items-center space-x-2 pt-6">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button size="icon" onClick={handleSendMessage}>
              <PaperPlaneIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

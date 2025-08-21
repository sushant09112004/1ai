import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Bot, User } from "lucide-react"

// interface ChatMessageProps {
//   message: string
//   isUser: boolean
//   timestamp: string
// }

export function ChatMessage({ message, isUser, timestamp }) {
  return (
    <div className={`flex gap-4 p-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <Avatar className="h-8 w-8 bg-primary">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`max-w-[70%] ${isUser ? "order-first" : ""}`}>
        <Card
          className={`p-4 ${isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-card text-card-foreground"}`}
        >
          <p className="font-serif text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </Card>
        <p className={`text-xs text-muted-foreground mt-1 ${isUser ? "text-right" : "text-left"}`}>{timestamp}</p>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 bg-accent">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

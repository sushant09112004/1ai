"use client"


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Zap } from "lucide-react"

// interface ChatInputProps {
//   onSendMessage: (message: string) => void
//   isLoading?: boolean
// }

export function ChatInput({ onSendMessage, isLoading = false }) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="border-t border-border bg-background p-4">
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="min-h-[60px] max-h-[200px] resize-none font-serif bg-input border-border focus:ring-2 focus:ring-ring"
            disabled={isLoading}
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-sans font-medium px-6"
          >
            <Zap className="h-4 w-4 mr-2" />
            Think Faster
          </Button>
          <Button
            type="submit"
            variant="outline"
            size="icon"
            disabled={!message.trim() || isLoading}
            className="border-border hover:bg-accent/10 bg-transparent"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Zap, Sparkles } from "lucide-react"

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

  const handleThinkFaster = () => {
    if (message.trim() && !isLoading) {
      // Add a special prefix to indicate "think faster" mode
      onSendMessage(`[THINK_FASTER] ${message.trim()}`)
      setMessage("")
    }
  }

  const isMessageValid = message.trim().length > 0 && !isLoading

  return (
    <div className="border-t border-border bg-background p-4">
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
            className="min-h-[60px] max-h-[200px] resize-none font-serif bg-input border-border focus:ring-2 focus:ring-ring"
            disabled={isLoading}
            rows={1}
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={handleThinkFaster}
            disabled={!isMessageValid}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-sans font-medium px-6 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Think Faster
          </Button>
          <Button
            type="submit"
            variant="outline"
            size="icon"
            disabled={!isMessageValid}
            className="border-border hover:bg-accent/10 bg-transparent transition-all duration-200"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
      
      {/* Character count and tips */}
      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
        <span>{message.length} characters</span>
        <span className="text-center">
          {isLoading ? "AI is thinking..." : "Press Enter to send"}
        </span>
        <span className="text-right">
          {message.length > 1000 ? "Message is getting long" : ""}
        </span>
      </div>
    </div>
  )
}

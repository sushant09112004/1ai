"use client"

import { useState, useRef, useEffect } from "react"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChatInput } from "@/components/chat-input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "@/components/chat-messages"

const initialMessages = [
  {
    id: "1",
          content: "Hello! I&apos;m your AI assistant powered by Gemini. How can I help you today?",
    isUser: false,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
]

export default function ChatInterface() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = async (content) => {
    if (!content.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: content.trim() }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from AI")
      }

      const data = await response.json()
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I apologize, but I couldn&apos;t generate a response at the moment. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Chat error:", error)
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "I&apos;m sorry, I encountered an error while processing your request. Please check your internet connection and try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewChat = () => {
    setMessages(initialMessages)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ChatSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onNewChat={handleNewChat}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card p-4">
          <h2 className="font-sans font-semibold text-lg text-card-foreground">AI Assistant</h2>
          <p className="text-sm text-muted-foreground font-serif">Ask me anything and I&apos;ll think faster to help you</p>
        </div>

        {/* Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1">
          <div className="space-y-4 p-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && (
              <div className="flex gap-4 p-4">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-primary-foreground rounded-full animate-pulse" />
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}

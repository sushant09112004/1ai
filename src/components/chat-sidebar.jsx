"use client"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PanelLeft, MessageSquare, Plus, Settings, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const mockChatHistory = [
  { id: "1", title: "React Components Best Practices", timestamp: "2 hours ago" },
  { id: "2", title: "TypeScript Advanced Types", timestamp: "1 day ago" },
  { id: "3", title: "Next.js App Router Guide", timestamp: "2 days ago" },
  { id: "4", title: "CSS Grid vs Flexbox", timestamp: "3 days ago" },
  { id: "5", title: "Database Design Patterns", timestamp: "1 week ago" },
]

export function ChatSidebar({ isCollapsed, onToggle, onNewChat }) {
  const { theme, setTheme } = useTheme()

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat()
    }
  }

  return (
    <div
      className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col h-full`}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
          {!isCollapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={handleNewChat}
            >
              <Plus className="h-5 w-5" />
            </Button>
          )}
        </div>
        {!isCollapsed && <h1 className="font-sans font-semibold text-lg text-sidebar-foreground mt-2">AI Chat</h1>}
      </div>

      {/* Chat History */}
      <ScrollArea className="flex-1 p-2">
        {isCollapsed ? (
          <div className="space-y-2">
            {mockChatHistory.slice(0, 5).map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                size="icon"
                className="w-full text-sidebar-foreground hover:bg-sidebar-accent"
                title={chat.title}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {mockChatHistory.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                className="w-full justify-start text-left p-3 h-auto text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm font-medium truncate">{chat.title}</p>
                    <p className="text-xs text-sidebar-foreground/60 mt-1">{chat.timestamp}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {!isCollapsed && (
            <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

# AI Chat Setup Guide

## Prerequisites

1. **Google Gemini API Key**: You need to get an API key from Google AI Studio
   - Visit: https://makersuite.google.com/app/apikey
   - Create a new API key
   - Copy the key for use in your environment variables

## Environment Variables

Add the following to your `.env.local` file:

```env
# Google Gemini API Key
GEMINI_API_KEY="your-gemini-api-key-here"
```

## Features Implemented

### ✅ Chat Interface
- Real-time chat with Gemini AI
- Responsive design for all screen sizes
- Auto-scroll to latest messages
- Loading states and error handling

### ✅ Think Faster Mode
- Special "Think Faster" button for quick responses
- Concise AI responses for faster interaction
- Visual distinction with gradient button

### ✅ User Experience
- Character count display
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Message timestamps
- Error handling with user-friendly messages

### ✅ Navigation
- Chat link added to navbar for authenticated users
- New chat functionality in sidebar
- Collapsible sidebar for mobile devices

## Usage

1. **Start the application**: `npm run dev`
2. **Login/Signup**: Create an account or login
3. **Access Chat**: Click "AI Chat" in the navbar or go to `/chat`
4. **Send Messages**: Type your message and press Enter or click Send
5. **Think Faster**: Use the "Think Faster" button for quick responses
6. **New Chat**: Click the "+" button in the sidebar to start a new conversation

## API Endpoints

- `POST /api/chat` - Send messages to Gemini AI
  - Body: `{ "prompt": "your message here" }`
  - Response: `{ "response": "AI response", "timestamp": "...", "mode": "normal|fast" }`

## Error Handling

The chat system handles various error scenarios:
- Invalid API keys
- Network errors
- API quota exceeded
- Invalid input validation
- Service unavailability

## Responsive Design

The chat interface is fully responsive:
- Mobile-first design
- Collapsible sidebar on smaller screens
- Touch-friendly buttons
- Optimized for all device sizes

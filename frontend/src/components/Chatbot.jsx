'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Calendar, Send, Loader2, ChevronDown, ChevronUp } from 'lucide-react'

const predefinedQuestions = [
  {
    id: 'q1',
    question: 'How do I create a new event?',
    answer: 'To create a new event, click on the "Create Event" button on your dashboard. Fill in the event details such as name, date, time, and location. You can then invite collaborators and start planning!'
  },
  {
    id: 'q2',
    question: 'Can I invite co-organizers?',
    answer: 'Yes, you can invite co-organizers to help plan your event. After creating an event, go to the "Team" tab and click "Invite Collaborator". Enter their email address and assign their role.'
  },
  {
    id: 'q3',
    question: 'How do I manage the guest list?',
    answer: 'To manage your guest list, go to the "Guests" tab in your event dashboard. Here you can add new guests, import contacts, send invitations, and track RSVPs. You can also create custom guest categories for easy organization.'
  },
  {
    id: 'q4',
    question: 'What budgeting tools are available?',
    answer: 'Event Buddy offers comprehensive budgeting tools. In the "Budget" section, you can set your overall budget, add expense categories, and track individual expenses. The platform also provides visual charts to help you stay on top of your spending.'
  },
  {
    id: 'q5',
    question: 'How can I create a timeline for my event?',
    answer: 'To create an event timeline, use the "Schedule" feature. You can add tasks, set deadlines, and assign responsibilities to team members. The timeline view gives you a visual representation of your event planning progress.'
  }
]

export default function EventBuddyChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome to Event Buddy! I'm here to help you plan and execute your event. How can I assist you today?"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQuestions, setShowQuestions] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === '') return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    }

    setMessages(prevMessages => [...prevMessages, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm processing your request. For quicker assistance, you can also choose from the predefined questions below."
      }
      setMessages(prevMessages => [...prevMessages, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handlePredefinedQuestion = (question) => {
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: question.question
    }

    const aiMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: question.answer
    }

    setMessages(prevMessages => [...prevMessages, userMessage, aiMessage])
  }

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md mx-auto border border-purple-300 rounded-lg overflow-hidden bg-white shadow-lg">
      <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 mr-2" />
          <h2 className="text-xl font-semibold">Event Buddy Chat</h2>
        </div>
        <button
          onClick={() => setShowQuestions(!showQuestions)}
          className="text-white focus:outline-none"
          aria-label={showQuestions ? "Hide predefined questions" : "Show predefined questions"}
        >
          {showQuestions ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${message.role === 'user' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {showQuestions && (
        <div className="p-4 border-t border-purple-300 bg-purple-50">
          <h3 className="text-sm font-semibold text-purple-700 mb-2">Quick Questions:</h3>
          <div className="space-y-2">
            {predefinedQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => handlePredefinedQuestion(q)}
                className="w-full text-left text-sm text-purple-600 hover:text-purple-800 focus:outline-none focus:text-purple-800"
              >
                {q.question}
              </button>
            ))}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-4 border-t border-purple-300">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about event planning..."
            className="flex-1 px-4 py-2 border border-purple-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Event planning chat input"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
            disabled={isLoading}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

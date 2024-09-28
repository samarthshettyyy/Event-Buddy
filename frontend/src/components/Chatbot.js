import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Send, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import './Chatbot.css'

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
];

const Chatbot=()=> {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome to Event Buddy! I'm here to help you plan and execute your event. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm processing your request. For quicker assistance, you can also choose from the predefined questions below."
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handlePredefinedQuestion = (question) => {
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: question.question
    };

    const aiMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: question.answer
    };

    setMessages(prevMessages => [...prevMessages, userMessage, aiMessage]);
  };

  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        <div className="chat-header">
          <div className="header-left">
            <Calendar className="header-icon" />
            <h2 className="header-title">Chatbot</h2>
          </div>
          <button
            onClick={() => setShowQuestions(!showQuestions)}
            className="header-toggle"
            aria-label={showQuestions ? "Hide predefined questions" : "Show predefined questions"}
          >
            {showQuestions ? <ChevronUp className="header-icon" /> : <ChevronDown className="header-icon" />}
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message-wrapper ${message.role}`}>
              <div className={`message-content ${message.role}`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message-center">
              <Loader2 className="loader-icon" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {showQuestions && (
          <div className="chat-questions">
            <h3>Quick Questions:</h3>
            {predefinedQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => handlePredefinedQuestion(q)}
                className="question-button"
              >
                {q.question}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about event planning..."
            className="chat-input"
            aria-label="Event planning chat input"
          />
          <button
            type="submit"
            className="send-button"
            disabled={isLoading}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="loader-icon" />
            ) : (
              <Send className="send-icon" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
export default Chatbot
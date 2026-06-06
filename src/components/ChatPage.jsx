import { useState, useRef, useEffect } from 'react'
import './ChatPage.css'

const initialMessages = [
  { id: 1, from: 'patient', text: 'Hello doctor, I have been feeling worse lately.', time: '09:02 AM' },
  { id: 2, from: 'doctor',  text: "I'm sorry to hear that. Can you describe what you're feeling?", time: '09:04 AM' },
  { id: 3, from: 'patient', text: 'I have severe pain in my chest and shortness of breath.', time: '09:05 AM' },
  { id: 4, from: 'doctor',  text: 'Please take your prescribed medication and rest. I will schedule an urgent visit for tomorrow.', time: '09:07 AM' },
  { id: 5, from: 'patient', text: 'Thank you doctor, I appreciate it.', time: '09:08 AM' },
]

export default function ChatPage({ patient, onBack }) {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function sendMessage() {
    const text = input.trim()
    if (!text) return
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    setMessages(m => [...m, { id: Date.now(), from: 'doctor', text, time: now }])
    setInput('')
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat">
      {/* Header */}
      <div className="chat__header">
        <button className="chat__back" onClick={onBack} aria-label="Back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <img src={patient.avatar} alt={patient.name} className="chat__header-avatar" />
        <div className="chat__header-info">
          <span className="chat__header-name">{patient.name}</span>
          <span className="chat__header-sub">{patient.illness} · {patient.stage}</span>
        </div>
        <div className="chat__header-actions">
          <button className="chat__header-btn" title="Voice Call">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>
          <button className="chat__header-btn" title="Video Call">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="chat__body">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat__msg chat__msg--${msg.from}`}>
            {msg.from === 'patient' && (
              <img src={patient.avatar} alt={patient.name} className="chat__msg-avatar" />
            )}
            <div className="chat__msg-bubble">
              <p>{msg.text}</p>
              <span className="chat__msg-time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat__footer">
        <div className="chat__input-wrap">
          <textarea
            className="chat__input"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
          />
          <button className="chat__send" onClick={sendMessage} disabled={!input.trim()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

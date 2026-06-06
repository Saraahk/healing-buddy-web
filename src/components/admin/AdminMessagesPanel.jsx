import { useState } from 'react'
import './AdminMessagesPanel.css'

const MESSAGES = [
  { id:1, name:'Fatima Ali',     email:'fatima.ali@email.com',    subject:'Cannot log in to my account',
    body:'Hello, I have been trying to log in to my account for the past 2 days but I keep getting an error. I have already tried resetting my password but nothing works. Please help.',
    date:'Today, 10:24 AM', status:'new' },
  { id:2, name:'Ahmed Hassan',   email:'ahmed.hassan@email.com',  subject:'My Healing Buddy cannot see my updates',
    body:'Hi admin, I invited my Healing Buddy Hana to support me on the platform but she says she cannot see any of my healing notes or progress updates even though I granted her access. Can you look into this?',
    date:'Today, 9:05 AM',  status:'new' },
  { id:3, name:'Lina Al-Said',   email:'lina.said@email.com',     subject:'Question about signing up as a doctor',
    body:'Hello, I am a doctor specializing in chronic kidney disease and I would like to join the Healing Buddy platform to support my patients. I submitted a sign-up request 5 days ago but have not heard back. What is the process?',
    date:'Today, 8:30 AM',  status:'new' },
  { id:4, name:'Khaled Ibrahim', email:'khaled.ibrahim@email.com',subject:'Feature request: group sessions',
    body:'Hi team, I am a Healing Buddy supporting 3 patients. It would be really helpful to have a group session feature where I can communicate with multiple patients at once. Is this something you are considering?',
    date:'Yesterday',       status:'read' },
  { id:5, name:'Sara Al-Dosari', email:'sara.dosari@email.com',   subject:'Family member cannot see patient profile',
    body:'My sister invited me to view her profile as a family member but when I log in I only see a blank page. She has given me permission to see her healing updates and progress but nothing shows.',
    date:'Yesterday',       status:'read' },
  { id:6, name:'Omar Al-Farsi',  email:'omar.farsi@email.com',    subject:'Delete my account',
    body:'Hello, I would like to delete my account and all associated data. Please let me know the steps to do this. Thank you.',
    date:'2 days ago',      status:'read' },
]

export default function AdminMessagesPanel({ onRead }) {
  const [messages, setMessages] = useState(MESSAGES)
  const [selected, setSelected] = useState(null)
  const [reply, setReply]       = useState('')
  const [filter, setFilter]     = useState('all')

  const filtered = messages.filter(m => filter === 'all' || m.status === filter)

  function open(msg) {
    setSelected(msg)
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'read' } : m))
    const stillNew = messages.filter(m => m.id !== msg.id && m.status === 'new').length
    if (stillNew === 0) onRead?.()
  }

  const newCount = messages.filter(m => m.status === 'new').length

  return (
    <div className="admin-messages">
      <div className="admin-messages__list">
        <div className="admin-messages__list-header">
          <div className="admin-messages__list-title-row">
            <h2 className="admin-messages__list-title">Messages</h2>
            {newCount > 0 && <span className="admin-messages__new-badge">{newCount} new</span>}
          </div>
          <div className="admin-messages__filter-row">
            {['all', 'new', 'read'].map(f => (
              <button
                key={f}
                className={`admin-messages__filter-btn ${filter === f ? 'admin-messages__filter-btn--active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-messages__thread-list">
          {filtered.map(m => (
            <div
              key={m.id}
              className={`admin-messages__thread ${selected?.id === m.id ? 'admin-messages__thread--active' : ''} ${m.status === 'new' ? 'admin-messages__thread--new' : ''}`}
              onClick={() => open(m)}
            >
              <div className="admin-messages__thread-avatar">{m.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
              <div className="admin-messages__thread-info">
                <div className="admin-messages__thread-row">
                  <span className="admin-messages__thread-name">{m.name}</span>
                  <span className="admin-messages__thread-date">{m.date}</span>
                </div>
                <p className="admin-messages__thread-subject">{m.subject}</p>
                <p className="admin-messages__thread-preview">{m.body.slice(0, 70)}…</p>
              </div>
              {m.status === 'new' && <span className="admin-messages__unread-dot" />}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="admin-messages__empty-list">No messages.</div>
          )}
        </div>
      </div>

      <div className="admin-messages__view">
        {selected ? (
          <>
            <div className="admin-messages__view-header">
              <div className="admin-messages__view-from">
                <div className="admin-messages__view-avatar">{selected.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                <div>
                  <p className="admin-messages__view-name">{selected.name}</p>
                  <p className="admin-messages__view-email">{selected.email}</p>
                </div>
              </div>
              <span className="admin-messages__view-date">{selected.date}</span>
            </div>

            <div className="admin-messages__view-body">
              <h3 className="admin-messages__view-subject">{selected.subject}</h3>
              <p className="admin-messages__view-text">{selected.body}</p>
            </div>

            <div className="admin-messages__view-compose">
              <textarea
                className="admin-messages__compose-input"
                placeholder={`Reply to ${selected.name}...`}
                value={reply}
                onChange={e => setReply(e.target.value)}
                rows={3}
              />
              <button
                className="admin-messages__send-btn"
                disabled={!reply.trim()}
                onClick={() => setReply('')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Send Reply
              </button>
            </div>
          </>
        ) : (
          <div className="admin-messages__empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <p>Select a message to read</p>
          </div>
        )}
      </div>
    </div>
  )
}

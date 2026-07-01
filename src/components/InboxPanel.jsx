import { useState } from 'react'
import './InboxPanel.css'

const MESSAGES = [
  { id: 1, name: 'Omar Khalid',   avatar: 'https://randomuser.me/api/portraits/men/47.jpg',   preview: 'Doctor, I wanted to check if my liver enzyme results are back yet.', time: '10:24 AM', unread: 2, },
  { id: 2, name: 'Ahmed El Said', avatar: 'https://randomuser.me/api/portraits/men/41.jpg',   preview: 'My brother is feeling much better today after the last session.', time: '9:05 AM',  unread: 1, },
  { id: 3, name: 'Linda Thorne',  avatar: 'https://randomuser.me/api/portraits/women/44.jpg', preview: 'Can we reschedule Marcus\'s appointment to next Monday?', time: 'Yesterday', unread: 0, },
  { id: 4, name: 'Khaled Ahmed',  avatar: 'https://randomuser.me/api/portraits/men/43.jpg',   preview: 'Sara\'s blood sugar was a bit high this morning.', time: 'Yesterday', unread: 0, },
  { id: 5, name: 'Richard Croft', avatar: 'https://randomuser.me/api/portraits/men/46.jpg',   preview: 'Thank you for the last session, Lara is doing much better.', time: 'Mon', unread: 2, },
]

export default function InboxPanel({ onBack }) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [messages, setMessages] = useState(MESSAGES)
  const [reply, setReply] = useState('')

  const filtered = messages.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.preview.toLowerCase().includes(search.toLowerCase())
  )

  function openThread(msg) {
    setSelected(msg)
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, unread: 0 } : m))
  }

  return (
    <div className="inbox">
      {/* Left — thread list */}
      <div className="inbox__list">
        <div className="inbox__list-header">
          <div className="inbox__title-row">
            {onBack && (
              <button className="inbox__back-btn" onClick={onBack} aria-label="Back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
            )}
            <h2 className="inbox__title">Inbox</h2>
          </div>
          <div className="inbox__search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="inbox__search"
              placeholder="Search messages..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="inbox__threads">
          {filtered.map(m => (
            <div
              key={m.id}
              className={`inbox__thread ${selected?.id === m.id ? 'inbox__thread--active' : ''} ${m.unread ? 'inbox__thread--unread' : ''}`}
              onClick={() => openThread(m)}
            >
              <div className="inbox__thread-avatar-wrap">
                <img src={m.avatar} alt={m.name} className="inbox__thread-avatar" />
                {m.unread > 0 && <span className="inbox__thread-badge">{m.unread}</span>}
              </div>
              <div className="inbox__thread-info">
                <div className="inbox__thread-row">
                  <span className="inbox__thread-name">{m.name}</span>
                  <span className="inbox__thread-time">{m.time}</span>
                </div>
                <p className="inbox__thread-preview">{m.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — thread view */}
      <div className="inbox__view">
        {selected ? (
          <>
            <div className="inbox__view-header">
              <img src={selected.avatar} alt={selected.name} className="inbox__view-avatar" />
              <div>
                <p className="inbox__view-name">{selected.name}</p>
                <p className="inbox__view-role">Patient's family member</p>
              </div>
            </div>

            <div className="inbox__view-body">
              <div className="inbox__bubble inbox__bubble--in">
                <p>{selected.preview}</p>
                <span className="inbox__bubble-time">{selected.time}</span>
              </div>
            </div>

            <div className="inbox__view-compose">
              <input
                className="inbox__compose-input"
                placeholder={`Reply to ${selected.name}...`}
                value={reply}
                onChange={e => setReply(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && reply.trim()) setReply('') }}
              />
              <button
                className="inbox__send-btn"
                disabled={!reply.trim()}
                onClick={() => setReply('')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="inbox__empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <p>Select a conversation to read</p>
          </div>
        )}
      </div>
    </div>
  )
}

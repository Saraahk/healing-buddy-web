import { useState, useEffect } from 'react'
import './AdminMessagesPanel.css'
import BASE_URL from '../../api'

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const now = new Date()
  const diffH = Math.floor((now - d) / 3600000)
  const diffD = Math.floor((now - d) / 86400000)
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  if (diffH < 24 && d.getDate() === now.getDate()) return `Today, ${time}`
  if (diffD === 1) return 'Yesterday'
  if (diffD < 7) return `${diffD} days ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function mapMsg(m) {
  return {
    id:      m.id,
    name:    m.name,
    email:   m.email,
    subject: 'Account Access Request',
    body:    m.message,
    date:    formatDate(m.created_at),
    status:  m.status === 'Read' ? 'read' : 'new',
  }
}

export default function AdminMessagesPanel({ onCountChange }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading]   = useState(true)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter]     = useState('all')
  const [composing, setComposing] = useState(false)
  const [composeBody, setComposeBody] = useState('')
  const [sent, setSent]         = useState(false)

  useEffect(() => {
    fetch(`${BASE_URL}/contact-messages`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map(mapMsg)
          setMessages(mapped)
          onCountChange?.(mapped.filter(m => m.status === 'new').length)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = messages.filter(m => filter === 'all' || m.status === filter)

  function open(msg) {
    setSelected(msg)
    setComposing(false)
    setSent(false)
    setComposeBody('')
    if (msg.status === 'new') {
      fetch(`${BASE_URL}/contact-messages/${msg.id}/read`, { method: 'PATCH' }).catch(() => {})
    }
    setMessages(prev => {
      const next = prev.map(m => m.id === msg.id ? { ...m, status: 'read' } : m)
      onCountChange?.(next.filter(m => m.status === 'new').length)
      return next
    })
  }

  function sendEmail() {
    if (!composeBody.trim() || !selected) return
    setSent(true)
    setTimeout(() => { setSent(false); setComposing(false); setComposeBody('') }, 2000)
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
          {loading && <div className="admin-messages__empty-list">Loading…</div>}
          {!loading && filtered.map(m => (
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
          {!loading && filtered.length === 0 && (
            <div className="admin-messages__empty-list">No messages.</div>
          )}
        </div>

        <div className="admin-messages__list-footer">
          <button className="admin-messages__gmail-compose" onClick={() => { setSelected(null); setComposing(true) }} title="Compose">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="admin-messages__view">
        {composing && !selected ? (
          <div className="admin-messages__compose-page">
            <div className="admin-messages__compose-page-header">
              <button className="admin-messages__back-btn" onClick={() => { setComposing(false); setComposeBody(''); setSent(false) }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                Back
              </button>
              <h3 className="admin-messages__compose-page-title">New Email</h3>
            </div>
            <div className="admin-messages__compose-form">
              <div className="admin-messages__compose-field">
                <label>To</label>
                <input className="admin-messages__compose-subject" placeholder="recipient@email.com" />
              </div>
              <div className="admin-messages__compose-field">
                <label>Subject</label>
                <input className="admin-messages__compose-subject" placeholder="Subject..." />
              </div>
              <div className="admin-messages__compose-field admin-messages__compose-field--grow">
                <label>Message</label>
                <textarea className="admin-messages__compose-body" placeholder="Write your message..." value={composeBody} onChange={e => setComposeBody(e.target.value)} />
              </div>
            </div>
            <div className="admin-messages__compose-page-footer">
              <button className="admin-messages__send-btn" disabled={!composeBody.trim()} onClick={sendEmail}>
                {sent ? <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Sent!</> : <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Email</>}
              </button>
              <button className="admin-messages__cancel-compose" onClick={() => { setComposing(false); setComposeBody('') }}>Cancel</button>
            </div>
          </div>
        ) : selected ? (
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

            {!composing ? (
              <>
                <div className="admin-messages__view-body">
                  <h3 className="admin-messages__view-subject">{selected.subject}</h3>
                  <div className="admin-messages__bubble admin-messages__bubble--in">
                    <p className="admin-messages__bubble-text">{selected.body}</p>
                    <span className="admin-messages__bubble-time">{selected.date}</span>
                  </div>
                </div>
                <div className="admin-messages__reply-box">
                  <textarea
                    className="admin-messages__reply-input"
                    placeholder={`Reply to ${selected.name}...`}
                    value={composeBody}
                    onChange={e => { setComposeBody(e.target.value); setSent(false) }}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendEmail() } }}
                    rows={3}
                  />
                  <button
                    className="admin-messages__reply-send"
                    disabled={!composeBody.trim()}
                    onClick={sendEmail}
                  >
                    {sent ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="admin-messages__compose-page">
                <div className="admin-messages__compose-page-header">
                  <button className="admin-messages__back-btn" onClick={() => { setComposing(false); setComposeBody(''); setSent(false) }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                    Back
                  </button>
                  <h3 className="admin-messages__compose-page-title">New Email</h3>
                </div>

                <div className="admin-messages__compose-form">
                  <div className="admin-messages__compose-field">
                    <label>To</label>
                    <div className="admin-messages__compose-to">{selected.name} &lt;{selected.email}&gt;</div>
                  </div>
                  <div className="admin-messages__compose-field">
                    <label>Subject</label>
                    <input className="admin-messages__compose-subject" defaultValue={`Re: ${selected.subject}`} />
                  </div>
                  <div className="admin-messages__compose-field admin-messages__compose-field--grow">
                    <label>Message</label>
                    <textarea
                      className="admin-messages__compose-body"
                      placeholder="Write your message..."
                      value={composeBody}
                      onChange={e => setComposeBody(e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-messages__compose-page-footer">
                  <a
                    className={`admin-messages__send-btn ${!composeBody.trim() ? 'admin-messages__send-btn--disabled' : ''}`}
                    href={composeBody.trim() ? `mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}&body=${encodeURIComponent(composeBody)}` : undefined}
                    onClick={composeBody.trim() ? sendEmail : e => e.preventDefault()}
                    target="_blank" rel="noreferrer"
                  >
                    {sent ? (
                      <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Sent!</>
                    ) : (
                      <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Email</>
                    )}
                  </a>
                  <button className="admin-messages__cancel-compose" onClick={() => { setComposing(false); setComposeBody('') }}>Cancel</button>
                </div>
              </div>
            )}
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

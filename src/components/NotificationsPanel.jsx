import { useState, useEffect } from 'react'
import './NotificationsPanel.css'
import BASE_URL from '../api'

const typeIcon = {
  announcement: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  appointment: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
}

const typeColor = {
  announcement: 'notif--appt',
  appointment:  'notif--appt',
}

function timeAgo(isoStr) {
  if (!isoStr) return ''
  const diff = Date.now() - new Date(isoStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins < 60)  return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

export default function NotificationsPanel() {
  const [notifs, setNotifs] = useState([])
  const [loading, setLoading] = useState(true)
  const [read, setRead] = useState(new Set())

  useEffect(() => {
    fetch(`${BASE_URL}/announcement/doctor/notifications`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNotifs(data.map(a => ({
            id:    a.id,
            type:  'announcement',
            title: a.title ?? 'Announcement',
            body:  a.content ?? '',
            time:  timeAgo(a.sent_at ?? a.created_at),
          })))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function markRead(id) {
    setRead(prev => new Set([...prev, id]))
  }

  function markAllRead() {
    setRead(new Set(notifs.map(n => n.id)))
  }

  const unread = notifs.filter(n => !read.has(n.id)).length

  return (
    <div className="notif">
      <div className="notif__header">
        <div>
          <h2 className="notif__title">Notifications</h2>
          {unread > 0 && <span className="notif__count">{unread} unread</span>}
        </div>
        {unread > 0 && (
          <button className="notif__mark-all" onClick={markAllRead}>Mark all as read</button>
        )}
      </div>

      <div className="notif__list">
        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>Loading…</p>
        ) : notifs.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>No notifications</p>
        ) : notifs.map(n => (
          <div
            key={n.id}
            className={`notif__item ${!read.has(n.id) ? 'notif__item--unread' : ''}`}
            onClick={() => markRead(n.id)}
          >
            <div className={`notif__icon ${typeColor[n.type] ?? 'notif--appt'}`}>
              {typeIcon[n.type] ?? typeIcon.announcement}
            </div>
            <div className="notif__content">
              <div className="notif__row">
                <p className="notif__item-title">{n.title}</p>
                {!read.has(n.id) && <span className="notif__dot" />}
              </div>
              <p className="notif__body">{n.body}</p>
              <span className="notif__time">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

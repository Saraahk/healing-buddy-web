import { useState } from 'react'
import './NotificationsPanel.css'

const NOTIFS = [
  { id: 1, type: 'appointment', title: 'Upcoming Appointment', body: 'You have a session with Omar Khalid tomorrow at 08:30 AM.', time: '2 hours ago', read: false },
  { id: 2, type: 'emergency',   title: 'Emergency Call Request', body: 'Patient Marcus Thorne submitted an emergency call request.', time: '5 hours ago', read: false },
  { id: 3, type: 'message',     title: 'New Message', body: 'Ahmed El Said sent you a message regarding his brother\'s condition.', time: 'Yesterday', read: true },
  { id: 4, type: 'appointment', title: 'Appointment Confirmed', body: 'Session with Lara Croft confirmed for 03 Jun 2026 at 14:00.', time: 'Yesterday', read: true },
  { id: 5, type: 'patient',     title: 'New Patient Assigned', body: 'Sara Ahmed has been assigned to your patient list by the admin.', time: '2 days ago', read: true },
]

const typeIcon = {
  appointment: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  emergency: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.74a16 16 0 0 0 6.29 6.29l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  message: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  patient: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
}

const typeColor = {
  appointment: 'notif--appt',
  emergency:   'notif--emergency',
  message:     'notif--message',
  patient:     'notif--patient',
}

export default function NotificationsPanel() {
  const [notifs, setNotifs] = useState(NOTIFS)

  function markAllRead() {
    setNotifs(n => n.map(item => ({ ...item, read: true })))
  }

  function markRead(id) {
    setNotifs(n => n.map(item => item.id === id ? { ...item, read: true } : item))
  }

  const unread = notifs.filter(n => !n.read).length

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
        {notifs.map(n => (
          <div
            key={n.id}
            className={`notif__item ${!n.read ? 'notif__item--unread' : ''}`}
            onClick={() => markRead(n.id)}
          >
            <div className={`notif__icon ${typeColor[n.type]}`}>
              {typeIcon[n.type]}
            </div>
            <div className="notif__content">
              <div className="notif__row">
                <p className="notif__item-title">{n.title}</p>
                {!n.read && <span className="notif__dot" />}
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

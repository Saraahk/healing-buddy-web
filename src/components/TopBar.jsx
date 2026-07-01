import { useState, useEffect } from 'react'
import './TopBar.css'

const BASE_URL = 'http://localhost:3000'

function getInitials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('')
}

function resolveAvatar(url) {
  if (!url) return null
  if (url.startsWith('http')) return url
  return BASE_URL + url
}

export default function TopBar({ title = 'Home', onNavigate }) {
  const doctor   = JSON.parse(sessionStorage.getItem('doctorUser') ?? '{}')
  const name     = doctor.full_name ?? 'Doctor'
  const avatar   = resolveAvatar(doctor.avatar_url)
  const [notifCount, setNotifCount] = useState(0)

  useEffect(() => {
    fetch(`${BASE_URL}/announcement/doctor/notifications`)
      .then(r => r.json())
      .then(data => Array.isArray(data) && setNotifCount(data.length))
      .catch(() => {})
  }, [])

  return (
    <header className="topbar">
      <div className="topbar__left">
        <span className="topbar__title">{title}</span>
        <span className="topbar__underline" />
      </div>

      <div className="topbar__right">
        <div className="topbar__divider" />

        <div className="topbar__icons">
          <button className="topbar__icon-btn" aria-label="Notifications" onClick={() => onNavigate?.('notifications')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {notifCount > 0 && <span className="topbar__badge">{notifCount}</span>}
          </button>

          <button className="topbar__icon-btn" aria-label="Messages" onClick={() => onNavigate?.('inbox')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </button>
        </div>

        <button className="topbar__user" onClick={() => onNavigate?.('settings')}>
          {avatar ? (
            <img src={avatar} alt={name} className="topbar__avatar" />
          ) : (
            <div className="topbar__avatar topbar__avatar--initials">
              {getInitials(name)}
            </div>
          )}
          <div className="topbar__user-info">
            <span className="topbar__user-name">Dr. {name}</span>
            <span className="topbar__user-role">Doctor</span>
          </div>
        </button>
      </div>
    </header>
  )
}

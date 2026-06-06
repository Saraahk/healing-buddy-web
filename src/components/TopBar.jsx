import './TopBar.css'

export default function TopBar({ title = 'Home', onNavigate }) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <span className="topbar__title">{title}</span>
        <span className="topbar__underline" />
      </div>

      <div className="topbar__right">
        <div className="topbar__divider" />

        <div className="topbar__icons">
          {/* Notification Bell */}
          <button className="topbar__icon-btn" aria-label="Notifications" onClick={() => onNavigate?.('notifications')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="topbar__badge">2</span>
          </button>

          {/* Messages */}
          <button className="topbar__icon-btn" aria-label="Messages" onClick={() => onNavigate?.('inbox')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="topbar__badge">5</span>
          </button>
        </div>

        <button className="topbar__user" onClick={() => onNavigate?.('settings')}>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Dr.Tynisha Obey"
            className="topbar__avatar"
          />
          <div className="topbar__user-info">
            <span className="topbar__user-name">Dr.Tynisha Obey</span>
            <span className="topbar__user-role">Doctor</span>
          </div>
        </button>
      </div>
    </header>
  )
}

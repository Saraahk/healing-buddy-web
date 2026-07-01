import './AdminTopBar.css'

export default function AdminTopBar({ title, onBack }) {
  return (
    <header className="admin-topbar">
      <div className="admin-topbar__left">
        {onBack && (
          <button className="admin-topbar__back-btn" onClick={onBack} aria-label="Back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
        )}
        <span className="admin-topbar__title">{title}</span>
        <span className="admin-topbar__underline" />
      </div>

      <div className="admin-topbar__right">
        <div className="admin-topbar__user">
          <div className="admin-topbar__avatar-wrap">
            <div className="admin-topbar__avatar">A</div>
            <span className="admin-topbar__online" />
          </div>
          <div className="admin-topbar__user-info">
            <span className="admin-topbar__user-name">Admin</span>
            <span className="admin-topbar__user-role">System Administrator</span>
          </div>
        </div>
      </div>
    </header>
  )
}

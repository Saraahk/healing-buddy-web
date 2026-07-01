import { useState } from 'react'
import logo from '../../assets/logo.png'
import './AdminSidebar.css'

const navItems = [
  {
    id: 'home',
    label: 'Overview',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    id: 'users',
    label: 'Users',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'approvals',
    label: 'Approvals',
    badge: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    id: 'community',
    label: 'Community',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
      </svg>
    ),
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6"  y1="20" x2="6"  y2="14"/>
      </svg>
    ),
  },
  {
    id: 'content',
    label: 'Content',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    id: 'messages',
    label: 'Messages',
    msgBadge: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

export default function AdminSidebar({ active, onNavigate, pendingCount, msgCount }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`admin-sidebar ${collapsed ? 'admin-sidebar--collapsed' : ''}`}>
      <button className="admin-sidebar__logo" onClick={() => setCollapsed(c => !c)}>
        <img src={logo} alt="Healing Buddy" className="admin-sidebar__logo-img"
          onError={(e) => { e.currentTarget.style.display = 'none' }} />
        {!collapsed && (
          <div className="admin-sidebar__logo-text-wrap">
            <span className="admin-sidebar__logo-text">Healing Buddy</span>
            <span className="admin-sidebar__logo-sub">Admin Portal</span>
          </div>
        )}
      </button>

      <nav className="admin-sidebar__nav">
        {navItems.map((item) => {
          const count = item.badge ? pendingCount : item.msgBadge ? msgCount : 0
          return (
            <button
              key={item.id}
              className={`admin-sidebar__nav-item ${active === item.id ? 'admin-sidebar__nav-item--active' : ''}`}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
            >
              <span className="admin-sidebar__nav-icon">{item.icon}</span>
              {!collapsed && <span className="admin-sidebar__nav-label">{item.label}</span>}
              {count > 0 && (
                <span className={`admin-sidebar__badge ${collapsed ? 'admin-sidebar__badge--collapsed' : ''}`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="admin-sidebar__divider" />

      <div className="admin-sidebar__bottom">
        <button
          className="admin-sidebar__nav-item admin-sidebar__nav-item--logout"
          title={collapsed ? 'Log Out' : undefined}
          onClick={() => { window.location.href = '/' }}
        >
          <span className="admin-sidebar__nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </span>
          {!collapsed && <span className="admin-sidebar__nav-label">Log Out</span>}
        </button>
      </div>
    </aside>
  )
}

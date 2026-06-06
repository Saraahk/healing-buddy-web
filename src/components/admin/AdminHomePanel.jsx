import './AdminHomePanel.css'

const stats = [
  { label: 'Patients',        value: '156', sub: '+12 this week',   color: '#0ea5e9', bg: '#e0f2fe',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="9.5" y1="13.5" x2="14.5" y2="13.5"/></svg> },
  { label: 'Doctors',         value: '24',  sub: '+3 this month',   color: '#6366f1', bg: '#ede9fe',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { label: 'Healing Buddies', value: '38',  sub: '+5 this month',   color: '#16a34a', bg: '#dcfce7',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label: 'Family Members',  value: '67',  sub: '+8 this month',   color: '#f59e0b', bg: '#fef3c7',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label: 'Pending Approvals',value: '7',  sub: 'Need review',     color: '#ef4444', bg: '#fee2e2', nav: 'approvals',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
  { label: 'Active Today',    value: '42',  sub: 'Across all roles', color: '#22c55e', bg: '#dcfce7',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
]

const recentSignups = [
  { name: 'Fatima Al-Yusuf',   role: 'Patient',        time: '10 min ago' },
  { name: 'Dr. Omar Al-Rashid',role: 'Doctor',         time: '2 hrs ago'  },
  { name: 'Hana Yousef',       role: 'Healing Buddy',  time: '4 hrs ago'  },
  { name: 'Khalid Hassan',     role: 'Family Member',  time: 'Yesterday'  },
  { name: 'Dr. Nora Khalil',   role: 'Doctor',         time: 'Yesterday'  },
  { name: 'Sara Al-Mansouri',  role: 'Patient',        time: '2 days ago' },
]

const activity = [
  { text: 'Dr. Omar Al-Rashid submitted a sign-up request',      time: '2 hrs ago',  type: 'approval'  },
  { text: 'Fatima Al-Yusuf shared a healing update',             time: '3 hrs ago',  type: 'community' },
  { text: '3 new contact messages received',                      time: '5 hrs ago',  type: 'message'   },
  { text: 'Dr. Sara sent a recommendation to Ahmed Salim',        time: 'Yesterday',  type: 'doctor'    },
  { text: 'Healing Buddy Hana accepted a support request',        time: 'Yesterday',  type: 'buddy'     },
  { text: 'Patient Rania uploaded new medical documents',         time: '2 days ago', type: 'patient'   },
]

const ROLE_COLORS = {
  Patient:        { bg: '#e0f2fe', color: '#0ea5e9' },
  Doctor:         { bg: '#ede9fe', color: '#6366f1' },
  'Healing Buddy':{ bg: '#dcfce7', color: '#16a34a' },
  'Family Member':{ bg: '#fef3c7', color: '#d97706' },
}

const ACT_COLORS = {
  approval:  '#ef4444',
  community: '#6366f1',
  message:   '#0ea5e9',
  doctor:    '#8b5cf6',
  buddy:     '#16a34a',
  patient:   '#f59e0b',
}

export default function AdminHomePanel({ onNavigate, pendingCount, msgCount }) {
  return (
    <div className="admin-home">
      <div className="admin-home__stats">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`admin-home__stat-card ${s.nav ? 'admin-home__stat-card--clickable' : ''}`}
            onClick={s.nav ? () => onNavigate(s.nav) : undefined}
          >
            <div className="admin-home__stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div className="admin-home__stat-info">
              <span className="admin-home__stat-value" style={{ color: s.color }}>{s.value}</span>
              <span className="admin-home__stat-label">{s.label}</span>
              <span className="admin-home__stat-sub">{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-home__cols">
        <div className="admin-home__card">
          <div className="admin-home__card-header">
            <h3 className="admin-home__card-title">Users</h3>
            <button className="admin-home__card-link" onClick={() => onNavigate('users')}>View all</button>
          </div>
          <div className="admin-home__user-list">
            {recentSignups.map((u, i) => {
              const rc = ROLE_COLORS[u.role] ?? { bg: '#f3f4f6', color: '#6b7280' }
              return (
                <div key={i} className="admin-home__user-row">
                  <div className="admin-home__user-avatar">
                    {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="admin-home__user-info">
                    <span className="admin-home__user-name">{u.name}</span>
                    <span className="admin-home__user-role-badge" style={{ background: rc.bg, color: rc.color }}>
                      {u.role}
                    </span>
                  </div>
                  <span className="admin-home__user-time">{u.time}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="admin-home__card">
          <div className="admin-home__card-header">
            <h3 className="admin-home__card-title">Platform Activity</h3>
          </div>
          <div className="admin-home__activity-list">
            {activity.map((a, i) => (
              <div key={i} className="admin-home__activity-row">
                <div className="admin-home__activity-dot" style={{ background: ACT_COLORS[a.type] + '22' }}>
                  <div className="admin-home__activity-dot-inner" style={{ background: ACT_COLORS[a.type] }} />
                </div>
                <div className="admin-home__activity-info">
                  <span className="admin-home__activity-text">{a.text}</span>
                  <span className="admin-home__activity-time">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

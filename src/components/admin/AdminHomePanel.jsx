import { useState, useEffect } from 'react'
import './AdminHomePanel.css'
import BASE_URL from '../../api'

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

const activity = [
  { text: 'Dr. Omar Al-Rashid submitted a sign-up request',  time: '2 hrs ago',  type: 'approval'  },
  { text: 'Fatima Al-Yusuf shared a healing update',         time: '3 hrs ago',  type: 'community' },
  { text: '3 new contact messages received',                  time: '5 hrs ago',  type: 'message'   },
  { text: 'Dr. Sara sent a recommendation to Ahmed Salim',    time: 'Yesterday',  type: 'doctor'    },
  { text: 'Healing Buddy Hana accepted a support request',    time: 'Yesterday',  type: 'buddy'     },
  { text: 'Patient Rania uploaded new medical documents',     time: '2 days ago', type: 'patient'   },
]

export default function AdminHomePanel({ onNavigate }) {
  const [counts, setCounts] = useState({ patients: 0, doctors: 0, buddies: 0, family: 0, pending: 0 })
  const [recentUsers, setRecentUsers] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [patients, doctors, buddies, family, pending, users] = await Promise.all([
          fetch(`${BASE_URL}/patients`).then(r => r.json()),
          fetch(`${BASE_URL}/doctors`).then(r => r.json()),
          fetch(`${BASE_URL}/healing-buddy`).then(r => r.json()),
          fetch(`${BASE_URL}/family-members`).then(r => r.json()),
          fetch(`${BASE_URL}/doctor-requests/count/pending`).then(r => r.json()),
          fetch(`${BASE_URL}/users`).then(r => r.json()),
        ])
        setCounts({
          patients: Array.isArray(patients) ? patients.length : 0,
          doctors:  Array.isArray(doctors)  ? doctors.length  : 0,
          buddies:  Array.isArray(buddies)  ? buddies.length  : 0,
          family:   Array.isArray(family)   ? family.length   : 0,
          pending:  typeof pending === 'number' ? pending : (pending?.count ?? 0),
        })
        if (Array.isArray(users)) {
          setRecentUsers(users.slice(0, 6).map(u => ({
            name: u.full_name,
            role: u.role,
            time: new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          })))
        }
      } catch (e) {
        console.error('Failed to fetch overview data', e)
      }
    }
    fetchData()
  }, [])

  const stats = [
    { label: 'Patients',         value: counts.patients, sub: '',              color: '#0ea5e9', bg: '#e0f2fe',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { label: 'Doctors',          value: counts.doctors,  sub: '',              color: '#6366f1', bg: '#ede9fe',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> },
    { label: 'Healing Buddies',  value: counts.buddies,  sub: '',              color: '#16a34a', bg: '#dcfce7',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { label: 'Family Members',   value: counts.family,   sub: '',              color: '#f59e0b', bg: '#fef3c7',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { label: 'Pending Approvals',value: counts.pending,  sub: 'Need review',   color: '#ef4444', bg: '#fee2e2', nav: 'approvals',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
    { label: 'Active Today',     value: counts.patients + counts.doctors + counts.buddies + counts.family, sub: 'Across all roles', color: '#22c55e', bg: '#dcfce7',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  ]

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
            {recentUsers.map((u, i) => {
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

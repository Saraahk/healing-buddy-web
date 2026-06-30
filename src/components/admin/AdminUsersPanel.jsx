import { useState, useEffect } from 'react'
import AdminUserDetail from './AdminUserDetail'
import './AdminUsersPanel.css'
import BASE_URL from '../../api'

const TABS = [
  { id: 'patients', label: 'Patients',        color: '#6a951a', bg: '#F0F7E2' },
  { id: 'doctors',  label: 'Doctors',         color: '#4a7a10', bg: '#E6F1CE' },
  { id: 'buddies',  label: 'Healing Buddies', color: '#84B32D', bg: '#f5fbe8' },
  { id: 'family',   label: 'Family Members',  color: '#5a8020', bg: '#eaf4d0' },
]

function ini(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('')
}

function formatDate(d) {
  if (!d) return '-'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function AdminUsersPanel() {
  const [tab, setTab]           = useState('patients')
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('all')
  const [selectedUser, setSelected] = useState(null)
  const [data, setData]         = useState([])

  useEffect(() => {
    const endpoints = {
      patients: '/patients',
      doctors:  '/doctors',
      buddies:  '/healing-buddy',
      family:   '/family-members',
    }
    fetch(`${BASE_URL}${endpoints[tab]}`)
      .then(r => r.json())
      .then(raw => {
        if (!Array.isArray(raw)) return
        const mapped = raw.map(u => {
          const base = {
            id:     u.id,
            name:   u.user?.full_name ?? '-',
            email:  u.user?.email ?? '-',
            status: (u.user?.account_status ?? 'Active').toLowerCase(),
          }
          if (tab === 'patients') return { ...base, condition: u.primary_condition ?? '-', doctor: '-', joined: formatDate(u.joined_date) }
          if (tab === 'doctors')  return { ...base, specialty: u.specialty ?? '-', patients: u.total_patients ?? 0, joined: formatDate(u.joined_at) }
          if (tab === 'buddies')  return { ...base, patients: u.supporting_patients_count ?? 0, joined: formatDate(u.joined_at) }
          if (tab === 'family')   return { ...base, relation: u.relationship_default ?? '-', patient: '-', joined: formatDate(u.joined_at) }
          return base
        })
        setData(mapped)
      })
      .catch(() => setData([]))
  }, [tab])

  if (selectedUser) {
    return <AdminUserDetail user={selectedUser} type={tab} onBack={() => setSelected(null)} />
  }

  const activeTab = TABS.find(t => t.id === tab)

  const filtered = data.filter(u => {
    const q = search.toLowerCase()
    const matchQ = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    const matchF = filter === 'all' || u.status === filter
    return matchQ && matchF
  })

  return (
    <div className="admin-users">
      <div className="admin-users__tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`admin-users__tab ${tab === t.id ? 'admin-users__tab--active' : ''}`}
            style={tab === t.id ? { borderColor: t.color, color: t.color } : {}}
            onClick={() => { setTab(t.id); setSearch(''); setFilter('all') }}
          >
            {t.label}
            <span className="admin-users__tab-badge" style={{ background: tab === t.id ? t.bg : '#f3f4f6', color: tab === t.id ? t.color : '#6b7280' }}>
              {tab === t.id ? filtered.length : ''}
            </span>
          </button>
        ))}
      </div>

      <div className="admin-users__toolbar">
        <div className="admin-users__search-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="admin-users__search"
            placeholder={`Search ${activeTab?.label.toLowerCase()}...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="admin-users__filters">
          {['all', 'active', 'inactive'].map(f => (
            <button
              key={f}
              className={`admin-users__filter-btn ${filter === f ? 'admin-users__filter-btn--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-users__table-wrap">
        <table className="admin-users__table">
          <thead>
            <tr>
              <th>Name</th>
              {tab === 'patients' && <><th>Condition</th><th>Doctor</th></>}
              {tab === 'doctors'  && <><th>Specialty</th><th>Patients</th></>}
              {tab === 'buddies'  && <th>Supporting</th>}
              {tab === 'family'   && <><th>Relation</th><th>Patient</th></>}
              <th>Joined</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} onClick={() => setSelected(u)} style={{ cursor: 'pointer' }}>
                <td>
                  <div className="admin-users__user-cell">
                    <div className="admin-users__avatar" style={{ background: activeTab?.bg, color: activeTab?.color }}>{ini(u.name)}</div>
                    <div>
                      <p className="admin-users__name">{u.name}</p>
                      <p className="admin-users__email">{u.email}</p>
                    </div>
                  </div>
                </td>
                {tab === 'patients' && <><td><span className="admin-users__cell-text">{u.condition}</span></td><td><span className="admin-users__doctor-text">{u.doctor}</span></td></>}
                {tab === 'doctors'  && <><td><span className="admin-users__cell-text">{u.specialty}</span></td><td><span className="admin-users__count">{u.patients}</span></td></>}
                {tab === 'buddies'  && <td><span className="admin-users__count">{u.patients} patients</span></td>}
                {tab === 'family'   && <><td><span className="admin-users__cell-text">{u.relation}</span></td><td><span className="admin-users__doctor-text">{u.patient}</span></td></>}
                <td><span className="admin-users__date">{u.joined}</span></td>
                <td>
                  <span className={`admin-users__status admin-users__status--${u.status}`}>
                    {u.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="admin-users__empty">No results found.</div>}
      </div>
    </div>
  )
}

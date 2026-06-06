import { useState } from 'react'
import './AdminPatientsPanel.css'

const PATIENTS = [
  { id: 1,  name: 'Fatima Al-Yusuf',   age: 45, condition: 'Type 2 Diabetes',       doctor: 'Dr. Sara Al-Mansouri', status: 'stable',   joined: 'Jan 20, 2025' },
  { id: 2,  name: 'Ahmed Salim',        age: 62, condition: 'Hypertension',           doctor: 'Dr. Khalid Hassan',    status: 'critical', joined: 'Feb 4, 2025'  },
  { id: 3,  name: 'Rania Al-Farsi',     age: 38, condition: 'Chronic Asthma',         doctor: 'Dr. Sara Al-Mansouri', status: 'stable',   joined: 'Feb 18, 2025' },
  { id: 4,  name: 'Tariq Mahmoud',      age: 55, condition: 'Heart Disease',          doctor: 'Dr. Layla Nasser',     status: 'critical', joined: 'Mar 2, 2025'  },
  { id: 5,  name: 'Hessa Al-Dosari',    age: 41, condition: 'Chronic Kidney Disease', doctor: 'Dr. Tariq Al-Amin',    status: 'stable',   joined: 'Mar 15, 2025' },
  { id: 6,  name: 'Ibrahim Al-Mutairi', age: 70, condition: 'COPD',                   doctor: 'Dr. Layla Nasser',     status: 'stable',   joined: 'Apr 1, 2025'  },
  { id: 7,  name: 'Salma Nasser',       age: 33, condition: 'Lupus',                  doctor: 'Dr. Hana Yousef',      status: 'improving',joined: 'Apr 10, 2025' },
  { id: 8,  name: 'Khalid Al-Harbi',    age: 58, condition: 'Type 2 Diabetes',        doctor: 'Dr. Sara Al-Mansouri', status: 'improving',joined: 'Apr 22, 2025' },
  { id: 9,  name: 'Noura Hassan',       age: 29, condition: 'Rheumatoid Arthritis',   doctor: 'Dr. Khalid Hassan',    status: 'stable',   joined: 'May 5, 2025'  },
  { id: 10, name: 'Majed Al-Qahtani',   age: 66, condition: 'Hypertension',           doctor: 'Dr. Tariq Al-Amin',    status: 'stable',   joined: 'May 18, 2025' },
]

const statusColors = {
  stable:    { bg: '#dcfce7', color: '#16a34a' },
  critical:  { bg: '#fee2e2', color: '#dc2626' },
  improving: { bg: '#dbeafe', color: '#2563eb' },
}

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('')
}

export default function AdminPatientsPanel() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = PATIENTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.condition.toLowerCase().includes(search.toLowerCase()) ||
                        p.doctor.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="admin-patients">
      <div className="admin-patients__toolbar">
        <div className="admin-patients__search-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="admin-patients__search"
            placeholder="Search patients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="admin-patients__filters">
          {['all', 'stable', 'improving', 'critical'].map(f => (
            <button
              key={f}
              className={`admin-patients__filter-btn ${filter === f ? 'admin-patients__filter-btn--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-patients__table-wrap">
        <table className="admin-patients__table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Age</th>
              <th>Condition</th>
              <th>Assigned Doctor</th>
              <th>Joined</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const s = statusColors[p.status]
              return (
                <tr key={p.id}>
                  <td>
                    <div className="admin-patients__user-cell">
                      <div className="admin-patients__avatar">{initials(p.name)}</div>
                      <span className="admin-patients__name">{p.name}</span>
                    </div>
                  </td>
                  <td><span className="admin-patients__age">{p.age}</span></td>
                  <td><span className="admin-patients__condition">{p.condition}</span></td>
                  <td><span className="admin-patients__doctor">{p.doctor}</span></td>
                  <td><span className="admin-patients__date">{p.joined}</span></td>
                  <td>
                    <span className="admin-patients__status" style={{ background: s.bg, color: s.color }}>
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="admin-patients__empty">No patients found.</div>
        )}
      </div>
    </div>
  )
}

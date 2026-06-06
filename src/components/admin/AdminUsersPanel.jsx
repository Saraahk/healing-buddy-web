import { useState } from 'react'
import AdminUserDetail from './AdminUserDetail'
import './AdminUsersPanel.css'

const PATIENTS = [
  { id:1,  name:'Fatima Al-Yusuf',   email:'fatima@email.com',   condition:'Type 2 Diabetes',       doctor:'Dr. Sara Al-Mansouri', status:'active',   joined:'Jan 20, 2025' },
  { id:2,  name:'Ahmed Salim',        email:'ahmed.s@email.com',  condition:'Hypertension',           doctor:'Dr. Khalid Hassan',    status:'active',   joined:'Feb 4, 2025'  },
  { id:3,  name:'Rania Al-Farsi',     email:'rania@email.com',    condition:'Chronic Asthma',         doctor:'Dr. Sara Al-Mansouri', status:'active',   joined:'Feb 18, 2025' },
  { id:4,  name:'Tariq Mahmoud',      email:'tariq@email.com',    condition:'Heart Disease',          doctor:'Dr. Layla Nasser',     status:'inactive', joined:'Mar 2, 2025'  },
  { id:5,  name:'Hessa Al-Dosari',    email:'hessa@email.com',    condition:'Chronic Kidney Disease', doctor:'Dr. Tariq Al-Amin',    status:'active',   joined:'Mar 15, 2025' },
  { id:6,  name:'Ibrahim Al-Mutairi', email:'ibrahim@email.com',  condition:'COPD',                   doctor:'Dr. Layla Nasser',     status:'active',   joined:'Apr 1, 2025'  },
  { id:7,  name:'Salma Nasser',       email:'salma@email.com',    condition:'Lupus',                  doctor:'Dr. Hana Yousef',      status:'active',   joined:'Apr 10, 2025' },
  { id:8,  name:'Khalid Al-Harbi',    email:'khalid.h@email.com', condition:'Type 2 Diabetes',        doctor:'Dr. Sara Al-Mansouri', status:'active',   joined:'Apr 22, 2025' },
]

const DOCTORS = [
  { id:1, name:'Dr. Sara Al-Mansouri', email:'sara@healingbuddy.com',   specialty:'Chronic Disease Management', patients:18, status:'active',   joined:'Jan 12, 2025' },
  { id:2, name:'Dr. Khalid Hassan',    email:'khalid@healingbuddy.com', specialty:'Therapy & Counseling',       patients:12, status:'active',   joined:'Feb 3, 2025'  },
  { id:3, name:'Dr. Layla Nasser',     email:'layla@healingbuddy.com',  specialty:'Chronic Disease Management', patients:9,  status:'active',   joined:'Mar 20, 2025' },
  { id:4, name:'Dr. Tariq Al-Amin',    email:'tariq@healingbuddy.com',  specialty:'Therapy & Counseling',       patients:21, status:'active',   joined:'Apr 5, 2025'  },
  { id:5, name:'Dr. Hana Yousef',      email:'hana@healingbuddy.com',   specialty:'Chronic Disease Management', patients:7,  status:'active',   joined:'Apr 18, 2025' },
  { id:6, name:'Dr. Omar Al-Rashid',   email:'omar@healingbuddy.com',   specialty:'Therapy & Counseling',       patients:0,  status:'inactive', joined:'May 1, 2025'  },
]

const BUDDIES = [
  { id:1, name:'Hana Yousef',     email:'hana.y@email.com',  patients:2, status:'active',   joined:'Jan 25, 2025' },
  { id:2, name:'Nasser Al-Qahtani',email:'nasser@email.com', patients:1, status:'active',   joined:'Feb 10, 2025' },
  { id:3, name:'Mona Farhat',     email:'mona@email.com',    patients:3, status:'active',   joined:'Mar 5, 2025'  },
  { id:4, name:'Yusuf Al-Said',   email:'yusuf@email.com',   patients:0, status:'inactive', joined:'Apr 2, 2025'  },
  { id:5, name:'Lina Hassan',     email:'lina@email.com',    patients:2, status:'active',   joined:'Apr 20, 2025' },
]

const FAMILY = [
  { id:1, name:'Omar Al-Yusuf',    email:'omar.y@email.com',  relation:'Son',     patient:'Fatima Al-Yusuf',   status:'active', joined:'Jan 22, 2025' },
  { id:2, name:'Rana Salim',       email:'rana@email.com',    relation:'Wife',    patient:'Ahmed Salim',        status:'active', joined:'Feb 6, 2025'  },
  { id:3, name:'Kareem Al-Farsi',  email:'kareem@email.com',  relation:'Husband', patient:'Rania Al-Farsi',     status:'active', joined:'Feb 20, 2025' },
  { id:4, name:'Noura Mahmoud',    email:'noura@email.com',   relation:'Daughter',patient:'Tariq Mahmoud',      status:'active', joined:'Mar 4, 2025'  },
  { id:5, name:'Sara Al-Dosari',   email:'sara.d@email.com',  relation:'Sister',  patient:'Hessa Al-Dosari',    status:'active', joined:'Mar 17, 2025' },
  { id:6, name:'Rami Al-Harbi',    email:'rami@email.com',    relation:'Brother', patient:'Khalid Al-Harbi',    status:'active', joined:'Apr 24, 2025' },
]

const TABS = [
  { id: 'patients',  label: 'Patients',        count: PATIENTS.length, color: '#6a951a', bg: '#F0F7E2' },
  { id: 'doctors',   label: 'Doctors',         count: DOCTORS.length,  color: '#4a7a10', bg: '#E6F1CE' },
  { id: 'buddies',   label: 'Healing Buddies', count: BUDDIES.length,  color: '#84B32D', bg: '#f5fbe8' },
  { id: 'family',    label: 'Family Members',  count: FAMILY.length,   color: '#5a8020', bg: '#eaf4d0' },
]

function ini(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('')
}

export default function AdminUsersPanel() {
  const [tab, setTab]               = useState('patients')
  const [search, setSearch]         = useState('')
  const [filter, setFilter]         = useState('all')
  const [selectedUser, setSelected] = useState(null)

  if (selectedUser) {
    return <AdminUserDetail user={selectedUser} type={tab} onBack={() => setSelected(null)} />
  }

  const activeTab = TABS.find(t => t.id === tab)

  const rawData = { patients: PATIENTS, doctors: DOCTORS, buddies: BUDDIES, family: FAMILY }[tab]
  const data = rawData.filter(u => {
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
              {t.count}
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
              {tab === 'patients'  && <><th>Condition</th><th>Doctor</th></>}
              {tab === 'doctors'   && <><th>Specialty</th><th>Patients</th></>}
              {tab === 'buddies'   && <th>Supporting</th>}
              {tab === 'family'    && <><th>Relation</th><th>Patient</th></>}
              <th>Joined</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(u => (
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
                {tab === 'patients'  && <><td><span className="admin-users__cell-text">{u.condition}</span></td><td><span className="admin-users__doctor-text">{u.doctor}</span></td></>}
                {tab === 'doctors'   && <><td><span className="admin-users__cell-text">{u.specialty}</span></td><td><span className="admin-users__count">{u.patients}</span></td></>}
                {tab === 'buddies'   && <td><span className="admin-users__count">{u.patients} patients</span></td>}
                {tab === 'family'    && <><td><span className="admin-users__cell-text">{u.relation}</span></td><td><span className="admin-users__doctor-text">{u.patient}</span></td></>}
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
        {data.length === 0 && <div className="admin-users__empty">No results found.</div>}
      </div>
    </div>
  )
}

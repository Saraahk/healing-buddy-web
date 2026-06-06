import { useState } from 'react'
import './SessionsPanel.css'

const monthIdx = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 }
function parseDate(str) {
  const [d, m, y] = str.split('.')
  return new Date(+y, monthIdx[m], +d)
}

const allSessions = [
  {
    id: 1,
    patient: { id: '021231', name: 'El Said El Said', illness: 'Cancer', stage: 'Early', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    date: '10.Apr.2026', time: '10:00', type: 'Appointment',
    note: 'Patient shows early signs of leukemia. Started chemotherapy protocol. Responding well so far.',
  },
  {
    id: 2,
    patient: { id: '021231', name: 'El Said El Said', illness: 'Cancer', stage: 'Early', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    date: '02.May.2026', time: '09:00', type: 'Review',
    note: 'Blood count improved. Continue current treatment. Schedule next follow-up in 4 weeks.',
  },
  {
    id: 3,
    patient: { id: '021232', name: 'Sara Ahmed', illness: 'Diabetes', stage: 'Moderate', avatar: 'https://randomuser.me/api/portraits/women/21.jpg' },
    date: '15.Mar.2026', time: '11:00', type: 'Appointment',
    note: 'HbA1c at 8.2%. Adjusted insulin dosage. Patient advised on diet modifications.',
  },
  {
    id: 4,
    patient: { id: '021233', name: 'Marcus Thorne', illness: 'Heart Disease', stage: 'Advanced', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    date: '20.Apr.2026', time: '09:00', type: 'Review',
    note: 'ECG shows mild arrhythmia. Prescribed beta-blockers. Follow strict low-sodium diet.',
  },
  {
    id: 5,
    patient: { id: '021234', name: 'Lara Croft', illness: 'Kidney Disease', stage: 'Early', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    date: '18.Apr.2026', time: '14:00', type: 'Appointment',
    note: 'Creatinine levels elevated. Increased fluid intake recommended. Referred to nephrologist.',
  },
  {
    id: 6,
    patient: { id: '021235', name: 'Omar Khalid', illness: 'Liver Disease', stage: 'Moderate', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
    date: '25.Apr.2026', time: '08:30', type: 'Review',
    note: 'ALT and AST slightly elevated. Antiviral treatment ongoing. Avoid alcohol completely.',
  },
  {
    id: 7,
    patient: { id: '021236', name: 'Nora Hassan', illness: 'Hypertension', stage: 'Early', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    date: '12.Apr.2026', time: '10:30', type: 'Appointment',
    note: 'Blood pressure 145/90. Started low-dose antihypertensive. Lifestyle modifications advised.',
  },
  {
    id: 8,
    patient: { id: '021237', name: 'Ahmed Al-Rashid', illness: 'Cancer', stage: 'Advanced', avatar: 'https://randomuser.me/api/portraits/men/76.jpg' },
    date: '05.May.2026', time: '08:00', type: 'Review',
    note: 'Tumor markers declining. Immunotherapy session 4 completed. Patient tolerating well.',
  },
  {
    id: 9,
    patient: { id: '021238', name: 'Fatima Al-Zahra', illness: 'Diabetes', stage: 'Moderate', avatar: 'https://randomuser.me/api/portraits/women/55.jpg' },
    date: '28.Apr.2026', time: '13:00', type: 'Appointment',
    note: 'Fasting glucose 7.4 mmol/L. Adjusted metformin dose. Nutrition plan updated.',
  },
  {
    id: 10,
    patient: { id: '021239', name: 'John Doe', illness: 'Heart Disease', stage: 'Advanced', avatar: 'https://randomuser.me/api/portraits/men/60.jpg' },
    date: '22.Apr.2026', time: '11:00', type: 'Review',
    note: 'Post-stent check. Ejection fraction stable at 45%. Continue dual antiplatelet therapy.',
  },
].sort((a, b) => parseDate(b.date) - parseDate(a.date))

export default function SessionsPanel() {
  const [search, setSearch]           = useState('')
  const [typeFilter, setTypeFilter]   = useState('All')
  const [periodFilter, setPeriodFilter] = useState('All Time')

  const now = new Date()

  function inPeriod(dateStr) {
    const d = parseDate(dateStr)
    if (periodFilter === 'All Time') return true
    if (periodFilter === 'This Week') {
      const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7)
      return d >= weekAgo
    }
    if (periodFilter === 'This Month') {
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }
    if (periodFilter === 'Last 3 Months') {
      const threeMonthsAgo = new Date(now); threeMonthsAgo.setMonth(now.getMonth() - 3)
      return d >= threeMonthsAgo
    }
    return true
  }

  const filtered = allSessions.filter(s => {
    const matchSearch = s.patient.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.patient.illness.toLowerCase().includes(search.toLowerCase())
    const matchType   = typeFilter === 'All' || s.type === typeFilter
    return matchSearch && matchType && inPeriod(s.date)
  })

  const totalAppointments = allSessions.filter(s => s.type === 'Appointment').length
  const totalReviews      = allSessions.filter(s => s.type === 'Review').length

  return (
    <div className="sess">

      {/* Stats */}
      <div className="sess__stats">
        <div className="sess__stat">
          <span className="sess__stat-value">{allSessions.length}</span>
          <span className="sess__stat-label">Total Sessions</span>
          <div className="sess__stat-bar sess__stat-bar--all" />
        </div>
        <div className="sess__stat">
          <span className="sess__stat-value">{totalAppointments}</span>
          <span className="sess__stat-label">Appointments</span>
          <div className="sess__stat-bar sess__stat-bar--appt" />
        </div>
        <div className="sess__stat">
          <span className="sess__stat-value">{totalReviews}</span>
          <span className="sess__stat-label">Reviews</span>
          <div className="sess__stat-bar sess__stat-bar--review" />
        </div>
      </div>

      {/* Main card */}
      <div className="sess__card">

        {/* Filters */}
        <div className="sess__filters">
          <div className="sess__search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="sess__search-input"
              placeholder="Search by patient or illness..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="sess__filters-right">
            <div className="sess__tabs sess__tabs--period">
              {['All Time', 'This Week', 'This Month', 'Last 3 Months'].map(p => (
                <button
                  key={p}
                  className={`sess__tab ${periodFilter === p ? 'sess__tab--active' : ''}`}
                  onClick={() => setPeriodFilter(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="sess__divider" />
            <div className="sess__tabs">
              {['All', 'Appointment', 'Review'].map(t => (
                <button
                  key={t}
                  className={`sess__tab ${typeFilter === t ? 'sess__tab--active' : ''}`}
                  onClick={() => setTypeFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="sess__table-wrap">
          <table className="sess__table">
            <thead>
              <tr>
                <th>PATIENT</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>TYPE</th>
                <th>DOCTOR'S NOTE</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="sess__empty">No sessions found</td>
                </tr>
              ) : filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className="sess__patient">
                      <img src={s.patient.avatar} alt={s.patient.name} className="sess__avatar" />
                      <div className="sess__patient-info">
                        <span className="sess__patient-name">{s.patient.name}</span>
                        <span className="sess__patient-sub">
                          {s.patient.illness}
                          <span className={`sess__stage sess__stage--${s.patient.stage.toLowerCase()}`}>
                            {s.patient.stage}
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td><span className="sess__date">{s.date}</span></td>
                  <td className="sess__time">{s.time}</td>
                  <td>
                    <span className={`sess__badge sess__badge--${s.type === 'Appointment' ? 'appt' : 'review'}`}>
                      {s.type}
                    </span>
                  </td>
                  <td><span className="sess__note">{s.note}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sess__footer">
          {filtered.length} session{filtered.length !== 1 ? 's' : ''} shown
        </div>

      </div>
    </div>
  )
}

import { useState, useEffect, Fragment } from 'react'
import './SessionsPanel.css'
import BASE_URL from '../api'

function getInitials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('')
}

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '.')
}

function fmtTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function inPeriod(isoStr, filter) {
  if (filter === 'All Time') return true
  const d   = new Date(isoStr)
  const now = new Date()
  if (filter === 'This Week')      { const w = new Date(now); w.setDate(now.getDate() - 7); return d >= w }
  if (filter === 'This Month')     { return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() }
  if (filter === 'Last 3 Months')  { const m = new Date(now); m.setMonth(now.getMonth() - 3); return d >= m }
  return true
}

function statusClass(status) {
  switch (status) {
    case 'Confirmed': return 'sess__badge--confirmed'
    case 'Completed':  return 'sess__badge--completed'
    case 'Cancelled':  return 'sess__badge--cancelled'
    default:           return 'sess__badge--scheduled'
  }
}

export default function SessionsPanel() {
  const [sessions, setSessions]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [search, setSearch]             = useState('')
  const [typeFilter, setTypeFilter]     = useState('All')
  const [periodFilter, setPeriodFilter] = useState('All Time')
  const [expandedId, setExpandedId]     = useState(null)

  const doctorId = JSON.parse(sessionStorage.getItem('doctorUser') ?? '{}').doctor_id

  function load() {
    if (!doctorId) { setLoading(false); return }
    fetch(`${BASE_URL}/appointments/doctor/${doctorId}`)
      .then(r => r.json())
      .then(data => setSessions(Array.isArray(data) ? data : []))
      .catch(() => setSessions([]))
      .finally(() => setLoading(false))
  }

  useEffect(load, [doctorId])

  function refresh() {
    setLoading(true)
    load()
  }

  const filtered = sessions.filter(s => {
    const name        = s.patient?.user?.full_name ?? ''
    const matchSearch  = name.toLowerCase().includes(search.toLowerCase())
    const matchType    = typeFilter === 'All' || s.type === typeFilter
    return matchSearch && matchType && inPeriod(s.appointment_date, periodFilter)
  })

  const totalSessions   = sessions.length
  const totalTelehealth = sessions.filter(s => s.type === 'Telehealth').length
  const totalInClinic   = sessions.filter(s => s.type === 'In-Clinic').length

  return (
    <div className="sess">

      {/* Stats */}
      <div className="sess__stats">
        <div className="sess__stat">
          <span className="sess__stat-value">{totalSessions}</span>
          <span className="sess__stat-label">Total Sessions</span>
          <div className="sess__stat-bar sess__stat-bar--all" />
        </div>
        <div className="sess__stat">
          <span className="sess__stat-value">{totalTelehealth}</span>
          <span className="sess__stat-label">Telehealth</span>
          <div className="sess__stat-bar sess__stat-bar--appt" />
        </div>
        <div className="sess__stat">
          <span className="sess__stat-value">{totalInClinic}</span>
          <span className="sess__stat-label">In-Clinic</span>
          <div className="sess__stat-bar sess__stat-bar--review" />
        </div>
      </div>

      <div className="sess__card">

        {/* Filters */}
        <div className="sess__filters">
          <div className="sess__search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="sess__search-input"
              placeholder="Search by patient..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="sess__filters-right">
            <div className="sess__tabs sess__tabs--period">
              {['All Time', 'This Week', 'This Month', 'Last 3 Months'].map(p => (
                <button key={p} className={`sess__tab ${periodFilter === p ? 'sess__tab--active' : ''}`} onClick={() => setPeriodFilter(p)}>{p}</button>
              ))}
            </div>
            <div className="sess__divider" />
            <div className="sess__tabs">
              {['All', 'Telehealth', 'In-Clinic'].map(t => (
                <button key={t} className={`sess__tab ${typeFilter === t ? 'sess__tab--active' : ''}`} onClick={() => setTypeFilter(t)}>{t}</button>
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
                <th>STATUS</th>
                <th>REASON</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="sess__empty">Loading…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="sess__empty">No sessions found</td></tr>
              ) : filtered.map(s => {
                const name      = s.patient?.user?.full_name ?? 'Unknown'
                const avatarUrl = s.patient?.user?.avatar_url ?? null
                const isOpen    = expandedId === s.id

                return (
                  <Fragment key={s.id}>
                    <tr
                      className="sess__row-clickable"
                      onClick={() => setExpandedId(isOpen ? null : s.id)}
                    >
                      <td>
                        <div className="sess__patient">
                          {avatarUrl ? (
                            <img src={`${BASE_URL}${avatarUrl}`} alt={name} className="sess__avatar" />
                          ) : (
                            <div className="sess__avatar sess__avatar--initials">{getInitials(name)}</div>
                          )}
                          <div className="sess__patient-info">
                            <span className="sess__patient-name">{name}</span>
                          </div>
                        </div>
                      </td>
                      <td><span className="sess__date">{fmtDate(s.appointment_date)}</span></td>
                      <td className="sess__time">{fmtTime(s.appointment_date)}</td>
                      <td>
                        <span className={`sess__badge ${s.type === 'Telehealth' ? 'sess__badge--appt' : 'sess__badge--review'}`}>
                          {s.type ?? '—'}
                        </span>
                      </td>
                      <td>
                        <span className={`sess__badge ${statusClass(s.status)}`}>
                          {s.status ?? 'Scheduled'}
                        </span>
                      </td>
                      <td><span className="sess__note">{s.chief_complaint || '—'}</span></td>
                    </tr>
                    {isOpen && (
                      <tr className="sess__detail-row" key={`${s.id}-detail`}>
                        <td colSpan={6}>
                          <div className="sess__detail">
                            <div className="sess__detail-item">
                              <span className="sess__detail-label">Duration</span>
                              <span className="sess__detail-value">{s.duration_minutes ?? 30} min</span>
                            </div>
                            <div className="sess__detail-item">
                              <span className="sess__detail-label">Chief Complaint</span>
                              <span className="sess__detail-value">{s.chief_complaint || '—'}</span>
                            </div>
                            <div className="sess__detail-item">
                              <span className="sess__detail-label">Doctor Notes</span>
                              <span className="sess__detail-value">{s.notes || '—'}</span>
                            </div>
                            {s.status === 'Cancelled' && (
                              <div className="sess__detail-item">
                                <span className="sess__detail-label">Cancellation Reason</span>
                                <span className="sess__detail-value">{s.cancelled_reason || '—'}</span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="sess__footer">
          {filtered.length} session{filtered.length !== 1 ? 's' : ''} shown
          {!loading && (
            <button className="sess__refresh" onClick={refresh}>Refresh</button>
          )}
        </div>

      </div>
    </div>
  )
}

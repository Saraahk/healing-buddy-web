import { useState, useEffect } from 'react'
import './AppointmentPanel.css'
import BASE_URL from '../api'

const CARDS_PER_PAGE = 3

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



/* ── Avatar cell ───────────────────────────────── */
function Avatar({ name, avatarUrl }) {
  return avatarUrl ? (
    <img src={`${BASE_URL}${avatarUrl}`} alt={name} className="appt__table-avatar" />
  ) : (
    <div className="appt__table-avatar appt__table-avatar--initials">{getInitials(name)}</div>
  )
}

/* ── Generic Appointment Table ─────────────────── */
function ApptTable({ rows, showTime, canReschedule = true, loading, onViewPatient }) {
  return (
    <table className="appt__table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>{showTime ? 'Date & Time' : 'Date'}</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr><td colSpan={4} className="appt__empty">Loading…</td></tr>
        ) : rows.length === 0 ? (
          <tr><td colSpan={4} className="appt__empty">No appointments</td></tr>
        ) : rows.map(p => (
          <tr key={p.id}>
            <td>
              <div className="appt__table-name">
                <Avatar name={p.name} avatarUrl={p.avatar_url} />
                {p.name}
              </div>
            </td>
            <td>{p.type ?? '—'}</td>
            <td className="appt__date-cell">
              <span className="appt__date-blue">{p.date}</span>
              {showTime && <span className="appt__time"> {p.time}</span>}
            </td>
            <td>
              <div className="appt__icon-actions">
                <button className="appt__icon-btn" title="View profile"
                  onClick={() => onViewPatient?.(p.patientId)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/* ── Accordion ─────────────────────────────────── */
function Accordion({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`accordion ${open ? 'accordion--open' : ''}`}>
      <button className="accordion__header" onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        <svg className="accordion__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open ? <line x1="5" y1="12" x2="19" y2="12"/> : <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>}
        </svg>
      </button>
      {open && <div className="accordion__body">{children}</div>}
    </div>
  )
}

/* ── Main ──────────────────────────────────────── */
export default function AppointmentPanel({ onViewPatient }) {
  const [todayList, setTodayList]       = useState([])
  const [upcomingList, setUpcomingList] = useState([])
  const [previousList, setPreviousList] = useState([])
  const [loading, setLoading]           = useState(true)
  const [cardPage, setCardPage]         = useState(0)

  const doctorId = JSON.parse(sessionStorage.getItem('doctorUser') ?? '{}').doctor_id

  useEffect(() => {
    if (!doctorId) { setLoading(false); return }
    Promise.all([
      fetch(`${BASE_URL}/appointments/doctor/${doctorId}/today`).then(r => r.json()),
      fetch(`${BASE_URL}/appointments/doctor/${doctorId}/upcoming`).then(r => r.json()),
      fetch(`${BASE_URL}/appointments/doctor/${doctorId}/previous`).then(r => r.json()),
    ]).then(([today, upcoming, previous]) => {
      const mapAppt = a => ({
        id:         a.id,
        patientId:  a.patient?.id,
        name:       a.patient?.user?.full_name ?? 'Unknown',
        avatar_url: a.patient?.user?.avatar_url ?? null,
        date:       fmtDate(a.appointment_date),
        time:       fmtTime(a.appointment_date),
        rawDate:    a.appointment_date,
        type:       a.type ?? 'Appointment',
      })
      setTodayList(Array.isArray(today)       ? today.map(mapAppt)    : [])
      setUpcomingList(Array.isArray(upcoming) ? upcoming.map(mapAppt) : [])
      setPreviousList(Array.isArray(previous) ? previous.map(mapAppt) : [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [doctorId])

const totalPages = Math.max(1, Math.ceil(todayList.length / CARDS_PER_PAGE))
  const visible    = todayList.slice(cardPage * CARDS_PER_PAGE, (cardPage + 1) * CARDS_PER_PAGE)

  return (
    <div className="appointment">

      {/* Today's sessions */}
      <div className="appt__card">
        <div className="appt__section-header">
          <span className="appt__section-title">Today's sessions</span>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '30px', color: '#9ca3af' }}>Loading…</p>
        ) : todayList.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '30px', color: '#9ca3af' }}>No sessions today</p>
        ) : (
          <>
            <div className="appt__cards">
              {visible.map(p => (
                <div key={p.id} className="session-card">
                  {p.avatar_url ? (
                    <img src={`${BASE_URL}${p.avatar_url}`} alt={p.name} className="session-card__avatar" />
                  ) : (
                    <div className="session-card__avatar session-card__avatar--initials">{getInitials(p.name)}</div>
                  )}
                  <span className="session-card__name">{p.name}</span>
                  <div className="session-card__datetime">
                    <span className="appt__date-blue">{p.date}</span>
                    <span className="appt__time">{p.time}</span>
                  </div>
                  <span className="session-card__illness">{p.type}</span>
                  <button className="appt__link" onClick={() => onViewPatient?.(p.patientId)}>View profile</button>
                </div>
              ))}
            </div>
            <div className="appt__card-nav">
              <button className="appt__nav-btn" onClick={() => setCardPage(p => Math.max(0, p - 1))} disabled={cardPage === 0}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="appt__nav-btn" onClick={() => setCardPage(p => Math.min(totalPages - 1, p + 1))} disabled={cardPage === totalPages - 1}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Accordion sections */}
      <div className="appt__accordions">
        <Accordion title="Upcoming appointments">
          <ApptTable rows={upcomingList} showTime={true} loading={loading}
            onViewPatient={onViewPatient} />
        </Accordion>
        <Accordion title="Previous appointments">
          <ApptTable rows={previousList} showTime={true} loading={loading}
            onViewPatient={onViewPatient} />
        </Accordion>
      </div>

    </div>
  )
}

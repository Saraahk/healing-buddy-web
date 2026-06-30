import { useState, useEffect } from 'react'
import './HomePanel.css'
import BASE_URL from '../api'

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

function getWeekDates(weekOffset = 0) {
  const today = new Date()
  const dow = today.getDay()
  const mondayOffset = dow === 0 ? -6 : 1 - dow
  return DAYS.map((d, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + mondayOffset + i + weekOffset * 7)
    return { day: d, date: date.getDate(), month: date.getMonth(), year: date.getFullYear() }
  })
}

export default function HomePanel({ onViewPatient }) {
  const [weekOffset, setWeekOffset] = useState(0)
  const [counts, setCounts]         = useState({ patients: 0, today: 0, tomorrow: 0 })
  const [todayAppts, setTodayAppts] = useState([])
  const [apptDates, setApptDates]   = useState(new Set())

  const week  = getWeekDates(weekOffset)
  const today = new Date()

  useEffect(() => {
    const doctor   = JSON.parse(sessionStorage.getItem('doctorUser') ?? '{}')
    const doctorId = doctor.doctor_id
    if (!doctorId) return

    Promise.all([
      fetch(`${BASE_URL}/appointments/doctor/${doctorId}/patients/count`).then(r => r.json()),
      fetch(`${BASE_URL}/appointments/doctor/${doctorId}/today`).then(r => r.json()),
      fetch(`${BASE_URL}/appointments/doctor/${doctorId}/tomorrow`).then(r => r.json()),
      fetch(`${BASE_URL}/appointments/doctor/${doctorId}/upcoming`).then(r => r.json()),
    ]).then(([patients, todayList, tomorrowList, upcomingList]) => {
      setCounts({
        patients: typeof patients === 'number' ? patients : 0,
        today:    Array.isArray(todayList)    ? todayList.length    : 0,
        tomorrow: Array.isArray(tomorrowList) ? tomorrowList.length : 0,
      })
      if (Array.isArray(todayList)) {
        setTodayAppts(todayList.map(a => ({
          id:        a.id,
          patientId: a.patient?.id,
          name:      a.patient?.user?.full_name ?? 'Unknown',
          time:      new Date(a.appointment_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        })))
      }
      const allAppts = [
        ...(Array.isArray(todayList)    ? todayList    : []),
        ...(Array.isArray(tomorrowList) ? tomorrowList : []),
        ...(Array.isArray(upcomingList) ? upcomingList : []),
      ]
      const dates = new Set(allAppts.map(a => {
        const d = new Date(a.appointment_date)
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
      }))
      setApptDates(dates)
    }).catch(() => {})
  }, [])

  const stats = [
    {
      label: 'PATIENTS', value: counts.patients, badge: counts.patients,
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
    },
    {
      label: 'TODAY PATIENTS', value: counts.today, badge: counts.today,
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    },
    {
      label: 'TOMORROW PATIENTS', value: counts.tomorrow, badge: counts.tomorrow,
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/></svg>,
    },
    {
      label: 'EMERGENCY CALLS', value: 0, badge: 0, emergency: true,
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    },
  ]

  const tasks = [
    { id: 1, title: 'Review Lab Results',   sub: '4 pending reports',     done: false,
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/></svg> },
    { id: 2, title: 'Refill Approvals',     sub: '2 requests',            done: false,
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
    { id: 3, title: 'Update Session Notes', sub: 'Completed at 09:00 AM', done: true,
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
  ]

  return (
    <div className="home">
      <div className="home__stats">
        {stats.map((s) => (
          <div key={s.label} className={`stat-card ${s.emergency ? 'stat-card--emergency' : ''}`}>
            <div className="stat-card__badge">{s.badge}</div>
            <div className="stat-card__icon">{s.icon}</div>
            <span className="stat-card__label">{s.label}</span>
            <span className="stat-card__value">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="home__mid">
        <div className="home__card home__appointments">
          <div className="home__card-header">
            <span className="home__card-title">Today's Appointments</span>
            <span className="home__card-date">
              {today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="appt-table-wrapper">
            <table className="appt-table">
              <thead>
                <tr><th>Name</th><th>Start</th><th>Action</th></tr>
              </thead>
              <tbody>
                {todayAppts.length === 0 ? (
                  <tr><td colSpan={3} style={{ textAlign: 'center', color: '#9ca3af', padding: '20px' }}>No appointments today</td></tr>
                ) : todayAppts.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <div className="appt-table__name">
                        <div className="appt-table__avatar-initials">
                          {a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        {a.name}
                      </div>
                    </td>
                    <td className="appt-table__time">{a.time}</td>
                    <td>
                      <button className="appt-table__action" aria-label="View" onClick={() => onViewPatient?.(a.patientId)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="home__card home__tasks">
          <div className="home__card-header">
            <span className="home__card-title">Quick Tasks</span>
          </div>
          <div className="task-list">
            {tasks.map((t) => (
              <div key={t.id} className={`task-item ${t.done ? 'task-item--done' : ''}`}>
                <div className={`task-item__icon ${t.done ? 'task-item__icon--done' : ''}`}>{t.icon}</div>
                <div className="task-item__info">
                  <span className="task-item__title">{t.title}</span>
                  <span className="task-item__sub">{t.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="home__card home__calendar">
        <div className="home__card-header">
          <span className="home__card-title">Weekly Calendar</span>
          <div className="calendar__nav">
            <button className="calendar__nav-btn" onClick={() => setWeekOffset(o => o - 1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="calendar__nav-btn" onClick={() => setWeekOffset(o => o + 1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
        <div className="calendar__week">
          {week.map((w) => {
            const isToday  = w.date === today.getDate() && w.month === today.getMonth() && w.year === today.getFullYear()
            const hasAppt  = apptDates.has(`${w.year}-${w.month}-${w.date}`)
            return (
              <div key={w.day} className={`calendar__day ${isToday ? 'calendar__day--today' : ''}`}>
                <span className="calendar__day-name">{w.day}</span>
                <span className="calendar__day-num">{w.date}</span>
                {hasAppt && <span className="calendar__dot" />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

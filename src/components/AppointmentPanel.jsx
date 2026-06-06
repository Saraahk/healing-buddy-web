import { useState } from 'react'
import './AppointmentPanel.css'

const todaySessions = [
  { id: 1, name: 'El Said El Said',  date: '28.May.2026', time: '09:00', illness: 'Cancer',       stage: 'Early',    avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, name: 'Sara Ahmed',        date: '28.May.2026', time: '10:30', illness: 'Diabetes',     stage: 'Moderate', avatar: 'https://randomuser.me/api/portraits/women/21.jpg' },
  { id: 3, name: 'Marcus Thorne',     date: '28.May.2026', time: '11:45', illness: 'Heart Disease',stage: 'Advanced', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: 4, name: 'Lara Croft',        date: '28.May.2026', time: '01:00', illness: 'Kidney Disease',stage:'Early',    avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 5, name: 'Omar Khalid',       date: '28.May.2026', time: '02:30', illness: 'Liver Disease', stage:'Moderate', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
]

const upcomingAppts = [
  { id: 1, name: 'Fatima Al-Zahra',   date: '29.May.2026', time: '10:00', illness: 'Diabetes',      stage: 'Moderate', avatar: 'https://randomuser.me/api/portraits/women/55.jpg' },
  { id: 2, name: 'John Doe',          date: '30.May.2026', time: '11:30', illness: 'Heart Disease', stage: 'Advanced', avatar: 'https://randomuser.me/api/portraits/men/60.jpg' },
  { id: 3, name: 'Elena Miller',      date: '31.May.2026', time: '09:15', illness: 'Arthritis',     stage: 'Early',    avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
]

const previousAppts = [
  { id: 1, name: 'Khalid Al-Mansoori',date: '20.May.2026', time: '08:30', illness: 'Kidney Disease',stage: 'Moderate', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
  { id: 2, name: 'Rami Nassar',       date: '18.May.2026', time: '14:00', illness: 'Liver Disease', stage: 'Advanced', avatar: 'https://randomuser.me/api/portraits/men/88.jpg' },
  { id: 3, name: 'Sara Ahmed',        date: '15.May.2026', time: '10:00', illness: 'Diabetes',      stage: 'Moderate', avatar: 'https://randomuser.me/api/portraits/women/21.jpg' },
]

const CARDS_PER_PAGE = 3

/* ── Confirm Modal ─────────────────────────────── */
function ConfirmModal({ patient, type, onConfirm, onCancel }) {
  const isApprove = type === 'approve'
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className={`modal__icon-wrap ${isApprove ? 'modal__icon-wrap--green' : 'modal__icon-wrap--red'}`}>
          {isApprove ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          )}
        </div>
        <h3 className="modal__title">
          {isApprove ? 'Approve Patient' : 'Reject Patient'}
        </h3>
        <p className="modal__msg">
          Are you sure you want to <strong>{isApprove ? 'approve' : 'reject'}</strong> <strong>{patient.name}</strong>?
          {isApprove && ' They will be added to your patients list.'}
        </p>
        <div className="modal__actions">
          <button className="modal__btn modal__btn--cancel" onClick={onCancel}>Cancel</button>
          <button
            className={`modal__btn ${isApprove ? 'modal__btn--approve' : 'modal__btn--reject'}`}
            onClick={onConfirm}
          >
            {isApprove ? 'Yes, Approve' : 'Yes, Reject'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── New Patients Table ────────────────────────── */
function NewPatientsTable() {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Nora Hassan',     illness: 'Hypertension', stage: 'Early',    date: '27.May.2026', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 2, name: 'Ahmed Al-Rashid', illness: 'Cancer',       stage: 'Advanced', date: '26.May.2026', avatar: 'https://randomuser.me/api/portraits/men/76.jpg' },
    { id: 3, name: 'Mia Johnson',     illness: 'Hypertension', stage: 'Early',    date: '25.May.2026', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
  ])
  const [confirm, setConfirm] = useState(null) // { patient, type }

  function handleConfirm() {
    setPatients(prev => prev.filter(p => p.id !== confirm.patient.id))
    setConfirm(null)
  }

  return (
    <>
      <table className="appt__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Illness</th>
            <th>Register Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr><td colSpan={4} className="appt__empty">No pending requests</td></tr>
          ) : patients.map(p => (
            <tr key={p.id}>
              <td>
                <div className="appt__table-name">
                  <img src={p.avatar} alt={p.name} className="appt__table-avatar" />
                  {p.name}
                </div>
              </td>
              <td>{p.illness}</td>
              <td><span className="appt__date-blue">{p.date}</span></td>
              <td>
                <div className="appt__icon-actions">
                  <button
                    className="appt__icon-btn appt__icon-btn--approve"
                    title="Approve"
                    onClick={() => setConfirm({ patient: p, type: 'approve' })}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </button>
                  <button
                    className="appt__icon-btn appt__icon-btn--red"
                    title="Reject"
                    onClick={() => setConfirm({ patient: p, type: 'reject' })}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirm && (
        <ConfirmModal
          patient={confirm.patient}
          type={confirm.type}
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </>
  )
}

/* ── Generic Accordion Table ───────────────────── */
function AccordionTable({ rows, showTime, canReschedule = true }) {
  return (
    <table className="appt__table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Illness</th>
          <th>{showTime ? 'Date & Time' : 'Register Date'}</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(p => (
          <tr key={p.id}>
            <td>
              <div className="appt__table-name">
                <img src={p.avatar} alt={p.name} className="appt__table-avatar" />
                {p.name}
              </div>
            </td>
            <td>{p.illness}</td>
            <td className="appt__date-cell">
              {showTime ? (
                <><span className="appt__date-blue">{p.date}</span> <span className="appt__time">{p.time}</span></>
              ) : (
                <span className="appt__date-blue">{p.date}</span>
              )}
            </td>
            <td>
              <div className="appt__icon-actions">
                <button className="appt__icon-btn" title="View profile">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
                {showTime && canReschedule && (
                  <button className="appt__icon-btn appt__icon-btn--red" title="Reschedule">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/* ── Accordion wrapper ─────────────────────────── */
function Accordion({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`accordion ${open ? 'accordion--open' : ''}`}>
      <button className="accordion__header" onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        <svg className="accordion__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open ? <line x1="5" y1="12" x2="19" y2="12" /> : <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>}
        </svg>
      </button>
      {open && <div className="accordion__body">{children}</div>}
    </div>
  )
}

/* ── Main panel ────────────────────────────────── */
export default function AppointmentPanel() {
  const [cardPage, setCardPage] = useState(0)
  const totalPages = Math.ceil(todaySessions.length / CARDS_PER_PAGE)
  const visible = todaySessions.slice(cardPage * CARDS_PER_PAGE, cardPage * CARDS_PER_PAGE + CARDS_PER_PAGE)

  return (
    <div className="appointment">

      {/* Today's sessions */}
      <div className="appt__card">
        <div className="appt__section-header">
          <span className="appt__section-title">Today's sessions</span>
        </div>
        <div className="appt__cards">
          {visible.map(p => (
            <div key={p.id} className="session-card">
              <img src={p.avatar} alt={p.name} className="session-card__avatar" />
              <span className="session-card__name">{p.name}</span>
              <div className="session-card__datetime">
                <span className="appt__date-blue">{p.date}</span>
                <span className="appt__time">{p.time}</span>
              </div>
              <span className="session-card__illness">{p.illness} · {p.stage}</span>
              <button className="appt__link">View profile</button>
              <button className="appt__link appt__link--red">Reschedule</button>
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
      </div>

      {/* Accordion sections */}
      <div className="appt__accordions">
        <Accordion title="New register patients">
          <NewPatientsTable />
        </Accordion>
        <Accordion title="Upcoming appointments">
          <AccordionTable rows={upcomingAppts} showTime={true} />
        </Accordion>
        <Accordion title="Previous appointments">
          <AccordionTable rows={previousAppts} showTime={true} canReschedule={false} />
        </Accordion>
      </div>

    </div>
  )
}

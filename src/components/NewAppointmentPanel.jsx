import { useState, useEffect } from 'react'
import './AppointmentPanel.css'
import './NewAppointmentPanel.css'
import BASE_URL from '../api'

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '.')
}

function fmtTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

export default function NewAppointmentPanel() {
  const doctorId = JSON.parse(sessionStorage.getItem('doctorUser') ?? '{}').doctor_id

  const [slots, setSlots]     = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [error, setError]     = useState('')

  const [date, setDate]         = useState('')
  const [time, setTime]         = useState('')
  const [duration, setDuration] = useState(30)
  const [type, setType]         = useState('Telehealth')

  function loadSlots() {
    if (!doctorId) { setLoading(false); return }
    setLoading(true)
    fetch(`${BASE_URL}/appointment-slots/doctor/${doctorId}`)
      .then(r => r.json())
      .then(data => setSlots(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(loadSlots, [doctorId])

  async function handleCreate(ev) {
    ev.preventDefault()
    setError('')
    if (!date || !time) { setError('Please pick a date and time.'); return }

    const slotDate = new Date(`${date}T${time}`)
    if (Number.isNaN(slotDate.getTime()) || slotDate < new Date()) {
      setError('Please pick a date and time in the future.'); return
    }

    setCreating(true)
    try {
      const res = await fetch(`${BASE_URL}/appointment-slots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctor_id: doctorId,
          slot_date: slotDate.toISOString(),
          duration_minutes: Number(duration),
          type,
        }),
      })
      if (!res.ok) throw new Error('failed')
      setDate('')
      setTime('')
      loadSlots()
    } catch {
      setError('Could not create the time slot. Please try again.')
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`${BASE_URL}/appointment-slots/${id}`, { method: 'DELETE' })
      setSlots(s => s.filter(x => x.id !== id))
    } catch {}
  }

  return (
    <div className="appointment">
      <div className="appt__card">
        <div className="appt__section-header">
          <span className="appt__section-title">Create a new appointment time</span>
        </div>

        <form className="newappt__form" onSubmit={handleCreate}>
          <div className="newappt__field">
            <label className="reschedule__label">Date</label>
            <input
              type="date"
              className="reschedule__input"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().slice(0, 10)}
            />
          </div>
          <div className="newappt__field">
            <label className="reschedule__label">Time</label>
            <input
              type="time"
              className="reschedule__input"
              value={time}
              onChange={e => setTime(e.target.value)}
            />
          </div>
          <div className="newappt__field">
            <label className="reschedule__label">Duration</label>
            <select className="reschedule__input" value={duration} onChange={e => setDuration(e.target.value)}>
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>60 min</option>
            </select>
          </div>
          <div className="newappt__field">
            <label className="reschedule__label">Type</label>
            <select className="reschedule__input" value={type} onChange={e => setType(e.target.value)}>
              <option value="Telehealth">Telehealth</option>
              <option value="In-Clinic">In-Clinic</option>
            </select>
          </div>
          <button type="submit" className="modal__btn modal__btn--approve newappt__submit" disabled={creating}>
            {creating ? 'Creating…' : 'Create Slot'}
          </button>
        </form>
        {error && <p className="reschedule__error">{error}</p>}
      </div>

      <div className="appt__card">
        <div className="appt__section-header">
          <span className="appt__section-title">Your time slots</span>
        </div>

        <table className="appt__table">
          <thead>
            <tr>
              <th>Date &amp; Time</th>
              <th>Duration</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="appt__empty">Loading…</td></tr>
            ) : slots.length === 0 ? (
              <tr><td colSpan={5} className="appt__empty">No time slots yet — create one above.</td></tr>
            ) : slots.map(s => {
              const patientName = s.appointment?.patient?.user?.full_name
              return (
                <tr key={s.id}>
                  <td className="appt__date-cell">
                    <span className="appt__date-blue">{fmtDate(s.slot_date)}</span>
                    <span className="appt__time">{fmtTime(s.slot_date)}</span>
                  </td>
                  <td>{s.duration_minutes} min</td>
                  <td>{s.type ?? '—'}</td>
                  <td>
                    {s.status === 'Available' ? (
                      <span className="appt__tag appt__tag--early">Available</span>
                    ) : (
                      <span className="appt__tag appt__tag--advanced">Booked{patientName ? ` · ${patientName}` : ''}</span>
                    )}
                  </td>
                  <td>
                    {s.status === 'Available' ? (
                      <button className="appt__icon-btn appt__icon-btn--red" title="Remove slot" onClick={() => handleDelete(s.id)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                      </button>
                    ) : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

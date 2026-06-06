import { useState } from 'react'
import './SessionNoteModal.css'

export default function SessionNoteModal({ contact, onSave, onSkip }) {
  const [note, setNote] = useState('')
  const [type, setType] = useState('Appointment')

  function handleSave() {
    const now = new Date()
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const date = `${String(now.getDate()).padStart(2,'0')}.${months[now.getMonth()]}.${now.getFullYear()}`
    const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`
    onSave({ date, time, type, note: note.trim() || '—' })
  }

  return (
    <div className="snm-overlay">
      <div className="snm">
        <h3 className="snm__title">Add Session Note</h3>
        <p className="snm__sub">Session with <strong>{contact.name}</strong> has ended</p>

        <div className="snm__type-row">
          <button
            className={`snm__type-btn ${type === 'Appointment' ? 'snm__type-btn--active' : ''}`}
            onClick={() => setType('Appointment')}
          >
            Appointment
          </button>
          <button
            className={`snm__type-btn ${type === 'Review' ? 'snm__type-btn--active' : ''}`}
            onClick={() => setType('Review')}
          >
            Review
          </button>
        </div>

        <textarea
          className="snm__textarea"
          placeholder="Write your note here..."
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={4}
        />

        <div className="snm__actions">
          <button className="snm__skip" onClick={onSkip}>Skip</button>
          <button className="snm__save" onClick={handleSave}>Save Note</button>
        </div>
      </div>
    </div>
  )
}

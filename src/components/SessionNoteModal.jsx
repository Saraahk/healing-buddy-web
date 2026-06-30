import { useState } from 'react'
import './SessionNoteModal.css'

const BASE_URL = 'http://localhost:3000'

export default function SessionNoteModal({ contact, onSave, onSkip }) {
  const [note, setNote] = useState('')
  const [type, setType] = useState('Appointment')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!note.trim()) { onSkip(); return }

    const doctor = JSON.parse(sessionStorage.getItem('doctorUser') ?? '{}')
    setSaving(true)
    try {
      await fetch(`${BASE_URL}/session-notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctor_id: doctor.doctor_id,
          patient_id: contact.id,
          note_content: note.trim(),
        }),
      })
    } catch {}
    setSaving(false)
    onSave()
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
          <button className="snm__save" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Note'}</button>
        </div>
      </div>
    </div>
  )
}

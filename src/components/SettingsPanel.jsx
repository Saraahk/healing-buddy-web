import { useState, useRef } from 'react'
import './SettingsPanel.css'
import BASE_URL from '../api'

export default function SettingsPanel() {
  const doctor   = JSON.parse(sessionStorage.getItem('doctorUser') ?? '{}')
  const userId   = doctor.id ?? ''
  const fullName = doctor.full_name ?? 'Doctor'
  const specialty = doctor.specialty ?? ''

  const [avatar, setAvatar]         = useState(
    doctor.avatar_url ? `${BASE_URL}${doctor.avatar_url}` : null
  )
  const [uploading, setUploading]   = useState(false)
  const [email, setEmail]           = useState(doctor.email ?? '')
  const [emailEdit, setEmailEdit]   = useState(false)
  const [certificates, setCertificates] = useState([
    { name: 'Board_Certification_2015.PDF', size: '2.4 MB' },
    { name: 'CME_Certificate_2023.PDF',     size: '1.1 MB' },
  ])

  const [notifs, setNotifs] = useState({
    appointments: true,
    emergency:    true,
    messages:     false,
    reviews:      false,
  })

  const fileRef = useRef()
  const certRef = useRef()

  async function handleAvatarChange(e) {
    const file = e.target.files[0]
    if (!file) return

    setAvatar(URL.createObjectURL(file))
    setUploading(true)

    const form = new FormData()
    form.append('avatar', file)

    try {
      const res  = await fetch(`${BASE_URL}/users/${userId}/avatar`, { method: 'PATCH', body: form })
      const data = await res.json()
      if (data.avatar_url) {
        const updated = { ...doctor, avatar_url: data.avatar_url }
        sessionStorage.setItem('doctorUser', JSON.stringify(updated))
        setAvatar(`${BASE_URL}${data.avatar_url}`)
      }
    } catch {
      // local preview remains
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  function handleCertUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const size = (file.size / (1024 * 1024)).toFixed(1) + ' MB'
    setCertificates(prev => [...prev, { name: file.name, size }])
    e.target.value = ''
  }

  function removeCert(i) {
    setCertificates(prev => prev.filter((_, idx) => idx !== i))
  }

  function toggleNotif(key) {
    setNotifs(n => ({ ...n, [key]: !n[key] }))
  }

  function getInitials(name) {
    return name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('')
  }

  return (
    <div className="sett">

      {/* ── Profile ── */}
      <section className="sett__section">
        <h2 className="sett__section-title">Profile</h2>
        <div className="sett__card">

          {/* Avatar */}
          <div className="sett__avatar-row">
            <div className="sett__avatar-wrap">
              {avatar ? (
                <img src={avatar} alt="avatar" className="sett__avatar" />
              ) : (
                <div className="sett__avatar sett__avatar--initials">{getInitials(fullName)}</div>
              )}
              <button
                className="sett__avatar-edit"
                onClick={() => fileRef.current.click()}
                disabled={uploading}
                title="Change photo"
              >
                {uploading ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" strokeDasharray="31" strokeDashoffset="10"/>
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                )}
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
            </div>
            <div>
              <p className="sett__avatar-name">Dr. {fullName}</p>
              <p className="sett__avatar-role">Doctor · {specialty}</p>
            </div>
          </div>

          <div className="sett__divider" />

          {/* Name — read only */}
          <div className="sett__field-row">
            <div className="sett__field-info">
              <span className="sett__field-label">Full Name</span>
              <span className="sett__field-value">{fullName}</span>
            </div>
            <span className="sett__field-badge">Managed by admin</span>
          </div>

          <div className="sett__divider" />

          {/* Email — editable */}
          <div className="sett__field-row">
            <div className="sett__field-info">
              <span className="sett__field-label">Email Address</span>
              {emailEdit ? (
                <input className="sett__inline-input" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
              ) : (
                <span className="sett__field-value">{email}</span>
              )}
            </div>
            {emailEdit ? (
              <div className="sett__field-actions">
                <button className="sett__btn-save" onClick={() => setEmailEdit(false)}>Save</button>
                <button className="sett__btn-cancel" onClick={() => setEmailEdit(false)}>Cancel</button>
              </div>
            ) : (
              <button className="sett__btn-edit" onClick={() => setEmailEdit(true)}>Edit</button>
            )}
          </div>

          <div className="sett__divider" />

          {/* Specialty — read only */}
          <div className="sett__field-row">
            <div className="sett__field-info">
              <span className="sett__field-label">Specialty</span>
              <span className="sett__field-value">{specialty || '—'}</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── Certificates ── */}
      <section className="sett__section">
        <h2 className="sett__section-title">Certificates & Files</h2>
        <div className="sett__card">
          <div className="sett__certs">
            {certificates.map((c, i) => (
              <div key={i} className="sett__cert-item">
                <div className="sett__cert-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div className="sett__cert-info">
                  <span className="sett__cert-name">{c.name}</span>
                  <span className="sett__cert-size">{c.size}</span>
                </div>
                <button className="sett__cert-remove" onClick={() => removeCert(i)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ))}

            <button className="sett__cert-add" onClick={() => certRef.current.click()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Upload New File
            </button>
            <input ref={certRef} type="file" accept=".pdf,.jpg,.png,.doc,.docx" style={{ display: 'none' }} onChange={handleCertUpload} />
          </div>
        </div>
      </section>

      {/* ── Notifications ── */}
      <section className="sett__section">
        <h2 className="sett__section-title">Notifications</h2>
        <div className="sett__card">
          {[
            { key: 'appointments', label: 'Appointment Reminders', desc: 'Get notified before upcoming patient appointments' },
            { key: 'emergency',    label: 'Emergency Calls',        desc: 'Receive alerts for urgent patient emergency requests' },
            { key: 'messages',     label: 'New Messages',           desc: 'Get notified when a patient or family member messages you' },
            { key: 'reviews',      label: 'New Patient Requests',   desc: 'Get notified when a new patient is assigned to you' },
          ].map(({ key, label, desc }, i, arr) => (
            <div key={key}>
              <div className="sett__notif-row">
                <div>
                  <p className="sett__notif-label">{label}</p>
                  <p className="sett__notif-desc">{desc}</p>
                </div>
                <button className={`sett__toggle ${notifs[key] ? 'sett__toggle--on' : ''}`} onClick={() => toggleNotif(key)}>
                  <span className="sett__toggle-knob" />
                </button>
              </div>
              {i < arr.length - 1 && <div className="sett__divider" />}
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

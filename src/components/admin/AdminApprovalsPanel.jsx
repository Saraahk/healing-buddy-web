import { useState, useEffect } from 'react'
import './AdminApprovalsPanel.css'
import BASE_URL from '../../api'

const BUDDY_REQUESTS = []

function mapRequest(r) {
  return {
    id:            r.id,
    name:          r.full_name,
    email:         r.email,
    phone:         r.phone_number,
    specialty:     r.medical_specialty,
    licenseNumber: r.medical_license_no,
    yearsExp:      r.years_of_experience,
    date:          new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    bio:           r.brief_introduction ?? '',
    cv:            r.cv_document_path ?? null,
    degree:        r.medical_degree_document_path ?? null,
    avatar_url:    r.avatar_url ?? null,
  }
}

function ini(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('')
}

function InfoRow({ icon, label, value }) {
  if (!value) return null
  return (
    <div className="aa-info-row">
      <span className="aa-info-row__icon">{icon}</span>
      <div>
        <p className="aa-info-row__label">{label}</p>
        <p className="aa-info-row__value">{value}</p>
      </div>
    </div>
  )
}

function DocDetailDrawer({ doc, onClose, onApprove, onReject }) {
  return (
    <div className="aa-overlay" onClick={onClose}>
      <div className="aa-drawer" onClick={e => e.stopPropagation()}>

        <div className="aa-drawer__header">
          {doc.avatar_url ? (
            <img src={`${BASE_URL}${doc.avatar_url}`} alt={doc.name} className="aa-drawer__avatar aa-drawer__avatar--img" />
          ) : (
            <div className="aa-drawer__avatar">{ini(doc.name)}</div>
          )}
          <div>
            <h3 className="aa-drawer__name">{doc.name}</h3>
            <p className="aa-drawer__email">{doc.email}</p>
          </div>
          <button className="aa-drawer__close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="aa-drawer__body">

          <div className="aa-drawer__section">
            <p className="aa-drawer__section-title">Application Details</p>
            <div className="aa-drawer__grid">
              <InfoRow
                icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
                label="Phone" value={doc.phone}
              />
              <InfoRow
                icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>}
                label="Specialty" value={doc.specialty}
              />
              <InfoRow
                icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/></svg>}
                label="License No." value={doc.licenseNumber}
              />
              <InfoRow
                icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
                label="Years of Experience" value={`${doc.yearsExp} years`}
              />
            </div>
          </div>

          {doc.bio && (
            <div className="aa-drawer__section">
              <p className="aa-drawer__section-title">Introduction</p>
              <p className="aa-drawer__bio">"{doc.bio}"</p>
            </div>
          )}

          <div className="aa-drawer__section">
            <p className="aa-drawer__section-title">Uploaded Documents</p>
            <div className="aa-drawer__docs">
              {doc.cv ? (
                <div className="aa-doc">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <span>{doc.cv}</span>
                </div>
              ) : (
                <p className="aa-doc aa-doc--missing">No CV uploaded</p>
              )}
              {doc.degree ? (
                <div className="aa-doc">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  <span>{doc.degree}</span>
                </div>
              ) : (
                <p className="aa-doc aa-doc--missing">No degree certificate uploaded</p>
              )}
            </div>
          </div>

        </div>

        <div className="aa-drawer__footer">
          <button className="aa-btn aa-btn--approve" onClick={() => { onApprove(doc.id); onClose() }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Approve
          </button>
          <button className="aa-btn aa-btn--reject" onClick={() => { onReject(doc.id); onClose() }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Reject
          </button>
        </div>

      </div>
    </div>
  )
}

function DoctorList({ items, onShowInfo, processed }) {
  return (
    <div className="aa-list">
      {items.map(r => (
        <div key={r.id} className="aa-card">
          <div className="aa-card__left">
            {r.avatar_url ? (
              <img src={`${BASE_URL}${r.avatar_url}`} alt={r.name} className="aa-avatar aa-avatar--img" />
            ) : (
              <div className="aa-avatar">{ini(r.name)}</div>
            )}
            <div className="aa-info">
              <p className="aa-name">{r.name}</p>
              <p className="aa-email">{r.email}</p>
              <div className="aa-meta">
                <span className="aa-tag aa-tag--purple">{r.specialty}</span>
                <span className="aa-sep">·</span>
                <span className="aa-sub">{r.date}</span>
              </div>
            </div>
          </div>
          <div className="aa-actions">
            <button className="aa-btn aa-btn--info" onClick={() => onShowInfo(r)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Show Info
            </button>
          </div>
        </div>
      ))}

      {processed.map(r => (
        <div key={r.id} className="aa-card aa-card--done">
          <div className="aa-card__left">
            <div className="aa-avatar aa-avatar--dim">{ini(r.name)}</div>
            <div className="aa-info">
              <p className="aa-name">{r.name}</p>
              <p className="aa-email">{r.email}</p>
            </div>
          </div>
          <span className={`aa-result aa-result--${r.result}`}>
            {r.result === 'approved' ? '✓ Approved — Credentials Sent' : '✗ Rejected'}
          </span>
        </div>
      ))}

      {items.length === 0 && processed.length === 0 && (
        <div className="aa-empty">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <p>No pending requests.</p>
        </div>
      )}
    </div>
  )
}

function BuddyList({ items, onApprove, onReject, processed }) {
  return (
    <div className="aa-list">
      {items.map(r => (
        <div key={r.id} className="aa-card">
          <div className="aa-card__left">
            <div className="aa-avatar">{ini(r.name)}</div>
            <div className="aa-info">
              <p className="aa-name">{r.name}</p>
              <p className="aa-email">{r.email}</p>
              <div className="aa-meta">
                <span className="aa-tag aa-tag--green">Supporting: {r.patient}</span>
                <span className="aa-sep">·</span>
                <span className="aa-sub">{r.relation}</span>
                <span className="aa-sep">·</span>
                <span className="aa-sub">{r.date}</span>
              </div>
              {r.note && <p className="aa-note">"{r.note}"</p>}
            </div>
          </div>
          <div className="aa-actions">
            <button className="aa-btn aa-btn--approve" onClick={() => onApprove(r.id)}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Approve
            </button>
            <button className="aa-btn aa-btn--reject" onClick={() => onReject(r.id)}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Reject
            </button>
          </div>
        </div>
      ))}

      {processed.map(r => (
        <div key={r.id} className="aa-card aa-card--done">
          <div className="aa-card__left">
            <div className="aa-avatar aa-avatar--dim">{ini(r.name)}</div>
            <div className="aa-info">
              <p className="aa-name">{r.name}</p>
              <p className="aa-email">{r.email}</p>
            </div>
          </div>
          <span className={`aa-result aa-result--${r.result}`}>
            {r.result === 'approved' ? '✓ Approved' : '✗ Rejected'}
          </span>
        </div>
      ))}

      {items.length === 0 && processed.length === 0 && (
        <div className="aa-empty">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <p>No pending requests.</p>
        </div>
      )}
    </div>
  )
}

function CredentialsModal({ email, password, onClose }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(`Email: ${email}\nPassword: ${password}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="aa-overlay aa-overlay--center" onClick={onClose}>
      <div className="aa-modal-creds" onClick={e => e.stopPropagation()}>
        <div className="aa-modal-creds__icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h3 className="aa-modal-creds__title">Doctor Approved!</h3>
        <p className="aa-modal-creds__sub">Share these credentials with the doctor to log in:</p>

        <div className="aa-modal-creds__box">
          <div className="aa-modal-creds__row">
            <span className="aa-modal-creds__label">Email</span>
            <span className="aa-modal-creds__value">{email}</span>
          </div>
          <div className="aa-modal-creds__divider" />
          <div className="aa-modal-creds__row">
            <span className="aa-modal-creds__label">Temp Password</span>
            <span className="aa-modal-creds__value aa-modal-creds__value--pass">{password}</span>
          </div>
        </div>

        <div className="aa-modal-creds__actions">
          <button className="aa-modal-creds__copy" onClick={copy}>
            {copied ? '✓ Copied!' : 'Copy Credentials'}
          </button>
          <button className="aa-modal-creds__close" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  )
}

export default function AdminApprovalsPanel({ onCountChange }) {
  const [tab, setTab]           = useState('doctors')
  const [docReqs, setDocReqs]   = useState([])
  const [budReqs, setBudReqs]   = useState(BUDDY_REQUESTS)
  const [docDone, setDocDone]   = useState([])
  const [budDone, setBudDone]   = useState([])
  const [selected, setSelected] = useState(null)
  const [creds, setCreds]       = useState(null)

  useEffect(() => {
    fetch(`${BASE_URL}/doctor-requests/status/Pending`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map(mapRequest)
          setDocReqs(mapped)
          onCountChange?.(mapped.length + budReqs.length)
        }
      })
      .catch(() => {})
  }, [])

  async function act(type, id, result) {
    if (type === 'doctor') {
      const endpoint = result === 'approved' ? 'approve' : 'reject'
      const adminId  = JSON.parse(sessionStorage.getItem('adminUser') ?? '{}')?.id ?? ''
      const item = docReqs.find(r => r.id === id)

      try {
        const res  = await fetch(`${BASE_URL}/doctor-requests/${id}/${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reviewer_id: adminId }),
        })
        const data = await res.json()

        if (!res.ok) {
          alert(`Error: ${data.message ?? 'Something went wrong'}`)
          return
        }

        const next = docReqs.filter(r => r.id !== id)
        setDocReqs(next)
        setDocDone(p => [...p, { ...item, result }])
        onCountChange?.(next.length + budReqs.length)

        if (result === 'approved' && data.temp_password) {
          setCreds({ email: item.email, password: data.temp_password })
        }
      } catch {
        alert('Network error, please try again')
      }
    } else {
      const item = budReqs.find(r => r.id === id)
      const next = budReqs.filter(r => r.id !== id)
      setBudReqs(next)
      setBudDone(p => [...p, { ...item, result }])
      onCountChange?.(docReqs.length + next.length)
    }
  }

  const tabs = [
    { id:'doctors', label:'Doctor Requests',        count: docReqs.length, color:'#6366f1', bg:'#ede9fe' },
    { id:'buddies', label:'Healing Buddy Requests', count: budReqs.length, color:'#16a34a', bg:'#dcfce7' },
  ]

  return (
    <div className="admin-approvals">
      <div className="admin-approvals__tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`admin-approvals__tab ${tab === t.id ? 'admin-approvals__tab--active' : ''}`}
            style={tab === t.id ? { borderColor: t.color, color: t.color } : {}}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.count > 0 && (
              <span className="admin-approvals__tab-badge" style={{ background: t.bg, color: t.color }}>{t.count}</span>
            )}
          </button>
        ))}
      </div>

      {tab === 'doctors' && (
        <DoctorList
          items={docReqs}
          processed={docDone}
          onShowInfo={setSelected}
        />
      )}
      {tab === 'buddies' && (
        <BuddyList
          items={budReqs}
          processed={budDone}
          onApprove={id => act('buddy', id, 'approved')}
          onReject={id  => act('buddy', id, 'rejected')}
        />
      )}

      {selected && (
        <DocDetailDrawer
          doc={selected}
          onClose={() => setSelected(null)}
          onApprove={id => act('doctor', id, 'approved')}
          onReject={id  => act('doctor', id, 'rejected')}
        />
      )}

      {creds && (
        <CredentialsModal
          email={creds.email}
          password={creds.password}
          onClose={() => setCreds(null)}
        />
      )}
    </div>
  )
}

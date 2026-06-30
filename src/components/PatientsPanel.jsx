import { useState, useEffect } from 'react'
import './PatientsPanel.css'
import PatientProfilePanel from './PatientProfilePanel'
import BASE_URL from '../api'

const PAGE_SIZE = 10

function getInitials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('')
}

function calcAge(dob) {
  if (!dob) return '—'
  const diff = Date.now() - new Date(dob).getTime()
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000))
}

function buildProfile(p) {
  return {
    id: p.id,
    name: p.user?.full_name ?? 'Unknown',
    age: calcAge(p.date_of_birth),
    illness: p.primary_condition ?? '—',
    stage: p.severity ?? '—',
    start: p.joined_date ? new Date(p.joined_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }) : '—',
    avatar_url: p.user?.avatar_url,
    dob: p.date_of_birth,
    gender: p.gender,
    blood: p.blood_type,
    email: p.user?.email,
    phone: p.user?.phone,
    primary_condition: p.primary_condition,
    severity: p.severity,
  }
}

export default function PatientsPanel({ onViewChange, initialPatientId, onPatientOpened }) {
  const [patients, setPatients]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [page, setPage]           = useState(1)
  const [selectedPatient, setSelectedPatient] = useState(null)

  const doctorId = JSON.parse(sessionStorage.getItem('doctorUser') ?? '{}').doctor_id

  useEffect(() => {
    if (!doctorId) { setLoading(false); return }
    fetch(`${BASE_URL}/patients/doctor/${doctorId}`)
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : []
        setPatients(list)
        if (initialPatientId) {
          const found = list.find(p => p.id === initialPatientId)
          if (found) {
            setSelectedPatient(buildProfile(found))
            onPatientOpened?.()
          }
        }
      })
      .catch(() => setPatients([]))
      .finally(() => setLoading(false))
  }, [doctorId])

  if (selectedPatient) {
    return <PatientProfilePanel patient={selectedPatient} onBack={() => setSelectedPatient(null)} onViewChange={onViewChange} />
  }

  const filtered = patients.filter(p => {
    const name = p.user?.full_name ?? ''
    return name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search)
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSearch(e) {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className="patients">
      <div className="patients__card">
        <div className="patients__search-row">
          <div className="patients__search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search for id, name"
              value={search}
              onChange={handleSearch}
              className="patients__search-input"
            />
          </div>
        </div>

        <table className="pt">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Type of illness</th>
              <th>Stage</th>
              <th>Start</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#9ca3af' }}>Loading…</td></tr>
            ) : paginated.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#9ca3af' }}>No patients found</td></tr>
            ) : paginated.map(p => {
              const name    = p.user?.full_name ?? 'Unknown'
              const age     = calcAge(p.date_of_birth)
              const illness = p.primary_condition ?? '—'
              const stage   = p.severity ?? '—'
              const start   = p.joined_date ? new Date(p.joined_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }) : '—'
              const avatar  = p.user?.avatar_url

              const patientForProfile = buildProfile(p)

              return (
                <tr key={p.id}>
                  <td>
                    <div className="pt__name-cell">
                      <span className="pt__patient-name">{name}</span>
                    </div>
                  </td>
                  <td>{age}</td>
                  <td>{illness}</td>
                  <td><span className={`pt__stage pt__stage--${stage.toLowerCase()}`}>{stage}</span></td>
                  <td>{start}</td>
                  <td>
                    <div className="pt__actions">
                      <button className="pt__action-btn" title="View" onClick={() => setSelectedPatient(patientForProfile)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="patients__pagination">
          <span className="patients__pagination-info">
            {filtered.length === 0
              ? 'No results'
              : `${(page - 1) * PAGE_SIZE + 1} – ${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length} patients`}
          </span>
          <div className="patients__pagination-right">
            <span className="patients__pagination-label">Page</span>
            <select
              className="patients__pagination-select"
              value={page}
              onChange={e => setPage(Number(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <button className="patients__pagination-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="patients__pagination-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

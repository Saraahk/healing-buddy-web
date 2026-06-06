import { useState } from 'react'
import './PatientsPanel.css'
import PatientProfilePanel from './PatientProfilePanel'

const mockPatients = [
  { id: '021231', name: 'El Said El Said',   age: 30, illness: 'Cancer',          stage: 'Early',    start: '04/17/23', color: '#c7d2fe', avatar: 'https://randomuser.me/api/portraits/men/32.jpg'   },
  { id: '021232', name: 'Sara Ahmed',         age: 28, illness: 'Diabetes',        stage: 'Moderate', start: '03/10/23', color: '#bbf7d0', avatar: 'https://randomuser.me/api/portraits/women/21.jpg' },
  { id: '021233', name: 'Marcus Thorne',      age: 34, illness: 'Heart Disease',   stage: 'Advanced', start: '01/05/23', color: '#fde68a', avatar: 'https://randomuser.me/api/portraits/men/45.jpg'   },
  { id: '021234', name: 'Lara Croft',         age: 22, illness: 'Kidney Disease',  stage: 'Early',    start: '06/20/23', color: '#fca5a5', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: '021235', name: 'Omar Khalid',        age: 45, illness: 'Liver Disease',   stage: 'Moderate', start: '02/14/23', color: '#a5f3fc', avatar: 'https://randomuser.me/api/portraits/men/11.jpg'   },
  { id: '021236', name: 'Nora Hassan',        age: 31, illness: 'Hypertension',    stage: 'Early',    start: '05/01/23', color: '#d8b4fe', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '021237', name: 'Ahmed Al-Rashid',    age: 27, illness: 'Cancer',          stage: 'Advanced', start: '07/08/23', color: '#fed7aa', avatar: 'https://randomuser.me/api/portraits/men/76.jpg'   },
  { id: '021238', name: 'Fatima Al-Zahra',    age: 38, illness: 'Diabetes',        stage: 'Moderate', start: '08/15/23', color: '#bbf7d0', avatar: 'https://randomuser.me/api/portraits/women/55.jpg' },
  { id: '021239', name: 'John Doe',           age: 52, illness: 'Heart Disease',   stage: 'Advanced', start: '09/03/23', color: '#c7d2fe', avatar: 'https://randomuser.me/api/portraits/men/60.jpg'   },
  { id: '021240', name: 'Elena Miller',       age: 29, illness: 'Arthritis',       stage: 'Early',    start: '10/21/23', color: '#fde68a', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
  { id: '021241', name: 'Khalid Al-Mansoori', age: 41, illness: 'Kidney Disease',  stage: 'Moderate', start: '11/11/23', color: '#fca5a5', avatar: 'https://randomuser.me/api/portraits/men/22.jpg'   },
  { id: '021242', name: 'Mia Johnson',        age: 24, illness: 'Hypertension',    stage: 'Early',    start: '12/01/23', color: '#a5f3fc', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: '021243', name: 'Rami Nassar',        age: 36, illness: 'Liver Disease',   stage: 'Advanced', start: '01/30/24', color: '#d8b4fe', avatar: 'https://randomuser.me/api/portraits/men/88.jpg'   },
]

const PAGE_SIZE = 10

export default function PatientsPanel({ onViewChange }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selectedPatient, setSelectedPatient] = useState(null)

  if (selectedPatient) {
    return <PatientProfilePanel patient={selectedPatient} onBack={() => setSelectedPatient(null)} onViewChange={onViewChange} />
  }

  const filtered = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.includes(search)
  )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSearch(e) {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className="patients">
      <div className="patients__card">
        {/* Search */}
        <div className="patients__search-row">
          <div className="patients__search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
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

        {/* Table */}
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
            {paginated.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="pt__name-cell">
                    <span className="pt__avatar" style={{ background: p.color }} />
                    <span className="pt__patient-name">{p.name}</span>
                  </div>
                </td>
                <td>{p.age}</td>
                <td>{p.illness}</td>
                <td><span className={`pt__stage pt__stage--${p.stage.toLowerCase()}`}>{p.stage}</span></td>
                <td>{p.start}</td>
                <td>
                  <div className="pt__actions">
                    <button className="pt__action-btn" title="View" onClick={() => setSelectedPatient(p)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
<button className="pt__action-btn pt__action-btn--delete" title="Delete">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" /><path d="M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
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
              onChange={(e) => setPage(Number(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <button
              className="patients__pagination-btn"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="patients__pagination-btn"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

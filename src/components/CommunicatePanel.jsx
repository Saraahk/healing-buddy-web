import { useState } from 'react'
import './CommunicatePanel.css'
import ChatPage from './ChatPage'
import VoiceCallPage from './VoiceCallPage'
import VideoCallPage from './VideoCallPage'
import SessionNoteModal from './SessionNoteModal'

const mockPatients = [
  { id: '021231', name: 'El Said El Said',   illness: 'Cancer',         stage: 'Early',    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',    color: '#c7d2fe', unread: true  },
  { id: '021232', name: 'Sara Ahmed',         illness: 'Diabetes',       stage: 'Moderate', avatar: 'https://randomuser.me/api/portraits/women/21.jpg',  color: '#bbf7d0', unread: false },
  { id: '021233', name: 'Marcus Thorne',      illness: 'Heart Disease',  stage: 'Advanced', avatar: 'https://randomuser.me/api/portraits/men/45.jpg',    color: '#fde68a', unread: true  },
  { id: '021234', name: 'Lara Croft',         illness: 'Kidney Disease', stage: 'Early',    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',  color: '#fca5a5', unread: false },
  { id: '021235', name: 'Omar Khalid',        illness: 'Liver Disease',  stage: 'Moderate', avatar: 'https://randomuser.me/api/portraits/men/11.jpg',    color: '#a5f3fc', unread: true  },
  { id: '021236', name: 'Nora Hassan',        illness: 'Hypertension',   stage: 'Early',    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',  color: '#d8b4fe', unread: false },
  { id: '021237', name: 'Ahmed Al-Rashid',    illness: 'Cancer',         stage: 'Advanced', avatar: 'https://randomuser.me/api/portraits/men/76.jpg',    color: '#fed7aa', unread: false },
  { id: '021238', name: 'Fatima Al-Zahra',    illness: 'Diabetes',       stage: 'Moderate', avatar: 'https://randomuser.me/api/portraits/women/55.jpg',  color: '#bbf7d0', unread: true  },
  { id: '021239', name: 'John Doe',           illness: 'Heart Disease',  stage: 'Advanced', avatar: 'https://randomuser.me/api/portraits/men/60.jpg',    color: '#c7d2fe', unread: false },
  { id: '021240', name: 'Elena Miller',       illness: 'Arthritis',      stage: 'Early',    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',  color: '#fde68a', unread: false },
  { id: '021241', name: 'Khalid Al-Mansoori', illness: 'Kidney Disease', stage: 'Moderate', avatar: 'https://randomuser.me/api/portraits/men/22.jpg',    color: '#fca5a5', unread: true  },
  { id: '021242', name: 'Mia Johnson',        illness: 'Hypertension',   stage: 'Early',    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',  color: '#a5f3fc', unread: false },
  { id: '021243', name: 'Rami Nassar',        illness: 'Liver Disease',  stage: 'Advanced', avatar: 'https://randomuser.me/api/portraits/men/88.jpg',    color: '#d8b4fe', unread: true  },
]

const PAGE_SIZE = 10

export default function CommunicatePanel({ onViewChange }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [chatPatient, setChatPatient] = useState(null)
  const [voicePatient, setVoicePatient] = useState(null)
  const [videoPatient, setVideoPatient] = useState(null)
  const [pendingContact, setPendingContact] = useState(null)

  function openChat(patient)  { setChatPatient(patient);  onViewChange?.('chat') }
  function openVoice(patient) { setVoicePatient(patient); onViewChange?.('call') }
  function openVideo(patient) { setVideoPatient(patient); onViewChange?.('call') }

  function handleSessionEnd(patient) {
    setChatPatient(null); setVoicePatient(null); setVideoPatient(null)
    onViewChange?.(null)
    if (patient) setPendingContact(patient)
  }

  if (chatPatient)  return <ChatPage      patient={chatPatient}  onBack={() => handleSessionEnd(chatPatient)} />
  if (voicePatient) return <VoiceCallPage patient={voicePatient} onEnd={() => handleSessionEnd(voicePatient)} />
  if (videoPatient) return <VideoCallPage patient={videoPatient} onEnd={() => handleSessionEnd(videoPatient)} />

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
    <div className="communicate">
      {pendingContact && (
        <SessionNoteModal
          contact={pendingContact}
          onSave={() => setPendingContact(null)}
          onSkip={() => setPendingContact(null)}
        />
      )}
      <div className="communicate__card">

        {/* Search */}
        <div className="communicate__search-row">
          <div className="communicate__search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search for id, name"
              value={search}
              onChange={handleSearch}
              className="communicate__search-input"
            />
          </div>
        </div>

        {/* Patient list */}
        <div className="communicate__list">
          {paginated.map((p) => (
            <div key={p.id} className="cl__row">
              <span className="cl__bar" style={{ background: p.color }} />
              <span className="cl__name">{p.name}</span>
              <span className="cl__illness">{p.illness}</span>
              <span className={`cl__stage cl__stage--${p.stage.toLowerCase()}`}>{p.stage}</span>
              <div className="cl__actions">
                <button className="cl__btn cl__btn--chat" title="Chat" onClick={() => openChat(p)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {p.unread && <span className="cl__unread-dot" />}
                </button>
                <button className="cl__btn" title="Call" onClick={() => openVoice(p)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </button>
                <button className="cl__btn" title="Video Call" onClick={() => openVideo(p)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </button>
            </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="communicate__pagination">
          <span className="communicate__pagination-info">
            {filtered.length === 0
              ? 'No results'
              : `${(page - 1) * PAGE_SIZE + 1} – ${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length} patients`}
          </span>
          <div className="communicate__pagination-right">
            <span className="communicate__pagination-label">Page</span>
            <select
              className="communicate__pagination-select"
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <button
              className="communicate__pagination-btn"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="communicate__pagination-btn"
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

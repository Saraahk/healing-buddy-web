import { useState, useEffect } from 'react'
import './PatientProfilePanel.css'
import ChatPage from './ChatPage'
import VoiceCallPage from './VoiceCallPage'
import VideoCallPage from './VideoCallPage'
import SessionNoteModal from './SessionNoteModal'
import HappyIcon from '../assets/Happyicon.png'
import SadIcon   from '../assets/Sadicon.png'
import FearIcon  from '../assets/Fearicon.png'
import AngryIcon from '../assets/Angryicon.png'
import BASE_URL from '../api'

const CARDS_PER_PAGE = 2

const EMOTIONS = {
  happy:   { label: 'Happy', icon: HappyIcon, color: '#4ade80' },
  sad:     { label: 'Sad',   icon: SadIcon,   color: '#a78bfa' },
  fear:    { label: 'Fear',  icon: FearIcon,  color: '#60a5fa' },
  angry:   { label: 'Angry', icon: AngryIcon, color: '#f87171' },
  anxious: { label: 'Fear',  icon: FearIcon,  color: '#60a5fa' },
}

function moodToEmotion(type = '') {
  return EMOTIONS[type.toLowerCase()] ? type.toLowerCase() : 'happy'
}

function formatDateStr(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`
}

function formatDOB(iso) {
  if (!iso) return 'N/A'
  const d = new Date(iso)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${String(d.getDate()).padStart(2,'0')} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function formatAppt(iso) {
  if (!iso) return { date: '—', time: '—' }
  const d = new Date(iso)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return {
    date: `${String(d.getDate()).padStart(2,'0')}.${months[d.getMonth()]}.${d.getFullYear()}`,
    time: `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`,
  }
}

function getMondayOf(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = (day === 0 ? -6 : 1 - day)
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function parseDate(str) {
  const [d, m, y] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatDate(date) {
  return `${String(date.getDate()).padStart(2,'0')}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`
}

function groupByWeek(daily) {
  const map = {}
  daily.forEach(entry => {
    const date = parseDate(entry.date)
    const monday = getMondayOf(date)
    const key = monday.getTime()
    if (!map[key]) {
      const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6)
      map[key] = { monday, sunday, entries: [] }
    }
    map[key].entries.push(entry)
  })
  return Object.values(map).sort((a, b) => b.monday - a.monday)
}

function computeEmotions(entries) {
  const counts = { happy: 0, sad: 0, fear: 0, angry: 0 }
  entries.forEach(e => { if (counts[e.emotion] !== undefined) counts[e.emotion]++ })
  const total = entries.length || 1
  return Object.entries(counts)
    .map(([emotion, count]) => ({ emotion, pct: Math.round((count / total) * 100) }))
    .sort((a, b) => b.pct - a.pct)
}

function PatientTracking({ daily }) {
  const [tab, setTab]         = useState('daily')
  const [page, setPage]       = useState(0)
  const [weekIdx, setWeekIdx] = useState(0)

  const weeks = groupByWeek(daily)

  function switchTab(t) { setTab(t); setPage(0); setWeekIdx(0) }

  if (daily.length === 0) return <p className="prof-empty">No tracking entries yet</p>

  return (
    <div className="prof-tracking">
      <div className="prof-tracking__toggle">
        <button className={`prof-tracking__tab ${tab === 'daily' ? 'prof-tracking__tab--active' : ''}`} onClick={() => switchTab('daily')}>Daily</button>
        <button className={`prof-tracking__tab ${tab === 'weekly' ? 'prof-tracking__tab--active' : ''}`} onClick={() => switchTab('weekly')}>Weekly</button>
      </div>

      {tab === 'daily' ? (() => {
        const totalPages = Math.ceil(daily.length / CARDS_PER_PAGE)
        const visible = daily.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE)
        return (
          <>
            <div className="prof-tracking__cards">
              {visible.map((entry, i) => {
                const em = EMOTIONS[entry.emotion] ?? EMOTIONS.happy
                return (
                  <div key={i} className="prof-tracking__card">
                    <div className="prof-tracking__card-top">
                      <p className="prof-tracking__card-text"><span>Note:</span> {entry.note}</p>
                      <img src={em.icon} alt={em.label} className="prof-tracking__face" />
                    </div>
                    <span className="prof-tracking__date">{entry.date}</span>
                  </div>
                )
              })}
            </div>
            {totalPages > 1 && (
              <div className="prof-tracking__nav">
                <button className="prof-tracking__nav-btn" onClick={() => setPage(p => Math.max(0, p-1))} disabled={page === 0}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button className="prof-tracking__nav-btn" onClick={() => setPage(p => Math.min(totalPages-1, p+1))} disabled={page === totalPages-1}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            )}
          </>
        )
      })() : (() => {
        if (weeks.length === 0) return <p className="prof-empty">No weekly data</p>
        const week = weeks[weekIdx]
        const stats = computeEmotions(week.entries)
        return (
          <>
            <div className="prof-tracking__week-nav">
              <button className="prof-tracking__nav-btn" onClick={() => setWeekIdx(i => Math.min(weeks.length-1, i+1))} disabled={weekIdx === weeks.length-1}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <span className="prof-tracking__week-label">
                Week {weeks.length - weekIdx} &nbsp;from {formatDate(week.monday)} to {formatDate(week.sunday)}
              </span>
              <button className="prof-tracking__nav-btn" onClick={() => setWeekIdx(i => Math.max(0, i-1))} disabled={weekIdx === 0}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
            <div className="prof-tracking__emotions">
              {stats.map(({ emotion, pct }, idx) => {
                const em = EMOTIONS[emotion]
                return (
                  <div key={emotion} className={`prof-tracking__emotion ${idx === 0 ? 'prof-tracking__emotion--top' : ''}`}>
                    <img src={em.icon} alt={em.label} className="prof-tracking__emotion-face" />
                    <span className="prof-tracking__emotion-label">{em.label}</span>
                    <span className="prof-tracking__emotion-pct">{pct}%</span>
                  </div>
                )
              })}
            </div>
          </>
        )
      })()}
    </div>
  )
}

function ProfileAccordion({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`prof-accordion ${open ? 'prof-accordion--open' : ''}`}>
      <button className="prof-accordion__header" onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        <svg className="prof-accordion__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open
            ? <line x1="5" y1="12" x2="19" y2="12" />
            : <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>}
        </svg>
      </button>
      {open && <div className="prof-accordion__body">{children}</div>}
    </div>
  )
}

export default function PatientProfilePanel({ patient, onBack, onViewChange }) {
  const [details, setDetails]           = useState(null)
  const [pastSessions, setPastSessions] = useState([])
  const [upcoming, setUpcoming]         = useState([])
  const [family, setFamily]             = useState([])
  const [moodDaily, setMoodDaily]       = useState([])
  const [chatContact, setChatContact]   = useState(null)
  const [voiceContact, setVoiceContact] = useState(null)
  const [videoContact, setVideoContact] = useState(null)
  const [pendingContact, setPendingContact] = useState(null)

  useEffect(() => {
    const id = patient.id
    Promise.all([
      fetch(`${BASE_URL}/patients/${id}`).then(r => r.json()),
      fetch(`${BASE_URL}/session-notes/patient/${id}`).then(r => r.json()),
      fetch(`${BASE_URL}/appointments/patient/${id}/upcoming`).then(r => r.json()),
      fetch(`${BASE_URL}/family-patient-connections/patient/${id}`).then(r => r.json()),
      fetch(`${BASE_URL}/mood-entries/patient/${id}`).then(r => r.json()),
    ]).then(([pat, notes, appts, fam, moods]) => {
      setDetails(pat)
      setPastSessions(
        Array.isArray(notes) ? notes.map(n => {
          const { date, time } = formatAppt(n.appointment?.appointment_date ?? n.created_at)
          return { date, time, type: n.appointment?.type ?? 'Session', note: n.note_content }
        }) : []
      )
      setUpcoming(
        Array.isArray(appts) ? appts.map(a => {
          const { date, time } = formatAppt(a.appointment_date)
          return { date, time, type: a.type ?? 'Appointment' }
        }) : []
      )
      setFamily(
        Array.isArray(fam) ? fam.map(f => ({
          id: f.id,
          name: f.family_member?.user?.full_name ?? f.family_member_name ?? 'Unknown',
          relation: f.relationship ?? '—',
          access: f.can_view_documents ? 'all' : 'limited',
          avatar: f.family_member?.user?.avatar_url ? BASE_URL + f.family_member.user.avatar_url : null,
        })) : []
      )
      setMoodDaily(
        Array.isArray(moods) ? moods.map(m => ({
          note: m.mood_note ?? '—',
          date: formatDateStr(m.entry_date),
          emotion: moodToEmotion(m.mood_type),
        })) : []
      )
    }).catch(() => {})
  }, [patient.id])

  function openChat(m)  { setChatContact(m);  onViewChange?.('chat') }
  function openVoice(m) { setVoiceContact(m); onViewChange?.('call') }
  function openVideo(m) { setVideoContact(m); onViewChange?.('call') }

  function handleChatEnd() {
    const contact = chatContact
    setChatContact(null); onViewChange?.(null)
    if (contact) setPendingContact(contact)
  }

  function handleCallEnd() {
    const contact = voiceContact || videoContact
    setVoiceContact(null); setVideoContact(null); onViewChange?.(null)
    if (contact) setPendingContact(contact)
  }

  function handleSaveNote() {
    fetch(`${BASE_URL}/session-notes/patient/${patient.id}`).then(r => r.json()).then(notes => {
      if (!Array.isArray(notes)) return
      setPastSessions(notes.map(n => {
        const { date, time } = formatAppt(n.appointment?.appointment_date ?? n.created_at)
        return { date, time, type: n.appointment?.type ?? 'Session', note: n.note_content }
      }))
    }).catch(() => {})
    setPendingContact(null)
  }

  if (chatContact)  return <ChatPage      patient={chatContact}  onBack={handleChatEnd} />
  if (voiceContact) return <VoiceCallPage patient={voiceContact} onEnd={handleCallEnd} />
  if (videoContact) return <VideoCallPage patient={videoContact} onEnd={handleCallEnd} />

  const dob    = formatDOB(details?.date_of_birth)
  const gender = details?.gender ?? 'N/A'
  const blood  = details?.blood_type ?? 'N/A'
  const phone  = details?.user?.phone ?? 'N/A'
  const email  = details?.user?.email ?? 'N/A'

  return (
    <div className="profile">
      {pendingContact && (
        <SessionNoteModal
          contact={pendingContact}
          onSave={handleSaveNote}
          onSkip={() => setPendingContact(null)}
        />
      )}

      <button className="profile__back" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to patients
      </button>

      <div className="profile__hero">
        <div className="profile__avatar-wrap">
          {patient.avatar
            ? <img src={patient.avatar} alt={patient.name} className="profile__avatar" />
            : <div className="profile__avatar" style={{ background: '#d4f0a0', color: '#4a7c26', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700 }}>
                {patient.name?.split(' ').slice(0,2).map(n => n[0]).join('')}
              </div>
          }
          <span className="profile__check">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        </div>
        <div className="profile__info">
          <h2 className="profile__name">{patient.name}</h2>
          <p className="profile__id">Patient ID: {patient.id}</p>
          <span className="profile__status">Active Patient</span>
        </div>
      </div>

      <div className="profile__accordions">

        <ProfileAccordion title="patient information">
          <div className="prof-grid">
            <div className="prof-field"><span className="prof-field__label">Full Name</span><span className="prof-field__value">{patient.name}</span></div>
            <div className="prof-field"><span className="prof-field__label">Age</span><span className="prof-field__value">{patient.age} years</span></div>
            <div className="prof-field"><span className="prof-field__label">Date of Birth</span><span className="prof-field__value">{dob}</span></div>
            <div className="prof-field"><span className="prof-field__label">Gender</span><span className="prof-field__value">{gender}</span></div>
            <div className="prof-field"><span className="prof-field__label">Blood Type</span><span className="prof-field__value">{blood}</span></div>
            <div className="prof-field"><span className="prof-field__label">Phone</span><span className="prof-field__value">{phone}</span></div>
            <div className="prof-field"><span className="prof-field__label">Email</span><span className="prof-field__value">{email}</span></div>
            <div className="prof-field"><span className="prof-field__label">Condition</span><span className="prof-field__value">{patient.illness}</span></div>
            <div className="prof-field"><span className="prof-field__label">Stage</span><span className={`prof-stage prof-stage--${(patient.stage ?? '').toLowerCase()}`}>{patient.stage}</span></div>
            <div className="prof-field"><span className="prof-field__label">Start Date</span><span className="prof-field__value">{patient.start}</span></div>
          </div>
        </ProfileAccordion>

        <ProfileAccordion title="patient's tracking">
          <PatientTracking daily={moodDaily} />
        </ProfileAccordion>

        <ProfileAccordion title="family information">
          {family.length === 0 ? (
            <p className="prof-empty">No family members added</p>
          ) : (
            <table className="prof-family">
              <thead>
                <tr><th>Name</th><th>related as</th><th>had access to</th><th>contact</th></tr>
              </thead>
              <tbody>
                {family.map((m, i) => (
                  <tr key={i}>
                    <td><span className="prof-family__name">{m.name}</span></td>
                    <td className="prof-family__relation">{m.relation}</td>
                    <td className="prof-family__access">{m.access}</td>
                    <td>
                      <div className="prof-family__icons">
                        <button className="prof-family__icon-btn" title="Message" onClick={() => openChat(m)}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                        </button>
                        <button className="prof-family__icon-btn" title="Call" onClick={() => openVoice(m)}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.74a16 16 0 0 0 6.29 6.29l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        </button>
                        <button className="prof-family__icon-btn" title="Video" onClick={() => openVideo(m)}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </ProfileAccordion>

        <ProfileAccordion title="past sessions">
          {pastSessions.length === 0 ? (
            <p className="prof-empty">No past sessions</p>
          ) : (
            <table className="prof-schedule prof-schedule--past">
              <thead><tr><th>Date</th><th>Time</th><th>Type</th><th>Doctor's Note</th></tr></thead>
              <tbody>
                {pastSessions.map((s, i) => (
                  <tr key={i}>
                    <td><span className="prof-date">{s.date}</span></td>
                    <td><span className="prof-time">{s.time}</span></td>
                    <td>{s.type}</td>
                    <td><span className="prof-note">{s.note}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </ProfileAccordion>

        <ProfileAccordion title="upcoming appointments">
          {upcoming.length === 0 ? (
            <p className="prof-empty">No upcoming appointments</p>
          ) : (
            <table className="prof-schedule">
              <thead><tr><th>Date</th><th>Time</th><th>Type</th></tr></thead>
              <tbody>
                {upcoming.map((s, i) => (
                  <tr key={i}>
                    <td><span className="prof-date">{s.date}</span></td>
                    <td><span className="prof-time">{s.time}</span></td>
                    <td>{s.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </ProfileAccordion>

      </div>
    </div>
  )
}

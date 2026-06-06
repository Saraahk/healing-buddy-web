import { useState } from 'react'
import './PatientProfilePanel.css'
import ChatPage from './ChatPage'
import VoiceCallPage from './VoiceCallPage'
import VideoCallPage from './VideoCallPage'
import SessionNoteModal from './SessionNoteModal'
import HappyIcon from '../assets/Happyicon.png'
import SadIcon   from '../assets/Sadicon.png'
import FearIcon  from '../assets/Fearicon.png'
import AngryIcon from '../assets/Angryicon.png'

const patientDetails = {
  '021231': {
    dob: '15 Mar 1994', gender: 'Male', blood: 'O+', phone: '+966 50 123 4567',
    email: 'elsaid@email.com',
    conditionCategory: 'Cancer', specificCondition: 'Leukemia',
    family: [
      { id: '021251', name: 'Ahmed El Said',  relation: 'Brother', access: 'all', avatar: 'https://randomuser.me/api/portraits/men/41.jpg' },
      { id: '021252', name: 'Mona El Said',   relation: 'Sister',  access: 'all', avatar: 'https://randomuser.me/api/portraits/women/41.jpg' },
      { id: '021253', name: 'Hassan El Said', relation: 'Father',  access: 'reports', avatar: 'https://randomuser.me/api/portraits/men/42.jpg' },
    ],
    documents: [
      { name: 'Blood_Test_Q1.PDF', size: '8 MB' },
      { name: 'Chemo_Report_Q1.PDF', size: '15 MB' },
    ],
    tracking: {
      daily: [
        { note: 'Today I feel happy but a little tired after the session. Hoping things get better.', date: '02-05-2026', emotion: 'happy' },
        { note: 'Feeling down today. The treatment side effects are tough to handle.', date: '01-05-2026', emotion: 'sad' },
        { note: 'Slept well last night. Energy levels are improving. Went for a short walk.', date: '30-04-2026', emotion: 'happy' },
        { note: 'Worried about the upcoming test results. Hard to focus on anything else.', date: '29-04-2026', emotion: 'fear' },
        { note: 'Good day! Managed to eat a proper meal and felt strong.', date: '28-04-2026', emotion: 'happy' },
        { note: 'Feeling positive today. Blood count was stable at the check.', date: '27-04-2026', emotion: 'happy' },
        { note: 'Frustrated with the long wait at the clinic. Very tiring day.', date: '26-04-2026', emotion: 'angry' },
        { note: 'Nausea returned today. Hard to eat anything at all.', date: '25-04-2026', emotion: 'sad' },
        { note: 'Better than yesterday. Managed to take a short walk outside.', date: '24-04-2026', emotion: 'happy' },
        { note: 'Anxious before the follow-up session but it went well.', date: '23-04-2026', emotion: 'fear' },
        { note: 'Feeling okay. Took my medication on time and rested.', date: '22-04-2026', emotion: 'happy' },
        { note: 'Good energy today. Spent time with family which helped a lot.', date: '21-04-2026', emotion: 'happy' },
      ],
    },
    pastSessions: [
      { date: '10.Apr.2026', time: '10:00', type: 'Appointment', note: 'Patient shows early signs of leukemia. Started chemotherapy protocol. Responding well so far.' },
      { date: '02.May.2026', time: '09:00', type: 'Review',      note: 'Blood count improved. Continue current treatment. Schedule next follow-up in 4 weeks.' },
    ],
    upcomingSessions: [
      { date: '30.May.2026', time: '10:00', type: 'Review' },
      { date: '15.Jun.2026', time: '09:30', type: 'Appointment' },
    ],
  },
  '021232': {
    dob: '02 Jun 1998', gender: 'Female', blood: 'A+', phone: '+966 55 234 5678',
    email: 'sara.ahmed@email.com',
    conditionCategory: 'Diabetes', specificCondition: 'Type 2 Diabetes',
    family: [
      { id: '021254', name: 'Khaled Ahmed', relation: 'Father', access: 'all', avatar: 'https://randomuser.me/api/portraits/men/43.jpg' },
      { id: '021255', name: 'Hana Ahmed',   relation: 'Sister', access: 'all', avatar: 'https://randomuser.me/api/portraits/women/43.jpg' },
    ],
    documents: [
      { name: 'Diabetes_Report_Q1.PDF', size: '12 MB' },
    ],
    tracking: {
      daily: [
        { note: 'Blood sugar was a bit high this morning but settled after adjusting my meals.', date: '02-05-2026', emotion: 'fear' },
        { note: 'Good day overall. Followed my nutrition plan strictly. Feeling proud.', date: '01-05-2026', emotion: 'happy' },
        { note: 'Feeling tired after the blood test. Resting for the day.', date: '30-04-2026', emotion: 'sad' },
        { note: 'Levels stable today. Going for a light walk as advised.', date: '29-04-2026', emotion: 'happy' },
        { note: 'Struggled with cravings today but managed to stay on diet.', date: '28-04-2026', emotion: 'angry' },
        { note: 'Feeling much better today. Energy is good and mood is positive.', date: '27-04-2026', emotion: 'happy' },
        { note: 'Morning glucose was high. Adjusted insulin dose as instructed.', date: '25-04-2026', emotion: 'fear' },
        { note: 'Good reading today! Sticking to the nutrition plan is paying off.', date: '24-04-2026', emotion: 'happy' },
      ],
    },
    pastSessions: [
      { date: '15.Mar.2026', time: '11:00', type: 'Appointment', note: 'HbA1c at 8.2%. Adjusted insulin dosage. Patient advised on diet modifications.' },
    ],
    upcomingSessions: [
      { date: '01.Jun.2026', time: '11:00', type: 'Appointment' },
      { date: '20.Jun.2026', time: '10:00', type: 'Review' },
    ],
  },
  '021233': {
    dob: '10 Jan 1992', gender: 'Male', blood: 'B-', phone: '+1 555 345 6789',
    email: 'marcus.thorne@email.com',
    conditionCategory: 'Heart Disease', specificCondition: 'Coronary Artery Disease',
    family: [
      { id: '021256', name: 'Linda Thorne', relation: 'Wife', access: 'all', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    ],
    documents: [
      { name: 'ECG_Report_Q1.PDF', size: '10 MB' },
      { name: 'Heart_Scan_Q1.PDF', size: '20 MB' },
    ],
    tracking: {
      daily: [
        { note: 'Chest felt tight in the morning but medication helped. Resting for the day.', date: '02-05-2026', emotion: 'fear' },
        { note: 'Better than yesterday. Did light breathing exercises as recommended.', date: '01-05-2026', emotion: 'happy' },
        { note: 'Hard day. Felt short of breath during the afternoon.', date: '30-04-2026', emotion: 'angry' },
        { note: 'Followed low-sodium diet strictly today. Feeling okay.', date: '29-04-2026', emotion: 'happy' },
        { note: 'Feeling scared about the next ECG. Trying to stay calm.', date: '28-04-2026', emotion: 'fear' },
        { note: 'Good rest last night. Heart rate felt normal today.', date: '27-04-2026', emotion: 'happy' },
        { note: 'Chest discomfort returned briefly. Called the nurse for advice.', date: '25-04-2026', emotion: 'fear' },
        { note: 'Energy was low all day. Stayed in bed mostly.', date: '24-04-2026', emotion: 'sad' },
      ],
    },
    pastSessions: [
      { date: '20.Apr.2026', time: '09:00', type: 'Review', note: 'ECG shows mild arrhythmia. Prescribed beta-blockers. Follow strict low-sodium diet.' },
    ],
    upcomingSessions: [
      { date: '02.Jun.2026', time: '09:00', type: 'Appointment' },
    ],
  },
  '021234': {
    dob: '20 Sep 2004', gender: 'Female', blood: 'AB+', phone: '+44 77 456 7890',
    email: 'lara.croft@email.com',
    conditionCategory: 'Kidney Disease', specificCondition: 'Chronic Kidney Disease',
    family: [
      { id: '021257', name: 'Richard Croft', relation: 'Father', access: 'all', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
    ],
    documents: [
      { name: 'Kidney_Test_Q1.PDF', size: '9 MB' },
    ],
    tracking: {
      daily: [
        { note: 'Drinking more water today as advised. Feeling less fatigued.', date: '02-05-2026', emotion: 'happy' },
        { note: 'Swelling in legs today. Worried about the test results.', date: '01-05-2026', emotion: 'fear' },
        { note: 'Rested well. Following fluid intake plan carefully.', date: '30-04-2026', emotion: 'happy' },
        { note: 'Frustrated with the strict diet restrictions today.', date: '29-04-2026', emotion: 'angry' },
        { note: 'Feeling hopeful after speaking to the doctor.', date: '27-04-2026', emotion: 'happy' },
        { note: 'Back pain and fatigue throughout the day.', date: '25-04-2026', emotion: 'sad' },
      ],
    },
    pastSessions: [
      { date: '18.Apr.2026', time: '14:00', type: 'Appointment', note: 'Creatinine levels elevated. Increased fluid intake recommended. Referred to nephrologist.' },
    ],
    upcomingSessions: [
      { date: '03.Jun.2026', time: '14:00', type: 'Review' },
    ],
  },
  '021235': {
    dob: '14 Feb 1981', gender: 'Male', blood: 'O-', phone: '+966 54 567 8901',
    email: 'omar.khalid@email.com',
    conditionCategory: 'Liver Disease', specificCondition: 'Hepatitis B',
    family: [
      { id: '021258', name: 'Fatima Khalid', relation: 'Sister', access: 'all', avatar: 'https://randomuser.me/api/portraits/women/46.jpg' },
      { id: '021259', name: 'Ali Khalid',    relation: 'Brother', access: 'reports', avatar: 'https://randomuser.me/api/portraits/men/47.jpg' },
    ],
    documents: [
      { name: 'Liver_Enzyme_Q1.PDF', size: '11 MB' },
      { name: 'Hepatitis_Report_Q1.PDF', size: '15 MB' },
    ],
    tracking: {
      daily: [
        { note: 'No alcohol, sticking to diet. Feeling a bit weak but manageable.', date: '02-05-2026', emotion: 'sad' },
        { note: 'Good energy today. Took all medications on time. Appetite improving.', date: '01-05-2026', emotion: 'happy' },
        { note: 'Feeling anxious about next liver enzyme test.', date: '30-04-2026', emotion: 'fear' },
        { note: 'Ate well and slept 8 hours. Feeling better than usual.', date: '29-04-2026', emotion: 'happy' },
        { note: 'Angry at myself for breaking the diet once today.', date: '28-04-2026', emotion: 'angry' },
        { note: 'Following antiviral schedule strictly. Feeling positive.', date: '27-04-2026', emotion: 'happy' },
        { note: 'Fatigue hit hard today. Rested all day.', date: '25-04-2026', emotion: 'sad' },
        { note: 'Mild nausea in the morning but recovered by noon.', date: '24-04-2026', emotion: 'fear' },
      ],
    },
    pastSessions: [
      { date: '25.Apr.2026', time: '08:30', type: 'Review', note: 'ALT and AST slightly elevated. Antiviral treatment ongoing. Avoid alcohol completely.' },
    ],
    upcomingSessions: [
      { date: '04.Jun.2026', time: '08:30', type: 'Appointment' },
    ],
  },
}

const defaultDetails = {
  dob: 'N/A', gender: 'N/A', blood: 'N/A', phone: 'N/A',
  email: 'N/A',
  conditionCategory: 'N/A', specificCondition: 'N/A',
  family: [],
  documents: [],
  tracking: { daily: [] },
  pastSessions: [],
  upcomingSessions: [],
}

const CARDS_PER_PAGE = 2

const EMOTIONS = {
  happy: { label: 'Happy', icon: HappyIcon, color: '#4ade80' },
  sad:   { label: 'Sad',   icon: SadIcon,   color: '#a78bfa' },
  fear:  { label: 'Fear',  icon: FearIcon,  color: '#60a5fa' },
  angry: { label: 'Angry', icon: AngryIcon, color: '#f87171' },
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

function PatientTracking({ tracking }) {
  const [tab, setTab]         = useState('daily')
  const [page, setPage]       = useState(0)
  const [weekIdx, setWeekIdx] = useState(0)

  const daily = tracking.daily ?? []
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
        const weekNum = weekIdx + 1
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
  const d = patientDetails[patient.id] ?? defaultDetails
  const [pastSessions, setPastSessions] = useState(d.pastSessions)
  const [chatContact, setChatContact]   = useState(null)
  const [voiceContact, setVoiceContact] = useState(null)
  const [videoContact, setVideoContact] = useState(null)
  const [pendingContact, setPendingContact] = useState(null)

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

  function handleSaveNote(session) {
    setPastSessions(prev => [session, ...prev])
    setPendingContact(null)
  }

  if (chatContact)  return <ChatPage      patient={chatContact}  onBack={handleChatEnd} />
  if (voiceContact) return <VoiceCallPage patient={voiceContact} onEnd={handleCallEnd} />
  if (videoContact) return <VideoCallPage patient={videoContact} onEnd={handleCallEnd} />

  return (
    <div className="profile">
      {pendingContact && (
        <SessionNoteModal
          contact={pendingContact}
          onSave={handleSaveNote}
          onSkip={() => setPendingContact(null)}
        />
      )}


      {/* Back */}
      <button className="profile__back" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to patients
      </button>

      {/* Hero card */}
      <div className="profile__hero">
        <div className="profile__avatar-wrap">
          <img src={patient.avatar} alt={patient.name} className="profile__avatar" />
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
        <button className="profile__msg-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Message
        </button>
      </div>

      {/* Accordions */}
      <div className="profile__accordions">

        <ProfileAccordion title="patient information">
          <div className="prof-grid">
            <div className="prof-field">
              <span className="prof-field__label">Full Name</span>
              <span className="prof-field__value">{patient.name}</span>
            </div>
            <div className="prof-field">
              <span className="prof-field__label">Age</span>
              <span className="prof-field__value">{patient.age} years</span>
            </div>
            <div className="prof-field">
              <span className="prof-field__label">Date of Birth</span>
              <span className="prof-field__value">{d.dob}</span>
            </div>
            <div className="prof-field">
              <span className="prof-field__label">Gender</span>
              <span className="prof-field__value">{d.gender}</span>
            </div>
            <div className="prof-field">
              <span className="prof-field__label">Blood Type</span>
              <span className="prof-field__value">{d.blood}</span>
            </div>
            <div className="prof-field">
              <span className="prof-field__label">Phone</span>
              <span className="prof-field__value">{d.phone}</span>
            </div>
            <div className="prof-field">
              <span className="prof-field__label">Email</span>
              <span className="prof-field__value">{d.email}</span>
            </div>
            <div className="prof-field">
              <span className="prof-field__label">Condition Category</span>
              <span className="prof-field__value">{d.conditionCategory}</span>
            </div>
            <div className="prof-field">
              <span className="prof-field__label">Specific Condition</span>
              <span className="prof-field__value">{d.specificCondition}</span>
            </div>
            <div className="prof-field">
              <span className="prof-field__label">Stage</span>
              <span className={`prof-stage prof-stage--${patient.stage.toLowerCase()}`}>{patient.stage}</span>
            </div>
            <div className="prof-field">
              <span className="prof-field__label">Start Date</span>
              <span className="prof-field__value">{patient.start}</span>
            </div>
          </div>

          {d.documents.length > 0 && (
            <div className="prof-docs">
              <p className="prof-docs__title">Patient's documents</p>
              <div className="prof-docs__list">
                {d.documents.map((doc, i) => (
                  <div key={i} className="prof-docs__item">
                    <span className="prof-docs__icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </span>
                    <div>
                      <span className="prof-docs__name">{doc.name}</span>
                      <span className="prof-docs__size">{doc.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ProfileAccordion>

        <ProfileAccordion title="patient's tracking">
          <PatientTracking tracking={d.tracking} />
        </ProfileAccordion>

        <ProfileAccordion title="family information">
          {d.family.length === 0 ? (
            <p className="prof-empty">No family members added</p>
          ) : (
            <table className="prof-family">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>related as</th>
                  <th>had access to</th>
                  <th>contact</th>
                </tr>
              </thead>
              <tbody>
                {d.family.map((m, i) => (
                  <tr key={i}>
                    <td>
                      <span className="prof-family__name">{m.name}</span>
                    </td>
                    <td className="prof-family__relation">{m.relation.toLowerCase()}</td>
                    <td className="prof-family__access">{m.access}</td>
                    <td>
                      <div className="prof-family__icons">
                        <button className="prof-family__icon-btn" title="Message" onClick={() => openChat(m)}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                        </button>
                        <button className="prof-family__icon-btn" title="Call" onClick={() => openVoice(m)}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.74a16 16 0 0 0 6.29 6.29l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </button>
                        <button className="prof-family__icon-btn" title="Video" onClick={() => openVideo(m)}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                          </svg>
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
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Doctor's Note</th>
                </tr>
              </thead>
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
          {d.upcomingSessions.length === 0 ? (
            <p className="prof-empty">No upcoming appointments</p>
          ) : (
            <table className="prof-schedule">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {d.upcomingSessions.map((s, i) => (
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

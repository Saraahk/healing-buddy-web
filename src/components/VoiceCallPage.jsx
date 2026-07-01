import { useState, useEffect } from 'react'
import './VoiceCallPage.css'

export default function VoiceCallPage({ patient, onEnd }) {
  const [seconds, setSeconds] = useState(0)
  const [muted, setMuted] = useState(false)
  const [speaker, setSpeaker] = useState(true)
  const [held, setHeld] = useState(false)
  const [status, setStatus] = useState('Calling...')

  useEffect(() => {
    const connect = setTimeout(() => setStatus('Connected'), 2000)
    return () => clearTimeout(connect)
  }, [])

  useEffect(() => {
    if (status !== 'Connected') return
    const t = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [status])

  const fmt = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <div className="vcall">
      {/* Background blur rings */}
      <div className="vcall__ring vcall__ring--1" />
      <div className="vcall__ring vcall__ring--2" />
      <div className="vcall__ring vcall__ring--3" />

      {/* Patient info */}
      <div className="vcall__info">
        <img src={patient.avatar} alt={patient.name} className="vcall__avatar" />
        <h2 className="vcall__name">{patient.name}</h2>
        <span className="vcall__illness">{patient.illness} · {patient.stage}</span>
        <span className={`vcall__status ${status === 'Connected' ? 'vcall__status--connected' : ''}`}>
          {held ? 'On Hold' : status === 'Connected' ? fmt(seconds) : status}
        </span>
      </div>

      {/* Controls */}
      <div className="vcall__controls">
        <div className="vcall__controls-row">
          {/* Mute */}
          <button
            className={`vcall__btn ${muted ? 'vcall__btn--active' : ''}`}
            onClick={() => setMuted(m => !m)}
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="1" x2="23" y2="23"/>
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
                <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            )}
            <span>{muted ? 'Unmute' : 'Mute'}</span>
          </button>

          {/* Speaker */}
          <button
            className={`vcall__btn ${!speaker ? 'vcall__btn--active' : ''}`}
            onClick={() => setSpeaker(s => !s)}
            title="Speaker"
          >
            {speaker ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            )}
            <span>{speaker ? 'Speaker' : 'Muted Spkr'}</span>
          </button>

          {/* Hold */}
          <button
            className={`vcall__btn ${held ? 'vcall__btn--active' : ''}`}
            onClick={() => setHeld(h => !h)}
            title="Hold"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
            </svg>
            <span>{held ? 'Resume' : 'Hold'}</span>
          </button>

          {/* Keypad */}
          <button className="vcall__btn" title="Keypad">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="5" cy="5" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="19" cy="5" r="1"/>
              <circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>
              <circle cx="5" cy="19" r="1"/><circle cx="12" cy="19" r="1"/><circle cx="19" cy="19" r="1"/>
            </svg>
            <span>Keypad</span>
          </button>
        </div>

        {/* End call */}
        <button className="vcall__end" onClick={onEnd} title="End Call">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 3.07 12 19.79 19.79 0 0 1 .15 3.37 2 2 0 0 1 2.13 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L6.11 8.89"/>
            <line x1="23" y1="1" x2="1" y2="23"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

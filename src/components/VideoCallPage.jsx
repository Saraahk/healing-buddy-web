import { useState, useEffect } from 'react'
import './VideoCallPage.css'

export default function VideoCallPage({ patient, onEnd }) {
  const [seconds, setSeconds] = useState(0)
  const [muted, setMuted] = useState(false)
  const [camOff, setCamOff] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [status, setStatus] = useState('Connecting...')
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setStatus('connected'), 2000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (status !== 'connected') return
    const t = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [status])

  useEffect(() => {
    let timer
    const reset = () => {
      setShowControls(true)
      clearTimeout(timer)
      timer = setTimeout(() => setShowControls(false), 4000)
    }
    reset()
    window.addEventListener('mousemove', reset)
    return () => { window.removeEventListener('mousemove', reset); clearTimeout(timer) }
  }, [])

  const fmt = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <div className={`vidcall ${fullscreen ? 'vidcall--fullscreen' : ''}`}>

      {/* Remote video (patient) */}
      <div className="vidcall__remote">
        {status !== 'connected' ? (
          <div className="vidcall__connecting">
            <img src={patient.avatar} alt={patient.name} className="vidcall__connecting-avatar" />
            <span>{status}</span>
          </div>
        ) : (
          <img src={patient.avatar} alt="patient" className="vidcall__remote-placeholder" />
        )}
      </div>

      {/* Local video (doctor - PiP) */}
      <div className={`vidcall__local ${camOff ? 'vidcall__local--off' : ''}`}>
        {camOff ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23"/>
            <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34"/>
          </svg>
        ) : (
          <span className="vidcall__local-label">You</span>
        )}
      </div>

      {/* Top bar */}
      <div className={`vidcall__topbar ${showControls ? '' : 'vidcall__ui--hidden'}`}>
        <div className="vidcall__patient-info">
          <img src={patient.avatar} alt={patient.name} className="vidcall__top-avatar" />
          <div>
            <span className="vidcall__top-name">{patient.name}</span>
            <span className="vidcall__top-sub">{patient.illness} · {patient.stage}</span>
          </div>
        </div>
        {status === 'connected' && (
          <span className="vidcall__timer">{fmt(seconds)}</span>
        )}
      </div>

      {/* Bottom controls */}
      <div className={`vidcall__controls ${showControls ? '' : 'vidcall__ui--hidden'}`}>

        {/* Mic */}
        <button
          className={`vidcall__btn ${muted ? 'vidcall__btn--off' : ''}`}
          onClick={() => setMuted(m => !m)}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="1" y1="1" x2="23" y2="23"/>
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
              <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          )}
          <span>{muted ? 'Unmute' : 'Mute'}</span>
        </button>

        {/* Camera */}
        <button
          className={`vidcall__btn ${camOff ? 'vidcall__btn--off' : ''}`}
          onClick={() => setCamOff(c => !c)}
          title={camOff ? 'Start Camera' : 'Stop Camera'}
        >
          {camOff ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="1" y1="1" x2="23" y2="23"/>
              <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
          )}
          <span>{camOff ? 'Start Cam' : 'Stop Cam'}</span>
        </button>

        {/* Screen share */}
        <button
          className={`vidcall__btn ${sharing ? 'vidcall__btn--sharing' : ''}`}
          onClick={() => setSharing(s => !s)}
          title="Share Screen"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
            {sharing && <polyline points="17 8 12 3 7 8"/>}
          </svg>
          <span>{sharing ? 'Stop Share' : 'Share'}</span>
        </button>

        {/* Fullscreen */}
        <button
          className="vidcall__btn"
          onClick={() => setFullscreen(f => !f)}
          title="Fullscreen"
        >
          {fullscreen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          )}
          <span>{fullscreen ? 'Exit' : 'Fullscreen'}</span>
        </button>

        {/* End call */}
        <button className="vidcall__end" onClick={onEnd} title="End Call">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 3.07 12 19.79 19.79 0 0 1 .15 3.37 2 2 0 0 1 2.13 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L6.11 8.89"/>
            <line x1="23" y1="1" x2="1" y2="23"/>
          </svg>
          <span>End</span>
        </button>
      </div>
    </div>
  )
}

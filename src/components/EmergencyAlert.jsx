import { useEffect, useState } from 'react'
import './EmergencyAlert.css'

export default function EmergencyAlert({ alert, onDismiss, onCall, onViewPatient }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (alert) setTimeout(() => setVisible(true), 50)
    else setVisible(false)
  }, [alert])

  if (!alert) return null

  return (
    <div className={`ea-overlay ${visible ? 'ea-overlay--in' : ''}`}>
      <div className={`ea-popup ${visible ? 'ea-popup--in' : ''}`}>

        {/* Header */}
        <div className="ea-header">
          <div className="ea-icon-wrap">
            <div className="ea-pulse-ring ea-pulse-ring--1" />
            <div className="ea-pulse-ring ea-pulse-ring--2" />
            <div className="ea-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
          </div>
          <div className="ea-header-text">
            <span className="ea-label">EMERGENCY ALERT</span>
            <span className="ea-time">{alert.time}</span>
          </div>
        </div>

        {/* Patient info */}
        <div className="ea-patient">
          <div className="ea-avatar">
            {alert.avatar
              ? <img src={alert.avatar} alt={alert.patientName} />
              : <span>{alert.patientName.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
            }
          </div>
          <div className="ea-patient-info">
            <p className="ea-patient-name">{alert.patientName}</p>
            <p className="ea-patient-sub">has triggered an emergency alert</p>
          </div>
        </div>

        {/* Message */}
        {alert.message && (
          <div className="ea-message">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>"{alert.message}"</span>
          </div>
        )}

        {/* Actions */}
        <div className="ea-actions">
          <button className="ea-btn ea-btn--call" onClick={() => onCall?.(alert)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call Now
          </button>
          <button className="ea-btn ea-btn--view" onClick={() => onViewPatient?.(alert)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            View
          </button>
          <button className="ea-btn ea-btn--dismiss" onClick={onDismiss}>
            Dismiss
          </button>
        </div>

      </div>
    </div>
  )
}

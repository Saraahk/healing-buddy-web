import { useState, useEffect } from 'react'
import './AdminAnalyticsPanel.css'
import BASE_URL from '../../api'


export default function AdminAnalyticsPanel() {
  const [kpis, setKpis]           = useState(null)
  const [kpisLoaded, setKpisLoaded] = useState(false)
  const [weekly, setWeekly]       = useState([])
  const [doctors, setDoctors]     = useState([])

  useEffect(() => {
    fetch(`${BASE_URL}/analytics-summary`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setKpis(data[0])
      })
      .catch(() => {})
      .finally(() => setKpisLoaded(true))

    fetch(`${BASE_URL}/weekly-activity`)
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) return
        setWeekly(data.map(d => ({
          day:      d.day_of_week,
          patients: d.patients_active,
          doctors:  d.doctors_active,
          buddies:  d.healing_buddies_active,
          family:   d.family_members_active,
        })))
      })
      .catch(() => {})

    fetch(`${BASE_URL}/doctor-ranking`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setDoctors(data.slice(0, 5))
      })
      .catch(() => {})
  }, [])

  const kpiCards = kpis ? [
    { label: 'Patient Posts',         value: kpis.patient_posts_count.toLocaleString() },
    { label: 'Healing Notes Written', value: kpis.healing_notes_written_count.toLocaleString() },
    { label: 'Family Posts',          value: kpis.family_posts_count.toLocaleString() },
    { label: 'Support Sessions',      value: kpis.support_sessions_count.toLocaleString() },
    { label: 'Medical Docs Uploaded', value: kpis.medical_documents_uploaded_count.toLocaleString() },
    { label: 'Family Connections',    value: kpis.family_connections_count.toLocaleString() },
  ] : []

  const maxVal = weekly.length > 0
    ? Math.max(...weekly.flatMap(d => [d.patients, d.doctors, d.buddies, d.family]), 1)
    : 1

  return (
    <div className="admin-analytics">
      {/* KPIs */}
      <div className="admin-analytics__kpis">
        {!kpisLoaded
          ? <div style={{ color: '#9ca3af', fontSize: 14 }}>Loading...</div>
          : kpiCards.map(k => (
            <div key={k.label} className="admin-analytics__kpi">
              <span className="admin-analytics__kpi-value">{k.value}</span>
              <span className="admin-analytics__kpi-label">{k.label}</span>
            </div>
          ))
        }
      </div>

      <div className="admin-analytics__row">
        {/* Weekly Active Users chart */}
        <div className="admin-analytics__card admin-analytics__card--wide">
          <div className="admin-analytics__card-header">
            <h3 className="admin-analytics__card-title">Monthly Signups</h3>
            <div className="admin-analytics__legend">
              <span className="admin-analytics__legend-dot" style={{background:'#0ea5e9'}} />Patients
              <span className="admin-analytics__legend-dot" style={{background:'#6366f1'}} />Doctors
              <span className="admin-analytics__legend-dot" style={{background:'#16a34a'}} />Buddies
              <span className="admin-analytics__legend-dot" style={{background:'#f59e0b'}} />Family
            </div>
          </div>
          <div className="admin-analytics__chart">
            {weekly.length === 0
              ? <div style={{ color: '#9ca3af', fontSize: 14, padding: '24px 0' }}>No activity data yet.</div>
              : weekly.map(d => (
                <div key={d.day} className="admin-analytics__col">
                  <div className="admin-analytics__bars">
                    <div className="admin-analytics__bar" style={{ height:`${(d.patients/maxVal)*100}%`, background:'#0ea5e9' }} title={`Patients: ${d.patients}`} />
                    <div className="admin-analytics__bar" style={{ height:`${(d.doctors/maxVal)*100}%`,  background:'#6366f1' }} title={`Doctors: ${d.doctors}`} />
                    <div className="admin-analytics__bar" style={{ height:`${(d.buddies/maxVal)*100}%`,  background:'#16a34a' }} title={`Buddies: ${d.buddies}`} />
                    <div className="admin-analytics__bar" style={{ height:`${(d.family/maxVal)*100}%`,   background:'#f59e0b' }} title={`Family: ${d.family}`} />
                  </div>
                  <span className="admin-analytics__day">{d.day}</span>
                </div>
              ))
            }
          </div>
        </div>

        {/* Top Doctors */}
        <div className="admin-analytics__card">
          <div className="admin-analytics__card-header">
            <h3 className="admin-analytics__card-title">Top Doctors</h3>
          </div>
          <div className="admin-analytics__doctor-list">
            {doctors.length === 0
              ? <div style={{ color: '#9ca3af', fontSize: 14 }}>No rankings yet.</div>
              : doctors.map((d, i) => {
                  const name = d.doctor?.user?.full_name ?? 'Unknown'
                  const spec = d.doctor?.specialty ?? '-'
                  return (
                    <div key={d.id} className="admin-analytics__doctor-row">
                      <span className="admin-analytics__doctor-rank">{i + 1}</span>
                      <div className="admin-analytics__doctor-avatar">
                        {name.split(' ').slice(1, 3).map(n => n[0]).join('')}
                      </div>
                      <div className="admin-analytics__doctor-info">
                        <p className="admin-analytics__doctor-name">{name}</p>
                        <p className="admin-analytics__doctor-spec">{d.total_patients_count} patients · {spec}</p>
                      </div>
                    </div>
                  )
                })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

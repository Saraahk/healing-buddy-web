import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import HomePanel from '../components/HomePanel'
import PatientsPanel from '../components/PatientsPanel'
import CommunicatePanel from '../components/CommunicatePanel'
import AppointmentPanel from '../components/AppointmentPanel'
import SessionsPanel from '../components/SessionsPanel'
import SettingsPanel from '../components/SettingsPanel'
import HelpPanel from '../components/HelpPanel'
import NotificationsPanel from '../components/NotificationsPanel'
import InboxPanel from '../components/InboxPanel'
import EmergencyAlert from '../components/EmergencyAlert'
import './DashboardPage.css'

const DEMO_EMERGENCY = {
  patientName: 'Ahmed Al-Salim',
  time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  message: "I'm feeling very dizzy and can't breathe properly",
}

const pageTitles = {
  home:          'Home',
  patients:      'Patients',
  communicate:   'Communicate',
  appointment:   'Appointment',
  sessions:      'Sessions',
  settings:      'Settings',
  help:          'Help Centre',
  notifications: 'Notifications',
  inbox:         'Inbox',
}

export default function DashboardPage() {
  const [active, setActive]             = useState('home')
  const [viewMode, setViewMode]         = useState(null)
  const [emergency, setEmergency]       = useState(null)
  const [pendingPatientId, setPendingPatientId] = useState(null)

  function handleViewPatient(patientId) {
    setPendingPatientId(patientId)
    setActive('patients')
    setViewMode(null)
  }

  // Simulate emergency arriving after 4 seconds (demo only)
  useEffect(() => {
    const t = setTimeout(() => setEmergency(DEMO_EMERGENCY), 4000)
    return () => clearTimeout(t)
  }, [])

  const panels = {
    home:       <HomePanel onViewPatient={handleViewPatient} />,
    patients:   <PatientsPanel onViewChange={setViewMode} initialPatientId={pendingPatientId} onPatientOpened={() => setPendingPatientId(null)} />,
    communicate: <CommunicatePanel onViewChange={setViewMode} />,
    appointment: <AppointmentPanel onViewPatient={handleViewPatient} />,
    sessions:  <SessionsPanel />,
    settings:      <SettingsPanel />,
    help:          <HelpPanel />,
    notifications: <NotificationsPanel />,
    inbox:         <InboxPanel onBack={() => { setActive('home'); setViewMode(null) }} />,
  }

  return (
    <div className="dashboard">
      {!viewMode && active !== 'inbox' && (
        <Sidebar active={active} onNavigate={(page) => { setActive(page); setViewMode(null) }} />
      )}
      <div className="dashboard__content">
        {!viewMode && <TopBar title={pageTitles[active] ?? 'Home'} onNavigate={(page) => { setActive(page); setViewMode(null) }} />}
        <main className="dashboard__main">
          {panels[active] ?? null}
        </main>
      </div>

      <EmergencyAlert
        alert={emergency}
        onDismiss={() => setEmergency(null)}
        onCall={() => { setEmergency(null); setActive('communicate'); setViewMode('call') }}
        onViewPatient={() => { setEmergency(null); setActive('patients') }}
      />
    </div>
  )
}

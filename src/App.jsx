import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import SignUpPage from './pages/SignUpPage'
import ContactAdminPage from './pages/ContactAdminPage'
import AboutPage from './pages/AboutPage'
import DoctorApplyPage from './pages/DoctorApplyPage'
import './App.css'

function App() {
  const path = window.location.pathname
  if (path === '/dashboard') return <DashboardPage />
  if (path === '/admin') return <AdminDashboardPage />
  if (path === '/signup' || path === '/signin') return <SignUpPage />
  if (path === '/contact-admin') return <ContactAdminPage />
  if (path === '/about') return <AboutPage />
  if (path === '/apply') return <DoctorApplyPage />
  return <LandingPage />
}

export default App

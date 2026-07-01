import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import SignUpPage from './pages/SignUpPage'
import ContactAdminPage from './pages/ContactAdminPage'
import AboutPage from './pages/AboutPage'
import DoctorApplyPage from './pages/DoctorApplyPage'
import './App.css'

function App() {
  const path = window.location.pathname
  if (path === '/dashboard') {
    if (!sessionStorage.getItem('doctorUser')) {
      window.location.replace('/signin')
      return null
    }
    return <DashboardPage />
  }
  if (path === '/admin-login') return <AdminLoginPage />
  if (path === '/admin') {
    if (!sessionStorage.getItem('adminAuth')) {
      window.location.replace('/admin-login')
      return null
    }
    return <AdminDashboardPage />
  }
  if (path === '/signup' || path === '/signin') return <SignUpPage />
  if (path === '/contact-admin') return <ContactAdminPage />
  if (path === '/about') return <AboutPage />
  if (path === '/apply') return <DoctorApplyPage />
  return <LandingPage />
}

export default App

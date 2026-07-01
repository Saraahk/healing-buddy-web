import { useState } from 'react'
import logo from '../../assets/logo.png'
import '../SignUpPage.css'
import BASE_URL from '../../api'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)

  function validate() {
    const e = {}
    if (!username.trim()) e.username = 'Username is required'
    if (!password)        e.password = 'Password is required'
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/auth/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      })
      if (!res.ok) {
        setErrors({ password: 'Invalid email or password' })
        return
      }
      const data = await res.json()
      sessionStorage.setItem('adminAuth', '1')
      sessionStorage.setItem('adminUser', JSON.stringify(data))
      window.location.href = '/admin'
    } catch {
      setErrors({ password: 'Server error, please try again' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup">

      {/* Left panel */}
      <div className="signup__left">

        <div className="sp sp--1" /><div className="sp sp--2" /><div className="sp sp--3" />
        <div className="sp sp--4" /><div className="sp sp--5" /><div className="sp sp--6" />
        <div className="sp sp--7" /><div className="sp sp--8" />

        <div className="signup__visual">
          <div className="signup__pulse signup__pulse--1" />
          <div className="signup__pulse signup__pulse--2" />
          <div className="signup__pulse signup__pulse--3" />
          <div className="signup__visual-core">
            <img src={logo} alt="" className="signup__visual-logo" />
          </div>
          <div className="signup__orbit signup__orbit--1" />
          <div className="signup__orbit signup__orbit--2" />
          <div className="signup__orbit signup__orbit--3" />
        </div>

        <div className="signup__left-body">
          <h1 className="signup__left-title">Welcome back,<br />Admin.</h1>
          <p className="signup__left-sub">
            Sign in to manage the platform, review doctor applications, and oversee all system activity.
          </p>

          <ul className="signup__features">
            {[
              'Full platform control',
              'Doctor application review',
              'User & content management',
              'Analytics & system overview',
            ].map((f, i) => (
              <li key={f} className="signup__feature" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                <span className="signup__feature-check">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Right panel */}
      <div className="signup__right">
        <div className="signup__card">

          <div className="signup__card-header">
            <span className="signup__badge">ADMIN PORTAL</span>
            <h2 className="signup__title">Sign In</h2>
            <p className="signup__subtitle">Enter your admin credentials to continue</p>
          </div>

          <form className="signup__form" onSubmit={handleSubmit} noValidate>

            {/* Username */}
            <div className="signup__field">
              <label className="signup__label">Username</label>
              <div className={`signup__input-wrap ${errors.username ? 'signup__input-wrap--error' : ''}`}>
                <svg className="signup__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  className="signup__input"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => { setUsername(e.target.value); setErrors(er => ({ ...er, username: '' })) }}
                />
              </div>
              {errors.username && <span className="signup__error">{errors.username}</span>}
            </div>

            {/* Password */}
            <div className="signup__field">
              <label className="signup__label">Password</label>
              <div className={`signup__input-wrap ${errors.password ? 'signup__input-wrap--error' : ''}`}>
                <svg className="signup__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  className="signup__input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(er => ({ ...er, password: '' })) }}
                />
                <button type="button" className="signup__eye" onClick={() => setShowPass(s => !s)}>
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className="signup__error">{errors.password}</span>}
            </div>

            <button type="submit" className="signup__btn" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

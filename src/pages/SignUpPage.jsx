import { useState } from 'react'
import logo from '../assets/logo.png'
import './SignUpPage.css'
import BASE_URL from '../api'

export default function SignInPage() {
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [showPass, setShowPass]   = useState(false)
  const [errors, setErrors]       = useState({})
  const [loading, setLoading]     = useState(false)

  function validate() {
    const e = {}
    if (!email.trim())  e.email    = 'Email is required'
    if (!password)      e.password = 'Password is required'
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/auth/doctor/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        setErrors({ email: 'Invalid email or password' })
        return
      }
      const data = await res.json()
      sessionStorage.setItem('doctorUser', JSON.stringify(data))
      window.location.href = '/dashboard'
    } catch {
      setErrors({ email: 'Server error, please try again' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup">

      {/* Left panel */}
      <div className="signup__left">

        {/* Floating particles */}
        <div className="sp sp--1" /><div className="sp sp--2" /><div className="sp sp--3" />
        <div className="sp sp--4" /><div className="sp sp--5" /><div className="sp sp--6" />
        <div className="sp sp--7" /><div className="sp sp--8" />

        {/* Animated center visual */}
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
          <h1 className="signup__left-title">Welcome back,<br />Doctor.</h1>
          <p className="signup__left-sub">
            Your credentials were sent to your email by the admin after account approval. Use them to sign in.
          </p>

          <ul className="signup__features">
            {[
              'Secure doctor portal',
              'Real-time patient communication',
              'Session history & notes',
              'Smart appointment scheduling',
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
            <span className="signup__badge">DOCTOR PORTAL</span>
            <h2 className="signup__title">Sign In</h2>
            <p className="signup__subtitle">Use the credentials sent to your email</p>
          </div>

          <form className="signup__form" onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className="signup__field">
              <label className="signup__label">Email</label>
              <div className={`signup__input-wrap ${errors.email ? 'signup__input-wrap--error' : ''}`}>
                <svg className="signup__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  className="signup__input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: '' })) }}
                />
              </div>
              {errors.email && <span className="signup__error">{errors.email}</span>}
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

            <p className="signup__hint">
              Don't have credentials?{' '}
              <span className="signup__hint-em" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/contact-admin'}>Contact your administrator.</span>
            </p>

          </form>

        </div>
      </div>
    </div>
  )
}

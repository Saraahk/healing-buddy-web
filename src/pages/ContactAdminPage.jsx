import { useState } from 'react'
import logo from '../assets/logo.png'
import './ContactAdminPage.css'

export default function ContactAdminPage() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' })
  const [errors, setErrors]   = useState({})
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)

  function validate() {
    const e = {}
    if (!form.name.trim())    e.name    = 'Full name is required'
    if (!form.email.trim())   e.email   = 'Email address is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1200)
  }

  return (
    <div className="ca">

      {/* ── Top bar ── */}
      <header className="ca__topbar">
        <a href="/" className="ca__logo">
          <img src={logo} alt="Healing Buddy" className="ca__logo-img" />
          <span className="ca__brand">Healing Buddy</span>
        </a>
        <button className="ca__back-btn" onClick={() => window.location.href = '/signup'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Sign In
        </button>
      </header>

      {/* ── Main content ── */}
      <main className="ca__main">

        {!sent ? (
          <>
            {/* Page heading */}
            <div className="ca__heading">
              <span className="ca__badge">CONTACT ADMIN</span>
              <h1 className="ca__title">Request Account Access</h1>
              <p className="ca__subtitle">
                Don't have credentials yet? Fill in the form below and the admin will review your request and send your login details by email.
              </p>
            </div>

            {/* Form */}
            <form className="ca__form" onSubmit={handleSubmit} noValidate>

              <div className="ca__row">
                {/* Full name */}
                <div className="ca__field">
                  <label className="ca__label">Full Name</label>
                  <div className={`ca__input-wrap ${errors.name ? 'ca__input-wrap--error' : ''}`}>
                    <svg className="ca__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input
                      className="ca__input"
                      type="text"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={e => handleChange('name', e.target.value)}
                    />
                  </div>
                  {errors.name && <span className="ca__error">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="ca__field">
                  <label className="ca__label">Email Address</label>
                  <div className={`ca__input-wrap ${errors.email ? 'ca__input-wrap--error' : ''}`}>
                    <svg className="ca__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <input
                      className="ca__input"
                      type="email"
                      placeholder="Enter your email address"
                      value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                    />
                  </div>
                  {errors.email && <span className="ca__error">{errors.email}</span>}
                </div>
              </div>

              {/* Message */}
              <div className="ca__field">
                <label className="ca__label">Message to Admin</label>
                <div className={`ca__input-wrap ca__input-wrap--textarea ${errors.message ? 'ca__input-wrap--error' : ''}`}>
                  <svg className="ca__input-icon ca__input-icon--top" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <textarea
                    className="ca__input ca__textarea"
                    placeholder="Introduce yourself — your specialty, hospital/clinic, and why you need access to Healing Buddy..."
                    value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                    rows={5}
                  />
                </div>
                {errors.message && <span className="ca__error">{errors.message}</span>}
              </div>

              {/* Info note */}
              <div className="ca__note">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Your request will be reviewed by the administrator. Once approved, you'll receive your Doctor ID and password at the email you provided.
              </div>

              <div className="ca__actions">
                <button type="submit" className="ca__btn" disabled={loading}>
                  {loading
                    ? <><span className="ca__spinner" /> Sending…</>
                    : <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        Send Message
                      </>
                  }
                </button>
              </div>

            </form>
          </>
        ) : (
          <div className="ca__success">
            <div className="ca__success-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className="ca__success-title">Message Sent Successfully!</h2>
            <p className="ca__success-sub">
              Your request has been sent to the administrator. They will review it and send your credentials to <strong>{form.email}</strong>.
            </p>
            <div className="ca__success-steps">
              {['Request received by admin', 'Admin reviews your details', 'Credentials sent to your email'].map((s, i) => (
                <div key={s} className="ca__success-step">
                  <div className="ca__success-step-num">{i + 1}</div>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <button className="ca__btn" onClick={() => window.location.href = '/signup'}>
              Back to Sign In
            </button>
          </div>
        )}

      </main>
    </div>
  )
}

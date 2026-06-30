import { useState, useRef } from 'react'
import './DoctorApplyPage.css'
import BASE_URL from '../api'

const SPECIALTIES = [
  'General Doctor',
  'Chronic Diseases',
  'Therapy',
]

export default function DoctorApplyPage() {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    specialty: '', licenseNumber: '', yearsExp: '',
    bio: '', cv: null, degree: null,
  })
  const [avatar, setAvatar]               = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [errors, setErrors]               = useState({})
  const [loading, setLoading]             = useState(false)
  const [submitted, setSubmitted]         = useState(false)
  const avatarRef                         = useRef()

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setAvatar(file)
    setAvatarPreview(URL.createObjectURL(file))
    setErrors(er => ({ ...er, avatar: '' }))
  }

  function validate() {
    const e = {}
    if (!avatar)                         e.avatar        = 'Profile photo is required'
    if (!form.fullName.trim())           e.fullName      = 'Full name is required'
    if (!form.email.trim())              e.email         = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.phone.trim())              e.phone         = 'Phone number is required'
    if (!form.specialty)                 e.specialty     = 'Please select a specialty'
    if (!form.licenseNumber.trim())      e.licenseNumber = 'License number is required'
    if (!form.yearsExp)                  e.yearsExp      = 'Years of experience is required'
    if (!form.cv)                        e.cv            = 'CV / Resume is required'
    if (!form.degree)                    e.degree        = 'Medical degree certificate is required'
    if (!form.bio.trim())                e.bio           = 'Brief introduction is required'
    return e
  }

  function getInitials(name) {
    return name.trim().split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('').toUpperCase()
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('full_name',           form.fullName)
      fd.append('email',               form.email)
      fd.append('phone_number',        form.phone)
      fd.append('medical_specialty',   form.specialty)
      fd.append('medical_license_no',  form.licenseNumber)
      fd.append('years_of_experience', form.yearsExp)
      fd.append('brief_introduction',  form.bio)
      fd.append('avatar',              avatar)
      fd.append('cv',                  form.cv)
      fd.append('degree',              form.degree)
      const res = await fetch(`${BASE_URL}/doctor-requests`, { method: 'POST', body: fd })
      if (!res.ok) {
        const err = await res.json()
        setErrors({ email: err.message ?? 'Submission failed, please try again' })
        return
      }
      setSubmitted(true)
    } catch {
      setErrors({ email: 'Server error, please try again' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="apply">
        <div className="apply__card apply__card--success">
          <div className="apply__success-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2 className="apply__success-title">Application Submitted!</h2>
          <p className="apply__success-sub">
            Thank you, <strong>{form.fullName}</strong>. Your application has been received.
            Our admin team will review it and reach out to you at <strong>{form.email}</strong> within 2–3 business days.
          </p>
          <button className="apply__btn" onClick={() => window.location.href = '/'}>Back to Home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="apply">
      <div className="apply__card">

        {/* Header */}
        <div className="apply__card-header">
          <span className="apply__badge">DOCTOR APPLICATION</span>
          <h2 className="apply__title">Apply to Join</h2>
          <p className="apply__subtitle">Fill in your details and our team will review your application</p>
        </div>

        <form className="apply__form" onSubmit={handleSubmit} noValidate>

          {/* ── Personal Info ── */}
          <div className="apply__section">
            <p className="apply__section-title">Personal Information</p>

            <div className="apply__row">
              <div className="apply__field">
                <label className="apply__label">Full Name</label>
                <div className={`apply__input-wrap ${errors.fullName ? 'apply__input-wrap--error' : ''}`}>
                  <svg className="apply__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input className="apply__input" type="text" placeholder="Dr. First Last"
                    value={form.fullName} onChange={e => set('fullName', e.target.value)} />
                </div>
                {errors.fullName && <span className="apply__error">{errors.fullName}</span>}
              </div>

              <div className="apply__field">
                <label className="apply__label">Email Address</label>
                <div className={`apply__input-wrap ${errors.email ? 'apply__input-wrap--error' : ''}`}>
                  <svg className="apply__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <input className="apply__input" type="email" placeholder="doctor@email.com"
                    value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                {errors.email && <span className="apply__error">{errors.email}</span>}
              </div>
            </div>

            <div className="apply__row">
              <div className="apply__field">
                <label className="apply__label">Phone Number</label>
                <div className={`apply__input-wrap ${errors.phone ? 'apply__input-wrap--error' : ''}`}>
                  <svg className="apply__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <input className="apply__input" type="tel" placeholder="+966 5X XXX XXXX"
                    value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
                {errors.phone && <span className="apply__error">{errors.phone}</span>}
              </div>

              <div className="apply__field">
                <label className="apply__label">Years of Experience</label>
                <div className={`apply__input-wrap ${errors.yearsExp ? 'apply__input-wrap--error' : ''}`}>
                  <svg className="apply__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <input className="apply__input" type="number" min="0" max="60" placeholder="e.g. 5"
                    value={form.yearsExp} onChange={e => set('yearsExp', e.target.value)} />
                </div>
                {errors.yearsExp && <span className="apply__error">{errors.yearsExp}</span>}
              </div>
            </div>

            {/* Avatar */}
            <div className="apply__row">
              <div className="apply__field">
                <label className="apply__label">Profile Photo</label>
                <label className={`apply__upload ${avatarPreview ? 'apply__upload--selected' : ''} ${errors.avatar ? 'apply__upload--error' : ''}`}>
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="preview" className="apply__avatar-thumb" />
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                  )}
                  <span>{avatar ? avatar.name : 'Upload your photo'}</span>
                  <input ref={avatarRef} type="file" accept="image/*" className="apply__file-input" onChange={handleAvatarChange} />
                </label>
                {errors.avatar && <span className="apply__error">{errors.avatar}</span>}
              </div>
            </div>
          </div>

          {/* ── Professional Info ── */}
          <div className="apply__section">
            <p className="apply__section-title">Professional Information</p>

            <div className="apply__row">
              <div className="apply__field">
                <label className="apply__label">Medical Specialty</label>
                <div className={`apply__input-wrap apply__input-wrap--select ${errors.specialty ? 'apply__input-wrap--error' : ''}`}>
                  <svg className="apply__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                  <select className="apply__select" value={form.specialty} onChange={e => set('specialty', e.target.value)}>
                    <option value="">Select specialty…</option>
                    {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {errors.specialty && <span className="apply__error">{errors.specialty}</span>}
              </div>

              <div className="apply__field">
                <label className="apply__label">Medical License No.</label>
                <div className={`apply__input-wrap ${errors.licenseNumber ? 'apply__input-wrap--error' : ''}`}>
                  <svg className="apply__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/>
                  </svg>
                  <input className="apply__input" type="text" placeholder="e.g. MD-123456"
                    value={form.licenseNumber} onChange={e => set('licenseNumber', e.target.value)} />
                </div>
                {errors.licenseNumber && <span className="apply__error">{errors.licenseNumber}</span>}
              </div>
            </div>

            <div className="apply__field">
              <label className="apply__label">Brief Introduction</label>
              <div className={`apply__input-wrap apply__input-wrap--textarea ${errors.bio ? 'apply__input-wrap--error' : ''}`}>
                <textarea className="apply__textarea" rows={3}
                  placeholder="Tell us about your background, experience, and why you want to join Healing Buddy…"
                  value={form.bio} onChange={e => set('bio', e.target.value)} />
              </div>
              {errors.bio && <span className="apply__error">{errors.bio}</span>}
            </div>
          </div>

          {/* ── Documents ── */}
          <div className="apply__section">
            <p className="apply__section-title">Documents</p>

            <div className="apply__row">
              <div className="apply__field">
                <label className="apply__label">CV / Resume</label>
                <label className={`apply__upload ${form.cv ? 'apply__upload--selected' : ''} ${errors.cv ? 'apply__upload--error' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <span>{form.cv ? form.cv.name : 'Upload PDF or DOC'}</span>
                  <input type="file" accept=".pdf,.doc,.docx" className="apply__file-input"
                    onChange={e => set('cv', e.target.files[0] || null)} />
                </label>
                {errors.cv && <span className="apply__error">{errors.cv}</span>}
              </div>

              <div className="apply__field">
                <label className="apply__label">Medical Degree Certificate</label>
                <label className={`apply__upload ${form.degree ? 'apply__upload--selected' : ''} ${errors.degree ? 'apply__upload--error' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                  <span>{form.degree ? form.degree.name : 'Upload PDF or Image'}</span>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="apply__file-input"
                    onChange={e => set('degree', e.target.files[0] || null)} />
                </label>
                {errors.degree && <span className="apply__error">{errors.degree}</span>}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="apply__btn" disabled={loading}>
            {loading ? 'Submitting…' : 'Submit Application'}
          </button>

          <p className="apply__hint">
            Already have an account?{' '}
            <span className="apply__hint-em" onClick={() => window.location.href = '/signup'}>
              Sign in here.
            </span>
          </p>

        </form>
      </div>
    </div>
  )
}

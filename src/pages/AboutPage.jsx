import logo from '../assets/logo.png'
import './AboutPage.css'

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Patient Management',
    desc: 'View full patient profiles, track health conditions, monitor daily emotional states, and access complete session history — all in one place.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Seamless Communication',
    desc: 'Connect with patients and their families through text chat, voice calls, and video sessions — all secured and built directly into the portal.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: 'Smart Scheduling',
    desc: 'Schedule and manage appointments with ease. Keep track of upcoming sessions and never miss a follow-up with your patients.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: 'Session Notes & Records',
    desc: 'Write and save clinical notes after every session. Build a detailed record of each patient\'s journey and treatment progress over time.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Emotional Tracking',
    desc: 'Patients log their daily mood and notes through the app. Doctors can review weekly emotional summaries to understand patient wellbeing between sessions.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'Secure & Private',
    desc: 'Built with confidentiality at its core. Access is controlled by admin approval — every doctor\'s credentials are verified before entry.',
  },
]

const steps = [
  { num: '01', title: 'Admin Approves', desc: 'The clinic admin reviews and approves the doctor\'s account, then sends credentials via email.' },
  { num: '02', title: 'Doctor Signs In', desc: 'Using the provided Doctor ID and password, the doctor securely logs in to the portal.' },
  { num: '03', title: 'Manage & Connect', desc: 'The doctor accesses patient profiles, schedules sessions, communicates, and tracks progress.' },
  { num: '04', title: 'Continuous Care', desc: 'Session notes, emotional tracking, and follow-ups ensure uninterrupted, high-quality care.' },
]

export default function AboutPage() {
  return (
    <div className="about">

      {/* Nav */}
      <header className="about__nav">
        <a href="/" className="about__logo">
          <img src={logo} alt="Healing Buddy" className="about__logo-img" />
          <span className="about__brand">Healing Buddy</span>
        </a>
        <button className="about__signin-btn" onClick={() => window.location.href = '/signup'}>Sign In</button>
      </header>

      {/* Hero */}
      <section className="about__hero">
        <div className="about__hero-orb about__hero-orb--1" />
        <div className="about__hero-orb about__hero-orb--2" />
        <span className="about__hero-badge">ABOUT HEALING BUDDY</span>
        <h1 className="about__hero-title">
          Compassionate Care,<br />
          <span className="about__hero-highlight">Digitally Delivered</span>
        </h1>
        <p className="about__hero-sub">
          Healing Buddy is a secure platform designed to support people living with chronic diseases —
          helping them follow their healing journey, stay connected with their support network,
          and access the tools they need to improve their health and quality of life.
        </p>
        <button className="about__cta-btn" onClick={() => window.location.href = '/signup'}>
          Get Started
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </section>

      {/* Mission */}
      <section className="about__mission">
        <div className="about__mission-inner">
          <div className="about__mission-text">
            <span className="about__section-tag">OUR MISSION</span>
            <h2 className="about__section-title">Because no one faces illness alone</h2>
            <p className="about__section-body">
              Living with a chronic disease is a long journey — and it shouldn't be a lonely one.
              Healing Buddy was built to keep patients and their care team closely connected,
              from the first diagnosis to every follow-up along the way.
            </p>
            <p className="about__section-body">
              Patients can track how they feel, communicate with their doctor, and manage their
              care — all in one safe and supportive space. Doctors get a full picture of each
              patient's progress without the friction of scattered systems.
            </p>
          </div>
          <div className="about__mission-visual">
            <div className="about__mission-card about__mission-card--1">
              <span className="about__mission-card-num">500+</span>
              <span className="about__mission-card-label">Doctors using the platform</span>
            </div>
            <div className="about__mission-card about__mission-card--2">
              <span className="about__mission-card-num">10k+</span>
              <span className="about__mission-card-label">Patients supported</span>
            </div>
            <div className="about__mission-card about__mission-card--3">
              <span className="about__mission-card-num">98%</span>
              <span className="about__mission-card-label">Doctor satisfaction rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="about__features">
        <span className="about__section-tag">WHAT WE OFFER</span>
        <h2 className="about__section-title">Everything a doctor needs</h2>
        <p className="about__features-sub">A complete toolkit for managing patient care — from first session to long-term follow-up.</p>
        <div className="about__features-grid">
          {features.map((f, i) => (
            <div key={i} className="about__feature-card">
              <div className="about__feature-icon">{f.icon}</div>
              <h3 className="about__feature-title">{f.title}</h3>
              <p className="about__feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="about__how">
        <span className="about__section-tag">HOW IT WORKS</span>
        <h2 className="about__section-title">Simple from day one</h2>
        <div className="about__steps">
          {steps.map((s, i) => (
            <div key={i} className="about__step">
              <div className="about__step-num">{s.num}</div>
              <div className="about__step-content">
                <h3 className="about__step-title">{s.title}</h3>
                <p className="about__step-desc">{s.desc}</p>
              </div>
              {i < steps.length - 1 && <div className="about__step-line" />}
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="about__banner">
        <div className="about__banner-inner">
          <h2 className="about__banner-title">Ready to join Healing Buddy?</h2>
          <p className="about__banner-sub">Request access from your administrator and start delivering better care today.</p>
          <div className="about__banner-actions">
            <button className="about__banner-btn about__banner-btn--primary" onClick={() => window.location.href = '/signup'}>Sign In</button>
            <button className="about__banner-btn about__banner-btn--outline" onClick={() => window.location.href = '/contact-admin'}>Request Access</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about__footer">
        <a href="/" className="about__logo">
          <img src={logo} alt="Healing Buddy" className="about__logo-img" />
          <span className="about__brand">Healing Buddy</span>
        </a>
        <p className="about__footer-copy">© 2026 Healing Buddy. All rights reserved.</p>
      </footer>

    </div>
  )
}

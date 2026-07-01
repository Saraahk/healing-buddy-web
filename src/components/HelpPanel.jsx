import { useState } from 'react'
import { INITIAL_FAQS, INITIAL_QUICK_LINKS } from '../data/helpContent'
import './HelpPanel.css'

const faqs        = INITIAL_FAQS
const quickLinks  = INITIAL_QUICK_LINKS

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`help-faq__item ${open ? 'help-faq__item--open' : ''}`}>
      <button className="help-faq__question" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <svg className="help-faq__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open
            ? <polyline points="18 15 12 9 6 15" />
            : <polyline points="6 9 12 15 18 9" />}
        </svg>
      </button>
      {open && <p className="help-faq__answer">{a}</p>}
    </div>
  )
}

export default function HelpPanel() {
  const [search, setSearch] = useState('')

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="help">

      {/* Header */}
      <div className="help__header">
        <div className="help__header-text">
          <h1 className="help__title">Help Centre</h1>
          <p className="help__subtitle">Find answers to common questions or reach out to support</p>
        </div>
        <div className="help__search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="help__search"
            placeholder="Search for help..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Quick links */}
      <div className="help__quick">
        {quickLinks.map(({ id, label }) => (
          <div key={id} className="help__quick-card" onClick={() => setSearch(label.split(' ')[0])}>
            <div className="help__quick-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
            </div>
            <span className="help__quick-label">{label}</span>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="help__faq-section">
        <h2 className="help__faq-title">Frequently Asked Questions</h2>
        <div className="help-faq">
          {filtered.length > 0
            ? filtered.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)
            : <p className="help__empty">No results found for "{search}"</p>
          }
        </div>
      </div>

      {/* Contact card */}
      <div className="help__contact-card">
        <div className="help__contact-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
        <div className="help__contact-text">
          <p className="help__contact-title">Still need help?</p>
          <p className="help__contact-sub">Contact your administrator and they'll get back to you as soon as possible.</p>
        </div>
        <button className="help__contact-btn" onClick={() => window.location.href = '/contact-admin'}>
          Contact Admin
        </button>
      </div>

    </div>
  )
}

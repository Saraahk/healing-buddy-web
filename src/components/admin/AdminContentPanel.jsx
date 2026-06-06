import { useState } from 'react'
import { INITIAL_FAQS, INITIAL_QUICK_LINKS } from '../../data/helpContent'
import './AdminContentPanel.css'

const AUDIENCE_OPTIONS = [
  { id: 'healing_buddy', label: 'Healing Buddy', color: '#6366f1', bg: '#ede9fe' },
  { id: 'doctor',        label: 'Doctor',         color: '#16a34a', bg: '#dcfce7' },
  { id: 'family',        label: 'Family',          color: '#d97706', bg: '#fef3c7' },
  { id: 'patient',       label: 'Patient',         color: '#0891b2', bg: '#cffafe' },
]

const INITIAL_ANNOUNCEMENTS = [
  { id:1, title:'Platform Maintenance Notice',       body:'The platform will undergo scheduled maintenance on June 5th from 2:00 AM to 4:00 AM. Please save your work beforehand.', date:'May 28, 2025', status:'sent',  audience:['doctor','patient'] },
  { id:2, title:'New Feature: Session Notes Export', body:'You can now export your session notes as PDF from the Sessions section. Look for the Export button in the top-right corner.',  date:'May 20, 2025', status:'sent',  audience:['doctor'] },
  { id:3, title:'Reminder: Update Your Profile',     body:'Please ensure your profile information is up to date, especially your email address, so you can receive important notifications.', date:'Draft', status:'draft', audience:[] },
]

/* ── FAQ Tab ── */
function FAQTab() {
  const [faqs, setFaqs]       = useState(INITIAL_FAQS)
  const [editId, setEditId]   = useState(null)
  const [editQ, setEditQ]     = useState('')
  const [editA, setEditA]     = useState('')
  const [adding, setAdding]   = useState(false)
  const [newQ, setNewQ]       = useState('')
  const [newA, setNewA]       = useState('')
  const [saved, setSaved]     = useState(false)

  function startEdit(faq) {
    setEditId(faq.id); setEditQ(faq.q); setEditA(faq.a)
  }

  function saveEdit() {
    setFaqs(prev => prev.map(f => f.id === editId ? { ...f, q: editQ, a: editA } : f))
    setEditId(null)
    flash()
  }

  function del(id) {
    setFaqs(prev => prev.filter(f => f.id !== id))
    flash()
  }

  function addNew() {
    if (!newQ.trim() || !newA.trim()) return
    setFaqs(prev => [...prev, { id: Date.now(), q: newQ.trim(), a: newA.trim() }])
    setNewQ(''); setNewA(''); setAdding(false)
    flash()
  }

  function move(id, dir) {
    setFaqs(prev => {
      const idx = prev.findIndex(f => f.id === id)
      const next = [...prev]
      const swap = idx + dir
      if (swap < 0 || swap >= next.length) return prev;
      [next[idx], next[swap]] = [next[swap], next[idx]]
      return next
    })
  }

  function flash() { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="ac-tab">
      <div className="ac-tab__header">
        <div>
          <p className="ac-tab__desc">These questions appear in the Doctor Help Centre. Changes reflect immediately.</p>
        </div>
        <div className="ac-tab__header-right">
          {saved && <span className="ac-saved">✓ Saved</span>}
          <button className="ac-add-btn" onClick={() => setAdding(true)}>+ Add Question</button>
        </div>
      </div>

      {adding && (
        <div className="ac-new-card">
          <input className="ac-input" placeholder="Question" value={newQ} onChange={e => setNewQ(e.target.value)} />
          <textarea className="ac-textarea" placeholder="Answer" value={newA} onChange={e => setNewA(e.target.value)} rows={3} />
          <div className="ac-new-actions">
            <button className="ac-btn ac-btn--save" onClick={addNew}>Add</button>
            <button className="ac-btn ac-btn--cancel" onClick={() => { setAdding(false); setNewQ(''); setNewA('') }}>Cancel</button>
          </div>
        </div>
      )}

      <div className="ac-list">
        {faqs.map((f, i) => (
          <div key={f.id} className="ac-faq-card">
            {editId === f.id ? (
              <div className="ac-edit-form">
                <input className="ac-input" value={editQ} onChange={e => setEditQ(e.target.value)} />
                <textarea className="ac-textarea" value={editA} onChange={e => setEditA(e.target.value)} rows={3} />
                <div className="ac-new-actions">
                  <button className="ac-btn ac-btn--save" onClick={saveEdit}>Save</button>
                  <button className="ac-btn ac-btn--cancel" onClick={() => setEditId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="ac-faq-body">
                  <div className="ac-faq-order">
                    <button className="ac-order-btn" onClick={() => move(f.id, -1)} disabled={i === 0}>▲</button>
                    <span className="ac-faq-num">{i + 1}</span>
                    <button className="ac-order-btn" onClick={() => move(f.id, 1)} disabled={i === faqs.length - 1}>▼</button>
                  </div>
                  <div className="ac-faq-content">
                    <p className="ac-faq-q">{f.q}</p>
                    <p className="ac-faq-a">{f.a}</p>
                  </div>
                </div>
                <div className="ac-faq-actions">
                  <button className="ac-icon-btn ac-icon-btn--edit" onClick={() => startEdit(f)} title="Edit">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button className="ac-icon-btn ac-icon-btn--del" onClick={() => del(f.id)} title="Delete">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Quick Links Tab ── */
function QuickLinksTab() {
  const [links, setLinks]     = useState(INITIAL_QUICK_LINKS)
  const [editId, setEditId]   = useState(null)
  const [editLabel, setEdit]  = useState('')
  const [adding, setAdding]   = useState(false)
  const [newLabel, setNew]    = useState('')
  const [saved, setSaved]     = useState(false)

  function flash() { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  function saveEdit() {
    setLinks(prev => prev.map(l => l.id === editId ? { ...l, label: editLabel } : l))
    setEditId(null); flash()
  }

  function del(id) { setLinks(prev => prev.filter(l => l.id !== id)); flash() }

  function addNew() {
    if (!newLabel.trim()) return
    setLinks(prev => [...prev, { id: Date.now(), label: newLabel.trim() }])
    setNew(''); setAdding(false); flash()
  }

  return (
    <div className="ac-tab">
      <div className="ac-tab__header">
        <p className="ac-tab__desc">These shortcuts appear at the top of the Doctor Help Centre.</p>
        <div className="ac-tab__header-right">
          {saved && <span className="ac-saved">✓ Saved</span>}
          {links.length < 6 && <button className="ac-add-btn" onClick={() => setAdding(true)}>+ Add Link</button>}
        </div>
      </div>

      {adding && (
        <div className="ac-new-card">
          <input className="ac-input" placeholder="Link label (e.g. Video Calls)" value={newLabel} onChange={e => setNew(e.target.value)} />
          <div className="ac-new-actions">
            <button className="ac-btn ac-btn--save" onClick={addNew}>Add</button>
            <button className="ac-btn ac-btn--cancel" onClick={() => { setAdding(false); setNew('') }}>Cancel</button>
          </div>
        </div>
      )}

      <div className="ac-links-grid">
        {links.map(l => (
          <div key={l.id} className="ac-link-card">
            {editId === l.id ? (
              <div className="ac-edit-inline">
                <input className="ac-input" value={editLabel} onChange={e => setEdit(e.target.value)} autoFocus />
                <div className="ac-new-actions">
                  <button className="ac-btn ac-btn--save" onClick={saveEdit}>Save</button>
                  <button className="ac-btn ac-btn--cancel" onClick={() => setEditId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="ac-link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                  </svg>
                </div>
                <span className="ac-link-label">{l.label}</span>
                <div className="ac-link-actions">
                  <button className="ac-icon-btn ac-icon-btn--edit" onClick={() => { setEditId(l.id); setEdit(l.label) }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button className="ac-icon-btn ac-icon-btn--del" onClick={() => del(l.id)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Announcements Tab ── */
function AnnouncementsTab() {
  const [items, setItems]       = useState(INITIAL_ANNOUNCEMENTS)
  const [adding, setAdding]     = useState(false)
  const [newT, setNewT]         = useState('')
  const [newB, setNewB]         = useState('')
  const [newAud, setNewAud]     = useState([])
  const [sent, setSent]         = useState(null)
  const [audErr, setAudErr]     = useState(false)

  function toggleAud(id) {
    setAudErr(false)
    setNewAud(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  }

  function send(id) {
    setItems(prev => prev.map(a => a.id === id ? { ...a, status: 'sent', date: 'Just now' } : a))
    setSent(id); setTimeout(() => setSent(null), 2500)
  }

  function del(id) { setItems(prev => prev.filter(a => a.id !== id)) }

  function addDraft() {
    if (!newT.trim() || !newB.trim()) return
    if (newAud.length === 0) { setAudErr(true); return }
    setItems(prev => [...prev, { id: Date.now(), title: newT.trim(), body: newB.trim(), date: 'Draft', status: 'draft', audience: newAud }])
    setNewT(''); setNewB(''); setNewAud([]); setAdding(false); setAudErr(false)
  }

  function sendNow() {
    if (!newT.trim() || !newB.trim()) return
    if (newAud.length === 0) { setAudErr(true); return }
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    setItems(prev => [...prev, { id: Date.now(), title: newT.trim(), body: newB.trim(), date: now, status: 'sent', audience: newAud }])
    setNewT(''); setNewB(''); setNewAud([]); setAdding(false); setAudErr(false)
  }

  function cancel() { setAdding(false); setNewT(''); setNewB(''); setNewAud([]); setAudErr(false) }

  function getSendLabel(id) {
    const item = items.find(a => a.id === id)
    if (!item || item.audience.length === 0) return 'Send'
    const names = item.audience.map(aid => AUDIENCE_OPTIONS.find(o => o.id === aid)?.label).filter(Boolean)
    return sent === id ? '✓ Sent!' : `Send to ${names.join(', ')}`
  }

  return (
    <div className="ac-tab">
      <div className="ac-tab__header">
        <p className="ac-tab__desc">Send platform announcements to selected user groups. They will appear as notifications.</p>
        <div className="ac-tab__header-right">
          <button className="ac-add-btn" onClick={() => setAdding(true)}>+ New Announcement</button>
        </div>
      </div>

      {adding && (
        <div className="ac-new-card ac-new-card--announce">
          <button className="ac-new-card__close" onClick={cancel} aria-label="Close">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <input className="ac-input" placeholder="Title" value={newT} onChange={e => setNewT(e.target.value)} />
          <textarea className="ac-textarea" placeholder="Message body..." value={newB} onChange={e => setNewB(e.target.value)} rows={3} />

          <div className="ac-audience">
            <span className="ac-audience__label">Send to</span>
            <div className="ac-audience__chips">
              {AUDIENCE_OPTIONS.map(o => (
                <button
                  key={o.id}
                  type="button"
                  className={`ac-chip ${newAud.includes(o.id) ? 'ac-chip--active' : ''}`}
                  style={newAud.includes(o.id) ? { borderColor: o.color, color: o.color, background: o.bg } : {}}
                  onClick={() => toggleAud(o.id)}
                >
                  <span className="ac-chip__dot" style={{ background: newAud.includes(o.id) ? o.color : '#d1d5db' }} />
                  {o.label}
                </button>
              ))}
            </div>
            {audErr && <span style={{ fontSize: '12px', color: '#ef4444' }}>Please select at least one audience.</span>}
          </div>

          <div className="ac-new-actions">
            <button className="ac-btn ac-btn--send" onClick={sendNow}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Send Now
            </button>
            <button className="ac-btn ac-btn--draft" onClick={addDraft}>Save as Draft</button>
          </div>
        </div>
      )}

      <div className="ac-list">
        {items.map(a => (
          <div key={a.id} className={`ac-ann-card ${a.status === 'draft' ? 'ac-ann-card--draft' : ''}`}>
            <div className="ac-ann-body">
              <div className="ac-ann-top">
                <p className="ac-ann-title">{a.title}</p>
                <span className={`ac-ann-status ${a.status === 'sent' ? 'ac-ann-status--sent' : 'ac-ann-status--draft'}`}>
                  {a.status === 'sent' ? '✓ Sent' : 'Draft'}
                </span>
              </div>
              <p className="ac-ann-text">{a.body}</p>
              {a.audience && a.audience.length > 0 && (
                <div className="ac-ann-audience">
                  {a.audience.map(aid => {
                    const opt = AUDIENCE_OPTIONS.find(o => o.id === aid)
                    return opt ? (
                      <span key={aid} className="ac-ann-tag" style={{ background: opt.bg, color: opt.color }}>
                        {opt.label}
                      </span>
                    ) : null
                  })}
                </div>
              )}
              <span className="ac-ann-date">{a.date}</span>
            </div>
            <div className="ac-ann-actions">
              {a.status === 'draft' && (
                <button className="ac-btn ac-btn--send" onClick={() => send(a.id)}>
                  {getSendLabel(a.id)}
                </button>
              )}
              <button className="ac-icon-btn ac-icon-btn--del" onClick={() => del(a.id)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Main Panel ── */
const TABS = [
  { id: 'faq',           label: 'FAQ',           desc: 'Help Centre questions' },
  { id: 'quicklinks',    label: 'Quick Links',    desc: 'Help Centre shortcuts' },
  { id: 'announcements', label: 'Announcements',  desc: 'Notify all doctors'    },
]

export default function AdminContentPanel() {
  const [tab, setTab] = useState('faq')

  return (
    <div className="admin-content">
      <div className="admin-content__tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`admin-content__tab ${tab === t.id ? 'admin-content__tab--active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span className="admin-content__tab-label">{t.label}</span>
            <span className="admin-content__tab-desc">{t.desc}</span>
          </button>
        ))}
      </div>

      <div className="admin-content__body">
        {tab === 'faq'           && <FAQTab />}
        {tab === 'quicklinks'    && <QuickLinksTab />}
        {tab === 'announcements' && <AnnouncementsTab />}
      </div>
    </div>
  )
}

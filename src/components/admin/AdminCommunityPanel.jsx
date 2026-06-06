import { useState } from 'react'
import './AdminCommunityPanel.css'

const POSTS = [
  { id:1,  author:'Fatima Al-Yusuf',   role:'Patient',        avatar:'FA', time:'2 hrs ago',  likes:24, comments:8,  status:'live',
    text:'Day 30 of my healing journey! My blood sugar has been stable for the past 2 weeks. Grateful for everyone\'s support. 🌱' },
  { id:2,  author:'Salma Nasser',       role:'Patient',        avatar:'SN', time:'4 hrs ago',  likes:12, comments:5,  status:'live',
    text:'Struggling a bit with fatigue today, but my Healing Buddy checked in and it really helped. Does anyone have tips for managing lupus flares?' },
  { id:3,  author:'Hana Yousef',        role:'Healing Buddy',  avatar:'HY', time:'Yesterday',  likes:31, comments:14, status:'live',
    text:'Reminder to all caregivers: sometimes the most powerful thing you can do is just listen. Your presence matters more than any advice.' },
  { id:4,  author:'Ibrahim Al-Mutairi', role:'Patient',        avatar:'IM', time:'Yesterday',  likes:9,  comments:3,  status:'reported',
    text:'Feeling much better after switching my medication schedule. My doctor adjusted the dosage and the difference is incredible.',
    reports: 3 },
  { id:5,  author:'Rania Al-Farsi',     role:'Patient',        avatar:'RA', time:'2 days ago', likes:18, comments:7,  status:'live',
    text:'Just uploaded my 3-month progress report. My lung function has improved by 15%! Small steps, big victories. 💪' },
  { id:6,  author:'Nasser Al-Qahtani', role:'Healing Buddy',   avatar:'NQ', time:'2 days ago', likes:6,  comments:2,  status:'live',
    text:'New to being a Healing Buddy here. Any tips for how to best support someone with chronic kidney disease?' },
  { id:7,  author:'Ahmed Salim',        role:'Patient',        avatar:'AS', time:'3 days ago', likes:22, comments:11, status:'live',
    text:'3 months on this platform and my blood pressure readings have never been so consistent. Thank you all for the support and accountability.' },
  { id:8,  author:'Unknown User',       role:'Patient',        avatar:'??', time:'3 days ago', likes:0,  comments:0,  status:'reported',
    text:'Check out this link for a miracle cure for all diseases!',
    reports: 7 },
  { id:9,  author:'Omar Al-Yusuf',      role:'Family Member',  avatar:'OA', time:'4 days ago', likes:15, comments:6,  status:'live',
    text:'My mother Fatima has been on this platform for 2 months and the difference in her mood and motivation is incredible. As a family, we feel so much more connected to her healing journey.' },
  { id:10, author:'Rana Salim',         role:'Family Member',  avatar:'RS', time:'5 days ago', likes:9,  comments:4,  status:'live',
    text:'Does anyone have experience as a family member supporting a loved one with hypertension? Would love to connect and share tips.' },
  { id:11, author:'Noura Mahmoud',      role:'Family Member',  avatar:'NM', time:'1 week ago', likes:3,  comments:1,  status:'live',
    text:'Just joined to support my father. Hoping to understand better what he is going through and how I can help from a distance.' },
]

const STATUS_CONFIG = {
  live:     { label: 'Live',     bg: '#dcfce7', color: '#16a34a' },
  reported: { label: 'Reported', bg: '#fee2e2', color: '#dc2626' },
}

const ROLE_COLORS = {
  Patient:         { bg: '#e0f2fe', color: '#0ea5e9' },
  'Healing Buddy': { bg: '#dcfce7', color: '#16a34a' },
  'Family Member': { bg: '#fef3c7', color: '#d97706' },
}

export default function AdminCommunityPanel() {
  const [posts, setPosts]   = useState(POSTS)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = posts.filter(p => {
    const matchF = filter === 'all' || p.status === filter
    const matchS = p.author.toLowerCase().includes(search.toLowerCase()) ||
                   p.text.toLowerCase().includes(search.toLowerCase())
    return matchF && matchS
  })

  function keep(id) {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: 'live', reports: 0 } : p))
  }

  function remove(id) {
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  const counts = {
    all:      posts.length,
    reported: posts.filter(p => p.status === 'reported').length,
    live:     posts.filter(p => p.status === 'live').length,
  }

  return (
    <div className="admin-community">
      <div className="admin-community__toolbar">
        <div className="admin-community__search-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="admin-community__search"
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="admin-community__filters">
          {[['all','All'], ['reported','Reported'], ['live','Live']].map(([f, l]) => (
            <button
              key={f}
              className={`admin-community__filter-btn admin-community__filter-btn--${f} ${filter === f ? 'admin-community__filter-btn--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {l}
              {counts[f] > 0 && <span className="admin-community__filter-count">{counts[f]}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-community__list">
        {filtered.map(p => {
          const sc = STATUS_CONFIG[p.status]
          const rc = ROLE_COLORS[p.role] ?? { bg: '#f3f4f6', color: '#6b7280' }
          return (
            <div key={p.id} className={`admin-community__card ${p.status === 'reported' ? 'admin-community__card--reported' : ''}`}>
              <div className="admin-community__card-header">
                <div className="admin-community__author">
                  <div className="admin-community__avatar">{p.avatar}</div>
                  <div>
                    <p className="admin-community__author-name">{p.author}</p>
                    <div className="admin-community__author-meta">
                      <span className="admin-community__role-badge" style={{ background: rc.bg, color: rc.color }}>{p.role}</span>
                      <span className="admin-community__time">{p.time}</span>
                    </div>
                  </div>
                </div>
                <div className="admin-community__header-right">
                  {p.status === 'reported' && p.reports && (
                    <span className="admin-community__report-count">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      {p.reports} reports
                    </span>
                  )}
                  <span className="admin-community__status-badge" style={{ background: sc.bg, color: sc.color }}>
                    {sc.label}
                  </span>
                </div>
              </div>

              <p className="admin-community__text">{p.text}</p>

              <div className="admin-community__card-footer">
                <div className="admin-community__stats">
                  <span className="admin-community__stat">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    {p.likes}
                  </span>
                  <span className="admin-community__stat">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    {p.comments}
                  </span>
                </div>
                <div className="admin-community__actions">
                  {p.status === 'reported' && (
                    <button className="admin-community__btn admin-community__btn--keep" onClick={() => keep(p.id)}>Keep Post</button>
                  )}
                  <button className="admin-community__btn admin-community__btn--remove" onClick={() => remove(p.id)}>Remove</button>
                </div>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="admin-community__empty">No posts found.</div>
        )}
      </div>
    </div>
  )
}

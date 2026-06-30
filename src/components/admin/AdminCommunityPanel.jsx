import { useState, useEffect } from 'react'
import './AdminCommunityPanel.css'
import BASE_URL from '../../api'

const STATUS_CONFIG = {
  live:     { label: 'Live',     bg: '#dcfce7', color: '#16a34a' },
  reported: { label: 'Reported', bg: '#fee2e2', color: '#dc2626' },
}

const ROLE_COLORS = {
  Patient:         { bg: '#e0f2fe', color: '#0ea5e9' },
  'Healing Buddy': { bg: '#dcfce7', color: '#16a34a' },
  'Family Member': { bg: '#fef3c7', color: '#d97706' },
  Doctor:          { bg: '#ede9fe', color: '#6366f1' },
}

function mapPost(p) {
  const now = new Date()
  const posted = new Date(p.posted_at)
  const diffMs = now - posted
  const diffH = Math.floor(diffMs / 3600000)
  const diffD = Math.floor(diffMs / 86400000)
  let time
  if (diffH < 1)       time = 'Just now'
  else if (diffH < 24) time = `${diffH} hr${diffH > 1 ? 's' : ''} ago`
  else if (diffD === 1) time = 'Yesterday'
  else if (diffD < 7)  time = `${diffD} days ago`
  else                 time = `${Math.floor(diffD / 7)} week${Math.floor(diffD / 7) > 1 ? 's' : ''} ago`

  const roleName = p.author_role_at_time === 'HealingBuddy' ? 'Healing Buddy'
                 : p.author_role_at_time === 'FamilyMember' ? 'Family Member'
                 : p.author_role_at_time

  return {
    id:       p.id,
    author:   p.author?.full_name ?? 'Unknown',
    role:     roleName,
    avatar:   (p.author?.full_name ?? '?').split(' ').map(n => n[0]).join('').slice(0, 2),
    time,
    likes:    p.likes_count,
    comments: p.comments_count,
    status:   p.is_reported ? 'reported' : 'live',
    reports:  p.reports_count,
    text:     p.content,
  }
}

export default function AdminCommunityPanel() {
  const [posts, setPosts]     = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('all')
  const [search, setSearch]   = useState('')

  useEffect(() => {
    fetch(`${BASE_URL}/community-posts`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setPosts(data.map(mapPost))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function keep(id) {
    await fetch(`${BASE_URL}/community-posts/${id}/keep`, { method: 'PATCH' })
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: 'live', reports: 0 } : p))
  }

  async function remove(id) {
    await fetch(`${BASE_URL}/community-posts/${id}`, { method: 'DELETE' })
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  const filtered = posts.filter(p => {
    const matchF = filter === 'all' || p.status === filter
    const matchS = p.author.toLowerCase().includes(search.toLowerCase()) ||
                   p.text.toLowerCase().includes(search.toLowerCase())
    return matchF && matchS
  })

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
          {[['all','All'], ['reported','Reported']].map(([f, l]) => (
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
        {loading && <div className="admin-community__empty">Loading posts...</div>}
        {!loading && filtered.map(p => {
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
                  {p.status === 'reported' && p.reports > 0 && (
                    <span className="admin-community__report-count">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      {p.reports} reports
                    </span>
                  )}
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
        {!loading && filtered.length === 0 && (
          <div className="admin-community__empty">No posts found.</div>
        )}
      </div>
    </div>
  )
}

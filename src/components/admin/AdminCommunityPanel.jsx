import { useState, useEffect } from 'react'
import './AdminCommunityPanel.css'
import BASE_URL from '../../api'

const ROLE_COLORS = {
  Patient:         { bg: '#e0f2fe', color: '#0ea5e9' },
  'Healing Buddy': { bg: '#dcfce7', color: '#16a34a' },
  'Family Member': { bg: '#fef3c7', color: '#d97706' },
  Doctor:          { bg: '#ede9fe', color: '#6366f1' },
}

function timeAgo(iso) {
  if (!iso) return '—'
  const now = new Date()
  const d = new Date(iso)
  const diffH = Math.floor((now - d) / 3600000)
  const diffD = Math.floor((now - d) / 86400000)
  if (diffH < 1)       return 'Just now'
  if (diffH < 24)      return `${diffH} hr${diffH > 1 ? 's' : ''} ago`
  if (diffD === 1)     return 'Yesterday'
  if (diffD < 7)       return `${diffD} days ago`
  return `${Math.floor(diffD / 7)} week${Math.floor(diffD / 7) > 1 ? 's' : ''} ago`
}

function mapPost(p) {
  const roleName = p.author_role_at_time === 'HealingBuddy' ? 'Healing Buddy'
                 : p.author_role_at_time === 'FamilyMember'  ? 'Family Member'
                 : p.author_role_at_time
  return {
    id:       p.id,
    author:   p.author?.full_name ?? 'Unknown',
    role:     roleName,
    avatar:   (p.author?.full_name ?? '?').split(' ').map(n => n[0]).join('').slice(0, 2),
    time:     timeAgo(p.posted_at),
    likes:    p.likes_count,
    comments: p.comments_count,
    status:   p.is_reported ? 'reported' : 'live',
    reports:  p.reports_count,
    text:     p.content,
  }
}

export default function AdminCommunityPanel() {
  const [tab, setTab]           = useState('all')
  const [posts, setPosts]       = useState([])
  const [reports, setReports]   = useState([])
  const [loadingP, setLoadingP] = useState(true)
  const [loadingR, setLoadingR] = useState(true)
  const [search, setSearch]     = useState('')

  useEffect(() => {
    fetch(`${BASE_URL}/community-posts`)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setPosts(d.map(mapPost)) })
      .catch(() => {})
      .finally(() => setLoadingP(false))

    fetch(`${BASE_URL}/community-post-reports`)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setReports(d) })
      .catch(() => {})
      .finally(() => setLoadingR(false))
  }, [])

  async function keep(id) {
    await fetch(`${BASE_URL}/community-posts/${id}/keep`, { method: 'PATCH' })
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: 'live', reports: 0 } : p))
    setReports(prev => prev.filter(r => r.post?.id !== id))
  }

  async function remove(id) {
    await fetch(`${BASE_URL}/community-posts/${id}`, { method: 'DELETE' })
    setPosts(prev => prev.filter(p => p.id !== id))
    setReports(prev => prev.filter(r => r.post?.id !== id))
  }

  const filteredPosts = posts.filter(p => {
    const matchTab = tab === 'all' || (tab === 'reported' && p.status === 'reported')
    const matchS = p.author.toLowerCase().includes(search.toLowerCase()) ||
                   p.text.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchS
  })

  const filteredReports = reports.filter(r => {
    const reason   = r.report_reason ?? ''
    const excerpt  = r.post?.content ?? ''
    const reporter = r.reporter?.full_name ?? ''
    return reporter.toLowerCase().includes(search.toLowerCase()) ||
           reason.toLowerCase().includes(search.toLowerCase()) ||
           excerpt.toLowerCase().includes(search.toLowerCase())
  })

  const counts = {
    all:      posts.length,
    reported: posts.filter(p => p.status === 'reported').length,
    reports:  reports.length,
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
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="admin-community__filters">
          {[['all','All Posts'], ['reported','Reported Posts'], ['reports','Reports']].map(([t, l]) => (
            <button
              key={t}
              className={`admin-community__filter-btn admin-community__filter-btn--${t} ${tab === t ? 'admin-community__filter-btn--active' : ''}`}
              onClick={() => { setTab(t); setSearch('') }}
            >
              {l}
              {counts[t] > 0 && <span className="admin-community__filter-count">{counts[t]}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* ── Posts view (All / Reported) ── */}
      {tab !== 'reports' && (
        <div className="admin-community__list">
          {loadingP && <div className="admin-community__empty">Loading posts…</div>}
          {!loadingP && filteredPosts.map(p => {
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
                        {p.reports} report{p.reports !== 1 ? 's' : ''}
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
          {!loadingP && filteredPosts.length === 0 && (
            <div className="admin-community__empty">No posts found.</div>
          )}
        </div>
      )}

      {/* ── Reports view ── */}
      {tab === 'reports' && (
        <div className="admin-community__list">
          {loadingR && <div className="admin-community__empty">Loading reports…</div>}
          {!loadingR && filteredReports.map(r => {
            const reporterRole = r.reporter?.role
            const normalRole = reporterRole === 'HealingBuddy' ? 'Healing Buddy'
                             : reporterRole === 'FamilyMember'  ? 'Family Member'
                             : reporterRole ?? ''
            const rc = ROLE_COLORS[normalRole] ?? { bg: '#f3f4f6', color: '#6b7280' }
            const excerpt = (r.post?.content ?? '').slice(0, 120) + ((r.post?.content ?? '').length > 120 ? '…' : '')
            const reporterInitials = (r.reporter?.full_name ?? '?').split(' ').map(n => n[0]).join('').slice(0, 2)

            return (
              <div key={r.id} className="admin-community__card admin-community__card--report-entry">
                {/* Reporter row */}
                <div className="admin-community__card-header">
                  <div className="admin-community__author">
                    <div className="admin-community__avatar admin-community__avatar--reporter">{reporterInitials}</div>
                    <div>
                      <p className="admin-community__author-name">{r.reporter?.full_name ?? 'Unknown'}</p>
                      <div className="admin-community__author-meta">
                        <span className="admin-community__role-badge" style={{ background: rc.bg, color: rc.color }}>{normalRole}</span>
                        <span className="admin-community__time">{timeAgo(r.reported_at)}</span>
                      </div>
                    </div>
                  </div>
                  <span className="admin-community__report-label">Reported</span>
                </div>

                {/* Reason */}
                <div className="admin-community__reason-box">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span>{r.report_reason ?? 'No reason given'}</span>
                </div>

                {/* Post excerpt */}
                {excerpt && (
                  <div className="admin-community__post-excerpt">
                    <span className="admin-community__excerpt-label">Post:</span>
                    <span className="admin-community__excerpt-text">{excerpt}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="admin-community__card-footer" style={{ justifyContent: 'flex-end' }}>
                  <div className="admin-community__actions">
                    <button className="admin-community__btn admin-community__btn--keep" onClick={() => keep(r.post?.id)}>Keep Post</button>
                    <button className="admin-community__btn admin-community__btn--remove" onClick={() => remove(r.post?.id)}>Remove Post</button>
                  </div>
                </div>
              </div>
            )
          })}
          {!loadingR && filteredReports.length === 0 && (
            <div className="admin-community__empty">No reports yet.</div>
          )}
        </div>
      )}
    </div>
  )
}

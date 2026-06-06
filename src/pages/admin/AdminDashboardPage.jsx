import { useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminTopBar from '../../components/admin/AdminTopBar'
import AdminHomePanel from '../../components/admin/AdminHomePanel'
import AdminUsersPanel from '../../components/admin/AdminUsersPanel'
import AdminApprovalsPanel from '../../components/admin/AdminApprovalsPanel'
import AdminCommunityPanel from '../../components/admin/AdminCommunityPanel'
import AdminAnalyticsPanel from '../../components/admin/AdminAnalyticsPanel'
import AdminContentPanel from '../../components/admin/AdminContentPanel'
import AdminMessagesPanel from '../../components/admin/AdminMessagesPanel'
import './AdminDashboardPage.css'

const pageTitles = {
  home:      'Overview',
  users:     'User Management',
  approvals: 'Approvals',
  community: 'Community',
  analytics: 'Analytics',
  content:   'Content Management',
  messages:  'Messages',
}

export default function AdminDashboardPage() {
  const [active, setActive]         = useState('home')
  const [pendingCount, setPending]  = useState(7)
  const [msgCount, setMsgCount]     = useState(3)

  const panels = {
    home:      <AdminHomePanel onNavigate={setActive} pendingCount={pendingCount} msgCount={msgCount} />,
    users:     <AdminUsersPanel />,
    approvals: <AdminApprovalsPanel onCountChange={setPending} />,
    community: <AdminCommunityPanel />,
    analytics: <AdminAnalyticsPanel />,
    content:   <AdminContentPanel />,
    messages:  <AdminMessagesPanel onRead={() => setMsgCount(0)} />,
  }

  return (
    <div className="admin-dashboard">
      {active !== 'messages' && (
        <AdminSidebar
          active={active}
          onNavigate={setActive}
          pendingCount={pendingCount}
          msgCount={msgCount}
        />
      )}
      <div className="admin-dashboard__content">
        <AdminTopBar title={pageTitles[active] ?? 'Overview'} onBack={active === 'messages' ? () => setActive('home') : null} />
        <main className="admin-dashboard__main">
          {panels[active] ?? null}
        </main>
      </div>
    </div>
  )
}

import { useState } from 'react'
import './AdminUserDetail.css'

/* ── Mock enriched data per user ── */
const PATIENT_DETAIL = {
  1: {
    email:'fatima@email.com', age:45, gender:'Female', phone:'+966 50 123 4567',
    condition:'Type 2 Diabetes', diagnosedSince:'2019', severity:'Moderate',
    joined:'Jan 20, 2025', lastActive:'Today',
    doctor:{ name:'Dr. Sara Al-Mansouri', specialty:'Chronic Disease Management' },
    healingBuddy:{ name:'Hana Yousef', relation:'Friend', checkIns:12 },
    family:[
      { name:'Omar Al-Yusuf', relation:'Son',    perms:['Notes','Progress','Mood'] },
      { name:'Layla Al-Yusuf',relation:'Daughter',perms:['Progress'] },
    ],
    stats:{ moodAvg:'7.4', notes:24, docs:6, months:5 },
    mood:[ { date:'Today',     score:8, note:'Feeling better after walk' },
           { date:'Yesterday', score:6, note:'Tired, but medication taken' },
           { date:'Jun 1',     score:7, note:'Blood sugar stable' },
           { date:'May 31',    score:5, note:'Headache in the evening' },
           { date:'May 30',    score:8, note:'Great day, low sugar reading' } ],
    docs:[ 'Blood Test Results - May 2025.pdf', 'HbA1c Report - April 2025.pdf', 'Kidney Function - March 2025.pdf' ],
  },
  2: {
    email:'ahmed.s@email.com', age:62, gender:'Male', phone:'+966 55 234 5678',
    condition:'Hypertension', diagnosedSince:'2015', severity:'High',
    joined:'Feb 4, 2025', lastActive:'Yesterday',
    doctor:{ name:'Dr. Khalid Hassan', specialty:'Therapy & Counseling' },
    healingBuddy:{ name:'Nasser Al-Qahtani', relation:'Neighbor', checkIns:8 },
    family:[ { name:'Rana Salim', relation:'Wife', perms:['Notes','Progress','Mood','Documents'] } ],
    stats:{ moodAvg:'6.1', notes:18, docs:4, months:4 },
    mood:[ { date:'Today',     score:5, note:'BP was high this morning' },
           { date:'Yesterday', score:6, note:'Rested well' },
           { date:'Jun 1',     score:7, note:'Medication adjusted' },
           { date:'May 31',    score:5, note:'Stressful day' },
           { date:'May 30',    score:7, note:'Walked 30 minutes' } ],
    docs:[ 'BP Readings Log - May 2025.pdf', 'ECG Report - April 2025.pdf' ],
  },
}

const DOCTOR_DETAIL = {
  1: {
    email:'sara@healingbuddy.com', specialty:'Chronic Disease Management',
    joined:'Jan 12, 2025', credentialsSent:'Jan 10, 2025', lastActive:'Today',
    patients:[
      { name:'Fatima Al-Yusuf', condition:'Type 2 Diabetes',       status:'stable',   since:'Jan 20, 2025' },
      { name:'Rania Al-Farsi',  condition:'Chronic Asthma',         status:'stable',   since:'Feb 18, 2025' },
      { name:'Khalid Al-Harbi', condition:'Type 2 Diabetes',        status:'improving',since:'Apr 22, 2025' },
    ],
    stats:{ sessions:47, notes:23, recommendations:12, avgRating:'4.8' },
  },
  2: {
    email:'khalid@healingbuddy.com', specialty:'Therapy & Counseling',
    joined:'Feb 3, 2025', credentialsSent:'Feb 1, 2025', lastActive:'Today',
    patients:[
      { name:'Ahmed Salim',  condition:'Hypertension',         status:'critical',  since:'Feb 4, 2025' },
      { name:'Noura Hassan', condition:'Rheumatoid Arthritis',  status:'stable',    since:'May 5, 2025' },
    ],
    stats:{ sessions:31, notes:14, recommendations:8, avgRating:'4.6' },
  },
}

const BUDDY_DETAIL = {
  1: {
    email:'hana.y@email.com', joined:'Jan 25, 2025', approvedBy:'Admin', lastActive:'Today',
    patients:[
      { name:'Fatima Al-Yusuf', condition:'Type 2 Diabetes',    doctor:'Dr. Sara',    relation:'Friend',   since:'Jan 25, 2025' },
      { name:'Salma Nasser',    condition:'Lupus',               doctor:'Dr. Hana Y.', relation:'Colleague',since:'Mar 10, 2025' },
    ],
    stats:{ checkIns:12, messages:47, responseRate:'98%', avgResponse:'< 1 hr' },
  },
  2: {
    email:'nasser@email.com', joined:'Feb 10, 2025', approvedBy:'Admin', lastActive:'Yesterday',
    patients:[
      { name:'Ahmed Salim', condition:'Hypertension', doctor:'Dr. Khalid', relation:'Neighbor', since:'Feb 10, 2025' },
    ],
    stats:{ checkIns:8, messages:23, responseRate:'91%', avgResponse:'2 hrs' },
  },
}

const FAMILY_DETAIL = {
  1: {
    email:'omar.y@email.com', joined:'Jan 22, 2025', lastActive:'3 days ago',
    patient:{ name:'Fatima Al-Yusuf', condition:'Type 2 Diabetes', relation:'Son' },
    perms:{ notes:true, progress:true, mood:true, documents:false },
  },
  2: {
    email:'rana@email.com', joined:'Feb 6, 2025', lastActive:'Today',
    patient:{ name:'Ahmed Salim', condition:'Hypertension', relation:'Wife' },
    perms:{ notes:true, progress:true, mood:true, documents:true },
  },
}

const FALLBACK_PATIENT = { email:'—', age:'—', gender:'—', phone:'—', condition:'—', diagnosedSince:'—', severity:'—', joined:'—', lastActive:'—', doctor:{ name:'—', specialty:'—' }, healingBuddy:null, family:[], stats:{ moodAvg:'—', notes:0, docs:0, months:0 }, mood:[], docs:[] }
const FALLBACK_DOCTOR  = { email:'—', specialty:'—', joined:'—', credentialsSent:'—', lastActive:'—', patients:[], stats:{ sessions:0, notes:0, recommendations:0, avgRating:'—' } }
const FALLBACK_BUDDY   = { email:'—', joined:'—', approvedBy:'—', lastActive:'—', patients:[], stats:{ checkIns:0, messages:0, responseRate:'—', avgResponse:'—' } }
const FALLBACK_FAMILY  = { email:'—', joined:'—', lastActive:'—', patient:{ name:'—', condition:'—', relation:'—' }, perms:{ notes:false, progress:false, mood:false, documents:false } }

const STATUS_COLORS = {
  stable:    { bg:'#dcfce7', color:'#16a34a' },
  critical:  { bg:'#fee2e2', color:'#dc2626' },
  improving: { bg:'#dbeafe', color:'#2563eb' },
  active:    { bg:'#dcfce7', color:'#16a34a' },
  inactive:  { bg:'#f3f4f6', color:'#6b7280' },
}

function ini(name) {
  return name.split(' ').filter(Boolean).slice(0,2).map(n => n[0]).join('')
}

function Section({ title, children }) {
  return (
    <div className="aud-section">
      <h3 className="aud-section__title">{title}</h3>
      <div className="aud-section__body">{children}</div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="aud-info-row">
      <span className="aud-info-label">{label}</span>
      <span className="aud-info-value">{value}</span>
    </div>
  )
}

function PermBadge({ label, granted }) {
  return (
    <span className={`aud-perm ${granted ? 'aud-perm--yes' : 'aud-perm--no'}`}>
      {granted ? '✓' : '✗'} {label}
    </span>
  )
}

/* ────────────────────────────── Patient ────────────────────────────── */
function PatientDetail({ user, d, onToggle }) {
  return (
    <>
      <div className="aud-stats-row">
        <div className="aud-stat-box" style={{ borderColor:'#bae6fd', background:'#f0f9ff' }}>
          <span className="aud-stat-val" style={{ color:'#0ea5e9' }}>{d.stats.moodAvg}</span>
          <span className="aud-stat-lbl">Avg Mood Score</span>
        </div>
        <div className="aud-stat-box" style={{ borderColor:'#bbf7d0', background:'#f0fdf4' }}>
          <span className="aud-stat-val" style={{ color:'#16a34a' }}>{d.stats.notes}</span>
          <span className="aud-stat-lbl">Healing Notes</span>
        </div>
        <div className="aud-stat-box" style={{ borderColor:'#ddd6fe', background:'#faf5ff' }}>
          <span className="aud-stat-val" style={{ color:'#7c3aed' }}>{d.stats.docs}</span>
          <span className="aud-stat-lbl">Medical Docs</span>
        </div>
        <div className="aud-stat-box" style={{ borderColor:'#fed7aa', background:'#fff7ed' }}>
          <span className="aud-stat-val" style={{ color:'#ea580c' }}>{d.stats.months} mo</span>
          <span className="aud-stat-lbl">On Platform</span>
        </div>
      </div>

      <div className="aud-cols">
        <div className="aud-col">
          <Section title="Personal Info">
            <InfoRow label="Email"       value={d.email} />
            <InfoRow label="Age"         value={d.age} />
            <InfoRow label="Gender"      value={d.gender} />
            <InfoRow label="Phone"       value={d.phone} />
            <InfoRow label="Condition"   value={d.condition} />
            <InfoRow label="Diagnosed"   value={d.diagnosedSince} />
            <InfoRow label="Severity"    value={d.severity} />
            <InfoRow label="Joined"      value={d.joined} />
            <InfoRow label="Last Active" value={d.lastActive} />
          </Section>

          <Section title="Care Team">
            <div className="aud-care-item">
              <div className="aud-care-avatar aud-care-avatar--purple">{ini(d.doctor.name)}</div>
              <div>
                <p className="aud-care-name">{d.doctor.name}</p>
                <p className="aud-care-role">Doctor · {d.doctor.specialty}</p>
              </div>
            </div>
            {d.healingBuddy && (
              <div className="aud-care-item">
                <div className="aud-care-avatar aud-care-avatar--green">{ini(d.healingBuddy.name)}</div>
                <div>
                  <p className="aud-care-name">{d.healingBuddy.name}</p>
                  <p className="aud-care-role">Healing Buddy · {d.healingBuddy.relation} · {d.healingBuddy.checkIns} check-ins</p>
                </div>
              </div>
            )}
            {d.family.length > 0 && (
              <div className="aud-family-list">
                <p className="aud-family-title">Family Members</p>
                {d.family.map((fm, i) => (
                  <div key={i} className="aud-family-row">
                    <div>
                      <span className="aud-family-name">{fm.name}</span>
                      <span className="aud-family-rel"> · {fm.relation}</span>
                    </div>
                    <div className="aud-perms-wrap">
                      {fm.perms.map(p => <PermBadge key={p} label={p} granted={true} />)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>

        <div className="aud-col">
          <Section title="Recent Mood Entries">
            <div className="aud-mood-list">
              {d.mood.map((m, i) => (
                <div key={i} className="aud-mood-row">
                  <div className="aud-mood-score-wrap">
                    <div className="aud-mood-score" style={{ background: m.score >= 7 ? '#dcfce7' : m.score >= 5 ? '#fef3c7' : '#fee2e2', color: m.score >= 7 ? '#16a34a' : m.score >= 5 ? '#d97706' : '#dc2626' }}>
                      {m.score}/10
                    </div>
                  </div>
                  <div className="aud-mood-info">
                    <p className="aud-mood-note">{m.note}</p>
                    <p className="aud-mood-date">{m.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Uploaded Documents">
            {d.docs.length === 0
              ? <p className="aud-empty">No documents uploaded.</p>
              : d.docs.map((doc, i) => (
                <div key={i} className="aud-doc-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <span>{doc}</span>
                </div>
              ))
            }
          </Section>
        </div>
      </div>
    </>
  )
}

/* ────────────────────────────── Doctor ────────────────────────────── */
function DoctorDetail({ user, d }) {
  return (
    <>
      <div className="aud-stats-row">
        <div className="aud-stat-box" style={{ borderColor:'#ddd6fe', background:'#faf5ff' }}>
          <span className="aud-stat-val" style={{ color:'#7c3aed' }}>{d.stats.sessions}</span>
          <span className="aud-stat-lbl">Sessions</span>
        </div>
        <div className="aud-stat-box" style={{ borderColor:'#bbf7d0', background:'#f0fdf4' }}>
          <span className="aud-stat-val" style={{ color:'#16a34a' }}>{d.stats.notes}</span>
          <span className="aud-stat-lbl">Session Notes</span>
        </div>
        <div className="aud-stat-box" style={{ borderColor:'#bae6fd', background:'#f0f9ff' }}>
          <span className="aud-stat-val" style={{ color:'#0ea5e9' }}>{d.stats.recommendations}</span>
          <span className="aud-stat-lbl">Recommendations</span>
        </div>
        <div className="aud-stat-box" style={{ borderColor:'#fed7aa', background:'#fff7ed' }}>
          <span className="aud-stat-val" style={{ color:'#ea580c' }}>★ {d.stats.avgRating}</span>
          <span className="aud-stat-lbl">Avg Rating</span>
        </div>
      </div>

      <div className="aud-cols">
        <div className="aud-col">
          <Section title="Account Info">
            <InfoRow label="Email"            value={d.email} />
            <InfoRow label="Specialty"        value={d.specialty} />
            <InfoRow label="Joined"           value={d.joined} />
            <InfoRow label="Credentials Sent" value={d.credentialsSent} />
            <InfoRow label="Last Active"      value={d.lastActive} />
            <InfoRow label="Total Patients"   value={d.patients.length} />
          </Section>
        </div>

        <div className="aud-col">
          <Section title="Assigned Patients">
            {d.patients.length === 0
              ? <p className="aud-empty">No patients assigned yet.</p>
              : d.patients.map((p, i) => {
                const sc = STATUS_COLORS[p.status] ?? STATUS_COLORS.stable
                return (
                  <div key={i} className="aud-patient-row">
                    <div className="aud-care-avatar aud-care-avatar--blue">{ini(p.name)}</div>
                    <div className="aud-patient-info">
                      <p className="aud-care-name">{p.name}</p>
                      <p className="aud-care-role">{p.condition} · Since {p.since}</p>
                    </div>
                    <span className="aud-status-badge" style={{ background: sc.bg, color: sc.color }}>
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    </span>
                  </div>
                )
              })
            }
          </Section>
        </div>
      </div>
    </>
  )
}

/* ────────────────────────────── Healing Buddy ────────────────────────────── */
function BuddyDetail({ user, d }) {
  return (
    <>
      <div className="aud-stats-row">
        <div className="aud-stat-box" style={{ borderColor:'#bbf7d0', background:'#f0fdf4' }}>
          <span className="aud-stat-val" style={{ color:'#16a34a' }}>{d.stats.checkIns}</span>
          <span className="aud-stat-lbl">Check-ins</span>
        </div>
        <div className="aud-stat-box" style={{ borderColor:'#bae6fd', background:'#f0f9ff' }}>
          <span className="aud-stat-val" style={{ color:'#0ea5e9' }}>{d.stats.messages}</span>
          <span className="aud-stat-lbl">Messages Sent</span>
        </div>
        <div className="aud-stat-box" style={{ borderColor:'#ddd6fe', background:'#faf5ff' }}>
          <span className="aud-stat-val" style={{ color:'#7c3aed' }}>{d.stats.responseRate}</span>
          <span className="aud-stat-lbl">Response Rate</span>
        </div>
        <div className="aud-stat-box" style={{ borderColor:'#fed7aa', background:'#fff7ed' }}>
          <span className="aud-stat-val" style={{ color:'#ea580c' }}>{d.stats.avgResponse}</span>
          <span className="aud-stat-lbl">Avg Response Time</span>
        </div>
      </div>

      <div className="aud-cols">
        <div className="aud-col">
          <Section title="Account Info">
            <InfoRow label="Email"       value={d.email} />
            <InfoRow label="Joined"      value={d.joined} />
            <InfoRow label="Approved By" value={d.approvedBy} />
            <InfoRow label="Last Active" value={d.lastActive} />
            <InfoRow label="Supporting"  value={`${d.patients.length} patient${d.patients.length !== 1 ? 's' : ''}`} />
          </Section>
        </div>

        <div className="aud-col">
          <Section title="Patients They Support">
            {d.patients.length === 0
              ? <p className="aud-empty">Not supporting any patients yet.</p>
              : d.patients.map((p, i) => (
                <div key={i} className="aud-patient-row">
                  <div className="aud-care-avatar aud-care-avatar--blue">{ini(p.name)}</div>
                  <div className="aud-patient-info">
                    <p className="aud-care-name">{p.name}</p>
                    <p className="aud-care-role">{p.condition} · {p.relation} · {p.doctor}</p>
                    <p className="aud-care-role">Since {p.since}</p>
                  </div>
                </div>
              ))
            }
          </Section>
        </div>
      </div>
    </>
  )
}

/* ────────────────────────────── Family Member ────────────────────────────── */
function FamilyDetail({ user, d }) {
  return (
    <div className="aud-cols">
      <div className="aud-col">
        <Section title="Account Info">
          <InfoRow label="Email"       value={d.email} />
          <InfoRow label="Joined"      value={d.joined} />
          <InfoRow label="Last Active" value={d.lastActive} />
          <InfoRow label="Relation"    value={d.patient.relation} />
        </Section>
      </div>

      <div className="aud-col">
        <Section title="Connected Patient">
          <div className="aud-care-item">
            <div className="aud-care-avatar aud-care-avatar--blue">{ini(d.patient.name)}</div>
            <div>
              <p className="aud-care-name">{d.patient.name}</p>
              <p className="aud-care-role">Patient · {d.patient.condition}</p>
              <p className="aud-care-role">Relation: {d.patient.relation}</p>
            </div>
          </div>
        </Section>

        <Section title="Permissions Granted by Patient">
          <div className="aud-perms-grid">
            <PermBadge label="Healing Notes"  granted={d.perms.notes} />
            <PermBadge label="Progress"       granted={d.perms.progress} />
            <PermBadge label="Mood Tracking"  granted={d.perms.mood} />
            <PermBadge label="Medical Docs"   granted={d.perms.documents} />
          </div>
        </Section>
      </div>
    </div>
  )
}

/* ────────────────────────────── Main Component ────────────────────────────── */
export default function AdminUserDetail({ user, type, onBack }) {
  const [status, setStatus] = useState(user.status)

  const detail = type === 'patients' ? (PATIENT_DETAIL[user.id] ?? FALLBACK_PATIENT)
               : type === 'doctors'  ? (DOCTOR_DETAIL[user.id]  ?? FALLBACK_DOCTOR)
               : type === 'buddies'  ? (BUDDY_DETAIL[user.id]   ?? FALLBACK_BUDDY)
               :                       (FAMILY_DETAIL[user.id]  ?? FALLBACK_FAMILY)

  const ROLE_LABELS = { patients:'Patient', doctors:'Doctor', buddies:'Healing Buddy', family:'Family Member' }
  const ROLE_COLORS_MAP = {
    patients: { bg:'#e0f2fe', color:'#0ea5e9' },
    doctors:  { bg:'#ede9fe', color:'#6366f1' },
    buddies:  { bg:'#dcfce7', color:'#16a34a' },
    family:   { bg:'#fef3c7', color:'#d97706' },
  }
  const rc = ROLE_COLORS_MAP[type]

  return (
    <div className="aud">
      {/* Back header */}
      <div className="aud-topbar">
        <button className="aud-back" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to {ROLE_LABELS[type]}s
        </button>
      </div>

      {/* Profile header */}
      <div className="aud-header">
        <div className="aud-header__avatar">{ini(user.name)}</div>
        <div className="aud-header__info">
          <h2 className="aud-header__name">{user.name}</h2>
          <div className="aud-header__meta">
            <span className="aud-role-badge" style={{ background: rc.bg, color: rc.color }}>{ROLE_LABELS[type]}</span>
            {type === 'doctors' && <span className="aud-meta-text">{user.specialty}</span>}
            {type === 'patients' && <span className="aud-meta-text">{user.condition}</span>}
          </div>
        </div>
        <div className="aud-header__actions">
          <span className={`aud-status-badge aud-status-badge--${status}`}>
            {status === 'active' ? 'Active' : 'Inactive'}
          </span>
          <button
            className={`aud-toggle-btn ${status === 'active' ? 'aud-toggle-btn--disable' : 'aud-toggle-btn--enable'}`}
            onClick={() => setStatus(s => s === 'active' ? 'inactive' : 'active')}
          >
            {status === 'active' ? 'Disable Account' : 'Enable Account'}
          </button>
          {type === 'doctors' && (
            <button className="aud-cred-btn">Resend Credentials</button>
          )}
        </div>
      </div>

      {/* Role-specific detail */}
      <div className="aud-body">
        {type === 'patients' && <PatientDetail user={user} d={detail} />}
        {type === 'doctors'  && <DoctorDetail  user={user} d={detail} />}
        {type === 'buddies'  && <BuddyDetail   user={user} d={detail} />}
        {type === 'family'   && <FamilyDetail  user={user} d={detail} />}
      </div>
    </div>
  )
}

import './AdminAnalyticsPanel.css'

const weeklyActive = [
  { day:'Mon', patients:38, doctors:14, buddies:10 },
  { day:'Tue', patients:45, doctors:18, buddies:12 },
  { day:'Wed', patients:52, doctors:20, buddies:15 },
  { day:'Thu', patients:41, doctors:16, buddies:11 },
  { day:'Fri', patients:60, doctors:22, buddies:18 },
  { day:'Sat', patients:35, doctors:10, buddies:8  },
  { day:'Sun', patients:28, doctors:8,  buddies:6  },
]

const MAX_VAL = 70

const monthlySignups = [
  { month:'Jan', patients:18, doctors:3, buddies:5, family:8  },
  { month:'Feb', patients:24, doctors:4, buddies:7, family:12 },
  { month:'Mar', patients:31, doctors:5, buddies:9, family:14 },
  { month:'Apr', patients:28, doctors:6, buddies:8, family:15 },
  { month:'May', patients:35, doctors:4, buddies:9, family:18 },
]

const MAX_SIG = 45

const kpis = [
  { label:'Avg. Mood Score',       value:'7.4 / 10', sub:'↑ 0.3 vs last month', up:true  },
  { label:'Healing Notes Written', value:'1,247',     sub:'↑ 18% this week',     up:true  },
  { label:'Medical Docs Uploaded', value:'389',       sub:'↑ 12% this month',    up:true  },
  { label:'Support Sessions',      value:'94',        sub:'↓ 4% this week',      up:false },
  { label:'Community Posts',       value:'89',        sub:'↑ 22% this week',     up:true  },
  { label:'Family Connections',    value:'67',        sub:'New this month: +8',   up:true  },
]

const topDoctors = [
  { name:'Dr. Sara Al-Mansouri', patients:18, specialty:'Chronic Disease Mgmt', score:96 },
  { name:'Dr. Tariq Al-Amin',    patients:21, specialty:'Therapy & Counseling', score:94 },
  { name:'Dr. Khalid Hassan',    patients:12, specialty:'Therapy & Counseling', score:91 },
  { name:'Dr. Layla Nasser',     patients:9,  specialty:'Chronic Disease Mgmt', score:89 },
  { name:'Dr. Hana Yousef',      patients:7,  specialty:'Chronic Disease Mgmt', score:85 },
]

export default function AdminAnalyticsPanel() {
  return (
    <div className="admin-analytics">
      {/* KPIs */}
      <div className="admin-analytics__kpis">
        {kpis.map(k => (
          <div key={k.label} className="admin-analytics__kpi">
            <span className="admin-analytics__kpi-value">{k.value}</span>
            <span className="admin-analytics__kpi-label">{k.label}</span>
            <span className={`admin-analytics__kpi-sub ${k.up ? 'admin-analytics__kpi-sub--up' : 'admin-analytics__kpi-sub--down'}`}>{k.sub}</span>
          </div>
        ))}
      </div>

      <div className="admin-analytics__row">
        {/* Weekly Active Users chart */}
        <div className="admin-analytics__card admin-analytics__card--wide">
          <div className="admin-analytics__card-header">
            <h3 className="admin-analytics__card-title">Weekly Active Users</h3>
            <div className="admin-analytics__legend">
              <span className="admin-analytics__legend-dot" style={{background:'#0ea5e9'}} />Patients
              <span className="admin-analytics__legend-dot" style={{background:'#6366f1'}} />Doctors
              <span className="admin-analytics__legend-dot" style={{background:'#16a34a'}} />Buddies
            </div>
          </div>
          <div className="admin-analytics__chart">
            {weeklyActive.map(d => (
              <div key={d.day} className="admin-analytics__col">
                <div className="admin-analytics__bars">
                  <div className="admin-analytics__bar" style={{ height:`${(d.patients/MAX_VAL)*100}%`, background:'#0ea5e9' }} title={`Patients: ${d.patients}`} />
                  <div className="admin-analytics__bar" style={{ height:`${(d.doctors/MAX_VAL)*100}%`,  background:'#6366f1' }} title={`Doctors: ${d.doctors}`} />
                  <div className="admin-analytics__bar" style={{ height:`${(d.buddies/MAX_VAL)*100}%`,  background:'#16a34a' }} title={`Buddies: ${d.buddies}`} />
                </div>
                <span className="admin-analytics__day">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Doctors */}
        <div className="admin-analytics__card">
          <div className="admin-analytics__card-header">
            <h3 className="admin-analytics__card-title">Top Doctors</h3>
          </div>
          <div className="admin-analytics__doctor-list">
            {topDoctors.map((d, i) => (
              <div key={i} className="admin-analytics__doctor-row">
                <span className="admin-analytics__doctor-rank">{i + 1}</span>
                <div className="admin-analytics__doctor-avatar">
                  {d.name.split(' ').slice(1,3).map(n => n[0]).join('')}
                </div>
                <div className="admin-analytics__doctor-info">
                  <p className="admin-analytics__doctor-name">{d.name}</p>
                  <p className="admin-analytics__doctor-spec">{d.patients} patients · {d.specialty}</p>
                </div>
                <div className="admin-analytics__score-wrap">
                  <span className="admin-analytics__score">{d.score}</span>
                  <div className="admin-analytics__score-bar-wrap">
                    <div className="admin-analytics__score-bar" style={{ width:`${d.score}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly signups */}
      <div className="admin-analytics__card">
        <div className="admin-analytics__card-header">
          <h3 className="admin-analytics__card-title">Monthly Signups</h3>
          <div className="admin-analytics__legend">
            <span className="admin-analytics__legend-dot" style={{background:'#0ea5e9'}} />Patients
            <span className="admin-analytics__legend-dot" style={{background:'#6366f1'}} />Doctors
            <span className="admin-analytics__legend-dot" style={{background:'#16a34a'}} />Buddies
            <span className="admin-analytics__legend-dot" style={{background:'#f59e0b'}} />Family
          </div>
        </div>
        <div className="admin-analytics__chart admin-analytics__chart--monthly">
          {monthlySignups.map(m => (
            <div key={m.month} className="admin-analytics__col">
              <div className="admin-analytics__bars">
                <div className="admin-analytics__bar" style={{ height:`${(m.patients/MAX_SIG)*100}%`, background:'#0ea5e9' }} />
                <div className="admin-analytics__bar" style={{ height:`${(m.doctors/MAX_SIG)*100}%`,  background:'#6366f1' }} />
                <div className="admin-analytics__bar" style={{ height:`${(m.buddies/MAX_SIG)*100}%`,  background:'#16a34a' }} />
                <div className="admin-analytics__bar" style={{ height:`${(m.family/MAX_SIG)*100}%`,   background:'#f59e0b' }} />
              </div>
              <span className="admin-analytics__day">{m.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

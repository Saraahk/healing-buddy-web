import './FeaturesCarousel.css'

const doctors = [
  { id: 1, name: 'Dr. Sarah Mitchell',    specialty: 'Chronic Diseases', rating: 4.9, img: 'https://i.pravatar.cc/150?img=47' },
  { id: 2, name: 'Dr. James Carter',      specialty: 'Therapy',          rating: 4.8, img: 'https://i.pravatar.cc/150?img=68' },
  { id: 3, name: 'Dr. Layla Hassan',      specialty: 'General Doctor',   rating: 4.7, img: 'https://i.pravatar.cc/150?img=45' },
  { id: 4, name: 'Dr. Omar Al-Farsi',     specialty: 'Chronic Diseases', rating: 4.9, img: 'https://i.pravatar.cc/150?img=12' },
  { id: 5, name: 'Dr. Emily Nguyen',      specialty: 'Therapy',          rating: 4.6, img: 'https://i.pravatar.cc/150?img=32' },
  { id: 6, name: 'Dr. Khalid Al-Mutairi', specialty: 'General Doctor',   rating: 4.8, img: 'https://i.pravatar.cc/150?img=53' },
]

export default function FeaturesCarousel() {
  const allCards = [...doctors, ...doctors]

  return (
    <section className="features">
      <div className="features__track-wrapper">
        <div className="features__track">
          {allCards.map((d, i) => (
            <div className="features__card" key={`${d.id}-${i}`}>

              {/* نفس مكان الـ icon */}
              <img src={d.img} alt={d.name} className="features__card-icon" style={{ objectFit: 'cover', boxShadow: '0 0 0 3px #f0f0f0, 0 2px 8px rgba(0,0,0,0.12)' }} />

              {/* نفس مكان الـ line الأولى — اسم + تخصص */}
              <div className="features__card-line" style={{ gap: 6 }}>
                <span>{d.name}</span>
                <span style={{ color: '#9ca3af', fontWeight: 400 }}>· {d.specialty}</span>
              </div>

              {/* نفس مكان الـ line القصيرة — نجوم */}
              <div className="features__card-line features__card-line--short">
                {'★★★★★'.split('').map((s, si) => (
                  <span key={si} style={{ color: si < Math.round(d.rating) ? '#f59e0b' : '#d1d5db', fontSize: 13 }}>{s}</span>
                ))}
                <span className="features__card-rating">{d.rating}</span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

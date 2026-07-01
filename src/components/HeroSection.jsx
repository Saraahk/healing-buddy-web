import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="hero__inner">
        <div className="hero__content">
          <span className="hero__badge">Doctor Portal</span>
          <h1 className="hero__title">
            Welcome To<br />
            <span className="hero__title-highlight">Healing Buddy</span>
          </h1>
          <p className="hero__subtitle">
            Healing made simple — compassionate, connected, and secure
          </p>
          <p className="hero__description">
            Healing Buddy is built for people living with chronic diseases — giving them a
            direct, secure connection to their doctor. Through a compassionate platform, patients
            can communicate with their care team, track their daily wellbeing, manage appointments,
            and stay supported throughout their journey. Because no one should face a chronic
            illness alone.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary btn--lg" onClick={() => window.location.href = '/apply'}>Get started now</button>
            <button className="btn btn--ghost btn--lg" onClick={() => window.location.href = '/about'}>Learn More</button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__orbit hero__orbit--1">
            <span className="hero__orbit-dot" />
          </div>
          <div className="hero__orbit hero__orbit--2">
            <span className="hero__orbit-dot" />
          </div>
          <div className="hero__orbit hero__orbit--3">
            <span className="hero__orbit-dot" />
          </div>
          <div className="hero__circle-glow" />
          <div className="hero__circle">
            <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero__icon">
              {/* Top center */}
              <circle cx="70" cy="30" r="13" fill="white" opacity="0.95" />
              {/* Middle row */}
              <circle cx="38" cy="52" r="11" fill="white" opacity="0.8" />
              <circle cx="102" cy="52" r="11" fill="white" opacity="0.8" />
              {/* Bottom row */}
              <circle cx="22" cy="78" r="9" fill="white" opacity="0.65" />
              <circle cx="70" cy="75" r="10" fill="white" opacity="0.75" />
              <circle cx="118" cy="78" r="9" fill="white" opacity="0.65" />
              {/* Bodies */}
              <path d="M70 47c-11 0-19 5-19 12v6h38v-6c0-7-8-12-19-12z" fill="white" opacity="0.9" />
              <path d="M38 66c-9 0-15 4-15 9v5h30v-5c0-5-6-9-15-9z" fill="white" opacity="0.75" />
              <path d="M102 66c-9 0-15 4-15 9v5h30v-5c0-5-6-9-15-9z" fill="white" opacity="0.75" />
              <path d="M22 91c-7 0-11 3-11 7v4h22v-4c0-4-4-7-11-7z" fill="white" opacity="0.6" />
              <path d="M70 89c-8 0-13 3.5-13 8v4.5h26V97c0-4.5-5-8-13-8z" fill="white" opacity="0.7" />
              <path d="M118 91c-7 0-11 3-11 7v4h22v-4c0-4-4-7-11-7z" fill="white" opacity="0.6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="hero__stats">
        <div className="hero__stat">
          <span className="hero__stat-number">500+</span>
          <span className="hero__stat-label">Doctors</span>
        </div>
        <div className="hero__stat-divider" />
        <div className="hero__stat">
          <span className="hero__stat-number">10k+</span>
          <span className="hero__stat-label">Patients Helped</span>
        </div>
        <div className="hero__stat-divider" />
        <div className="hero__stat">
          <span className="hero__stat-number">98%</span>
          <span className="hero__stat-label">Satisfaction Rate</span>
        </div>
      </div>
    </section>
  )
}

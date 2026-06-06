import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="/" className="navbar__logo">
          <img src={logo} alt="Healing Buddy" className="navbar__logo-icon" />
          <span className="navbar__brand">Healing Buddy</span>
        </a>

        <div className="navbar__actions">
          <button className="btn btn--outline" onClick={() => window.location.href = '/signup'}>Sign In</button>
        </div>
      </div>
    </nav>
  )
}

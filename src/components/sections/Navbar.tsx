import { useState } from 'react'

type NavbarProps = {
  onContact: () => void
}

export default function Navbar({ onContact }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="page-container navbar">
        <a href="#product" className="brand" aria-label="Weft home">
          <span className="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path
                d="M7 9h7a6 6 0 0 1 0 14H7M7 16h18"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
          weft
        </a>

        
<nav className="desktop-nav" aria-label="Main navigation">
  <a href="#product">Product</a>
  <a href="#solutions">Solutions</a>
  <a href="#api">Developers</a>
  <a href="#company">Company</a>
</nav>

        

        <div className="navbar-actions">
          <a href="#api" className="api-link">
            Explore the API ↗
          </a>
          <button className="button button-primary" onClick={onContact}>
            Talk to us
          </button>
        </div>

        <button
          className="mobile-menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-nav page-container"
          aria-label="Mobile navigation"
        >
          {[
            ['Product', '#product'],
            ['Solutions', '#solutions'],
            ['Developers', '#api'],
            ['Company', '#company'],
          ].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <button
            className="button button-primary"
            onClick={() => {
              setMenuOpen(false)
              onContact()
            }}
          >
            Talk to us
          </button>
        </nav>
      )}
    </header>
  )
}
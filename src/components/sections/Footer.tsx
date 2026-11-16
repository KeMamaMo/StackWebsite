import { useState } from 'react'

const events = [
  'identity.verified',
  'consent.granted',
  'collection.settled',
  'payout.paid',
  'assessment.completed',
  'loan.funded',
  'ledger.reconciled',
  'event.delivered',
  'exception.resolved',
]

function Brand() {
  return (
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
  )
}

export default function Footer() {
  const [paused, setPaused] = useState(false)

  return (
    <footer id="site-footer" className="weft-footer">
      <div className="footer-ticker">
        <p className="sr-only">
          Illustrative platform events: {events.join(', ')}.
        </p>

        <div className="footer-ticker-window" aria-hidden="true">
          <div
            className={`footer-ticker-track ${
              paused ? 'is-paused' : ''
            }`}
          >
            {[0, 1].map((copy) => (
              <div className="footer-ticker-group" key={copy}>
                {events.map((event) => (
                  <span className="footer-ticker-event" key={event}>
                    <span className="footer-ticker-arrow">→</span>
                    {event}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="footer-ticker-toggle"
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? 'Resume motion' : 'Pause motion'}
        </button>
      </div>

      <div className="page-container footer-content">
        <div className="footer-main-grid">
          <div className="footer-brand-column">
            <Brand />
            <p>
              Financial API infrastructure for software platforms
              in Africa. We are not a lender; licensed lending
              partners provide capital.
            </p>
          </div>

          <nav className="footer-link-column" aria-label="Product">
            <h2>Product</h2>
            <a href="#product">Overview</a>
            <a href="#solutions">Solutions</a>
            <a href="#api">Developers</a>
          </nav>

          <nav className="footer-link-column" aria-label="Company">
            <h2>Company</h2>
            <a href="#company">Why we&apos;re building</a>
            <a href="#contact">Talk to us</a>
          </nav>

          <div className="footer-status-column">
            <h2>Status of this site</h2>
            <p>
              Brand name is a placeholder. API examples are
              illustrative. Dashboard figures are demonstration
              data.
            </p>
          </div>
        </div>

        <div className="footer-bottom mono">
          <span>weft · South Africa · Kenya</span>
          <a href="#product">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}

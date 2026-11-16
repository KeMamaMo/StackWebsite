import OrchestrationMap from '../OrchestrationMap'

type HeroProps = {
  onContact: () => void
}

export default function Hero({ onContact }: HeroProps) {
  return (
    <section id="product" className="page-container hero">
      <div className="hero-copy">
        <div className="availability-badges">
          <span className="pill pill-live">● Payments: ZA + KE</span>
          <span className="pill pill-credit">● Credit: in development</span>
          <span className="pill pill-planned">● Nigeria: planned</span>
        </div>

        <h1>
          One API.
          <span className="muted-heading">Financial<br />products</span>
          inside your
          <span className="highlight-word">platform.</span>
        </h1>

        <p className="hero-description">
          Embed payments and credit into the software your customers already
          use. Connect once to manage onboarding, money movement and lending
          workflows.
        </p>

        <div className="hero-actions">
          <button className="button button-primary" onClick={onContact}>
            Talk to us <span aria-hidden="true">→</span>
          </button>
          <a href="#api" className="button button-outline">
            <span className="terminal-symbol" aria-hidden="true">&gt;_</span>
            Explore the API
          </a>
        </div>

        <p className="hero-footnote">
          For ERP, property, payroll, POS, commerce and fintech teams building
          in Africa. Licensed lending partners provide capital.
        </p>
      </div>

      <OrchestrationMap />
    </section>
  )
}
import type { ReactNode } from 'react'

type Capability = {
  title: string
  description: string
  event: string
  icon: ReactNode
  className?: string
}

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const capabilities: Capability[] = [
  {
    title: 'Identity',
    description:
      'Verify individuals and businesses once, reuse across products.',
    event: 'identity.verified',
    icon: (
      <IconFrame>
        <path d="M4 10a8 8 0 0 1 16 0" />
        <path d="M7 11a5 5 0 0 1 10 0v3" />
        <path d="M10 12a2 2 0 0 1 4 0v4" />
        <path d="M4 14v2M7 14v3M10 16v4M14 19v2M17 17v3M20 13v4" />
      </IconFrame>
    ),
  },
  {
    title: 'Consent',
    description:
      'Scoped, timestamped and revocable permissions for data access.',
    event: 'consent.granted',
    icon: (
      <IconFrame>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
        <path d="m8.5 12 2.5 2.5 4.5-5" />
      </IconFrame>
    ),
  },
  {
    title: 'Ledger',
    description:
      'Double-entry record of every movement, balance and fee.',
    event: 'ledger.entry',
    icon: (
      <IconFrame>
        <path d="M12 5c-3-2-7-2-10-1v16c3-1 7-1 10 1" />
        <path d="M12 5c3-2 7-2 10-1v16c-3-1-7-1-10 1V5Z" />
      </IconFrame>
    ),
  },
  {
    title: 'Audit trail',
    description:
      'Who did what, when, with which provider reference.',
    event: 'audit.logged',
    className: 'infrastructure-card-wide',
    icon: (
      <IconFrame>
        <path d="M7 3h11v15M7 3a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3Z" />
        <path d="M10 8v12a2 2 0 0 0 2 2h7a3 3 0 0 0 3-3v-1H12" />
        <path d="M13 7h2M13 11h2M13 15h2" />
      </IconFrame>
    ),
  },
  {
    title: 'Webhooks',
    description:
      'Signed events, retries and replay for every state change.',
    event: 'event.delivered',
    className: 'infrastructure-card-wide',
    icon: (
      <IconFrame>
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="18" r="3" />
        <circle cx="19" cy="18" r="3" />
        <path d="m10.5 7.5-4 8M13.5 7.5l4 8M8 18h8" />
      </IconFrame>
    ),
  },
]

function CapabilityCard({
  title,
  description,
  event,
  icon,
  className = '',
}: Capability) {
  return (
    <article className={`infrastructure-card ${className}`}>
      <div className="infrastructure-card-heading">
        <span className="infrastructure-icon">{icon}</span>
        <h3>{title}</h3>
      </div>

      <p className="infrastructure-card-description">
        {description}
      </p>

      <p className="infrastructure-event mono">
        <span aria-hidden="true">⊙</span>
        {event}
      </p>
    </article>
  )
}

export default function Infrastructure() {
  return (
    <section
      id="infrastructure"
      className="weft-section infrastructure-section"
      aria-labelledby="infrastructure-heading"
    >
      <div className="page-container">
        <p className="section-label">
          <span aria-hidden="true">■</span>
          04 / SHARED INFRASTRUCTURE
        </p>

        <div className="infrastructure-intro">
          <h2
            id="infrastructure-heading"
            className="section-title"
          >
            One foundation across every financial workflow.
          </h2>

          <p>
            Payments and credit share the same identity, consent,
            ledger and event model. Build it once; every new
            product inherits it.
          </p>
        </div>

        <div className="infrastructure-grid">
          {capabilities.map((capability) => (
            <CapabilityCard
              key={capability.title}
              {...capability}
            />
          ))}
        </div>

        <article className="infrastructure-exception">
          <div className="infrastructure-exception-copy">
            <div className="infrastructure-card-heading">
              <span className="infrastructure-icon">
                <IconFrame>
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="m5.6 5.6 3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6" />
                </IconFrame>
              </span>

              <h3>Exception handling</h3>
            </div>

            <p>
              Returns, mismatches and timeouts surfaced as work
              items, not buried in logs.
            </p>
          </div>

          <span className="infrastructure-exception-event mono">
            <span aria-hidden="true">⚠</span>
            exception.opened
          </span>
        </article>
      </div>
    </section>
  )
}
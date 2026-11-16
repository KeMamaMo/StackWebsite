import { useState } from 'react'

const platforms = [
  { title: 'Property platform', detail: 'rent & leases' },
  { title: 'Payroll platform', detail: 'employers' },
  { title: 'ERP & accounting', detail: 'invoices' },
  { title: 'POS & commerce', detail: 'merchants' },
]

const providers = [
  { title: 'Verification', detail: 'identity / KYB' },
  { title: 'Payment rails', detail: 'bank / mobile money' },
  { title: 'Settlement banks', detail: 'accounts' },
  { title: 'Credit bureaus', detail: 'data checks' },
  { title: 'Licensed lenders', detail: 'provide capital' },
]

const workflows = [
  {
    label: 'Collect a payment',
    endpoint: 'POST /v1/collections',
    platform: 0,
    providers: [1, 2],
    status: 'Available',
    description:
      'A tenant pays rent from inside the property platform. The ledger matches the funds to the lease.',
    events: [
      ['collection.created', 'Platform requests R 8,450.00 from tenant'],
      ['collection.authorised', 'Payer approves on bank or mobile money'],
      ['collection.settled', 'Funds land in the settlement account'],
      ['ledger.reconciled', 'Matched to lease LS-2207 and posted'],
    ],
  },
  {
    label: 'Send a payout',
    endpoint: 'POST /v1/payouts',
    platform: 1,
    providers: [1, 2],
    status: 'Available',
    description:
      'An employer sends a payroll run. Payment statuses and provider references return through one integration.',
    events: [
      ['payout.created', 'Platform submits the payroll instruction'],
      ['payout.processing', 'Instruction routes to the payment provider'],
      ['payout.paid', 'Recipient receives the payment'],
      ['ledger.reconciled', 'Payment matched to the payroll run'],
    ],
  },
  {
    label: 'Offer credit',
    endpoint: 'POST /v1/credit-assessments',
    platform: 2,
    providers: [0, 3, 4],
    status: 'In development',
    description:
      'With business consent, an ERP platform shares data for assessment. A licensed lending partner makes the credit decision and provides capital.',
    events: [
      ['consent.granted', 'Business approves scoped data access'],
      ['assessment.created', 'Platform requests a credit assessment'],
      ['assessment.completed', 'Assessment returned for lender review'],
      ['lender.review', 'Licensed lender decides whether to fund'],
    ],
  },
]

export default function OrchestrationMap() {
  const [active, setActive] = useState(0)
  const workflow = workflows[active]

  return (
    <section
      id="orchestration"
      className="orchestration-card"
      aria-label="Interactive financial workflow illustration"
    >
      <div className="map-heading">
        <span>orchestration.map</span>
        <span>interactive · illustrative</span>
      </div>

      <div className="workflow-tabs" role="tablist" aria-label="Workflow">
        {workflows.map((item, index) => (
          <button
            key={item.label}
            id={`workflow-tab-${index}`}
            role="tab"
            aria-selected={active === index}
            aria-controls="workflow-panel"
            tabIndex={active === index ? 0 : -1}
            className={active === index ? 'active' : ''}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              const direction =
                event.key === 'ArrowRight'
                  ? 1
                  : event.key === 'ArrowLeft'
                    ? -1
                    : 0

              if (!direction) return

              event.preventDefault()
              const next = (active + direction + workflows.length) % workflows.length
              setActive(next)
              document.getElementById(`workflow-tab-${next}`)?.focus()
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        id="workflow-panel"
        role="tabpanel"
        aria-labelledby={`workflow-tab-${active}`}
      >
        <div className="map-stage">
          <svg
            className="map-connections"
            viewBox="0 0 800 520"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {platforms.map((_, index) => (
              <path
                key={`platform-${index}`}
                d={`M 205 ${90 + index * 110} C 290 ${90 + index * 110}, 285 260, 365 260`}
                className={
                  workflow.platform === index ? 'connection lime' : 'connection'
                }
              />
            ))}

            {providers.map((_, index) => (
              <path
                key={`provider-${index}`}
                d={`M 435 260 C 540 260, 520 ${60 + index * 100}, 610 ${60 + index * 100}`}
                className={
                  workflow.providers.includes(index)
                    ? 'connection cyan'
                    : 'connection'
                }
              />
            ))}
          </svg>

          <div className="platform-nodes">
            {platforms.map((item, index) => (
              <div
                key={item.title}
                className={`map-node ${
                  workflow.platform === index ? 'node-lime' : 'node-muted'
                }`}
              >
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </div>
            ))}
          </div>

          <div className="api-hub">
            <span className="hub-dot" />
            <span className="hub-brand">weft</span>
            <strong>One API</strong>

            <div className="hub-layers">
              {['identity', 'consent', 'routing', 'ledger', 'webhooks'].map(
                (layer) => (
                  <span key={layer}>{layer}</span>
                ),
              )}
            </div>
          </div>

          <div className="provider-nodes">
            {providers.map((item, index) => (
              <div
                key={item.title}
                className={`map-node ${
                  workflow.providers.includes(index)
                    ? 'node-cyan'
                    : 'node-muted'
                }`}
              >
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </div>
            ))}
          </div>

          <code className="map-endpoint">{workflow.endpoint}</code>
        </div>

        <div className="map-captions">
          <span>Your customers&apos; software</span>
          <span>Financial providers</span>
        </div>

        <div className="workflow-summary" aria-live="polite">
          <div className="summary-heading">
            <p>{workflow.description}</p>
            <span className={`status-badge ${active === 2 ? 'status-credit' : ''}`}>
              ● {workflow.status}
            </span>
          </div>

          <div className="workflow-events">
            {workflow.events.map(([name, description]) => (
              <div className="workflow-event" key={name}>
                <span className="event-check" aria-hidden="true">
                  {active === 2 ? '→' : '✓'}
                </span>
                <div>
                  <code>{name}</code>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
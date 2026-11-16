import { useState } from 'react'

type TimelineEvent = {
  time: string
  name: string
  description: string
  providerReference?: string
}

type ApiExample = {
  label: string
  method: string
  path: string
  requestLabel?: string
  request: Record<string, unknown>
  response: Record<string, unknown>
  events: TimelineEvent[]
}

const examples: ApiExample[] = [
  {
    label: 'Collections',
    method: 'POST',
    path: '/v1/collections',
    request: {
      amount: { value: 845000, currency: 'ZAR' },
      payer: { customer_id: 'cus_8fK2tenant' },
      method: 'bank_transfer',
      reference: 'LS-2207-MAR',
      metadata: { lease_id: 'LS-2207' },
    },
    response: {
      id: 'col_7Hq2Vd',
      status: 'pending',
      amount: { value: 845000, currency: 'ZAR' },
      reference: 'LS-2207-MAR',
      created_at: '2025-03-01T08:14:22Z',
    },
    events: [
      {
        time: '08:14:22',
        name: 'collection.created',
        description: 'Request accepted, payer notified',
      },
      {
        time: '08:16:05',
        name: 'collection.authorised',
        description: 'Payer approved via bank',
        providerReference: 'BNK-99120',
      },
      {
        time: '10:02:41',
        name: 'collection.settled',
        description: 'Funds received in settlement account',
      },
      {
        time: '10:02:44',
        name: 'ledger.reconciled',
        description: 'Matched to LS-2207-MAR',
      },
    ],
  },
  {
    label: 'Payouts',
    method: 'POST',
    path: '/v1/payouts',
    request: {
      amount: { value: 4250000, currency: 'KES' },
      recipient: { customer_id: 'cus_wanjiru' },
      method: 'mobile_money',
      reference: 'PAYROLL-MAR-001',
    },
    response: {
      id: 'pay_K3m1Qa',
      status: 'pending',
      amount: { value: 4250000, currency: 'KES' },
      reference: 'PAYROLL-MAR-001',
      created_at: '2025-03-01T09:30:00Z',
    },
    events: [
      {
        time: '09:30:00',
        name: 'payout.created',
        description: 'Payout instruction accepted',
      },
      {
        time: '09:30:02',
        name: 'payout.processing',
        description: 'Instruction routed to mobile money provider',
      },
      {
        time: '09:31:14',
        name: 'payout.paid',
        description: 'Recipient received the payment',
        providerReference: 'MM-QX81K2',
      },
      {
        time: '09:31:16',
        name: 'ledger.reconciled',
        description: 'Matched to PAYROLL-MAR-001',
      },
    ],
  },
  {
    label: 'Credit assessments',
    method: 'POST',
    path: '/v1/credit-assessments',
    request: {
      business_id: 'biz_harbourline',
      consent_id: 'cns_12months',
      product: 'working_capital',
      reference: 'WC-HARBOURLINE-001',
    },
    response: {
      id: 'assessment_demo_01',
      status: 'pending',
      business_id: 'biz_harbourline',
      reference: 'WC-HARBOURLINE-001',
      created_at: '2025-03-01T11:00:00Z',
    },
    events: [
      {
        time: '10:59:00',
        name: 'consent.granted',
        description: 'Business approved scoped data access',
      },
      {
        time: '11:00:00',
        name: 'assessment.created',
        description: 'Illustrative assessment requested',
      },
      {
        time: '11:02:30',
        name: 'assessment.completed',
        description: 'Assessment prepared for licensed lender review',
      },
      {
        time: '11:03:00',
        name: 'lender.review',
        description:
          'Licensed lender reviews eligibility. No credit decision is implied.',
      },
    ],
  },
  {
    label: 'Webhook events',
    method: 'EVENT',
    path: 'collection.settled',
    requestLabel: 'Example event payload',
    request: {
      id: 'evt_demo_001',
      type: 'collection.settled',
      created_at: '2025-03-01T10:02:41Z',
      data: {
        id: 'col_7Hq2Vd',
        status: 'settled',
        amount: { value: 845000, currency: 'ZAR' },
        reference: 'LS-2207-MAR',
        provider_reference: 'BNK-99120',
      },
    },
    response: {
      received: true,
      event_id: 'evt_demo_001',
    },
    events: [
      {
        time: '10:02:41',
        name: 'collection.settled',
        description: 'Payment status changed',
      },
      {
        time: '10:02:42',
        name: 'event.created',
        description: 'Notification prepared for the platform',
      },
      {
        time: '10:02:43',
        name: 'event.delivered',
        description: 'Platform acknowledged the example event',
      },
      {
        time: '10:02:44',
        name: 'ledger.reconciled',
        description: 'Payment matched to the original reference',
      },
    ],
  },
]

function JsonCode({ value }: { value: Record<string, unknown> }) {
  const json = JSON.stringify(value, null, 2)

  const tokens = json.split(
    /("(?:\\.|[^"\\])*"(?=\s*:)|"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?)/g,
  )

  return (
    <pre className="developer-json">
      <code>
        {tokens.map((token, index) => {
          let className = ''

          if (token.startsWith('"')) {
            const following = tokens[index + 1] ?? ''
            className = /^\s*:/.test(following)
              ? 'json-key'
              : 'json-string'
          } else if (/^-?\d/.test(token)) {
            className = 'json-number'
          } else if (/^(true|false|null)$/.test(token)) {
            className = 'json-literal'
          }

          return (
            <span key={index} className={className}>
              {token}
            </span>
          )
        })}
      </code>
    </pre>
  )
}

export default function Developers() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [copyStatus, setCopyStatus] = useState('')

  const example = examples[activeIndex]

  function selectExample(index: number) {
    setActiveIndex(index)
    setCopyStatus('')
  }

  async function copyRequest() {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(example.request, null, 2),
      )
      setCopyStatus('Copied to clipboard.')
    } catch {
      setCopyStatus('Could not copy. Select the code and copy it manually.')
    }
  }

  return (
    <section
      id="api"
      className="weft-section developers-section"
      aria-labelledby="developers-heading"
    >
      <div className="page-container">
        <p className="section-label">
          <span className="text-lime" aria-hidden="true">■</span>
          05 / DEVELOPERS
        </p>

        <div className="developers-intro">
          <h2 id="developers-heading" className="section-title">
            Built for the team doing the integration.
          </h2>

          <ul className="developers-benefits">
            <li>
              <span>Consistent formats.</span> Amounts in minor units
              with ISO currency, everywhere.
            </li>
            <li>
              <span>Clear statuses.</span> One lifecycle per object,
              whichever provider sits underneath.
            </li>
            <li>
              <span>Traceable references.</span> Your reference, our
              ID and the provider&apos;s reference on every event.
            </li>
          </ul>
        </div>

        <div className="developer-explorer">
          <div className="developer-toolbar">
            <div
              className="developer-tabs"
              role="tablist"
              aria-label="API examples"
            >
              {examples.map((item, index) => (
                <button
                  key={item.label}
                  id={`api-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  aria-controls="api-example-panel"
                  tabIndex={activeIndex === index ? 0 : -1}
                  className={activeIndex === index ? 'is-active' : ''}
                  onClick={() => selectExample(index)}
                  onKeyDown={(event) => {
                    let next = index

                    if (event.key === 'ArrowRight') {
                      next = (index + 1) % examples.length
                    } else if (event.key === 'ArrowLeft') {
                      next =
                        (index - 1 + examples.length) % examples.length
                    } else if (event.key === 'Home') {
                      next = 0
                    } else if (event.key === 'End') {
                      next = examples.length - 1
                    } else {
                      return
                    }

                    event.preventDefault()
                    selectExample(next)
                    document.getElementById(`api-tab-${next}`)?.focus()
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <span className="developer-notice">
              ● Illustrative API, not published docs
            </span>
          </div>

          <div
            id="api-example-panel"
            className="developer-panel"
            role="tabpanel"
            aria-labelledby={`api-tab-${activeIndex}`}
            tabIndex={0}
          >
            <div className="developer-code-column">
              <div className="developer-endpoint-row">
                <div className="developer-endpoint mono">
                  <span>{example.method}</span>
                  <code>{example.path}</code>
                </div>

                <button
                  type="button"
                  className="developer-copy"
                  onClick={copyRequest}
                  aria-label={`Copy ${example.label} example`}
                >
                  {copyStatus === 'Copied to clipboard.'
                    ? 'Copied ✓'
                    : '▢ Copy'}
                </button>
              </div>

              <div className="developer-code-block">
                <h3>{example.requestLabel ?? 'Request'}</h3>
                <JsonCode value={example.request} />
              </div>

              <div className="developer-code-block developer-response">
                <h3>
                  {activeIndex === 3
                    ? 'Example acknowledgement'
                    : 'Initial response'}
                </h3>
                <JsonCode value={example.response} />
              </div>

              <p className="developer-copy-status" role="status">
                {copyStatus}
              </p>
            </div>

            <div className="developer-timeline">
              <h3>Event timeline</h3>

              <ol>
                {example.events.map((event, index) => (
                  <li
                    key={event.name}
                    className={
                      index === example.events.length - 1
                        ? 'is-final'
                        : ''
                    }
                  >
                    <span
                      className="developer-timeline-dot"
                      aria-hidden="true"
                    />

                    <div className="developer-event-heading mono">
                      <span>{event.time}</span>
                      <code>{event.name}</code>
                    </div>

                    <p>{event.description}</p>

                    {event.providerReference && (
                      <span className="developer-provider-ref mono">
                        prv_ref {event.providerReference}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {activeIndex === 2 && (
            <p className="developer-credit-note">
              Credit is in development. Licensed lending partners
              make credit decisions and provide capital.
            </p>
          )}
        </div>

        <aside className="developer-mcp">
          <div>
            <h3>MCP access for AI agents</h3>
            <p>
              We plan to expose the same objects through the Model
              Context Protocol, so agents can look up a payment status
              or explain a reconciliation exception with the permissions
              you grant. Not yet available.
            </p>
          </div>
          <span className="developer-notice">● Planned</span>
        </aside>
      </div>
    </section>
  )
}
import { useState } from 'react'

const providers = [
  {
    name: 'Identity provider',
    handles: 'KYC/KYB onboarding',
    status: 'VERIFIED_OK',
    colour: 'red',
  },
  {
    name: 'Bank A collections',
    handles: 'debit orders, EFT',
    status: '00 / ACCEPTED',
    colour: 'orange',
  },
  {
    name: 'Mobile money',
    handles: 'STK push, B2C',
    status: 'ResultCode: 0',
    colour: 'grey',
  },
  {
    name: 'Bank B payouts',
    handles: 'salary, supplier runs',
    status: 'processed=true',
    colour: 'red',
  },
  {
    name: 'Credit bureau',
    handles: 'consumer & business data',
    status: 'rpt_status: C',
    colour: 'orange',
  },
  {
    name: 'Lender API',
    handles: 'offers, disbursement',
    status: 'DISBURSED',
    colour: 'grey',
  },
  {
    name: 'Statement files',
    handles: 'end-of-day reconciliation',
    status: 'CSV, 4 formats',
    colour: 'red',
  },
]

const sharedCapabilities = [
  ['Identity & consent', 'One shared customer and permission model'],
  ['Collections & payouts', 'Consistent payment objects and statuses'],
  ['Credit workflows', 'Licensed lending partner integration'],
  ['Ledger & reconciliation', 'Every movement matched to its source'],
]

export default function IntegrationProblem() {
  const [shared, setShared] = useState(false)

  return (
    <section
      id="integration-problem"
      className="weft-section light-section"
      aria-labelledby="integration-heading"
    >
      <div className="page-container section-split">
        <div>
          <p className="section-label">
            <span aria-hidden="true">■</span>
            01 / THE INTEGRATION PROBLEM
          </p>

          <h2 id="integration-heading" className="section-title">
            Your product shouldn&apos;t need seven separate financial
            integrations.
          </h2>

          <p className="section-description">
            Every provider brings its own onboarding, contract, credentials,
            status codes and settlement files. The work doesn&apos;t end at
            go-live: someone has to keep records consistent and chase every
            exception.
          </p>

          <div className="comparison-switch" aria-label="Integration comparison">
            <button
              type="button"
              className={!shared ? 'selected' : ''}
              aria-pressed={!shared}
              aria-controls="integration-comparison"
              onClick={() => setShared(false)}
            >
              Seven integrations
            </button>

            <button
              type="button"
              className={shared ? 'selected' : ''}
              aria-pressed={shared}
              aria-controls="integration-comparison"
              onClick={() => setShared(true)}
            >
              One shared API
            </button>
          </div>
        </div>

        <div
          id="integration-comparison"
          className="comparison-card"
          aria-live="polite"
        >
          {!shared ? (
            <>
              <div
                className="comparison-scroll"
                role="region"
                aria-label="Seven separate provider integrations"
                tabIndex={0}
              >
                <table className="provider-table">
                  <thead>
                    <tr>
                      <th scope="col">Provider</th>
                      <th scope="col">What it handles</th>
                      <th scope="col">Status it returns</th>
                    </tr>
                  </thead>

                  <tbody>
                    {providers.map((provider) => (
                      <tr key={provider.name}>
                        <th scope="row">
                          <span
                            className={`provider-dot dot-${provider.colour}`}
                            aria-hidden="true"
                          />
                          {provider.name}
                        </th>
                        <td>{provider.handles}</td>
                        <td>
                          <code>{provider.status}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="comparison-footer">
                <span className="mono">
                  7 contracts, 7 auth schemes, 7 status vocabularies.
                </span>{' '}
                Plus the reconciliation spreadsheet that holds them together.
              </p>
            </>
          ) : (
            <div className="shared-api-view">
              <span className="shared-api-badge">weft / one shared API</span>

              <h3>One integration. A shared foundation.</h3>

              <p>
                Your platform integrates with Weft. Provider-specific workflows
                sit behind a consistent interface.
              </p>

              <div className="shared-capabilities">
                {sharedCapabilities.map(([title, description]) => (
                  <div key={title}>
                    <span className="shared-check" aria-hidden="true">
                      ✓
                    </span>
                    <div>
                      <strong>{title}</strong>
                      <p>{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="shared-event-strip">
                <code>identity.verified</code>
                <span aria-hidden="true">→</span>
                <code>collection.settled</code>
                <span aria-hidden="true">→</span>
                <code>ledger.reconciled</code>
              </div>

              <small>
                Illustrative architecture. Credit is in development.
              </small>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
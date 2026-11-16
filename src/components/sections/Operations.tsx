import { useState } from 'react'

type TransactionType = 'Collection' | 'Payout' | 'Loan'
type Filter = 'All' | TransactionType

type TransactionEvent = {
  time: string
  name: string
}

type Transaction = {
  reference: string
  type: TransactionType
  party: string
  amount: string
  status: string
  tone: 'lime' | 'cyan' | 'orange'
  providerReference: string
  events: TransactionEvent[]
}

const transactions: Transaction[] = [
  {
    reference: 'col_7Hq2Vd',
    type: 'Collection',
    party: 'Tenant, Unit 14B',
    amount: 'R 8,450.00',
    status: 'reconciled',
    tone: 'lime',
    providerReference: 'BNK-99120',
    events: [
      { time: '08:14', name: 'collection.created' },
      { time: '08:16', name: 'collection.authorised' },
      { time: '10:02', name: 'collection.settled' },
      { time: '10:02', name: 'ledger.reconciled' },
    ],
  },
  {
    reference: 'pay_K3m8Tz',
    type: 'Payout',
    party: 'Supplier, Mombasa',
    amount: 'KES 118,250',
    status: 'returned',
    tone: 'orange',
    providerReference: 'BNK-K-44718',
    events: [
      { time: '09:30', name: 'payout.created' },
      { time: '09:31', name: 'payout.processing' },
      { time: '11:48', name: 'payout.returned · account closed' },
      { time: '11:48', name: 'exception.opened' },
    ],
  },
  {
    reference: 'ln_00419',
    type: 'Loan',
    party: 'Harbourline Trading',
    amount: 'R 40,000.00',
    status: 'repayment due',
    tone: 'cyan',
    providerReference: 'LP-00419',
    events: [
      { time: '08:00', name: 'repayment.scheduled' },
      { time: '08:01', name: 'repayment.reminder' },
      { time: '12:00', name: 'repayment.due' },
    ],
  },
  {
    reference: 'col_7Hr4Lp',
    type: 'Collection',
    party: 'Tenant, Unit 3A',
    amount: 'R 6,100.00',
    status: 'pending',
    tone: 'cyan',
    providerReference: 'DO-551204',
    events: [
      { time: '10:10', name: 'collection.created' },
      { time: '10:11', name: 'collection.pending' },
    ],
  },
  {
    reference: 'col_8Aa1Mm',
    type: 'Collection',
    party: 'Merchant 2291',
    amount: 'KES 23,600',
    status: 'amount mismatch',
    tone: 'orange',
    providerReference: 'MM-RT90QZ',
    events: [
      { time: '09:12', name: 'collection.created' },
      { time: '09:15', name: 'collection.settled' },
      { time: '09:16', name: 'reconciliation.amount_mismatch' },
      { time: '09:16', name: 'exception.opened' },
    ],
  },
  {
    reference: 'pay_K3m1Qa',
    type: 'Payout',
    party: 'Wanjiru Kamau',
    amount: 'KES 42,500',
    status: 'paid',
    tone: 'lime',
    providerReference: 'MM-QX81K2',
    events: [
      { time: '10:20', name: 'payout.created' },
      { time: '10:21', name: 'payout.processing' },
      { time: '10:22', name: 'payout.paid' },
    ],
  },
]

const filters: Filter[] = ['All', 'Collection', 'Payout', 'Loan']

const activityBars = [
  28, 41, 35, 50, 71, 62, 44, 56, 83, 95,
  76, 65, 59, 88, 100, 91, 69, 60, 49, 40,
]

const attentionItems = [
  ['Returned payouts', 4],
  ['Amount mismatches', 7],
  ['Unmatched deposits', 3],
  ['Missed repayments', 1],
] as const

function StatusBadge({
  transaction,
}: {
  transaction: Transaction
}) {
  return (
    <span className={`operations-status tone-${transaction.tone}`}>
      {transaction.status}
    </span>
  )
}

export default function Operations() {
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')
  const [selectedReference, setSelectedReference] =
    useState('pay_K3m8Tz')

  const normalisedQuery = query.trim().toLowerCase()

  const visibleTransactions = transactions.filter((transaction) => {
    const matchesType =
      filter === 'All' || transaction.type === filter

    const matchesSearch =
      transaction.reference.toLowerCase().includes(normalisedQuery) ||
      transaction.providerReference
        .toLowerCase()
        .includes(normalisedQuery)

    return matchesType && matchesSearch
  })

  const selectedTransaction =
    visibleTransactions.find(
      (transaction) => transaction.reference === selectedReference,
    ) ?? visibleTransactions[0]

  return (
    <section
      id="operations"
      className="weft-section operations-section"
      aria-labelledby="operations-heading"
    >
      <div className="page-container">
        <p className="section-label">
          <span aria-hidden="true">■</span>
          07 / OPERATIONS AND VISIBILITY
        </p>

        <div className="operations-intro">
          <h2 id="operations-heading" className="section-title">
            Know what happened to every payment and loan.
          </h2>

          <p>
            Statuses, reconciliation results and provider references
            in one place, with exceptions raised as work to resolve.
            Select a row to see its event history.
          </p>
        </div>

        <div className="operations-dashboard">
          <div className="operations-dashboard-header">
            <span className="operations-window-title mono">
              <span className="operations-window-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              operations / today
            </span>

            <span className="demo-label">
              ● Demonstration data · Fictional
            </span>
          </div>

          <div className="operations-metrics">
            <article className="operations-activity operations-metric">
              <div className="operations-metric-heading">
                <h3>Transaction activity</h3>
                <span className="mono">06:00 to 16:00</span>
              </div>

              <div
                className="operations-bars"
                role="img"
                aria-label="Illustrative transaction activity between 06:00 and 16:00. 571 events, 388 collections and 179 payouts."
              >
                {activityBars.map((height, index) => (
                  <span
                    key={index}
                    className={index === 14 ? 'is-highlighted' : ''}
                    style={{ height: `${height}%` }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <div className="operations-activity-totals mono">
                <span>events <strong>571</strong></span>
                <span>collections <strong>388</strong></span>
                <span>payouts <strong>179</strong></span>
              </div>
            </article>

            <article className="operations-reconciliation operations-metric">
              <h3>Reconciliation</h3>

              <p className="operations-percentage">97.4%</p>
              <p className="operations-metric-caption">auto-matched</p>

              <div
                className="operations-progress"
                role="progressbar"
                aria-label="Automatically reconciled transactions"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={97.4}
              >
                <span />
              </div>

              <div className="operations-reconciliation-totals mono">
                <span>556 matched</span>
                <span>15 open</span>
              </div>
            </article>

            <article className="operations-attention operations-metric">
              <h3>
                <span aria-hidden="true">⚠</span> Needs attention
              </h3>

              <dl>
                {attentionItems.map(([label, count]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{count}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </div>

          <div className="operations-detail-grid">
            <div className="operations-table-panel">
              <div className="operations-table-toolbar">
                <div
                  className="operations-filters"
                  role="group"
                  aria-label="Filter transaction type"
                >
                  {filters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={filter === item ? 'is-active' : ''}
                      aria-pressed={filter === item}
                      onClick={() => setFilter(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <label className="operations-search">
                  <span className="sr-only">
                    Search by transaction or provider reference
                  </span>
                  <span aria-hidden="true">⌕</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="search by reference"
                  />
                </label>
              </div>

              <div
                className="operations-table-scroll"
                role="region"
                aria-label="Demonstration transaction table"
                tabIndex={0}
              >
                <table className="operations-table">
                  <caption className="sr-only">
                    Sample transactions. Select a reference to view its
                    event history.
                  </caption>

                  <thead>
                    <tr>
                      <th scope="col">Reference</th>
                      <th scope="col">Type</th>
                      <th scope="col">Party</th>
                      <th scope="col" className="operations-amount">
                        Amount
                      </th>
                      <th scope="col">Status</th>
                      <th scope="col">Provider ref</th>
                    </tr>
                  </thead>

                  <tbody>
                    {visibleTransactions.map((transaction) => {
                      const selected =
                        selectedTransaction?.reference ===
                        transaction.reference

                      return (
                        <tr
                          key={transaction.reference}
                          className={selected ? 'is-selected' : ''}
                          onClick={() =>
                            setSelectedReference(transaction.reference)
                          }
                        >
                          <th scope="row">
                            <button
                              type="button"
                              className="operations-reference mono"
                              aria-pressed={selected}
                              aria-controls="operations-event-history"
                              aria-label={`View event history for ${transaction.reference}`}
                              onClick={() =>
                                setSelectedReference(transaction.reference)
                              }
                            >
                              {transaction.reference}
                            </button>
                          </th>

                          <td>{transaction.type}</td>
                          <td>{transaction.party}</td>
                          <td className="operations-amount mono">
                            {transaction.amount}
                          </td>
                          <td>
                            <StatusBadge transaction={transaction} />
                          </td>
                          <td className="operations-provider mono">
                            {transaction.providerReference}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

                {visibleTransactions.length === 0 && (
                  <div className="operations-empty" role="status">
                    <h3>No matching transactions</h3>
                    <p>Try another reference or transaction type.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('')
                        setFilter('All')
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>

              <p className="operations-table-note">
                Six sample records from a larger fictional dataset.
                Summary metrics are illustrative.
              </p>
            </div>

            <aside
              id="operations-event-history"
              className="operations-history"
              aria-labelledby="operations-history-heading"
              aria-live="polite"
            >
              <h3 id="operations-history-heading">Event history</h3>

              {selectedTransaction ? (
                <>
                  <p className="operations-history-reference mono">
                    {selectedTransaction.reference}
                  </p>

                  <StatusBadge transaction={selectedTransaction} />

                  <ol className="operations-history-events">
                    {selectedTransaction.events.map((event, index) => (
                      <li key={`${event.name}-${index}`}>
                        <span
                          className="operations-history-dot"
                          aria-hidden="true"
                        />
                        <span className="operations-history-time mono">
                          {event.time}
                        </span>
                        <span className="operations-history-name mono">
                          {event.name}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <p className="operations-history-provider mono">
                    provider_ref: {selectedTransaction.providerReference}
                  </p>

                  {selectedTransaction.type === 'Loan' && (
                    <p className="operations-loan-note">
                      Illustrative loan record. Credit is in development.
                    </p>
                  )}
                </>
              ) : (
                <p className="operations-history-empty">
                  No matching transaction to display.
                </p>
              )}
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
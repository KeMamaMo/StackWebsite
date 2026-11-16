type TransactionStatus = 'settled' | 'paid' | 'pending' | 'returned'

type Transaction = {
  reference: string
  party: string
  method: string
  direction: 'collection' | 'payout'
  match: string
  amount: number
  currency: 'ZAR' | 'KES'
  status: TransactionStatus
}

const transactions: Transaction[] = [
  {
    reference: 'col_7Hq2',
    party: 'Tenant, Unit 14B',
    method: 'EFT',
    direction: 'collection',
    match: 'LS-2207',
    amount: 8450,
    currency: 'ZAR',
    status: 'settled',
  },
  {
    reference: 'col_7Hq9',
    party: 'Merchant float top-up',
    method: 'M-Pesa',
    direction: 'collection',
    match: 'INV-5531',
    amount: 23600,
    currency: 'KES',
    status: 'settled',
  },
  {
    reference: 'pay_K3m1',
    party: 'Landlord payout',
    method: 'EFT',
    direction: 'payout',
    match: 'ST-0412',
    amount: 31920.4,
    currency: 'ZAR',
    status: 'paid',
  },
  {
    reference: 'col_7Hr4',
    party: 'Tenant, Unit 3A',
    method: 'Debit order',
    direction: 'collection',
    match: 'awaiting',
    amount: 6100,
    currency: 'ZAR',
    status: 'pending',
  },
  {
    reference: 'pay_K3m8',
    party: 'Supplier, Mombasa',
    method: 'Bank',
    direction: 'payout',
    match: 'exception',
    amount: 118250,
    currency: 'KES',
    status: 'returned',
  },
]

const capabilities = [
  ['Collections', 'bank, debit order, mobile money'],
  ['Payouts', 'single and batch'],
  ['Statuses', 'one lifecycle per payment'],
  ['Reconciliation', 'settlement matched to source'],
]

function formatAmount(transaction: Transaction) {
  const decimals = transaction.currency === 'ZAR' ? 2 : 0

  const number = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(transaction.amount)

  return `${transaction.currency === 'ZAR' ? 'R' : 'KES'} ${number}`
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  return (
    <li className="payment-row">
      <span
        className={`payment-direction ${transaction.direction}`}
        aria-hidden="true"
      >
        {transaction.direction === 'collection' ? '↙' : '↗'}
      </span>

      <div className="payment-party">
        <strong>{transaction.party}</strong>
        <span className="mono">
          {transaction.reference} · {transaction.method}
        </span>
      </div>

      <div className="payment-match mono">
        <span>match → </span>
        <span
          className={
            transaction.match === 'exception' ? 'text-orange' : ''
          }
        >
          {transaction.match}
        </span>
      </div>

      <div className="payment-value mono">
        <strong>{formatAmount(transaction)}</strong>
        <span className={`payment-status status-${transaction.status}`}>
          {transaction.status}
        </span>
      </div>
    </li>
  )
}

export default function Payments() {
  const matched = transactions.filter(
    (transaction) =>
      transaction.status === 'settled' || transaction.status === 'paid',
  ).length

  const awaiting = transactions.filter(
    (transaction) => transaction.status === 'pending',
  ).length

  const returned = transactions.filter(
    (transaction) => transaction.status === 'returned',
  ).length

  return (
    <section
      id="payments"
      className="weft-section payments-section"
      aria-labelledby="payments-heading"
    >
      <div className="page-container section-split">
        <div>
          <div className="section-label-row">
            <p className="section-label">
              <span className="text-lime" aria-hidden="true">
                ■
              </span>
              02 / PAYMENTS
            </p>
            <span className="availability-label">● Available</span>
          </div>

          <h2 id="payments-heading" className="section-title">
            Collect, pay out and keep every transaction accounted for.
          </h2>

          <p className="section-description">
            Accept money by bank and mobile money, send single or batch
            payouts, and receive statuses in one format. Settlements are
            matched back to the invoice, lease or payroll run that caused them.
          </p>

          <div className="payment-capabilities">
            {capabilities.map(([title, description]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="money-movement">
          <div className="money-movement-header">
            <span className="mono">money_movement · today</span>
            <span className="demo-label">● Demonstration data</span>
          </div>

          <ul className="payment-list" aria-label="Example transactions">
            {transactions.map((transaction) => (
              <TransactionRow
                key={transaction.reference}
                transaction={transaction}
              />
            ))}
          </ul>

          <dl className="payment-summary">
            <div>
              <dt>Matched</dt>
              <dd className="text-lime">
                {matched} of {transactions.length}
              </dd>
            </div>

            <div>
              <dt>Awaiting settlement</dt>
              <dd className="text-cyan">{awaiting}</dd>
            </div>

            <div>
              <dt>Needs review</dt>
              <dd className="text-orange">{returned} returned</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
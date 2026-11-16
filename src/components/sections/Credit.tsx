const steps = [
  {
    title: 'Consent',
    status: 'granted',
    description: 'Business shared 12 months of invoices and bank data',
  },
  {
    title: 'Assessment',
    status: 'complete',
    description: 'Revenue consistency, overdue invoices, bureau check',
  },
  {
    title: 'Lender',
    status: 'funding',
    description: 'Licensed lending partner reviews and funds',
  },
]

const offerReasons = [
  'Monthly invoicing above R 180k for 11 of 12 months',
  'Median debtor days: 34',
  'No defaults reported in bureau check',
]

function CreditPreview() {
  return (
    <div className="credit-preview">
      <div className="credit-preview-header">
        <span className="mono">
          Inside: Harbourline ERP (fictional) · Working capital
        </span>

        <span className="credit-development-badge">
          ● Preview · In development
        </span>
      </div>

      <div className="credit-preview-columns">
        <div className="credit-assessment">
          <ol className="credit-steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="credit-step-number" aria-hidden="true">
                  {index + 1}
                </span>

                <div>
                  <div className="credit-step-heading">
                    <h3>{step.title}</h3>
                    <span className="mono">{step.status}</span>
                  </div>

                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="credit-reasons">
            <h3>Why this offer</h3>

            <ul>
              {offerReasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="credit-offer">
          <p className="credit-offer-label">Offer</p>

          <p className="credit-offer-amount">R 240,000</p>

          <p className="credit-offer-term">
            6 months · funded by licensed lender
          </p>

          <div className="credit-repayment">
            <h3>Repayment schedule</h3>

            <div
              className="credit-repayment-bars"
              role="img"
              aria-label="Six-month repayment schedule: months one and two repaid, months three to six remaining."
            >
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="credit-repayment-month"
                  aria-hidden="true"
                >
                  <span
                    className={`credit-repayment-bar ${
                      index < 2 ? 'is-repaid' : ''
                    }`}
                  />
                  <span className="mono">M{index + 1}</span>
                </div>
              ))}
            </div>

            <div className="credit-repayment-summary mono">
              <span>2 of 6 repaid</span>
              <span>on schedule</span>
            </div>
          </div>
        </div>
      </div>

      <p className="credit-preview-footnote mono">
        Illustrative interface. Figures are demonstration data,
        not an offer of credit.
      </p>
    </div>
  )
}

export default function Credit() {
  return (
    <section
      id="credit"
      className="weft-section credit-section"
      aria-labelledby="credit-heading"
    >
      <div className="page-container credit-layout">
        <CreditPreview />

        <div className="credit-copy">
          <div className="section-label-row">
            <p className="section-label">
              <span aria-hidden="true">■</span>
              03 / CREDIT
            </p>

            <span className="credit-development-badge">
              ● In development
            </span>
          </div>

          <h2 id="credit-heading" className="section-title">
            Offer working capital inside your customer&apos;s workflow.
          </h2>

          <p className="section-description">
            With consent, the data already in your platform helps
            assess a business. Offers arrive explained, licensed lenders
            provide and own the capital, and repayments flow through
            the same payments infrastructure.
          </p>

          <div className="credit-disclosure">
            <p>
              We are building credit with design partners now.
              We do not lend: licensed lending partners make credit
              decisions and provide capital.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
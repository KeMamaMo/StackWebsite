import { useState } from 'react'

type WorkflowStep = {
  title: string
  description: string
  credit?: boolean
}

type Solution = {
  id: string
  title: string
  description: string
  icon: 'property' | 'commerce' | 'payroll' | 'erp' | 'fintech'
  steps: WorkflowStep[]
}

const solutions: Solution[] = [
  {
    id: 'property',
    title: 'Property platforms',
    description:
      'Rent collections, reconciliation and landlord working capital.',
    icon: 'property',
    steps: [
      {
        title: 'Collect',
        description:
          'Tenants pay rent by debit order, EFT or mobile money from the tenant portal.',
      },
      {
        title: 'Reconcile',
        description:
          'Each payment is matched to the lease and unit; shortfalls open an exception.',
      },
      {
        title: 'Pay out',
        description:
          'Landlord disbursements go out net of fees, with statements attached.',
      },
      {
        title: 'Finance',
        description:
          'Landlords see a working capital offer based on rent roll history.',
        credit: true,
      },
    ],
  },
  {
    id: 'commerce',
    title: 'POS and commerce',
    description: 'Merchant collections and stock finance.',
    icon: 'commerce',
    steps: [
      {
        title: 'Collect',
        description:
          'Merchants accept customer payments through their commerce platform.',
      },
      {
        title: 'Reconcile',
        description:
          'Payments are matched to orders, stores and merchant accounts.',
      },
      {
        title: 'Settle',
        description:
          'Merchant payouts are tracked alongside fees and settlement references.',
      },
      {
        title: 'Finance',
        description:
          'With consent, trading history supports stock-finance assessment by a licensed lender.',
        credit: true,
      },
    ],
  },
  {
    id: 'payroll',
    title: 'Payroll platforms',
    description: 'Employer payments and payroll finance.',
    icon: 'payroll',
    steps: [
      {
        title: 'Prepare',
        description:
          'The employer prepares a payroll run with recipient and payment references.',
      },
      {
        title: 'Pay out',
        description:
          'Salary payments are routed through bank or mobile money providers.',
      },
      {
        title: 'Reconcile',
        description:
          'Payment results are matched to the payroll run; returns become exceptions.',
      },
      {
        title: 'Finance',
        description:
          'Consented business data supports payroll-finance assessment by a licensed lender.',
        credit: true,
      },
    ],
  },
  {
    id: 'erp',
    title: 'ERP and accounting',
    description: 'Invoice collections and working capital.',
    icon: 'erp',
    steps: [
      {
        title: 'Collect',
        description:
          'Customers pay invoices from the business platform using supported payment methods.',
      },
      {
        title: 'Match',
        description:
          'Incoming funds are matched to the invoice and customer reference.',
      },
      {
        title: 'Post',
        description:
          'Settlement and exception events update the platform’s financial workflow.',
      },
      {
        title: 'Finance',
        description:
          'With consent, invoice and revenue history supports working-capital assessment.',
        credit: true,
      },
    ],
  },
  {
    id: 'fintech',
    title: 'Fintechs',
    description: 'Financial workflows through a shared integration.',
    icon: 'fintech',
    steps: [
      {
        title: 'Onboard',
        description:
          'Reuse a shared identity and consent model across financial workflows.',
      },
      {
        title: 'Move money',
        description:
          'Initiate collections and payouts using consistent objects and references.',
      },
      {
        title: 'Track',
        description:
          'Follow statuses, ledger records and exceptions through shared events.',
      },
      {
        title: 'Extend',
        description:
          'Introduce credit workflows through licensed lending partners as capabilities develop.',
        credit: true,
      },
    ],
  },
]

function SolutionIcon({ type }: { type: Solution['icon'] }) {
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
      {type === 'property' && (
        <>
          <path d="M6 21V5h12v16M3 21h18M3 21V11h3M21 21V11h-3" />
          <path d="M9 8h1M14 8h1M9 12h1M14 12h1M10 21v-5h4v5" />
        </>
      )}

      {type === 'commerce' && (
        <>
          <rect x="4" y="6" width="16" height="15" rx="2" />
          <path d="M4 6 7 3h10l3 3M8 10a4 4 0 0 0 8 0" />
        </>
      )}

      {type === 'payroll' && (
        <>
          <circle cx="9" cy="7" r="4" />
          <path d="M2 21v-3a7 7 0 0 1 14 0v3M17 4a4 4 0 0 1 0 8M22 21v-3a7 7 0 0 0-4-6" />
        </>
      )}

      {type === 'erp' && (
        <>
          <path d="M6 2h8l5 5v15H6V2ZM14 2v6h5" />
          <path d="M9 12h1M13 12h3M9 16h1M13 16h3" />
        </>
      )}

      {type === 'fintech' && (
        <>
          <path d="m12 2 10 5-10 5L2 7l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5" />
        </>
      )}
    </svg>
  )
}

export default function Solutions() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSolution = solutions[activeIndex]

  return (
    <section
      id="solutions"
      className="weft-section solutions-section"
      aria-labelledby="solutions-heading"
    >
      <div className="page-container">
        <p className="section-label">
          <span aria-hidden="true">■</span>
          06 / SOLUTIONS
        </p>

        <h2 id="solutions-heading" className="section-title">
          Where it fits in your platform.
        </h2>

        <p className="section-description solutions-description">
          Concrete workflows, step by step. Pick the kind of
          software you build.
        </p>

        <div className="solutions-layout">
          <div
            className="solution-options"
            role="tablist"
            aria-label="Platform type"
            aria-orientation="vertical"
          >
            {solutions.map((solution, index) => (
              <button
                key={solution.id}
                id={`solution-tab-${solution.id}`}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`solution-panel-${solution.id}`}
                tabIndex={activeIndex === index ? 0 : -1}
                className={`solution-option ${
                  activeIndex === index ? 'is-active' : ''
                }`}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => {
                  let next = index

                  if (event.key === 'ArrowDown') {
                    next = (index + 1) % solutions.length
                  } else if (event.key === 'ArrowUp') {
                    next =
                      (index - 1 + solutions.length) % solutions.length
                  } else if (event.key === 'Home') {
                    next = 0
                  } else if (event.key === 'End') {
                    next = solutions.length - 1
                  } else {
                    return
                  }

                  event.preventDefault()
                  setActiveIndex(next)

                  document
                    .getElementById(
                      `solution-tab-${solutions[next].id}`,
                    )
                    ?.focus()
                }}
              >
                <span className="solution-icon">
                  <SolutionIcon type={solution.icon} />
                </span>

                <span className="solution-option-copy">
                  <span className="solution-option-title">
                    {solution.title}
                  </span>
                  <span className="solution-option-description">
                    {solution.description}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="solution-panels">
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                id={`solution-panel-${solution.id}`}
                role="tabpanel"
                aria-labelledby={`solution-tab-${solution.id}`}
                tabIndex={0}
                hidden={activeIndex !== index}
                className="solution-workflow"
              >
                <h3>{solution.description}</h3>

                <p className="solution-workflow-label mono">
                  workflow · {solution.id}
                </p>

                <ol className="solution-steps">
                  {solution.steps.map((step, stepIndex) => (
                    <li
                      key={step.title}
                      className={step.credit ? 'is-planned' : ''}
                    >
                      <div className="solution-step-track">
                        <span className="solution-step-number">
                          {stepIndex + 1}
                        </span>
                        {stepIndex < solution.steps.length - 1 && (
                          <span
                            className="solution-step-connector"
                            aria-hidden="true"
                          />
                        )}
                      </div>

                      <h4>{step.title}</h4>

                      <p>{step.description}</p>

                      <span
                        className={
                          step.credit
                            ? 'credit-development-badge'
                            : 'solution-available'
                        }
                      >
                        {step.credit
                          ? '● Credit · In development'
                          : '● Available'}
                      </span>
                    </li>
                  ))}
                </ol>

                {solution.id !== 'property' && (
                  <p className="solution-example-note">
                    Illustrative workflow for review. Availability
                    depends on the selected market and provider.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="solution-lending-note">
          Credit workflows are in development. Licensed lending
          partners make credit decisions and provide capital.
          Selected platform: {activeSolution.title}.
        </p>
      </div>
    </section>
  )
}
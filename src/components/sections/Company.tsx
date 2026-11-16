const lessons = [
  {
    number: '01',
    title: 'Provider onboarding, again and again',
    description:
      'Each new rail or country meant another due-diligence pack, contract, sandbox and certification cycle before a single payment moved.',
  },
  {
    number: '02',
    title: 'Integrations that never quite agreed',
    description:
      'Every provider described success, failure and pending differently. Our product logic filled up with translation code.',
  },
  {
    number: '03',
    title: 'Reconciliation as a daily job',
    description:
      'Matching settlement files to what our app believed had happened took people, spreadsheets and late nights.',
  },
]

const markets = [
  {
    country: 'South Africa',
    status: 'Payments',
    planned: false,
  },
  {
    country: 'Kenya',
    status: 'Payments',
    planned: false,
  },
  {
    country: 'Nigeria',
    status: 'Planned expansion',
    planned: true,
  },
]

export default function Company() {
  return (
    <section
      id="company"
      className="weft-section company-section"
      aria-labelledby="company-heading"
    >
      <div className="page-container company-layout">
        <div className="company-copy">
          <p className="section-label">
            <span className="text-lime" aria-hidden="true">
              ■
            </span>
            08 / WHY WE&apos;RE BUILDING THIS
          </p>

          <h2 id="company-heading" className="section-title">
            We built the plumbing{' '}
            <span className="company-highlight">
              the hard way
            </span>{' '}
            first.
          </h2>

          <p className="section-description">
            While building Knit across South Africa and Kenya,
            our team ran into the same work repeatedly. This
            infrastructure is what we wished had existed.
          </p>

          <div className="company-footprint">
            <h3>Footprint</h3>

            <dl className="company-market-list">
              {markets.map((market) => (
                <div
                  key={market.country}
                  className={
                    market.planned ? 'company-market-planned' : ''
                  }
                >
                  <dt>{market.country}</dt>

                  <dd>
                    <span
                      className={
                        market.planned
                          ? 'company-market-badge is-planned'
                          : 'company-market-badge'
                      }
                    >
                      <span aria-hidden="true">●</span>
                      {market.status}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="company-footprint-note mono">
              Credit in both launch markets is in development
              with licensed lending partners.
            </p>
          </div>
        </div>

        <div className="company-lessons">
          {lessons.map((lesson) => (
            <article
              key={lesson.number}
              className="company-lesson"
            >
              <span className="company-lesson-number mono">
                {lesson.number}
              </span>

              <h3>{lesson.title}</h3>

              <p>{lesson.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
import { useEffect, useRef, useState } from 'react'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'

export default function App() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    return () => dialog?.close()
  }, [])

  function openContact() {
    dialogRef.current?.showModal()
  }

  async function copyExample() {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(
          {
            amount: { value: 845000, currency: 'ZAR' },
            payer: { customer_id: 'cus_8fK2tenant' },
            method: 'bank_transfer',
            reference: 'LS-2207-MAR',
          },
          null,
          2,
        ),
      )
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Navbar onContact={openContact} />

      <main id="main-content">
        <Hero onContact={openContact} />

        <section id="api" className="page-container developer-preview">
          <div>
            <p className="section-eyebrow">Developer preview</p>
            <h2>One integration. Consistent objects.</h2>
            <p className="supporting-copy">
              API examples are illustrative. Published API documentation will
              follow separately.
            </p>
          </div>

          <div className="code-card">
            <div className="code-header">
              <code>POST /v1/collections</code>
              <button onClick={copyExample}>
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>
            <pre>
              <code>{`{
  "amount": { "value": 845000, "currency": "ZAR" },
  "payer": { "customer_id": "cus_8fK2tenant" },
  "method": "bank_transfer",
  "reference": "LS-2207-MAR"
}`}</code>
            </pre>
          </div>
        </section>
      </main>

      <footer id="company" className="page-container site-footer">
        <strong>weft</strong>
        <p>
          Financial API infrastructure for software platforms in Africa.
          Licensed lending partners provide capital.
        </p>
        <span>Prototype · South Africa · Kenya</span>
      </footer>

      <dialog
        ref={dialogRef}
        className="contact-dialog"
        aria-labelledby="contact-heading"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            dialogRef.current?.close()
          }
        }}
      >
        <div className="dialog-content">
          <p className="section-eyebrow">Start a conversation</p>
          <h2 id="contact-heading">
            Bring financial products into your platform.
          </h2>
          <p>
            The contact form will be added in the next section. This prototype
            does not send or store enquiries.
          </p>
          <button
            className="button button-primary"
            onClick={() => dialogRef.current?.close()}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  )
}
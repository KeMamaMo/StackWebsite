import { useRef, useState } from 'react'
import type { FormEvent } from 'react'

type FormValues = {
  name: string
  email: string
  company: string
  country: string
  description: string
  capability: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = {
  name: '',
  email: '',
  company: '',
  country: '',
  description: '',
  capability: '',
}

const capabilities = ['Collections', 'Payouts', 'Credit', 'Multiple']

const processSteps = [
  'You describe the workflow',
  'We map providers and statuses',
  'We agree a first integration',
]

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle')

  const submitting = useRef(false)

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setStatus('idle')

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return

    const form = event.currentTarget
    const nextErrors: FormErrors = {}

    if (!values.name.trim()) {
      nextErrors.name = 'Enter your name.'
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Enter your work email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!values.company.trim()) {
      nextErrors.company = 'Enter your company name.'
    }

    if (!values.country) {
      nextErrors.country = 'Select a country.'
    }

    if (!values.description.trim()) {
      nextErrors.description = 'Tell us what you are building.'
    }

    if (!values.capability) {
      nextErrors.capability = 'Select the capability you need.'
    }

    setErrors(nextErrors)
    setStatus('idle')

    const firstError = (
      Object.keys(nextErrors) as Array<keyof FormValues>
    )[0]

    if (firstError) {
      form.querySelector<HTMLElement>(
        `[name="${firstError}"]`,
      )?.focus()
      return
    }

    submitting.current = true
    setStatus('sending')

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 60000)

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/info@weft.cash',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          signal: controller.signal,
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            company: values.company.trim(),
            country: ({
              ZA: 'South Africa',
              KE: 'Kenya',
              NG: 'Nigeria',
              OTHER: 'Other',
            } as Record<string, string>)[values.country],
            description: values.description.trim(),
            capability: values.capability,
            _subject: 'New Weft integration enquiry',
            _template: 'table',
            _replyto: values.email.trim(),
            _honey: new FormData(form).get('_honey') || '',
          }),
        },
      )

      const result: { success?: boolean | string } = await response.json()

      if (
        !response.ok ||
        !(result.success === true || result.success === 'true')
      ) {
        throw new Error('Submission was not accepted.')
      }

      setValues({ ...initialValues })
      setErrors({})
      setStatus('success')
    } catch {
      // Preserve the visitor's entries so they can try again.
      setStatus('error')
    } finally {
      window.clearTimeout(timeout)
      submitting.current = false
    }
  }

  return (
    <section
      id="contact"
      className="weft-section contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="page-container contact-layout">
        <div className="contact-copy">
          <p className="section-label">
            <span aria-hidden="true">■</span>
            09 / START A CONVERSATION
          </p>

          <h2 id="contact-heading" className="section-title">
            Bring financial products into your platform.
          </h2>

          <p className="section-description">
            Tell us what your customers need to collect, pay or
            finance. Let&apos;s map the integration.
          </p>

          <ol className="contact-process">
            {processSteps.map((step, index) => (
              <li key={step}>
                <span
                  className="contact-process-number"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Integration enquiry"
          aria-busy={status === 'sending'}
        >
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="contact-website">Leave this empty</label>
            <input
              id="contact-website"
              name="_honey"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <fieldset
            disabled={status === 'sending'}
            style={{
              border: 0,
              padding: 0,
              margin: 0,
              minWidth: 0,
            }}
          >
            <div className="contact-fields">
              <div className="contact-field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={120}
                  value={values.name}
                  onChange={(event) =>
                    updateField('name', event.target.value)
                  }
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? 'contact-name-error' : undefined
                  }
                />
                {errors.name && (
                  <p id="contact-name-error" className="contact-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">Work email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={values.email}
                  onChange={(event) =>
                    updateField('email', event.target.value)
                  }
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? 'contact-email-error' : undefined
                  }
                />
                {errors.email && (
                  <p id="contact-email-error" className="contact-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="contact-field">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  autoComplete="organization"
                  required
                  maxLength={160}
                  value={values.company}
                  onChange={(event) =>
                    updateField('company', event.target.value)
                  }
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={
                    errors.company ? 'contact-company-error' : undefined
                  }
                />
                {errors.company && (
                  <p id="contact-company-error" className="contact-error">
                    {errors.company}
                  </p>
                )}
              </div>

              <div className="contact-field">
                <label htmlFor="contact-country">Country</label>
                <select
                  id="contact-country"
                  name="country"
                  required
                  value={values.country}
                  onChange={(event) =>
                    updateField('country', event.target.value)
                  }
                  aria-invalid={Boolean(errors.country)}
                  aria-describedby={
                    errors.country ? 'contact-country-error' : undefined
                  }
                >
                  <option value="">Select a country</option>
                  <option value="ZA">South Africa</option>
                  <option value="KE">Kenya</option>
                  <option value="NG">Nigeria</option>
                  <option value="OTHER">Other</option>
                </select>
                {errors.country && (
                  <p id="contact-country-error" className="contact-error">
                    {errors.country}
                  </p>
                )}
              </div>

              <div className="contact-field contact-field-full">
                <label htmlFor="contact-description">
                  What are you building?
                </label>
                <textarea
                  id="contact-description"
                  name="description"
                  rows={5}
                  required
                  maxLength={3000}
                  placeholder="e.g. Property management software for 1,200 landlords in Nairobi; we want to collect rent and pay landlords."
                  value={values.description}
                  onChange={(event) =>
                    updateField('description', event.target.value)
                  }
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={
                    errors.description
                      ? 'contact-description-error'
                      : undefined
                  }
                />
                {errors.description && (
                  <p
                    id="contact-description-error"
                    className="contact-error"
                  >
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            <fieldset
              className="contact-capabilities"
              aria-describedby={
                errors.capability ? 'contact-capability-error' : undefined
              }
            >
              <legend>Capabilities needed</legend>

              <div className="contact-capability-options">
                {capabilities.map((capability) => (
                  <label
                    key={capability}
                    className="contact-capability"
                  >
                    <input
                      type="radio"
                      name="capability"
                      value={capability}
                      required
                      checked={values.capability === capability}
                      onChange={(event) =>
                        updateField('capability', event.target.value)
                      }
                      aria-invalid={Boolean(errors.capability)}
                      aria-describedby={
                        errors.capability
                          ? 'contact-capability-error'
                          : undefined
                      }
                    />
                    <span>{capability}</span>
                  </label>
                ))}
              </div>

              {errors.capability && (
                <p
                  id="contact-capability-error"
                  className="contact-error"
                >
                  {errors.capability}
                </p>
              )}
            </fieldset>

            <div className="contact-submit-row">
              <p className="mono">
                Your enquiry goes to the Weft team.
              </p>

              <button
                type="submit"
                className="contact-submit-button"
                disabled={status === 'sending'}
              >
                {status === 'sending'
                  ? 'Sending…'
                  : 'Discuss your integration'}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </fieldset>

          <div role="status" aria-live="polite">
            {status === 'success' && (
              <p className="contact-validation-success">
                ✓ Thank you! Your enquiry has been submitted.
                The Weft team will be in touch.
              </p>
            )}
          </div>

          {status === 'error' && (
            <p className="contact-error" role="alert">
              We could not confirm your submission. Your entries are
              still here. Please try again, or email{' '}
              <a href="mailto:info@weft.cash">info@weft.cash</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
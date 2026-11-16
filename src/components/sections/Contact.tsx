import { useState } from 'react'
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
  const [validated, setValidated] = useState(false)

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setValidated(false)

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

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
    setValidated(false)

    const firstError = (
      Object.keys(nextErrors) as Array<keyof FormValues>
    )[0]

    if (firstError) {
      form.querySelector<HTMLElement>(
        `[name="${firstError}"]`,
      )?.focus()
      return
    }

    setValidated(true)
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
                <span className="contact-process-number" aria-hidden="true">
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
          aria-label="Integration enquiry prototype"
          aria-describedby="contact-prototype-notice"
        >
          <div
            id="contact-prototype-notice"
            className="contact-prototype-notice"
          >
            <span className="contact-notice-icon" aria-hidden="true">
              ⚗
            </span>
            <p>
              <strong>Prototype form.</strong> This form checks your
              entries but is not connected to anything yet.
              Nothing you type is sent, stored or seen by anyone.
            </p>
          </div>

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
              Prototype: submitting checks your entries only.
              Nothing is sent.
            </p>

            <button type="submit" className="contact-submit-button">
              Discuss your integration
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div role="status" aria-live="polite">
            {validated && (
              <p className="contact-validation-success">
                ✓ Your entries passed validation. This is a prototype:
                nothing has been sent or saved.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
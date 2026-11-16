import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import IntegrationProblem from './components/sections/IntegrationProblem'
import Payments from './components/sections/Payments'
import Credit from './components/sections/Credit'
import Infrastructure from './components/sections/Infrastructure'
import Developers from './components/sections/Developers'
import Solutions from './components/sections/Solutions'
import Operations from './components/sections/Operations'
import Company from './components/sections/Company'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'

export default function App() {
  function openContact() {
    const section = document.getElementById('contact')
    const heading = document.getElementById('contact-heading')

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    section?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })

    if (heading) {
      heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
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
        <IntegrationProblem />
        <Payments />
        <Credit />
        <Infrastructure />
        <Developers />
        <Solutions />
        <Operations />
        <Company />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
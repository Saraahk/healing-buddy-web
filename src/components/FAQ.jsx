import { useState } from 'react'
import './FAQ.css'

const faqs = [
  { q: 'How do I get started with Healing Buddy?' },
  { q: 'Is patient data secure on this platform?' },
  { q: 'Can I manage multiple patients at once?' },
  { q: 'How does online session scheduling work?' },
  { q: 'What support is available for doctors?' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="faq" id="faq">
      <div className="faq__inner">
        <div className="faq__header">
          <div className="faq__header-left">
            <p className="faq__eyebrow">Have a question?</p>
            <h2 className="faq__title">We are here to answer</h2>
          </div>
          <div className="faq__header-right">
            <p className="faq__contact-text">
              Still confused? No need to worry, contact us
            </p>
            <button className="btn btn--primary">Contact Us</button>
          </div>
        </div>

        <div className="faq__list">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`faq__item ${openIndex === i ? 'faq__item--open' : ''}`}
              onClick={() => toggle(i)}
            >
              <div className="faq__question">
                <span>{item.q}</span>
                <span className="faq__icon">{openIndex === i ? '−' : '+'}</span>
              </div>
              <div className="faq__answer">
                <p>Answer coming soon...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

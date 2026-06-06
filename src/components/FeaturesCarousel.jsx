import './FeaturesCarousel.css'

// Placeholder cards - fill in content later
const featureCards = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
]

export default function FeaturesCarousel() {
  const allCards = [...featureCards, ...featureCards]

  return (
    <section className="features">
      <div className="features__track-wrapper">
        <div className="features__track">
          {allCards.map((card, i) => (
            <div className="features__card" key={`${card.id}-${i}`}>
              <div className="features__card-icon" />
              <div className="features__card-line" />
              <div className="features__card-line features__card-line--short" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

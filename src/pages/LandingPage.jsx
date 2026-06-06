import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import FeaturesCarousel from '../components/FeaturesCarousel'
import FAQ from '../components/FAQ'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesCarousel />
        <FAQ />
      </main>
    </>
  )
}

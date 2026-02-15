import Hero from '../components/Hero'
import SDGBanners from '../components/SDGBanners'
import ImpactCounters from '../components/ImpactCounters'
import HowItWorks from '../components/HowItWorks'

const Home = () => {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Nossa Metodologia */}
      <HowItWorks />

      {/* Nosso Impacto */}
      <ImpactCounters />

      {/* Contribuímos para os Objetivos de Desenvolvimento Sustentável */}
      <SDGBanners />
    </div>
  )
}

export default Home

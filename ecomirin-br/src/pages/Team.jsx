import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import useScrollReveal from '../components/useScrollReveal'
import TeamCard from '../components/TeamCard'
import PageHero from '../components/PageHero'
import pedroAmaroImg from '../assets/team/pedro-amaro.jpeg'
import arthurPiatetzkyImg from '../assets/team/arthur-piatetzky.jpeg'
import eduardoVilelaImg from '../assets/team/eduardo-vilela.jpeg'
import gabrielBendenounImg from '../assets/team/gabriel-bendenoun.jpeg'

const Team = () => {
  const { t } = useLanguage()
  const [containerRef, isContainerRevealed] = useScrollReveal({ threshold: 0.1 })

  const teamMembers = [
    { name: "Pedro Amaro", positionKey: "team.founder", bioKey: "team.bioPedro", email: "pedro.amaro@ecomirim.eco.br", image: pedroAmaroImg },
    { name: "Eduardo Vilela", positionKey: "team.cofounderCreative", bioKey: "team.bioEduardo", email: "eduardo.vilela@ecomirim.eco.br", image: eduardoVilelaImg },
    { name: "Arthur Piatetzky", positionKey: "team.cofounderTreasurer", bioKey: "team.bioArthur", email: "arthur.piatetzky@ecomirim.eco.br", image: arthurPiatetzkyImg },
    { name: "Gabriel Bendenoun", positionKey: "team.cofounderComms", bioKey: "team.bioGabriel", email: "gabriel.bendenoun@ecomirim.eco.br", image: gabrielBendenounImg, imagePosition: '50% 18%' }
  ]

  return (
    <div className="min-h-screen">
      <div 
        ref={containerRef}
        className={`scroll-reveal ${isContainerRevealed ? 'revealed' : ''}`}
      >
        {/* Hero Section */}
        <PageHero 
          title={t('team.title')}
          subtitle={t('team.subtitle')}
        />

        {/* Time Principal */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('team.mainTeam')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <TeamCard
                  key={index}
                  member={{ ...member, position: t(member.positionKey), bio: member.bioKey ? t(member.bioKey) : null }}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 gradient-green">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {t('team.cta')}
            </h2>
            <div className="flex justify-center">
              <Link
                to="/se-envolver"
                className="bg-white text-green-1 px-8 py-4 rounded-2xl font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                {t('team.contact')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Team

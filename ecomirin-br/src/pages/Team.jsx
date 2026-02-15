import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import useScrollReveal from '../components/useScrollReveal'
import TeamCard from '../components/TeamCard'
import PageHero from '../components/PageHero'

const Team = () => {
  const { t } = useLanguage()
  const [containerRef, isContainerRevealed] = useScrollReveal({ threshold: 0.1 })

  const teamMembers = [
    { name: "Pedro Amaro", positionKey: "team.founder", email: "pedro.amaro@ecomirim.eco.br" },
    { name: "Eduardo Vilela", positionKey: "team.cofounderCreative", email: "eduardo.vilela@ecomirim.eco.br" },
    { name: "Arthur Piatetzky", positionKey: "team.cofounderTreasurer", email: "arthur.piatetzky@ecomirim.eco.br" },
    { name: "Gabriel Bendenoun", positionKey: "team.cofounderComms", email: "gabriel.bendenoun@ecomirim.eco.br" }
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
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('team.mainTeamDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <TeamCard
                  key={index}
                  member={{ ...member, position: t(member.positionKey) }}
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

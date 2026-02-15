import { useLanguage } from '../context/LanguageContext'
import useScrollReveal from '../components/useScrollReveal'
import CycleOfImpact from '../components/CycleOfImpact'
import educacaoImage from '../assets/IMG_4562.jpg'
import bannerXText from '../assets/banner-xtext.jpg'

const Mission = () => {
  const { t } = useLanguage()
  const [containerRef, isContainerRevealed] = useScrollReveal({ threshold: 0.1 })

  const values = [
    {
      title: "Sustentabilidade",
      description: "Acreditamos que a educação ambiental é fundamental para um futuro sustentável e equilibrado.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: "Educação",
      description: "Promovemos o aprendizado prático e experiencial como base para mudanças comportamentais duradouras.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Comunidade",
      description: "Trabalhamos em parceria com escolas, famílias e comunidades para criar impacto coletivo positivo.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Inovação",
      description: "Utilizamos métodos criativos e tecnológicos para tornar a educação ambiental mais eficaz e envolvente.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ]

  return (
    <div className="min-h-screen">
      <div 
        ref={containerRef}
        className={`scroll-reveal ${isContainerRevealed ? 'revealed' : ''}`}
      >
        {/* Hero Section */}
        <section className="relative w-full">
          <div className="relative w-full">
            <img 
              src={bannerXText} 
              alt="Nossa Missão" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 md:px-12 w-full">
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white">
                  {t('mission.title')}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Missão Principal */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {t('mission.sectionTitle')}
                </h2>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>{t('mission.p1')}</p>
                  <p>{t('mission.p2')}</p>
                  <p>{t('mission.p3')}</p>
                </div>
              </div>
              
              {/* Imagem Educacional */}
              <div className="flex justify-center">
                <div className="relative max-w-lg w-full group">
                  {/* Container com design language do site */}
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white p-4 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {/* Gradient overlay sutil para integração com o design */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-transparent pointer-events-none z-10 rounded-2xl" />
                    
                    {/* Imagem com aspect ratio preservado */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-50">
                      <img 
                        src={educacaoImage} 
                        alt="Educação que Transforma - EcoMirim promovendo educação ambiental prática e envolvente através de caixas decoradas e reciclagem criativa"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
            </div>

                    {/* Decorative border accent matching site colors */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--green-1)] via-[var(--green-2)] to-[var(--green-1)] rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ciclo de Impacto - Valores Interativos */}
        <CycleOfImpact />
      </div>
    </div>
  )
}

export default Mission

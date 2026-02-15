import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import useScrollReveal from './useScrollReveal'

const ImpactCounters = () => {
  const { language, t } = useLanguage()
  const [containerRef, isContainerRevealed] = useScrollReveal({ threshold: 0.3 })
  const [counters, setCounters] = useState({
    schools: 0,
    students: 0,
    neighborhoods: 0,
    trees: 0
  })

  const targetCounters = {
    schools: 3,
    students: 150,
    neighborhoods: 2,
    trees: 2
  }

  useEffect(() => {
    if (isContainerRevealed) {
      const duration = 2000 // 2 segundos
      const steps = 60
      const stepDuration = duration / steps

      const animateCounter = (key, target) => {
        let current = 0
        const increment = target / steps

        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          setCounters(prev => ({ ...prev, [key]: current }))
        }, stepDuration)
      }

      // Animar cada contador
      Object.entries(targetCounters).forEach(([key, target]) => {
        animateCounter(key, target)
      })
    }
  }, [isContainerRevealed])

  const impactData = [
    {
      id: 'schools',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      value: Math.round(counters.schools),
      suffix: '',
      labelKey: 'impact.schools',
      descKey: 'impact.schoolsDesc'
    },
    {
      id: 'students',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      value: Math.round(counters.students).toLocaleString(language === 'en' ? 'en-US' : 'pt-BR'),
      suffix: '+',
      labelKey: 'impact.students',
      descKey: 'impact.studentsDesc'
    },
    {
      id: 'neighborhoods',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      value: Math.round(counters.neighborhoods),
      suffix: '',
      labelKey: 'impact.neighborhoods',
      descKey: 'impact.neighborhoodsDesc'
    },
    {
      id: 'trees',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      value: Math.round(counters.trees),
      suffix: '',
      labelKey: 'impact.activities',
      descKey: 'impact.activitiesDesc'
    }
  ]

  return (
    <section className="py-12 gradient-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={containerRef}
          className={`scroll-reveal ${isContainerRevealed ? 'revealed' : ''}`}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {t('impact.title')}
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              {t('impact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactData.map((item, index) => (
              <div
                key={item.id}
                className="text-center group"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: isContainerRevealed ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 group-hover:bg-white/20 transition-all duration-300">
                  <div className="text-white mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <div className="mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-white">
                      {item.value}
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-white/80">
                      {item.suffix}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {t(item.labelKey)}
                  </h3>
                  <p className="text-sm text-white/80">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImpactCounters

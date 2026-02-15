import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import useScrollReveal from './useScrollReveal'
import sdg4Pt from '../assets/sdg-banners/ODS-4.png'
import sdg4En from '../assets/sdg-banners/SDG 4 ENG.png'
import sdg12Pt from '../assets/sdg-banners/ODS-12.png'
import sdg12En from '../assets/sdg-banners/SDG 12 ENG.png'
import sdg13 from '../assets/sdg-banners/SDG 13.png'
import sdg13En from '../assets/sdg-banners/SDG 13 ENG.png'
import sdg15Pt from '../assets/sdg-banners/ODS-15.png'
import sdg15En from '../assets/sdg-banners/SDG 15 ENG.png'

const ODSCard = ({ imgSrc, title, description, impactText, delay, seeMore }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [cardRef, isCardRevealed] = useScrollReveal({ threshold: 0.2, delay })

  return (
    <div
      ref={cardRef}
      className={`scroll-reveal ${isCardRevealed ? 'revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden cursor-pointer border border-gray-100/50 hover:border-[var(--green-1)]/20 flex flex-col"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
      >
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--green-1)]/0 to-[var(--green-2)]/0 group-hover:from-[var(--green-1)]/5 group-hover:to-[var(--green-2)]/5 transition-all duration-500 pointer-events-none"></div>
        
        {/* ODS Banner Image - Square Frame with elegant styling */}
        <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 group-hover:p-3 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--green-1)]/0 to-[var(--green-2)]/0 group-hover:from-[var(--green-1)]/3 group-hover:to-[var(--green-2)]/3 transition-all duration-500 rounded-t-2xl"></div>
          <img 
            src={imgSrc} 
            alt={title}
            className="relative z-10 w-full h-full object-contain transition-all duration-500 ease-out group-hover:scale-105 drop-shadow-sm"
          />
        </div>

        {/* Card Content */}
        <div className="relative z-10 p-6 flex-1 flex flex-col">
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[var(--green-1)] transition-colors duration-500 leading-tight">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Expandable Impact Section */}
          <div 
            className={`transition-all duration-500 ease-out overflow-hidden ${
              isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--green-1)] to-[var(--green-2)] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed flex-1">
                  {impactText}
                </p>
              </div>
            </div>
          </div>

          {/* Hover Indicator */}
          <div className={`mt-4 flex items-center justify-center transition-all duration-300 ${
            isExpanded ? 'opacity-0 h-0 mt-0' : 'opacity-60 group-hover:opacity-100 h-6'
          }`}>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">{seeMore}</span>
            <svg 
              className="w-4 h-4 ml-2 text-gray-400 group-hover:text-[var(--green-1)] transition-all duration-300 group-hover:translate-y-1"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

const SDGBanners = () => {
  const { language, t } = useLanguage()
  const [containerRef, isContainerRevealed] = useScrollReveal({ threshold: 0.1 })
  const isEn = language === 'en'

  const sdgGoals = [
    { id: 4, imgSrcPt: sdg4Pt, imgSrcEn: sdg4En, titleKey: 'sdg.sdg4Title', shortKey: 'sdg.sdg4Short', impactKey: 'sdg.sdg4Impact' },
    { id: 12, imgSrcPt: sdg12Pt, imgSrcEn: sdg12En, titleKey: 'sdg.sdg12Title', shortKey: 'sdg.sdg12Short', impactKey: 'sdg.sdg12Impact' },
    { id: 13, imgSrcPt: sdg13, imgSrcEn: sdg13En, titleKey: 'sdg.sdg13Title', shortKey: 'sdg.sdg13Short', impactKey: 'sdg.sdg13Impact' },
    { id: 15, imgSrcPt: sdg15Pt, imgSrcEn: sdg15En, titleKey: 'sdg.sdg15Title', shortKey: 'sdg.sdg15Short', impactKey: 'sdg.sdg15Impact' },
  ]

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--green-1)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--green-2)] rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={containerRef}
          className={`scroll-reveal ${isContainerRevealed ? 'revealed' : ''}`}
        >
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
            <div className="inline-block mb-4">
              <span className="text-xs font-semibold text-[var(--green-1)] uppercase tracking-widest px-4 py-2 bg-[var(--green-1)]/10 rounded-full">
                {t('sdg.badge')}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {t('sdg.title')}
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {t('sdg.subtitle')}
            </p>
          </div>

          {/* ODS Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16 items-start">
            {sdgGoals.map((goal, index) => (
              <ODSCard
                key={goal.id}
                imgSrc={isEn ? goal.imgSrcEn : goal.imgSrcPt}
                title={t(goal.titleKey)}
                description={t(goal.shortKey)}
                impactText={t(goal.impactKey)}
                delay={index * 100}
                seeMore={t('sdg.seeMore')}
              />
            ))}
          </div>

          {/* Section Footer / CTA */}
          <div className="text-center pt-8 border-t border-gray-200/50">
            <p className="text-gray-600 mb-6 text-base md:text-lg">
              {t('sdg.cta')}
            </p>
            <a
              href={isEn ? 'https://sdgs.un.org/goals' : 'https://brasil.un.org/pt-br/sdgs'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[var(--green-1)] to-[var(--green-2)] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            >
              <span>{t('sdg.learnMore')}</span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SDGBanners

import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import useScrollReveal from './useScrollReveal'
import img0589 from '../assets/IMG_0589.jpg'
import img0584 from '../assets/IMG_0584.jpg'
import img0587 from '../assets/IMG_0587.jpg'
import img0572 from '../assets/IMG_0572.jpg'
import img0582 from '../assets/IMG_0582.jpg'

const HowItWorks = () => {
  const { t } = useLanguage()
  const [containerRef, isContainerRevealed] = useScrollReveal({ threshold: 0.01, rootMargin: '0px 0px -100px 0px' })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(false)
  
  const images = [img0589, img0584, img0587, img0572, img0582]

  const steps = [
    { id: 1, titleKey: 'methodology.firstContact', descKey: 'methodology.firstContactDesc', color: 'from-[var(--green-1)] to-[var(--green-2)]' },
    { id: 2, titleKey: 'methodology.creativeProcess', descKey: 'methodology.creativeProcessDesc', color: 'from-green-500 to-green-600' },
    { id: 3, titleKey: 'methodology.workshops', descKey: 'methodology.workshopsDesc', color: 'from-[var(--green-3)] to-green-600' },
    { id: 4, titleKey: 'methodology.regrouping', descKey: 'methodology.regroupingDesc', color: 'from-[var(--green-1)] to-[var(--green-2)]' },
  ]

  // Check if section is visible on mount (since it's the first section after hero)
  useEffect(() => {
    const checkVisibility = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
        
        // If element is in viewport or close to it (within 300px), reveal immediately
        if (rect.top < windowHeight + 300) {
          setIsInitiallyVisible(true)
        }
      }
    }
    
    // Check immediately
    checkVisibility()
    // Also check after layout is complete
    const timeout = setTimeout(checkVisibility, 50)
    // And on window load
    window.addEventListener('load', checkVisibility)
    
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('load', checkVisibility)
    }
  }, [containerRef])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [images.length])

  const stepIcons = [
    <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    <svg key="4" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={containerRef}
          className={`scroll-reveal ${isContainerRevealed || isInitiallyVisible ? 'revealed' : ''}`}
        >
          {/* Top Section: Slider + Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 md:mb-16">
            {/* Left: Image Slider */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <div className="relative w-full h-full">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`EcoMirim atividade ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Slider Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Text Section */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {t('methodology.title')}
              </h2>
              <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>{t('methodology.intro1')}</p>
                <p>{t('methodology.intro2')}</p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Steps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="opacity-100 transform translate-y-0 transition-all duration-500"
                style={{ transitionDelay: isContainerRevealed ? `${index * 100}ms` : '0ms' }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out border border-gray-100 group cursor-pointer relative overflow-hidden">
                  {/* Subtle background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out shadow-lg group-hover:shadow-xl`}>
                        {stepIcons[index]}
                      </div>
                    </div>
                    <div className="text-center mb-3">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{t('methodology.step')} {step.id}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 text-center group-hover:text-[var(--green-1)] transition-colors duration-500 ease-out">
                      {t(step.titleKey)}
                    </h3>
                    <div className="overflow-hidden max-h-0 group-hover:max-h-[500px] transition-all duration-500 ease-out">
                      <p className="text-sm text-gray-600 leading-relaxed text-center opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 transition-all duration-500 ease-out pt-2">
                        {t(step.descKey)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

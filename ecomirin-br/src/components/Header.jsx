import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import logo from '../assets/logo.png'
import flagBrazil from '../assets/Flag_of_Brazil.svg.png'
import flagUS from '../assets/Flag_of_the_United_States.svg.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const { language, setLanguage, t } = useLanguage()

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/nossa-missao', label: t('nav.mission') },
    { to: '/galeria', label: t('nav.activities') },
    { to: '/time', label: t('nav.team') },
    { to: '/se-envolver', label: t('nav.getInvolved') }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={`sticky top-0 z-40 bg-white/60 backdrop-blur-sm shadow-sm transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/60 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={scrollToTop}
            className="flex items-center"
          >
            <img 
              src={logo} 
              alt="EcoMirim Logo" 
              className="h-32 md:h-36 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={link.to === '/' ? scrollToTop : undefined}
                className={`text-sm font-medium text-slate-700 hover:text-[var(--green-1)] transition-colors duration-200 ${
                  location.pathname === link.to ? 'text-[var(--green-1)]' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language switcher - Desktop: two flags, selected slightly bigger */}
          <div className="hidden md:flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLanguage('pt')}
              className={`p-1.5 rounded-md transition-all duration-200 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--green-1)] focus:ring-offset-1 ${language === 'pt' ? 'opacity-100 scale-110' : 'opacity-60 hover:scale-105'}`}
              aria-label="Português"
              title="Português"
            >
              <img src={flagBrazil} alt="" className={language === 'pt' ? 'w-10 h-7 object-cover' : 'w-9 h-6 object-cover'} />
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`p-1.5 rounded-md transition-all duration-200 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--green-1)] focus:ring-offset-1 ${language === 'en' ? 'opacity-100 scale-110' : 'opacity-60 hover:scale-105'}`}
              aria-label="English"
              title="English"
            >
              <img src={flagUS} alt="" className={language === 'en' ? 'w-10 h-7 object-cover' : 'w-9 h-6 object-cover'} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm border-t">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={link.to === '/' ? scrollToTop : undefined}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-[var(--green-1)] bg-green-50'
                      : 'text-slate-700 hover:text-[var(--green-1)] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-3 py-2 flex items-center justify-center gap-2">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{language === 'pt' ? 'Idioma' : 'Language'}</span>
                <button
                  type="button"
                  onClick={() => setLanguage('pt')}
                  className={`p-2 rounded-md transition-all ${language === 'pt' ? 'opacity-100 scale-110 ring-2 ring-[var(--green-1)]' : 'opacity-70'}`}
                  aria-label="Português"
                >
                  <img src={flagBrazil} alt="" className="w-10 h-7 object-cover" />
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`p-2 rounded-md transition-all ${language === 'en' ? 'opacity-100 scale-110 ring-2 ring-[var(--green-1)]' : 'opacity-70'}`}
                  aria-label="English"
                >
                  <img src={flagUS} alt="" className="w-10 h-7 object-cover" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import useScrollReveal from '../components/useScrollReveal'
import PageHero from '../components/PageHero'

const GetInvolved = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    school: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [containerRef, isContainerRevealed] = useScrollReveal({ threshold: 0.1 })

  const contactInfo = [
    {
      title: t('getInvolved.phone'),
      content: "(11) 94231-5757",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      title: t('getInvolved.email'),
      content: "equipe@ecomirim.eco.br",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  const involvementTypes = [
    {
      id: 'school',
      title: t('getInvolved.schoolOption'),
      description: t('getInvolved.schoolOptionDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'partner',
      title: t('getInvolved.partnerOption'),
      description: t('getInvolved.partnerOptionDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      ),
      color: 'from-[var(--green-3)] to-green-600'
    }
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t('getInvolved.errorName')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('getInvolved.errorEmail')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('getInvolved.errorEmailInvalid')
    }

    if (!formData.type) {
      newErrors.type = t('getInvolved.errorType')
    }

    if (!formData.message.trim()) {
      newErrors.message = t('getInvolved.errorMessage')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Mock da submissão
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Formulário enviado:', formData)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setErrors({ submit: t('getInvolved.errorSubmit') })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleTypeSelect = (typeId) => {
    setFormData(prev => ({ ...prev, type: typeId }))
    if (errors.type) {
      setErrors(prev => ({ ...prev, type: '' }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 pb-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="card text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('getInvolved.thankYou')}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {t('getInvolved.thankYouMessage')}
            </p>
            <a
              href="/"
              className="btn-cta"
            >
              {t('getInvolved.backHome')}
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      <div 
        ref={containerRef}
        className={`scroll-reveal ${isContainerRevealed ? 'revealed' : ''}`}
      >
        {/* Hero Banner */}
        <PageHero 
          title={t('getInvolved.title')}
          subtitle={t('getInvolved.subtitle')}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
          <div>

          {/* Formas de participação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {involvementTypes.map((type, index) => (
              <div
                key={type.id}
                className={`card cursor-pointer transition-all duration-300 ${
                  formData.type === type.id 
                    ? 'ring-2 ring-green-2 bg-green-50' 
                    : 'hover:shadow-xl'
                }`}
                onClick={() => handleTypeSelect(type.id)}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${type.color} flex items-center justify-center text-white mb-6`}>
                  {type.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {type.description}
                </p>
                {formData.type === type.id && (
                  <div className="mt-4 flex items-center text-green-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">{t('getInvolved.selected')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Formulário */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('getInvolved.formTitle')}
              </h2>

              {errors.type && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{errors.type}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Nome */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('getInvolved.nameLabel')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={t('getInvolved.namePlaceholder')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* E-mail */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('getInvolved.emailLabel')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={t('getInvolved.emailPlaceholder')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Telefone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('getInvolved.phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent transition-colors"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                {/* Escola (se aplicável) */}
                {formData.type === 'school' && (
                  <div>
                    <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('getInvolved.schoolLabel')}
                    </label>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent transition-colors"
                      placeholder={t('getInvolved.schoolPlaceholder')}
                    />
                  </div>
                )}
              </div>

              {/* Mensagem */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('getInvolved.messageLabel')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent transition-colors resize-none ${
                    errors.message ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={t('getInvolved.messagePlaceholder')}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              {/* Erro de submissão */}
              {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              {/* Botão de envio */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-cta disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('getInvolved.sending')}
                  </span>
                ) : (
                  t('getInvolved.submit')
                )}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                {t('getInvolved.required')}
              </p>
            </form>
          </div>
          </div>
        </div>

        {/* Informações de Contato */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {t('getInvolved.contactTitle')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('getInvolved.contactSubtitle')}
              </p>
            </div>

            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                {contactInfo.map((info, index) => (
                  <div key={index} className="card text-center hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-1 mx-auto mb-6">
                      {info.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                      {info.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default GetInvolved

import useScrollReveal from './useScrollReveal'

const ServiceCard = ({ service, index }) => {
  const [cardRef, isCardRevealed] = useScrollReveal({ 
    threshold: 0.2,
    delay: index * 100
  })

  return (
    <div
      ref={cardRef}
      className={`scroll-reveal ${isCardRevealed ? 'revealed' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="card hover:shadow-xl transition-all duration-300 group h-full">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
          {service.icon}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {service.title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
          {service.description}
        </p>
        
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start space-x-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        {service.cta && (
          <a
            href={service.cta.link}
            className="inline-flex items-center text-green-1 hover:text-green-2 font-medium transition-colors duration-200"
          >
            {service.cta.text}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

export default ServiceCard

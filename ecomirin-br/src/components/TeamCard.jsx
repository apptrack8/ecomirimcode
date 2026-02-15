import useScrollReveal from './useScrollReveal'

const TeamCard = ({ member, index }) => {
  const [cardRef, isCardRevealed] = useScrollReveal({ 
    threshold: 0.2,
    delay: index * 100
  })

  // Gerar avatar com iniciais
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Cores de fundo para avatares
  const avatarColors = [
    'bg-gradient-to-r from-blue-500 to-blue-600',
    'bg-gradient-to-r from-green-500 to-green-600',
    'bg-gradient-to-r from-purple-500 to-purple-600',
    'bg-gradient-to-r from-orange-500 to-orange-600',
    'bg-gradient-to-r from-pink-500 to-pink-600',
    'bg-gradient-to-r from-indigo-500 to-indigo-600',
    'bg-gradient-to-r from-teal-500 to-teal-600',
    'bg-gradient-to-r from-red-500 to-red-600'
  ]

  const avatarColor = avatarColors[index % avatarColors.length]

  return (
    <div
      ref={cardRef}
      className={`scroll-reveal ${isCardRevealed ? 'revealed' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="card hover:shadow-xl transition-all duration-300 text-center group">
        {/* Avatar */}
        <div className="mb-6 flex justify-center">
          <div className={`avatar ${avatarColor} w-24 h-24 text-2xl`}>
            {getInitials(member.name)}
          </div>
        </div>
        
        {/* Nome e cargo */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {member.name}
        </h3>
        
        <p className="text-green-1 font-medium mb-4">
          {member.position}
        </p>
        
        {/* Email */}
        {member.email && (
          <div className="flex justify-center">
            <a
              href={`mailto:${member.email}`}
              className="text-gray-400 hover:text-green-1 transition-colors duration-200"
              aria-label="E-mail"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamCard

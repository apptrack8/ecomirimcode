import { useLanguage } from '../context/LanguageContext'
import useScrollReveal from '../components/useScrollReveal'
import PageHero from '../components/PageHero'
import ActivityHero from '../components/ActivityHero'
import ConstructionFooter from '../components/ConstructionFooter'
import img0584 from '../assets/activities/lixeiras-futuro/IMG_0584.png'
import img0581 from '../assets/activities/lixeiras-futuro/IMG_0581.png'
import img0586 from '../assets/activities/lixeiras-futuro/IMG_0586.png'
import img0594 from '../assets/activities/lixeiras-futuro/IMG_0594.png'
import img4554 from '../assets/activities/lixeiras-futuro/IMG_4554.png'
import img4558 from '../assets/activities/lixeiras-futuro/IMG_4558.png'
import img9176 from '../assets/activities/lixeiras-futuro/IMG_9176.png'
import img9183 from '../assets/activities/lixeiras-futuro/IMG_9183.png'
import img9188 from '../assets/activities/lixeiras-futuro/IMG_9188.png'
import img9202 from '../assets/activities/lixeiras-futuro/IMG_9202.png'

const Gallery = () => {
  const { t } = useLanguage()
  const [containerRef, isContainerRevealed] = useScrollReveal({ threshold: 0.1 })

  const lixeirasFuturoImages = [
    img0584,
    img0581,
    img0586,
    img0594,
    img4554,
    img4558,
    img9176,
    img9183,
    img9188,
    img9202
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageHero 
        title={t('gallery.title')}
        subtitle={t('gallery.subtitle')}
      />

      {/* Activities Section */}
      <section className="py-16 bg-gray-50">
        <div 
          ref={containerRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="space-y-16">
            {/* Lixeiras do Futuro / Trash Cans of the Future */}
            <ActivityHero
              title={t('gallery.lixeirasTitle')}
              description={t('gallery.lixeirasDesc')}
              images={lixeirasFuturoImages}
              imageAlt="Lixeiras do Futuro activity"
            />
          </div>
        </div>
      </section>

      {/* Living Construction Site footer */}
      <ConstructionFooter />
    </div>
  )
}

export default Gallery

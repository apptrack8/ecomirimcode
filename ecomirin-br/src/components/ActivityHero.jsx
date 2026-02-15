import { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import useScrollReveal from './useScrollReveal'

const ActivityHero = ({ title, description, images, imageAlt = 'Activity image' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [galleryImageIndex, setGalleryImageIndex] = useState(0)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [loadedImages, setLoadedImages] = useState(new Set())
  const [isImageLoading, setIsImageLoading] = useState(false)
  const textContainerRef = useRef(null)
  const textContentRef = useRef(null)
  const fadeOverlayRef = useRef(null)
  const [containerRef, isContainerRevealed] = useScrollReveal({ threshold: 0.2 })

  // Auto-advance slider
  useEffect(() => {
    if (!isGalleryOpen) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [images.length, isGalleryOpen])

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  // Preload images when gallery opens - prioritize current and adjacent
  useEffect(() => {
    if (isGalleryOpen) {
      const preloadImages = () => {
        // Priority 1: Current image (should already be loaded, but ensure it)
        if (!loadedImages.has(galleryImageIndex)) {
          const img = new Image()
          img.src = images[galleryImageIndex]
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, galleryImageIndex]))
          }
        }
        
        // Priority 2: Adjacent images (preload immediately)
        const adjacentIndices = [
          (galleryImageIndex - 1 + images.length) % images.length,
          (galleryImageIndex + 1) % images.length
        ]
        adjacentIndices.forEach(index => {
          if (!loadedImages.has(index)) {
            const img = new Image()
            img.src = images[index]
            img.onload = () => {
              setLoadedImages(prev => new Set([...prev, index]))
            }
          }
        })
        
        // Priority 3: Other images (preload in background with delay)
        setTimeout(() => {
          images.forEach((imgSrc, index) => {
            if (!loadedImages.has(index) && !adjacentIndices.includes(index) && index !== galleryImageIndex) {
              const img = new Image()
              img.src = imgSrc
              img.onload = () => {
                setLoadedImages(prev => new Set([...prev, index]))
              }
            }
          })
        }, 500)
      }
      preloadImages()
    }
  }, [isGalleryOpen, galleryImageIndex, images, loadedImages])

  const openGallery = () => {
    setGalleryImageIndex(currentImageIndex)
    setIsGalleryOpen(true)
    // Preload current image immediately
    if (!loadedImages.has(currentImageIndex)) {
      const img = new Image()
      img.src = images[currentImageIndex]
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, currentImageIndex]))
      }
    }
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
  }

  const goToPreviousGallery = () => {
    const newIndex = (galleryImageIndex - 1 + images.length) % images.length
    setGalleryImageIndex(newIndex)
    // Preload adjacent images
    preloadAdjacentImages(newIndex)
  }

  const goToNextGallery = () => {
    const newIndex = (galleryImageIndex + 1) % images.length
    setGalleryImageIndex(newIndex)
    // Preload adjacent images
    preloadAdjacentImages(newIndex)
  }

  const preloadAdjacentImages = (index) => {
    const indicesToPreload = [
      (index - 1 + images.length) % images.length,
      (index + 1) % images.length
    ]
    indicesToPreload.forEach(i => {
      if (!loadedImages.has(i)) {
        const img = new Image()
        img.src = images[i]
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, i]))
        }
      }
    })
  }

  const handleThumbnailClick = (index) => {
    if (index === galleryImageIndex || isImageLoading) return
    
    // Check if image is already loaded
    if (loadedImages.has(index)) {
      setGalleryImageIndex(index)
      setIsImageLoading(false)
    } else {
      setIsImageLoading(true)
      setGalleryImageIndex(index)
      // Preload the image
      const img = new Image()
      img.src = images[index]
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, index]))
        setIsImageLoading(false)
      }
      img.onerror = () => {
        setIsImageLoading(false)
      }
    }
    // Preload adjacent images
    preloadAdjacentImages(index)
  }

  // Check if text has overflow and update fade overlay visibility
  useEffect(() => {
    let scrollCleanup = null
    
    const checkOverflow = () => {
      if (textContainerRef.current && textContentRef.current) {
        const container = textContainerRef.current
        const content = textContentRef.current
        const hasOverflowContent = content.scrollHeight > container.clientHeight + 10
        setHasOverflow(hasOverflowContent)
        
        // Update fade overlay visibility based on scroll position
        if (hasOverflowContent && fadeOverlayRef.current) {
          const updateFadeOverlay = () => {
            if (fadeOverlayRef.current && container) {
              // Check if scrolled to bottom (with threshold to account for fade height)
              const scrollTop = container.scrollTop
              const scrollHeight = container.scrollHeight
              const clientHeight = container.clientHeight
              // Use threshold (32px = h-8) to account for fade overlay height, plus extra buffer
              const remainingContent = scrollHeight - scrollTop - clientHeight
              // Hide fade when less than 40px of content remains (allows reading last line)
              const isAtBottom = remainingContent < 40
              
              // Only show fade when there's actually hidden content below
              const hasHiddenContent = remainingContent > 40
              fadeOverlayRef.current.style.opacity = (isAtBottom || !hasHiddenContent) ? '0' : '1'
              fadeOverlayRef.current.style.display = (isAtBottom || !hasHiddenContent) ? 'none' : 'block'
            }
          }
          
          container.addEventListener('scroll', updateFadeOverlay)
          updateFadeOverlay() // Initial check
          
          scrollCleanup = () => {
            container.removeEventListener('scroll', updateFadeOverlay)
          }
        } else if (fadeOverlayRef.current) {
          // Hide fade if no overflow
          fadeOverlayRef.current.style.display = 'none'
        }
      }
    }

    const timeoutId = setTimeout(checkOverflow, 100)
    window.addEventListener('resize', checkOverflow)
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', checkOverflow)
      if (scrollCleanup) scrollCleanup()
    }
  }, [description])

  // Keyboard navigation
  useEffect(() => {
    if (isGalleryOpen) {
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') goToPreviousGallery()
        if (e.key === 'ArrowRight') goToNextGallery()
        if (e.key === 'Escape') closeGallery()
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isGalleryOpen])

  return (
    <>
      <div
        ref={containerRef}
        className={`scroll-reveal ${isContainerRevealed ? 'revealed' : ''} bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50`}
      >
        {/* SIMPLE GRID: Image left, text right, text flows below when expanded - NO GAPS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image - Left Column, Fixed Height */}
          <div className="relative bg-gray-100 group h-[400px] lg:h-[500px]">
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={images[currentImageIndex]}
                alt={`${imageAlt} ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={openGallery}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:scale-110"
                aria-label="Open gallery"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Text - Right Column, Scrollable container matching image height */}
          <div className="bg-gradient-to-br from-white to-gray-50/50 p-8 md:p-12 flex flex-col h-[400px] lg:h-[500px]">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight flex-shrink-0">
              {title}
            </h3>
            
            {/* Scrollable text container wrapper - matches image height */}
            <div className="relative flex-1 min-h-0 overflow-hidden">
              {/* Scrollable text container */}
              <div 
                ref={textContainerRef}
                className="absolute inset-0 text-base md:text-lg text-gray-700 leading-relaxed overflow-y-auto pr-2"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#cbd5e1 transparent'
                }}
              >
                <div ref={textContentRef} className="pr-2">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </div>
              </div>
              
              {/* Fade overlay at bottom - positioned relative to viewport, only visible when not scrolled to bottom */}
              {hasOverflow && (
                <div 
                  ref={fadeOverlayRef}
                  className="absolute bottom-0 left-0 right-2 h-8 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none transition-opacity duration-200 z-10"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeGallery}
        >
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 bg-black/50 rounded-full p-2 hover:bg-black/70"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-7xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading indicator */}
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
            
            {/* Main gallery image */}
            <img
              key={galleryImageIndex}
              src={images[galleryImageIndex]}
              alt={`${imageAlt} ${galleryImageIndex + 1}`}
              className={`max-w-full max-h-full object-contain transition-opacity duration-200 ${
                isImageLoading && !loadedImages.has(galleryImageIndex) ? 'opacity-50' : 'opacity-100'
              }`}
              onLoad={() => {
                setIsImageLoading(false)
                setLoadedImages(prev => new Set([...prev, galleryImageIndex]))
              }}
              onLoadStart={() => {
                if (!loadedImages.has(galleryImageIndex)) {
                  setIsImageLoading(true)
                } else {
                  setIsImageLoading(false)
                }
              }}
              loading="eager"
              decoding="async"
            />

            <button
              onClick={goToPreviousGallery}
              disabled={isImageLoading}
              className="absolute left-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm disabled:opacity-50 disabled:cursor-wait"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNextGallery}
              disabled={isImageLoading}
              className="absolute right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm disabled:opacity-50 disabled:cursor-wait"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              {galleryImageIndex + 1} / {images.length}
            </div>

            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto px-4 pb-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  disabled={isImageLoading && index !== galleryImageIndex}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 will-change-transform ${
                    index === galleryImageIndex
                      ? 'border-white transform scale-110'
                      : 'border-white/30 hover:border-white/60'
                  } ${
                    isImageLoading && index !== galleryImageIndex ? 'opacity-50 cursor-wait' : 'cursor-pointer'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index < 5 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ActivityHero

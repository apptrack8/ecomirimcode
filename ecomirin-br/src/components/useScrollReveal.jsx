import { useEffect, useRef, useState } from 'react'

const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null)
  const [isRevealed, setIsRevealed] = useState(false)
  
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Check if element is already in viewport on mount
    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const windowWidth = window.innerWidth || document.documentElement.clientWidth
      
      // Check if element is visible in viewport
      const isVisible = (
        rect.top < windowHeight &&
        rect.bottom > 0 &&
        rect.left < windowWidth &&
        rect.right > 0
      )
      
      if (isVisible) {
        setIsRevealed(true)
        if (triggerOnce) {
          return true // Don't set up observer if already visible and triggerOnce
        }
      }
      return false
    }

    const shouldSkipObserver = checkInitialVisibility()

    if (shouldSkipObserver) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true)
            if (triggerOnce) {
              observer.unobserve(element)
            }
          } else if (!triggerOnce) {
            setIsRevealed(false)
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px' // More generous margin to trigger earlier
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, triggerOnce])

  return [elementRef, isRevealed]
}

export default useScrollReveal

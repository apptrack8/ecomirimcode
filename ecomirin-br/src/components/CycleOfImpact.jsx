/**
 * CycleOfImpact Component - Enhanced Production Version
 * 
 * Immersive 3D particle-based ecosystem visualization showcasing EcoMirim's four core values.
 * Professional-grade implementation with glass morphism, smooth animations, and full accessibility.
 * 
 * @component
 * @example
 * <CycleOfImpact />
 * 
 * Dependencies:
 * - React (hooks: useState, useEffect, useRef)
 * - Three.js (three)
 * - lucide-react (for icons)
 * - Tailwind CSS
 * 
 * Performance:
 * - GPU-accelerated 3D rendering
 * - Particle pooling for optimization
 * - Responsive particle count (150-500)
 * - 60fps target on modern devices
 */

import React, { useState, useEffect, useRef } from 'react'
import { Users, Lightbulb, RefreshCcw, SearchCheck, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import logomarkImage from '../assets/ecomirim-logomark.png'

const CycleOfImpact = () => {
  const { language, t } = useLanguage()
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const animationFrameRef = useRef(null)
  const particlesRef = useRef([])
  const centralSphereRef = useRef(null)
  const nodesRef = useRef([])
  const nodeOverlaysRef = useRef([null, null, null, null])
  
  const [activeValue, setActiveValue] = useState(null)
  const [hoveredValue, setHoveredValue] = useState(null)
  const [completedValues, setCompletedValues] = useState(new Set())
  const [showCelebration, setShowCelebration] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const values = [
    { id: 'curiosidade', nameKey: 'cycleOfImpact.curiosity', color: '#FFD700', colorLight: '#FFE44D', colorDark: '#CCAA00', colorGlow: 'rgba(255, 215, 0, 0.6)', icon: SearchCheck, descKey: 'cycleOfImpact.curiosityDesc', practices: [], angle: 0 },
    { id: 'comunidade', nameKey: 'cycleOfImpact.community', color: '#002776', colorLight: '#003A9B', colorDark: '#001A4D', colorGlow: 'rgba(0, 39, 118, 0.6)', icon: Users, descKey: 'cycleOfImpact.communityDesc', practices: [], angle: 90 },
    { id: 'continuidade', nameKey: 'cycleOfImpact.continuity', color: '#00A859', colorLight: '#00C96B', colorDark: '#008644', colorGlow: 'rgba(0, 168, 89, 0.6)', icon: RefreshCcw, descKey: 'cycleOfImpact.continuityDesc', practices: [], angle: 180 },
    { id: 'criatividade', nameKey: 'cycleOfImpact.creativity', color: '#FFFFFF', colorLight: '#FFFFFF', colorDark: '#E0E0E0', colorGlow: 'rgba(255, 255, 255, 0.6)', icon: Lightbulb, descKey: 'cycleOfImpact.creativityDesc', practices: [], angle: 270 }
  ]

  // Check for reduced motion and mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    setIsMobile(window.innerWidth < 768)
    
    const handleChange = (e) => setReducedMotion(e.matches)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    
    mediaQuery.addEventListener('change', handleChange)
    window.addEventListener('resize', handleResize)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Check for completion
  useEffect(() => {
    if (completedValues.size === 4 && !showCelebration) {
      try {
        const hasCelebrated = localStorage.getItem('ecomirim_cycle_completed')
        if (!hasCelebrated) {
          setTimeout(() => {
            setShowCelebration(true)
            localStorage.setItem('ecomirim_cycle_completed', 'true')
          }, 500)
        }
      } catch (e) {
        // Fail silently
      }
    }
  }, [completedValues, showCelebration])

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return

    let scene, camera, renderer, centralSphere
    let particles = []
    let animationId

    // Dynamic import of Three.js
    import('three').then((THREE) => {
      const { 
        WebGLRenderer, Scene, PerspectiveCamera, SphereGeometry, 
        MeshStandardMaterial, Mesh, PointLight, AmbientLight, 
        Color, BufferGeometry, BufferAttribute, Points, PointsMaterial,
        RingGeometry, LineBasicMaterial, PlaneGeometry,
        MeshBasicMaterial, TextureLoader, Vector3
      } = THREE

      // Scene setup
      scene = new Scene()
      scene.background = new Color(0x0A1828)
      sceneRef.current = scene

      // Camera setup
      const aspect = containerRef.current.offsetWidth / containerRef.current.offsetHeight
      camera = new PerspectiveCamera(75, aspect, 0.1, 1000)
      camera.position.z = 5
      cameraRef.current = camera

      // Renderer setup
      renderer = new WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      })
      renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      containerRef.current.appendChild(renderer.domElement)
      rendererRef.current = renderer
      canvasRef.current = renderer.domElement

      // Lighting
      const ambientLight = new AmbientLight(0xffffff, 0.6)
      scene.add(ambientLight)

      const pointLight1 = new PointLight(0x00D084, 1.5, 100)
      pointLight1.position.set(0, 0, 5)
      scene.add(pointLight1)

      const pointLight2 = new PointLight(0x00B4D8, 0.8, 100)
      pointLight2.position.set(-3, 3, 5)
      scene.add(pointLight2)

      // Central logomark (replacing sphere with image texture)
      const loader = new TextureLoader()
      const orbitRadius = isMobile ? 2.304 : 3.2  // 28% increase from original (1.8 -> 2.304, 2.5 -> 3.2)
      
      loader.load(logomarkImage, (texture) => {
        // Create a plane with the logomark texture (larger size)
        const planeGeometry = new PlaneGeometry(1.8, 1.8)
        const planeMaterial = new MeshBasicMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.1
        })
        const logomarkPlane = new Mesh(planeGeometry, planeMaterial)
        // Position centered
        logomarkPlane.position.set(0, 0, 0)
        logomarkPlane.lookAt(camera.position)
        scene.add(logomarkPlane)
        centralSphereRef.current = logomarkPlane
      }, undefined, (error) => {
        console.error('Error loading logomark:', error)
        // Fallback to simple sphere if image fails
        const sphereGeometry = new SphereGeometry(0.3, 32, 32)
        const sphereMaterial = new MeshStandardMaterial({
          color: 0x00D084,
          emissive: 0x00FF88,
          emissiveIntensity: 0.8
        })
        centralSphere = new Mesh(sphereGeometry, sphereMaterial)
        scene.add(centralSphere)
        centralSphereRef.current = centralSphere
      })

      // Value nodes 3D spheres removed - only HTML overlays remain
      const nodes = []
      values.forEach((value, index) => {
        const angle = (value.angle * Math.PI) / 180
        const x = Math.cos(angle) * orbitRadius
        const y = Math.sin(angle) * orbitRadius
        
        // Create a virtual node position for overlay tracking (no 3D object)
        const virtualNode = {
          position: { x, y, z: 0 },
          userData: { value, index }
        }
        nodes.push(virtualNode)
      })
      nodesRef.current = nodes

      // Enhanced particle system - restored
      const particleCount = reducedMotion ? 100 : isMobile ? 200 : 400
      const particlesGeometry = new BufferGeometry()
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        // Random position in space
        positions[i3] = (Math.random() - 0.5) * 6
        positions[i3 + 1] = (Math.random() - 0.5) * 6
        positions[i3 + 2] = (Math.random() - 0.5) * 6
        
        // Random color from values
        const valueColor = values[Math.floor(Math.random() * values.length)]
        const color = new Color(valueColor.color)
        colors[i3] = color.r
        colors[i3 + 1] = color.g
        colors[i3 + 2] = color.b
        
        // Varying sizes
        sizes[i] = Math.random() * 0.03 + 0.01
      }
      
      particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3))
      particlesGeometry.setAttribute('color', new BufferAttribute(colors, 3))
      particlesGeometry.setAttribute('size', new BufferAttribute(sizes, 1))
      
      const particlesMaterial = new PointsMaterial({
        size: 0.04,
        transparent: true,
        opacity: 0.7,
        vertexColors: true,
        sizeAttenuation: true
      })
      const particlesMesh = new Points(particlesGeometry, particlesMaterial)
      scene.add(particlesMesh)
      particlesRef.current = particlesMesh

      // Animation loop
      let orbitRotation = 0
      const animate = () => {
        animationId = requestAnimationFrame(animate)

        // Pulse central logomark (breathing animation)
        if (centralSphereRef.current) {
          const pulse = Math.sin(Date.now() * 0.001) * 0.05 + 1
          centralSphereRef.current.scale.set(pulse, pulse, 1)
          // Keep logomark facing camera
          if (centralSphereRef.current.lookAt) {
            centralSphereRef.current.lookAt(camera.position)
          }
        }

        // Orbital rotation for overlay positions (no 3D nodes)
        if (!reducedMotion) {
          orbitRotation += 0.002
          nodes.forEach((node, index) => {
            const value = values[index]
            const angle = (value.angle * Math.PI) / 180 + orbitRotation
            const x = Math.cos(angle) * orbitRadius
            const y = Math.sin(angle) * orbitRadius
            node.position.x = x
            node.position.y = y
            
            // Update HTML overlay position
            if (nodeOverlaysRef.current[index] && containerRef.current) {
              // Convert 3D position to screen coordinates
              const vector = new Vector3(x, y, 0)
              vector.project(camera)
              const xPos = (vector.x * 0.5 + 0.5) * containerRef.current.offsetWidth
              const yPos = (vector.y * -0.5 + 0.5) * containerRef.current.offsetHeight
              nodeOverlaysRef.current[index].style.left = `${xPos}px`
              nodeOverlaysRef.current[index].style.top = `${yPos}px`
            }
          })
        }

        // Rotate particles slowly
        particlesMesh.rotation.y += 0.001
        particlesMesh.rotation.x += 0.0005

        // Update particle positions for flowing effect
        const positions = particlesMesh.geometry.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
          // Simple flowing motion
          positions[i] += (Math.random() - 0.5) * 0.01
          positions[i + 1] += (Math.random() - 0.5) * 0.01
          positions[i + 2] += (Math.random() - 0.5) * 0.01
        }
        particlesMesh.geometry.attributes.position.needsUpdate = true

        renderer.render(scene, camera)
      }
      animate()

      setIsLoaded(true)
      
      // Initial overlay positioning
      setTimeout(() => {
        if (nodes.length > 0 && camera && containerRef.current) {
          nodes.forEach((node, index) => {
            if (nodeOverlaysRef.current[index]) {
              const vector = new Vector3(node.position.x, node.position.y, 0)
              vector.project(camera)
              const xPos = (vector.x * 0.5 + 0.5) * containerRef.current.offsetWidth
              const yPos = (vector.y * -0.5 + 0.5) * containerRef.current.offsetHeight
              nodeOverlaysRef.current[index].style.left = `${xPos}px`
              nodeOverlaysRef.current[index].style.top = `${yPos}px`
            }
          })
        }
      }, 100)
    }).catch(err => {
      console.error('Failed to load Three.js:', err)
      setIsLoaded(true)
    })

    // Handle resize
    const handleResize = () => {
      if (camera && renderer && containerRef.current) {
        camera.aspect = containerRef.current.offsetWidth / containerRef.current.offsetHeight
        camera.updateProjectionMatrix()
        renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight)
      }
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      if (renderer && containerRef.current && canvasRef.current) {
        try {
          containerRef.current.removeChild(canvasRef.current)
        } catch (e) {
          // Already removed
        }
        renderer.dispose()
      }
    }
  }, [reducedMotion, isMobile])

  const handleValueClick = (value) => {
    setActiveValue(value)
    setCompletedValues(prev => new Set([...prev, value.id]))
  }

  const handleCloseCard = () => {
    setActiveValue(null)
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (!activeValue) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCloseCard()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [activeValue])

  return (
    <section 
      className="cycle-of-impact w-full min-h-screen py-20 relative overflow-hidden"
      role="region"
      aria-label="Ciclo de Impacto EcoMirim"
    >
      {/* Enhanced Background Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, rgba(0, 212, 132, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #0A1828 0%, #153243 25%, #1E5128 50%, #0F3D3E 75%, #0A1828 100%)
          `,
          backgroundSize: '200% 200%',
          animation: reducedMotion ? 'none' : 'gradientShift 15s ease infinite'
        }}
      />

      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('cycleOfImpact.title')}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('cycleOfImpact.subtitle')}
          </p>
        </div>

        {/* 3D Canvas Container */}
        <div 
          ref={containerRef}
          className="cycle-canvas-container relative w-full h-[600px] md:h-[800px] rounded-2xl overflow-hidden mx-auto"
          style={{
            minHeight: '600px',
            maxWidth: '1200px',
            background: 'transparent'
          }}
        >
          {/* Node Overlays - HTML buttons positioned over 3D nodes */}
          {isLoaded && values.map((value, index) => {
            const isActive = activeValue?.id === value.id
            const IconComponent = value.icon
            
            return (
              <button
                key={value.id}
                ref={(el) => {
                  if (el && !nodeOverlaysRef.current[index]) {
                    nodeOverlaysRef.current[index] = el
                  }
                }}
                className="node-overlay absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 rounded-full"
                style={{
                  width: '80px',
                  height: '80px',
                  background: isActive 
                    ? `radial-gradient(circle, ${value.colorLight}, ${value.color})`
                    : `radial-gradient(circle, ${value.color}88, ${value.color}44)`,
                  border: `3px solid ${isActive ? value.color : value.color + '66'}`,
                  boxShadow: isActive 
                    ? `0 0 30px ${value.colorGlow}, 0 4px 16px rgba(0, 0, 0, 0.4)`
                    : `0 0 15px ${value.colorGlow}66`,
                  transform: isActive ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%) scale(1)',
                  opacity: isActive ? 1 : 0.8
                }}
                onClick={() => handleValueClick(value)}
                onMouseEnter={() => setHoveredValue(value.id)}
                onMouseLeave={() => setHoveredValue(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleValueClick(value)
                  }
                }}
                aria-label={`${t(value.nameKey)} — clique para explorar`}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <IconComponent 
                    size={32} 
                    className="text-white"
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                    }}
                  />
                </div>
                {/* Label below node */}
                <div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  <span className="text-sm font-bold text-white">{t(value.nameKey)}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="loading-spinner w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4 animate-spin" />
              <p className="text-white text-lg">{t('cycleOfImpact.loading')}</p>
            </div>
          </div>
        )}

        {/* Instruction text */}
        <div className="text-center mt-8">
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            {t('cycleOfImpact.instruction')}
          </p>
        </div>

        {/* Enhanced Value Card */}
        {activeValue && (
          <>
            {/* Backdrop - appears immediately */}
            <div
              className="fixed inset-0 -z-10 bg-black/30"
              onClick={handleCloseCard}
              aria-hidden="true"
              style={{
                animation: 'none',
                opacity: 1,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                willChange: 'backdrop-filter',
                transform: 'translateZ(0)',
                transition: 'none'
              }}
            />
            <div 
              className="value-card fixed inset-4 md:inset-auto md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-50 max-w-md w-full md:w-[450px]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="value-card-title"
              style={{
                animation: 'none',
                opacity: 1,
                maxHeight: '90vh',
                overflowY: 'auto',
                transition: 'none'
              }}
            >
              <div 
                className="bg-white/8 rounded-3xl p-8 border border-white/15 relative"
                style={{
                  borderLeft: `4px solid ${activeValue.color}`,
                  boxShadow: `
                    0 24px 48px rgba(0, 0, 0, 0.5),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    0 0 40px ${activeValue.colorGlow}
                  `,
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  willChange: 'backdrop-filter',
                  transform: 'translateZ(0)',
                  transition: 'none'
                }}
              >
              {/* Close Button */}
              <button
                onClick={handleCloseCard}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label={t('cycleOfImpact.close')}
                style={{
                  transform: 'rotate(0deg)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(90deg)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg)'
                }}
              >
                <X size={16} className="text-white" />
              </button>

              {/* Card Header */}
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="value-card-icon flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    width: '56px',
                    height: '56px',
                    background: activeValue.color === '#FFFFFF' || activeValue.color === '#ffffff' 
                      ? '#2D2D2D' 
                      : activeValue.color,
                    border: activeValue.color === '#FFFFFF' || activeValue.color === '#ffffff' 
                      ? '2px solid rgba(255, 255, 255, 0.3)' 
                      : 'none'
                  }}
                >
                  <activeValue.icon size={32} className="text-white" />
                </div>
                <div>
                  <h3 
                    id="value-card-title"
                    className="text-2xl md:text-3xl font-bold text-white m-0"
                  >
                    {t(activeValue.nameKey)}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p 
                className="text-base md:text-lg text-white/90 leading-relaxed mb-6"
                style={{ lineHeight: '1.6' }}
              >
                {t(activeValue.descKey)}
              </p>

              {/* Practices Section - Only show if practices exist */}
              {activeValue.practices && activeValue.practices.length > 0 && (
                <div className="value-card-section">
                  <h4 
                    className="text-base font-semibold text-white mb-3 flex items-center gap-2"
                    style={{
                      fontSize: '16px'
                    }}
                  >
                    <span 
                      className="block rounded"
                      style={{
                        width: '4px',
                        height: '16px',
                        background: activeValue.color
                      }}
                    />
                    {t('cycleOfImpact.howWePractice')}
                  </h4>
                  <ul className="list-none p-0 m-0 space-y-2">
                    {activeValue.practices.map((practice, idx) => (
                      <li 
                        key={idx}
                        className="text-white/85 leading-relaxed pl-6 relative"
                        style={{
                          animation: reducedMotion ? 'none' : `fadeInUp 0.4s ease-out ${idx * 0.1}s both`
                        }}
                      >
                        <span 
                          className="absolute left-0 text-xl leading-none"
                          style={{ color: activeValue.color }}
                        >
                          •
                        </span>
                        {practice}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          </>
        )}

        {/* Enhanced Completion Celebration */}
        {showCelebration && (
          <div 
            className="celebration fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            style={{
              animation: 'fadeIn 0.5s ease-out'
            }}
          >
            <div 
              className="celebration-content bg-gradient-to-br from-[#00D084] via-[#00B4D8] to-[#00D084] rounded-3xl p-8 md:p-12 text-center max-w-md mx-4"
              style={{
                animation: reducedMotion ? 'fadeIn 0.2s' : 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div 
                className="text-6xl mb-4"
                style={{
                  animation: reducedMotion ? 'none' : 'bounce 1s ease-in-out'
                }}
              >
                🌱
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('cycleOfImpact.congrats')}
              </h3>
              <p className="text-xl text-white/90 mb-6">
                {t('cycleOfImpact.completed')}
              </p>
              <button
                onClick={() => setShowCelebration(false)}
                className="bg-white text-[#00D084] px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                {t('cycleOfImpact.continueExploring')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .value-card {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }

        .value-card::-webkit-scrollbar {
          width: 6px;
        }

        .value-card::-webkit-scrollbar-track {
          background: transparent;
        }

        .value-card::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }

        .value-card::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  )
}

export default CycleOfImpact

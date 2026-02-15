/**
 * ConstructionFooter – "Living Construction Site" footer.
 * Full-width warning stripes, brown ground, trees, vehicles, and two little people.
 */
import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const GROUND_Y = 72
const PERSON_BASE_LOCAL = 52

const ConstructionFooter = () => {
  const { t } = useLanguage()

  useEffect(() => {
    const style = document.getElementById('construction-footer-styles')
    if (style) return
    const el = document.createElement('style')
    el.id = 'construction-footer-styles'
    el.textContent = `
      @keyframes cf-sway {
        0%, 100% { transform: translateX(-2px); }
        50% { transform: translateX(2px); }
      }
      @keyframes cf-blink {
        0%, 92% { opacity: 1; }
        94%, 100% { opacity: 0.15; }
      }
      .cf-sway { animation: cf-sway 2.5s ease-in-out infinite; }
      .cf-blink { animation: cf-blink 4s ease-in-out infinite; }
    `
    document.head.appendChild(el)
    return () => { el.remove() }
  }, [])

  const treeTrunkHeight = 16
  const treeTrunkBaseLocal = 20 + treeTrunkHeight
  const treeY = GROUND_Y - treeTrunkBaseLocal
  const treePositions = [20, 140, 240, 360, 480, 600, 740]
  return (
    <footer
      className="relative w-full overflow-x-hidden bg-white flex flex-col items-center pt-3 md:pt-4 pb-0 gap-3"
      aria-label={t('construction.ariaLabel')}
    >
      {/* Title – centered, prominent */}
      <h2
        className="relative z-10 text-xl md:text-3xl lg:text-4xl font-bold text-stone-800 uppercase tracking-wider text-center leading-tight mx-auto max-w-4xl px-4"
        style={{
          fontFamily: "'Oswald', 'Roboto Condensed', sans-serif",
          textShadow: '0 1px 2px rgba(0,0,0,0.06)',
          letterSpacing: '0.06em',
        }}
      >
        {t('construction.title')}
      </h2>

      {/* Ground band + bottom listrada – stripe touches dirt; whole block touches blue footer below */}
      <div className="w-full flex flex-col flex-shrink-0">
        {/* Ground band – brown dirt only (no yellow line inside); relative so centered figure overlay can use left: 50% */}
        <div className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(to bottom, #7A5A45, #5B3F30)' }}>
          {/* Left figure: between trees on the left; same y (75.8%) and look as centered one */}
          <div
            className="absolute pointer-events-none z-0"
            style={{
              left: '18%',
              top: '75.8%',
              transform: 'translate(-50%, -100%)',
              width: 32,
              height: 56,
            }}
            aria-hidden
          >
            <div className="cf-sway w-full h-full">
            <svg width="32" height="56" viewBox="0 0 26 52" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
              <circle cx="13" cy="10" r="7" fill="#facc15" stroke="#1c1917" strokeWidth="1" />
              <polygon points="13,20 26,52 0,52" fill="#ea580c" stroke="#1c1917" strokeWidth="1" />
              <line x1="20" y1="28" x2="26" y2="8" stroke="#78716c" strokeWidth="1.2" strokeLinecap="round" />
              <rect x="24" y="4" width="5" height="4" rx="0.5" fill="#57534e" stroke="#1c1917" strokeWidth="0.6" />
              <g className="cf-blink">
                <circle cx="10" cy="9" r="1.5" fill="#1c1917" />
                <circle cx="16" cy="9" r="1.5" fill="#1c1917" />
              </g>
            </svg>
            </div>
          </div>
          {/* Centered figure: CSS left:50% + translate(-50%,-100%) = dead center; feet at 75.8% (ground); z-0 behind text; inner div has sway */}
          <div
            className="absolute pointer-events-none z-0"
            style={{
              left: '50%',
              top: '75.8%',
              transform: 'translate(-50%, -100%)',
              width: 32,
              height: 56,
            }}
            aria-hidden
          >
            <div className="cf-sway w-full h-full">
            <svg width="32" height="56" viewBox="0 0 26 52" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
              <circle cx="13" cy="10" r="7" fill="#facc15" stroke="#1c1917" strokeWidth="1" />
              <polygon points="13,20 26,52 0,52" fill="#ea580c" stroke="#1c1917" strokeWidth="1" />
              <line x1="20" y1="28" x2="26" y2="8" stroke="#78716c" strokeWidth="1.2" strokeLinecap="round" />
              <rect x="24" y="4" width="5" height="4" rx="0.5" fill="#57534e" stroke="#1c1917" strokeWidth="0.6" />
              <g className="cf-blink">
                <circle cx="10" cy="9" r="1.5" fill="#1c1917" />
                <circle cx="16" cy="9" r="1.5" fill="#1c1917" />
              </g>
            </svg>
            </div>
          </div>
          <svg
            className="block w-full h-auto max-h-[100px] md:max-h-[115px]"
            viewBox="0 0 800 95"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={t('construction.ariaImg')}
          >
            {/* Ground – brown band only, no yellow line */}
            <rect x="0" y={GROUND_Y} width="800" height={95 - GROUND_Y} fill="#5B3F30" stroke="none" />

            {/* Grass patches along ground (same y-level); dense tufts in clusters */}
            {[
              [30, 38, 46, 54, 62],
              [95, 102, 110, 118, 125, 132],
              [165, 172, 180, 188, 195, 202, 210],
              [255, 262, 270, 278, 285, 293],
              [335, 342, 350, 358, 365, 372, 380],
              [415, 422, 430, 438, 445, 452, 460, 468],
              [510, 518, 525, 532, 540, 548, 555],
              [590, 598, 605, 612, 620, 628, 635],
              [665, 672, 680, 688, 695, 702],
              [735, 742, 750, 758, 765, 772],
            ].flatMap((patch, pi) =>
              patch.map((gx, ti) => (
                <g key={`grass-${pi}-${ti}`}>
                  <line x1={gx} y1={GROUND_Y} x2={gx + 1.5} y2={GROUND_Y - 5} stroke="#15803d" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1={gx + 3} y1={GROUND_Y} x2={gx + 4} y2={GROUND_Y - 6} stroke="#16a34a" strokeWidth="1" strokeLinecap="round" />
                  <line x1={gx + 6} y1={GROUND_Y} x2={gx + 5} y2={GROUND_Y - 4} stroke="#15803d" strokeWidth="1" strokeLinecap="round" />
                  <line x1={gx + 2} y1={GROUND_Y} x2={gx + 2.5} y2={GROUND_Y - 7} stroke="#166534" strokeWidth="0.8" strokeLinecap="round" />
                  <line x1={gx + 4.5} y1={GROUND_Y} x2={gx + 5.5} y2={GROUND_Y - 5.5} stroke="#15803d" strokeWidth="0.9" strokeLinecap="round" />
                  <line x1={gx + 1} y1={GROUND_Y} x2={gx + 0.5} y2={GROUND_Y - 6.5} stroke="#16a34a" strokeWidth="0.8" strokeLinecap="round" />
                </g>
              ))
            )}

            {/* Trees – 7 total, all on same ground level (base at GROUND_Y) */}
            {treePositions.map((x, i) => (
              <g key={i} transform={`translate(${x}, ${treeY})`}>
                <rect x="2" y="20" width="3" height={treeTrunkHeight} fill="#78350f" stroke="#1c1917" strokeWidth="0.8" />
                <circle cx="3.5" cy="14" r={i % 2 === 0 ? 10 : 9} fill={i % 3 === 0 ? '#15803d' : '#16a34a'} stroke="#1c1917" strokeWidth="0.8" />
              </g>
            ))}

            {/* Left vehicle – cement mixer, same ground level as excavator (wheels at GROUND_Y) */}
            <g transform="translate(42, 4)">
              <rect x="0" y="45" width="42" height="22" rx="2" fill="#eab308" stroke="#1c1917" strokeWidth="1.5" />
              <circle cx="10" cy="68" r="8" fill="#1c1917" />
              <circle cx="10" cy="68" r="3" fill="#44403c" />
              <circle cx="32" cy="68" r="8" fill="#1c1917" />
              <circle cx="32" cy="68" r="3" fill="#44403c" />
              <g transform="translate(28, 28)">
                <ellipse cx="14" cy="14" rx="14" ry="12" fill="none" stroke="#1c1917" strokeWidth="2" />
                <line x1="14" y1="2" x2="14" y2="26" stroke="#374151" strokeWidth="1" />
                <line x1="2" y1="14" x2="26" y2="14" stroke="#374151" strokeWidth="1" />
              </g>
            </g>

            {/* Excavator – right side, same ground level as cement mixer (static) */}
            <g transform="translate(618, 17)">
              <rect x="0" y="25" width="50" height="28" rx="3" fill="#eab308" stroke="#1c1917" strokeWidth="1.5" />
              <circle cx="12" cy="55" r="10" fill="#1c1917" stroke="#1c1917" strokeWidth="1" />
              <circle cx="12" cy="55" r="4" fill="#44403c" />
              <circle cx="38" cy="55" r="10" fill="#1c1917" stroke="#1c1917" strokeWidth="1" />
              <circle cx="38" cy="55" r="4" fill="#44403c" />
              <rect x="8" y="28" width="12" height="8" rx="1" fill="#1c1917" />
              <rect x="42" y="32" width="22" height="6" rx="1" fill="#78716c" stroke="#1c1917" strokeWidth="1" />
              <path d="M64 35 L72 38 L72 44 L64 42 Z" fill="#ea580c" stroke="#1c1917" strokeWidth="1" />
            </g>
          </svg>
        </div>
        {/* Bottom listrada – flush against dirt; no gap so it touches blue footer below */}
        <div
          className="w-full h-2 flex-shrink-0"
          style={{
            background: 'repeating-linear-gradient( 45deg, #eab308 0, #eab308 8px, #1c1917 8px, #1c1917 16px )',
          }}
        />
      </div>
    </footer>
  )
}

export default ConstructionFooter

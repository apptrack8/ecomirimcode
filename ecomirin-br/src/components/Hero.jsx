// src/components/Hero.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import logomark from "../assets/logomark.png";

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    el.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Flow-y SVG background (absolute) */}
      <svg
        className="absolute inset-0 w-full h-full -z-10"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lg1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#23b36b" />
            <stop offset="40%" stopColor="#17a04a" />
            <stop offset="100%" stopColor="#0f7a3a" />
          </linearGradient>

          <linearGradient id="lg2" x1="0" x2="1">
            <stop offset="0%" stopColor="#0f7a3a" />
            <stop offset="100%" stopColor="#0a5a28" />
          </linearGradient>

          <linearGradient id="lg3" x1="0" x2="1">
            <stop offset="0%" stopColor="#23b36b" />
            <stop offset="100%" stopColor="#17a04a" />
          </linearGradient>
        </defs>

        {/* big background fill */}
        <rect width="100%" height="100%" fill="url(#lg1)" />

        {/* wavy layered lines (flowy pattern) - more waves, more pronounced */}
        <g opacity="0.35" transform="translate(0,0)">
          <path d="M0,250 Q240,150 480,250 T960,250 Q1200,150 1440,250 L1440,0 L0,0 Z" fill="url(#lg2)" />
          <path d="M0,320 C180,200 360,440 540,320 C720,200 900,440 1080,320 C1260,200 1350,280 1440,320 L1440,0 L0,0 Z" fill="url(#lg3)" opacity="0.6" />
          <path d="M0,390 Q200,270 400,390 T800,390 Q1000,270 1200,390 T1440,390 L1440,0 L0,0 Z" fill="url(#lg2)" opacity="0.4" />
        </g>

        {/* Additional flowing layers for more depth */}
        <g opacity="0.25">
          <path d="M0,180 C300,120 600,240 900,180 C1200,120 1320,150 1440,180 L1440,0 L0,0 Z" fill="#0a5a28" />
          <path d="M0,450 Q360,330 720,450 T1440,450 L1440,0 L0,0 Z" fill="#17a04a" opacity="0.3" />
        </g>

        {/* subtle top gradient overlay to merge with header */}
        <rect width="100%" height="80" y="0" fill="rgba(255,255,255,0.65)" />
      </svg>

      <div className="container mx-auto px-6 md:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
          {/* Left: Title block */}
          <div className="md:col-span-7 z-10">
            {/* Big brand title in white, prominent */}
            <h1 className="text-[clamp(2.75rem,6.8vw,6rem)] font-extrabold text-white leading-tight mb-4 reveal" style={{ transitionDelay: '60ms' }}>
              EcoMirim
            </h1>

            {/* smaller descriptive text (also white) below */}
            <p className="text-xl md:text-2xl font-semibold text-white max-w-3xl reveal" style={{ transitionDelay: '140ms' }}>
              {t('hero.tagline')}
            </p>

            {/* Buttons: BOTH identical */}
            <div className="mt-8 flex flex-wrap gap-4 reveal" style={{ transitionDelay: '200ms' }}>
              <Link to="/se-envolver" className="btn-cta" aria-label={t('hero.ctaParticipate')}>{t('hero.ctaParticipate')}</Link>
              <Link to="/nossa-missao" className="btn-cta" aria-label={t('hero.ctaMission')}>{t('hero.ctaMission')}</Link>
            </div>
          </div>

          {/* Right: keep logo centered vertically on desktop */}
          <div className="md:col-span-5 flex items-center justify-center md:justify-end md:pr-8 z-10">
            <img src={logomark} alt="Logo EcoMirim" className="h-32 md:h-48 lg:h-56 w-auto reveal" style={{ transitionDelay: '240ms' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

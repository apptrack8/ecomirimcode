// src/components/PageHero.jsx
import React from "react";

const PageHero = ({ title, subtitle }) => {
  return (
    <section className="relative overflow-hidden min-h-[200px] md:min-h-[250px] bg-gradient-to-br from-[#23b36b] via-[#17a04a] to-[#0f7a3a]">
      {/* Flowy SVG background (matching home hero) */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pageHeroLg1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#23b36b" />
            <stop offset="40%" stopColor="#17a04a" />
            <stop offset="100%" stopColor="#0f7a3a" />
          </linearGradient>

          <linearGradient id="pageHeroLg2" x1="0" x2="1">
            <stop offset="0%" stopColor="#0f7a3a" />
            <stop offset="100%" stopColor="#0a5a28" />
          </linearGradient>

          <linearGradient id="pageHeroLg3" x1="0" x2="1">
            <stop offset="0%" stopColor="#23b36b" />
            <stop offset="100%" stopColor="#17a04a" />
          </linearGradient>
        </defs>

        {/* big background fill */}
        <rect width="100%" height="100%" fill="url(#pageHeroLg1)" />

        {/* wavy layered lines (flowy pattern) */}
        <g opacity="0.35">
          <path d="M0,200 Q240,120 480,200 T960,200 Q1200,120 1440,200 L1440,0 L0,0 Z" fill="url(#pageHeroLg2)" />
          <path d="M0,260 C180,160 360,360 540,260 C720,160 900,360 1080,260 C1260,160 1350,220 1440,260 L1440,0 L0,0 Z" fill="url(#pageHeroLg3)" opacity="0.6" />
          <path d="M0,320 Q200,220 400,320 T800,320 Q1000,220 1200,320 T1440,320 L1440,0 L0,0 Z" fill="url(#pageHeroLg2)" opacity="0.4" />
        </g>

        {/* Additional flowing layers */}
        <g opacity="0.25">
          <path d="M0,140 C300,100 600,180 900,140 C1200,100 1320,120 1440,140 L1440,0 L0,0 Z" fill="#0a5a28" />
          <path d="M0,360 Q360,270 720,360 T1440,360 L1440,0 L0,0 Z" fill="#17a04a" opacity="0.3" />
        </g>
      </svg>

      <div className="container mx-auto px-6 md:px-12 py-8 md:py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-white/90 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;


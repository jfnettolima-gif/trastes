// Emblema decorativo: duas guitarras Les Paul cruzadas, desenhadas em SVG
// com acabamento sunburst e ferragens douradas. Puramente visual.

function Guitar() {
  return (
    <g>
      {/* corpo com binding */}
      <path
        d="M92 298 C74 296 57 303 48 320 C38 338 33 362 32 392
           C31 418 31 446 42 488 C53 532 75 566 100 568
           C125 566 150 534 161 490 C171 448 170 420 168 394
           C167 366 162 346 150 334 C143 328 135 327 128 331
           C123 334 119 334 114 330 C108 320 101 306 92 298 Z"
        fill="url(#sunburst)"
        stroke="#efe0bd"
        strokeWidth="2.5"
      />
      {/* pickguard creme */}
      <path
        d="M62 356 C58 372 60 402 72 430 C80 448 96 452 104 440
           C96 420 92 392 92 368 C86 356 72 350 62 356 Z"
        fill="#efe6cf"
        opacity="0.92"
      />
      {/* braço / escala */}
      <polygon points="85,86 115,86 120,300 80,300" fill="#241612" />
      <polygon points="85,86 115,86 120,300 80,300" fill="none" stroke="#efe0bd" strokeWidth="1.6" />
      {/* trastes */}
      {Array.from({ length: 13 }).map((_, i) => {
        const y = 100 + i * 15;
        const t = (y - 86) / (300 - 86);
        const xl = 85 + (80 - 85) * t;
        const xr = 115 + (120 - 115) * t;
        return <line key={i} x1={xl} y1={y} x2={xr} y2={y} stroke="#caa14e" strokeWidth="1.4" />;
      })}
      {/* marcadores de casa */}
      {[3, 5, 7, 9].map((f) => (
        <circle key={f} cx={100} cy={100 + (f - 0.5) * 15} r="3.2" fill="#efe6cf" />
      ))}
      <circle cx={93} cy={100 + 11.5 * 15} r="3" fill="#efe6cf" />
      <circle cx={107} cy={100 + 11.5 * 15} r="3" fill="#efe6cf" />
      {/* pestana */}
      <rect x="84" y="82" width="32" height="5" rx="1.5" fill="#f3ecd6" />
      {/* headstock */}
      <path
        d="M84 82 L82 34 C82 20 88 8 100 8 C112 8 118 20 118 34 L116 82 Z"
        fill="#160d09"
        stroke="#3a2415"
        strokeWidth="1.5"
      />
      {/* tarraxas douradas */}
      {[26, 44, 62].map((y, i) => (
        <g key={i}>
          <circle cx="74" cy={y} r="3.6" fill="url(#gold)" stroke="#7a5411" strokeWidth="0.6" />
          <circle cx="126" cy={y} r="3.6" fill="url(#gold)" stroke="#7a5411" strokeWidth="0.6" />
          <line x1="78" y1={y} x2="86" y2={y} stroke="#c8a24d" strokeWidth="1.4" />
          <line x1="122" y1={y} x2="114" y2={y} stroke="#c8a24d" strokeWidth="1.4" />
        </g>
      ))}
      {/* captadores humbucker */}
      {[
        { y: 350 },
        { y: 408 },
      ].map((p, idx) => (
        <g key={idx}>
          <rect x="70" y={p.y} width="60" height="24" rx="5" fill="url(#gold)" stroke="#8a5f18" strokeWidth="1" />
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i}>
              <circle cx={78 + i * 8.8} cy={p.y + 7} r="1.7" fill="#5c4212" />
              <circle cx={78 + i * 8.8} cy={p.y + 17} r="1.7" fill="#5c4212" />
            </g>
          ))}
        </g>
      ))}
      {/* ponte e tailpiece */}
      <rect x="72" y="446" width="56" height="8" rx="2" fill="url(#gold)" stroke="#8a5f18" strokeWidth="0.8" />
      <rect x="76" y="464" width="48" height="12" rx="3" fill="url(#gold)" stroke="#8a5f18" strokeWidth="0.8" />
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx={82 + i * 7.2} cy={470} r="1.5" fill="#5c4212" />
      ))}
      {/* potenciômetros */}
      {[
        { x: 132, y: 500 },
        { x: 150, y: 520 },
        { x: 122, y: 528 },
        { x: 140, y: 548 },
      ].map((k, i) => (
        <g key={i}>
          <circle cx={k.x} cy={k.y} r="7" fill="#2a1a10" stroke="url(#gold)" strokeWidth="2" />
          <circle cx={k.x} cy={k.y} r="2.4" fill="url(#gold)" />
        </g>
      ))}
      {/* seletor de captação */}
      <circle cx="58" cy="360" r="5" fill="#2a1a10" stroke="url(#gold)" strokeWidth="2" />
      {/* cordas */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = 86 + i * 5.6;
        return <line key={i} x1={x} y1="86" x2={82 + i * 8.8} y2="470" stroke="#d9c07a" strokeWidth="0.5" opacity="0.5" />;
      })}
    </g>
  );
}

export default function LesPaulEmblem({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 620"
      className={className}
      role="img"
      aria-label="Duas guitarras Les Paul cruzadas"
    >
      <defs>
        <radialGradient id="sunburst" cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor="#f3c469" />
          <stop offset="42%" stopColor="#d38b32" />
          <stop offset="74%" stopColor="#9a4d1c" />
          <stop offset="100%" stopColor="#2e1608" />
        </radialGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7e29b" />
          <stop offset="50%" stopColor="#d8a63f" />
          <stop offset="100%" stopColor="#a9781f" />
        </linearGradient>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f2b24d" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#f2b24d" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="170" cy="330" rx="168" ry="260" fill="url(#halo)" />

      <g transform="rotate(-23 170 470)">
        <g transform="translate(70 0)">
          <Guitar />
        </g>
      </g>
      <g transform="rotate(23 170 470)">
        <g transform="translate(70 0)">
          <Guitar />
        </g>
      </g>
    </svg>
  );
}

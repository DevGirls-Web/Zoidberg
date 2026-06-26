export function XRayPlaceholder({ showOverlay = false }: { showOverlay?: boolean }) {
  return (
    <svg viewBox="0 0 220 260" className="w-full h-full" fill="none">
      <rect width="220" height="260" fill="#0d1a14" />
      {/* Spine */}
      <rect x="105" y="20" width="10" height="220" rx="5" fill="#5a7a6a" opacity="0.4" />
      {/* Left lung */}
      <ellipse cx="75" cy="140" rx="50" ry="80" fill="#3a5c4a" opacity="0.5" />
      <ellipse cx="75" cy="130" rx="38" ry="65" fill="#4a7260" opacity="0.4" />
      {/* Right lung */}
      <ellipse cx="145" cy="140" rx="50" ry="80" fill="#3a5c4a" opacity="0.5" />
      <ellipse cx="145" cy="130" rx="38" ry="65" fill="#4a7260" opacity="0.4" />
      {/* Heart */}
      <ellipse cx="100" cy="160" rx="28" ry="35" fill="#5a7a6a" opacity="0.6" />
      {/* Trachea */}
      <rect x="102" y="20" width="16" height="70" rx="8" fill="#8aada0" opacity="0.7" />
      {/* Clavicles */}
      <path d="M110 50 Q80 52 50 45" stroke="#8aada0" strokeWidth="3" opacity="0.5" strokeLinecap="round" />
      <path d="M110 50 Q140 52 170 45" stroke="#8aada0" strokeWidth="3" opacity="0.5" strokeLinecap="round" />
      {/* Ribs left */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={`rl${i}`}
          d={`M105 ${70 + i * 26} Q70 ${78 + i * 26} 38 ${70 + i * 26}`}
          stroke="#5a8070"
          strokeWidth="2.5"
          opacity="0.35"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {/* Ribs right */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={`rr${i}`}
          d={`M115 ${70 + i * 26} Q150 ${78 + i * 26} 182 ${70 + i * 26}`}
          stroke="#5a8070"
          strokeWidth="2.5"
          opacity="0.35"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {/* Diaphragm */}
      <path d="M38 222 Q110 238 182 222" stroke="#8aada0" strokeWidth="3" opacity="0.4" fill="none" strokeLinecap="round" />
      {/* Pneumonia overlay on right lower lobe */}
      {showOverlay && (
        <>
          <ellipse cx="148" cy="175" rx="32" ry="28" fill="rgba(244,114,182,0.2)" />
          <ellipse cx="148" cy="175" rx="20" ry="18" fill="rgba(244,114,182,0.15)" />
        </>
      )}
    </svg>
  );
}
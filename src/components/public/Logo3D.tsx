import React from 'react';

interface Logo3DProps {
  scale?: number;
}

export const Logo3D: React.FC<Logo3DProps> = ({ scale = 1 }) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .wms-logo3d-scene {
          width: 100px;
          height: 100px;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateY(22deg) rotateX(6deg) scale(${scale});
        }
        .wms-logo3d-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .wms-logo3d-card-glow { fill: #ff4d00; opacity: 0.35; filter: blur(12px) drop-shadow(0 0 20px rgba(204, 78, 0, 0.4)); }
        .wms-logo3d-card-thickness { fill: #803100; opacity: 0.9; }
        .wms-logo3d-card-face { fill: url(#wms-logo3d-card-gradient); filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4)); }
        .wms-logo3d-logo-thickness { fill: #cbd5e1; opacity: 0.8; }
        .wms-logo3d-logo-face { fill: url(#wms-logo3d-logo-gradient); }
        .wms-logo3d-logo-glow { fill: #ffffff; opacity: 0.25; filter: blur(2px); }
      ` }} />
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="wms-logo3d-card-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F56B22" />
            <stop offset="100%" stopColor="#ff4d00" />
          </linearGradient>
          <linearGradient id="wms-logo3d-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          <g id="wms-logo3d-card-shape">
            <rect x="5" y="5" width="90" height="90" rx="22" />
          </g>
          <g id="wms-logo3d-logo-shapes">
            <polygon points="20,28 42,28 42,76 25,76 21,58 27,58" />
            <polygon points="58,28 80,28 70,76 58,76" />
            <polygon points="41,66 59,66 50,46" />
          </g>
        </defs>
      </svg>
      <div className="wms-logo3d-scene">
        <svg className="wms-logo3d-layer wms-logo3d-card-glow" style={{ transform: 'translateZ(-16px)' }}><use href="#wms-logo3d-card-shape" /></svg>
        <svg className="wms-logo3d-layer wms-logo3d-card-thickness" style={{ transform: 'translateZ(-14px)' }}><use href="#wms-logo3d-card-shape" /></svg>
        <svg className="wms-logo3d-layer wms-logo3d-card-thickness" style={{ transform: 'translateZ(-12px)' }}><use href="#wms-logo3d-card-shape" /></svg>
        <svg className="wms-logo3d-layer wms-logo3d-card-thickness" style={{ transform: 'translateZ(-10px)' }}><use href="#wms-logo3d-card-shape" /></svg>
        <svg className="wms-logo3d-layer wms-logo3d-card-thickness" style={{ transform: 'translateZ(-8px)' }}><use href="#wms-logo3d-card-shape" /></svg>
        <svg className="wms-logo3d-layer wms-logo3d-card-face" style={{ transform: 'translateZ(-6px)' }}><use href="#wms-logo3d-card-shape" /></svg>
        <svg className="wms-logo3d-layer wms-logo3d-logo-thickness" style={{ transform: 'translateZ(-2px)' }}><use href="#wms-logo3d-logo-shapes" /></svg>
        <svg className="wms-logo3d-layer wms-logo3d-logo-thickness" style={{ transform: 'translateZ(2px)' }}><use href="#wms-logo3d-logo-shapes" /></svg>
        <svg className="wms-logo3d-layer wms-logo3d-logo-thickness" style={{ transform: 'translateZ(6px)' }}><use href="#wms-logo3d-logo-shapes" /></svg>
        <svg className="wms-logo3d-layer wms-logo3d-logo-face" style={{ transform: 'translateZ(10px)' }}><use href="#wms-logo3d-logo-shapes" /></svg>
        <svg className="wms-logo3d-layer wms-logo3d-logo-glow" style={{ transform: 'translateZ(12px)' }}><use href="#wms-logo3d-logo-shapes" /></svg>
      </div>
    </>
  );
};

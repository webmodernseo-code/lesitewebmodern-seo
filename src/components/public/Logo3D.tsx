import React from 'react';

interface Logo3DProps {
  size?: number;
  className?: string;
  idPrefix?: string;
}

export const Logo3D: React.FC<Logo3DProps> = ({
  size = 42,
  className = '',
  idPrefix = 'wms-logo3d',
}) => {
  const scale = size / 100;
  const cardGradId = `${idPrefix}-card-gradient`;
  const logoGradId = `${idPrefix}-logo-gradient`;
  const cardShapeId = `${idPrefix}-card-shape`;
  const logoShapesId = `${idPrefix}-logo-shapes`;

  return (
    <div
      className={`wms-logo3d-root relative shrink-0 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .${idPrefix}-scaler {
          transform: scale(${scale});
          transform-origin: center left;
          width: ${size}px;
          height: ${size}px;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px;
        }
        .${idPrefix}-scene {
          width: 100px;
          height: 100px;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateY(22deg) rotateX(6deg);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        /* Effet au survol du parent ou du logo */
        .group:hover .${idPrefix}-scene,
        .group\\/logo:hover .${idPrefix}-scene,
        a:hover .${idPrefix}-scene,
        .${idPrefix}-scaler:hover .${idPrefix}-scene {
          transform: rotateY(30deg) rotateX(10deg) scale(1.05);
        }
        .${idPrefix}-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .${idPrefix}-card-glow {
          fill: #ff4d00;
          opacity: 0.35;
          filter: blur(12px) drop-shadow(0 0 20px rgba(204, 78, 0, 0.4));
        }
        .${idPrefix}-card-thickness {
          fill: #803100;
          opacity: 0.9;
        }
        .${idPrefix}-card-face {
          fill: url(#${cardGradId});
          filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4));
        }
        .${idPrefix}-logo-thickness {
          fill: #cbd5e1;
          opacity: 0.8;
        }
        .${idPrefix}-logo-face {
          fill: url(#${logoGradId});
        }
        .${idPrefix}-logo-glow {
          fill: #ffffff;
          opacity: 0.25;
          filter: blur(2px);
        }
      `,
        }}
      />
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id={cardGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F56B22" />
            <stop offset="100%" stopColor="#ff4d00" />
          </linearGradient>
          <linearGradient id={logoGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          <g id={cardShapeId}>
            <rect x="5" y="5" width="90" height="90" rx="22" />
          </g>
          <g id={logoShapesId}>
            <polygon points="20,28 42,28 42,76 25,76 21,58 27,58" />
            <polygon points="58,28 80,28 70,76 58,76" />
            <polygon points="41,66 59,66 50,46" />
          </g>
        </defs>
      </svg>
      <div className={`${idPrefix}-scaler`}>
        <div className={`${idPrefix}-scene`}>
          <svg className={`${idPrefix}-layer ${idPrefix}-card-glow`} style={{ transform: 'translateZ(-16px)' }}>
            <use href={`#${cardShapeId}`} />
          </svg>
          <svg className={`${idPrefix}-layer ${idPrefix}-card-thickness`} style={{ transform: 'translateZ(-14px)' }}>
            <use href={`#${cardShapeId}`} />
          </svg>
          <svg className={`${idPrefix}-layer ${idPrefix}-card-thickness`} style={{ transform: 'translateZ(-12px)' }}>
            <use href={`#${cardShapeId}`} />
          </svg>
          <svg className={`${idPrefix}-layer ${idPrefix}-card-thickness`} style={{ transform: 'translateZ(-10px)' }}>
            <use href={`#${cardShapeId}`} />
          </svg>
          <svg className={`${idPrefix}-layer ${idPrefix}-card-thickness`} style={{ transform: 'translateZ(-8px)' }}>
            <use href={`#${cardShapeId}`} />
          </svg>
          <svg className={`${idPrefix}-layer ${idPrefix}-card-face`} style={{ transform: 'translateZ(-6px)' }}>
            <use href={`#${cardShapeId}`} />
          </svg>
          <svg className={`${idPrefix}-layer ${idPrefix}-logo-thickness`} style={{ transform: 'translateZ(-2px)' }}>
            <use href={`#${logoShapesId}`} />
          </svg>
          <svg className={`${idPrefix}-layer ${idPrefix}-logo-thickness`} style={{ transform: 'translateZ(2px)' }}>
            <use href={`#${logoShapesId}`} />
          </svg>
          <svg className={`${idPrefix}-layer ${idPrefix}-logo-thickness`} style={{ transform: 'translateZ(6px)' }}>
            <use href={`#${logoShapesId}`} />
          </svg>
          <svg className={`${idPrefix}-layer ${idPrefix}-logo-face`} style={{ transform: 'translateZ(10px)' }}>
            <use href={`#${logoShapesId}`} />
          </svg>
          <svg className={`${idPrefix}-layer ${idPrefix}-logo-glow`} style={{ transform: 'translateZ(12px)' }}>
            <use href={`#${logoShapesId}`} />
          </svg>
        </div>
      </div>
    </div>
  );
};

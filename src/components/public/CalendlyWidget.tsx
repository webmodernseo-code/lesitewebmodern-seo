'use client';

import React, { useEffect } from 'react';

export const CalendlyWidget: React.FC = () => {
  useEffect(() => {
    const placeholder = document.getElementById('calendly-placeholder');
    const widgetContainer = document.querySelector('.calendly-inline-widget');
    if (!placeholder || !widgetContainer) return;

    const hidePlaceholder = () => {
      placeholder.style.opacity = '0';
      setTimeout(() => {
        placeholder.style.display = 'none';
      }, 500);
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement && node.tagName === 'IFRAME') {
            node.addEventListener('load', hidePlaceholder);
            setTimeout(hidePlaceholder, 4000);
            observer.disconnect();
          }
        });
      });
    });

    observer.observe(widgetContainer, { childList: true });

    const timeoutId = setTimeout(() => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }, 800);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .wm-booking-widget-wrapper {
          background: #ffffff;
          border: 1px solid rgba(15, 15, 17, 0.08);
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(15, 15, 17, 0.04), 0 1px 3px rgba(15, 15, 17, 0.01);
          overflow: hidden;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          height: 700px;
        }

        .wm-calendly-placeholder {
          position: absolute;
          inset: 0;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 5;
          transition: opacity 0.5s ease;
          gap: 16px;
        }

        .wm-booking-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(224, 83, 0, 0.1);
          border-top: 3px solid #ff4d00;
          border-radius: 50%;
          animation: wmSpin 1s linear infinite;
        }

        .wm-calendly-placeholder p {
          font-size: 14px;
          color: #5c5c64;
          font-weight: 500;
          margin: 0;
          animation: wmPulseText 1.5s ease-in-out infinite;
        }

        @keyframes wmSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes wmPulseText {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @media (max-width: 768px) {
          .wm-booking-widget-wrapper {
            border-radius: 16px;
            height: 650px;
          }
        }
      ` }} />
      <div className="wm-booking-widget-wrapper">
        <div className="wm-calendly-placeholder" id="calendly-placeholder">
          <div className="wm-booking-spinner"></div>
          <p>Chargement sécurisé de l&apos;agenda...</p>
        </div>
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/webmodernseo/reunion"
          style={{ minWidth: '320px', height: '700px' }}
        ></div>
      </div>
    </>
  );
};

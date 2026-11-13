import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  disabledOnMobile?: boolean;
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({ 
  text, 
  className = '', 
  wordClassName = '',
  disabledOnMobile = false
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [revealedRatio, setRevealedRatio] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let animationFrame = 0;
    const element = containerRef.current;
    if (!element) return;

    let stickyContainer = element.parentElement;
    while (stickyContainer && getComputedStyle(stickyContainer).position !== 'sticky') {
      stickyContainer = stickyContainer.parentElement;
    }

    const documentTop = element.getBoundingClientRect().top + window.scrollY;
    const stickyParentTop = stickyContainer?.parentElement
      ? stickyContainer.parentElement.getBoundingClientRect().top + window.scrollY
      : 0;
    const coverElement = stickyContainer?.nextElementSibling?.firstElementChild as HTMLElement | null;
    const coverDocumentTop = coverElement
      ? coverElement.getBoundingClientRect().top + window.scrollY
      : null;

    const updateReveal = () => {
      animationFrame = 0;
      let progress: number;

      if (stickyContainer) {
        const textBottom = element.getBoundingClientRect().bottom - stickyContainer.getBoundingClientRect().top;
        const scrollUntilCovered = coverDocumentTop !== null
          ? Math.max(1, coverDocumentTop - stickyParentTop - textBottom)
          : Math.max(1, stickyContainer.clientHeight - textBottom);
        const revealDuration = scrollUntilCovered * 0.7;
        progress = (window.scrollY - stickyParentTop) / revealDuration;
      } else {
        const viewportHeight = window.innerHeight;
        const revealStart = documentTop - viewportHeight * 0.9;
        const revealEnd = documentTop + element.offsetHeight - viewportHeight * 0.1;
        progress = (window.scrollY - revealStart) / (revealEnd - revealStart);
      }

      setRevealedRatio(Math.max(0, Math.min(1, progress)));
    };

    const scheduleUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateReveal);
      }
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    updateReveal();

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  if (disabledOnMobile && isMobile) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, wordIdx) => {
        const wordStart = wordIdx / words.length;
        const isRevealed = revealedRatio > wordStart;

        return (
          <span 
            key={wordIdx} 
            className={`inline-block mr-[0.25em] transform transition-[opacity,transform] duration-100 ${wordClassName}`}
            style={{ 
              opacity: isRevealed ? 1 : 0.55,
              transform: isRevealed ? 'translateY(0)' : 'translateY(6px)',
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};

export default ScrollRevealText;

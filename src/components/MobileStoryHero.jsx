import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryText from './StoryText';
import FinalMobileHero from './FinalMobileHero';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 160;

export default function MobileStoryHero({ onBookClick, onExploreClick }) {
  const containerRef = useRef(null);
  const pinnedRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [progress, setProgress] = useState(0);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);

  // Cache of Image objects
  const imagesRef = useRef([]);
  const loadedCountRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const currentFrameRef = useRef(0);
  const animFrameIdRef = useRef(null);

  // Draw a specific frame onto canvas with aspect-ratio cover
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find requested image or closest loaded image
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find closest loaded frame
      let closest = null;
      let minDiff = Infinity;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const diff = Math.abs(i - frameIdx);
          if (diff < minDiff) {
            minDiff = diff;
            closest = candidate;
          }
        }
      }
      img = closest;
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Aspect Cover Calculations (Original: 464x848)
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = width / height;

    let renderWidth, renderHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      renderWidth = width;
      renderHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - renderHeight) / 2;
    } else {
      renderHeight = height;
      renderWidth = height * imgRatio;
      offsetX = (width - renderWidth) / 2;
      offsetY = 0;
    }

    // Clear and draw frame
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    ctx.restore();

    lastDrawnFrameRef.current = frameIdx;
  }, []);

  // Frame loading pipeline
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES);
    loadedCountRef.current = 0;

    // Stage 1: Preload first 20 frames immediately for instant interactivity
    const INITIAL_BATCH = 20;
    let initialCount = 0;

    const loadSingleFrame = (idx) => {
      return new Promise((resolve) => {
        const img = new Image();
        const frameNum = String(idx + 1).padStart(4, '0');
        img.src = `/frames/frame_${frameNum}.webp`;

        img.onload = () => {
          imagesRef.current[idx] = img;
          loadedCountRef.current += 1;
          setLoadPercentage(Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100));

          if (idx === 0) {
            drawFrame(0);
          }
          resolve();
        };

        img.onerror = () => {
          resolve();
        };
      });
    };

    // Load initial batch first
    const initialPromises = [];
    for (let i = 0; i < INITIAL_BATCH; i++) {
      initialPromises.push(loadSingleFrame(i));
    }

    Promise.all(initialPromises).then(() => {
      setInitialLoaded(true);
      drawFrame(0);

      // Stage 2: Progressively load remaining frames in small batches
      let currentIdx = INITIAL_BATCH;
      const loadNextBatch = () => {
        if (currentIdx >= TOTAL_FRAMES) return;

        const batchSize = 10;
        const promises = [];
        for (let j = 0; j < batchSize && currentIdx < TOTAL_FRAMES; j++, currentIdx++) {
          promises.push(loadSingleFrame(currentIdx));
        }

        Promise.all(promises).then(() => {
          // If the user scrubbed to a frame in this batch, re-render
          if (
            currentFrameRef.current >= currentIdx - batchSize &&
            currentFrameRef.current < currentIdx
          ) {
            drawFrame(currentFrameRef.current);
          }
          // Continue loading next batch smoothly
          setTimeout(loadNextBatch, 25);
        });
      };

      loadNextBatch();
    });

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawFrame]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [drawFrame]);

  // ScrollTrigger Setup
  useEffect(() => {
    const container = containerRef.current;
    const pinned = pinnedRef.current;
    if (!container || !pinned) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=380%',
      pin: pinned,
      pinSpacing: true,
      scrub: 0.3,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);

        // Map progress (0 to 1) to frame index (0 to 159)
        const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(p * (TOTAL_FRAMES - 1))));
        currentFrameRef.current = frameIdx;

        if (animFrameIdRef.current) {
          cancelAnimationFrame(animFrameIdRef.current);
        }

        animFrameIdRef.current = requestAnimationFrame(() => {
          drawFrame(frameIdx);
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [drawFrame]);

  // Opening hero opacity calculation: Fades out smoothly as user scrolls beyond 0.03 -> 0.08
  const openingOpacity = Math.max(0, Math.min(1, 1 - progress / 0.08));
  const openingTranslateY = -progress * 60;

  return (
    <div
      ref={containerRef}
      id="start"
      className="relative w-full bg-[#050507]"
    >
      {/* Pinned Viewport Container - Handled strictly by GSAP pin to prevent sticky collisions */}
      <div
        ref={pinnedRef}
        className="relative w-full h-[100svh] overflow-hidden bg-black select-none"
      >
        {/* Instant Fallback Background before canvas initializes */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 pointer-events-none ${
            initialLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundImage: 'url(/frames/frame_0001.webp)' }}
        />

        {/* HTML5 Canvas Rendering Frame Sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Subtle Atmospheric Dark Vignette */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%] pointer-events-none z-10" />

        {/* Opening Screen State (Reference Start Image match) */}
        {openingOpacity > 0.01 && (
          <div
            className="absolute inset-0 z-20 flex flex-col justify-between pt-[max(5rem,calc(env(safe-area-inset-top)+3.5rem))] pb-[max(1.5rem,env(safe-area-inset-bottom))] px-6 pointer-events-none transition-all duration-75"
            style={{
              opacity: openingOpacity,
              transform: `translateY(${openingTranslateY}px)`,
              willChange: 'opacity, transform',
            }}
          >
            {/* Center Area: Centered SMART REPAIR Typography */}
            <div className="w-full max-w-[420px] mx-auto my-auto text-center flex flex-col items-center">
              <h1 className="flex flex-col items-center text-center tracking-tight leading-none">
                {/* SMART in heavy bold modern sans */}
                <span className="text-[44px] sm:text-[54px] font-display font-extrabold text-white tracking-[0.06em] uppercase text-shadow-lg">
                  SMART
                </span>
                {/* REPAIR in light font with wide tracking */}
                <span className="text-[36px] sm:text-[44px] font-display font-extralight text-white/95 tracking-[0.22em] uppercase -mt-1 sm:-mt-2 text-shadow-md">
                  REPAIR
                </span>
              </h1>

              {/* Minimal Red Accent Bar under SMART REPAIR as in Reference */}
              <div className="w-9 h-[2.5px] bg-[#E31B23] rounded-full mt-3 shadow-[0_0_10px_rgba(227,27,35,0.8)]" />
            </div>

            {/* Bottom: Minimal SCROLLEN FÜR MEHR Indicator as in Reference */}
            <div className="w-full flex flex-col items-center justify-center select-none">
              {/* Top red notch line */}
              <span className="w-[2px] h-4 bg-[#E31B23] rounded-full mb-2 shadow-[0_0_6px_rgba(227,27,35,0.8)]" />
              
              <div className="flex flex-col items-center text-center text-[9px] font-mono tracking-[0.28em] text-white/70 uppercase leading-tight">
                <span>SCROLLEN</span>
                <span className="text-white/50 text-[8px] mt-0.5">FÜR MEHR</span>
              </div>

              {/* Thin vertical guide line extending down */}
              <span className="w-[1px] h-6 bg-white/20 mt-2" />
            </div>
          </div>
        )}

        {/* Dynamic Story Overlay for the 5 Damage Scenes */}
        <StoryText progress={progress} />

        {/* Final Hero State Revealed at Scroll Completion */}
        <FinalMobileHero
          progress={progress}
          onBookClick={onBookClick}
          onExploreClick={onExploreClick}
        />

        {/* Subtle Scroll Progress Indicator Bar at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-40 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-transparent via-[#E31B23] to-[#E31B23] transition-all duration-75"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

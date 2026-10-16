import React from 'react';

// 3 Core Story Moments with extended, calm hold durations
const STORIES = [
  {
    id: 'mercedes-scratch',
    category: 'LACKSCHADEN & KRATZER',
    headline: '„Kratzer? Kein Grund zur Sorge.“',
    subtext: 'Wir bringen Lackoberflächen wieder in Bestform.',
    start: 0.10,
    peakStart: 0.15,
    peakEnd: 0.35,
    end: 0.39,
  },
  {
    id: 'precision-body',
    category: 'PRÄZISION & WERTERHALT',
    headline: '„Jedes Detail zählt.“',
    subtext: 'Präzise Lösungen für Felgen und Karosserie.',
    start: 0.39,
    peakStart: 0.44,
    peakEnd: 0.64,
    end: 0.68,
  },
  {
    id: 'premium-finish',
    category: 'PREMIUM FINISH',
    headline: '„Sorgfalt, die man sieht.“',
    subtext: 'Perfektion und Glanz bis ins kleinste Detail.',
    start: 0.68,
    peakStart: 0.73,
    peakEnd: 0.86,
    end: 0.89,
  },
];

function calculatePhase(progress, story) {
  const { start, peakStart, peakEnd, end } = story;
  if (progress < start || progress > end) return { opacity: 0, translateY: 20, active: false };

  let opacity = 0;
  let translateY = 0;

  if (progress < peakStart) {
    // Fade & slide in
    const t = (progress - start) / (peakStart - start);
    opacity = Math.max(0, Math.min(1, t));
    translateY = (1 - t) * 16;
  } else if (progress <= peakEnd) {
    // Hold peak
    opacity = 1;
    translateY = 0;
  } else {
    // Fade & slide out
    const t = (progress - peakEnd) / (end - peakEnd);
    opacity = Math.max(0, Math.min(1, 1 - t));
    translateY = -t * 16;
  }

  return { opacity, translateY, active: opacity > 0.01 };
}

export default function StoryText({ progress }) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-start pt-[18svh] sm:pt-[16svh] px-6 z-20">
      <div className="w-full max-w-[390px] mx-auto text-center flex flex-col items-center">
        {STORIES.map((story) => {
          const { opacity, translateY, active } = calculatePhase(progress, story);
          if (!active) return null;

          return (
            <div
              key={story.id}
              className="absolute w-full px-4 flex flex-col items-center transition-all duration-75 will-change-transform"
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              {/* Category Pill Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md mb-3 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/80 font-medium">
                  {story.category}
                </span>
              </div>

              {/* Bold Story Headline */}
              <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-white mb-2 text-shadow-md leading-tight">
                {story.headline}
              </h2>

              {/* Story Subtext */}
              <p className="text-sm sm:text-base font-body font-light text-white/85 max-w-[300px] leading-relaxed text-shadow-sm">
                {story.subtext}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

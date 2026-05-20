import { useRef, useState, useEffect, useCallback } from 'react';
import type { WorkExperience } from '../../types';

interface ExperienceProps {
  experience: WorkExperience[];
}

const typeBadge: Record<NonNullable<WorkExperience['type']>, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  internship: 'Internship',
  contract: 'Contract',
};

const CARD_HEIGHT = 260;
const PEEK = 32;

const Experience = ({ experience }: ExperienceProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver: each card reports when it crosses the center threshold
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        {
          root: container,
          // fire when 60% of the card is visible inside the container
          threshold: 0.6,
        }
      );
      obs.observe(card);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [experience]);

  // Intercept wheel events: consume them for inner scroll, pass through only at boundaries
  const handleWheel = useCallback((e: WheelEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    const atTop = container.scrollTop === 0;
    const atBottom =
      Math.abs(
        container.scrollTop + container.clientHeight - container.scrollHeight
      ) < 1;

    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;

    if ((scrollingDown && atBottom) || (scrollingUp && atTop)) {
      // at boundary — let the page scroll naturally
      return;
    }

    // otherwise consume the event and scroll the inner container
    e.preventDefault();
    container.scrollBy({ top: e.deltaY, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    // passive: false required so preventDefault() works
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const scrollToCard = (index: number) => {
    const container = scrollRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;
    // scroll so the card top lands at container top
    container.scrollTo({ top: card.offsetTop, behavior: 'smooth' });
  };

  return (
    <section className="py-16 border-b border-neutral-800">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-8 text-center">
        Experience
      </h2>

      <div className="flex gap-8" style={{ height: CARD_HEIGHT + PEEK }}>
        {/* ── Timeline ── */}
        <div className="relative flex flex-col w-28 shrink-0 py-1">
          {/* track */}
          <div className="absolute left-[9px] top-3 bottom-3 w-px bg-blue-900" />

          {experience.map((job, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                className="relative flex items-start gap-2.5 flex-1 text-left group"
              >
                {/* dot */}
                <div
                  className={`mt-0.5 shrink-0 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'w-4 h-4 bg-blue-500 border-blue-500'
                      : 'w-2.5 h-2.5 bg-neutral-900 border-blue-800 mt-[3px] group-hover:border-blue-500'
                  }`}
                />
                {/* label */}
                <span
                  className={`leading-tight transition-all duration-300 ${
                    isActive
                      ? 'text-[11px] font-semibold text-blue-600'
                      : 'text-[10px] font-normal text-neutral-400 group-hover:text-blue-400'
                  }`}
                >
                  {job.period}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Scrollable cards ── */}
        <div
          ref={scrollRef}
          className="relative flex-1 overflow-y-scroll"
          style={{
            scrollbarWidth: 'none',
            scrollSnapType: 'y mandatory',
          }}
        >
          {experience.map((job, i) => {
            const isActive = i === activeIndex;
            const isNext = i === activeIndex + 1;

            return (
              <div
                key={`${job.company}-${job.period}`}
                ref={el => {
                  cardRefs.current[i] = el;
                }}
                style={{
                  height: CARD_HEIGHT,
                  scrollSnapAlign: 'start',
                  scrollSnapStop: 'always',
                  // peek effect: next card peeks from behind current
                  paddingBottom: isNext ? 0 : 0,
                }}
              >
                <div
                  className="h-full border rounded-lg p-5 flex flex-col gap-3 transition-all duration-400"
                  style={{
                    opacity: isActive ? 1 : isNext ? 0.5 : 0.3,
                    filter: isActive ? 'none' : 'blur(1px)',
                    transform: isActive
                      ? 'scale(1) translateY(0)'
                      : isNext
                        ? `scale(0.97) translateY(${PEEK / 2}px)`
                        : 'scale(0.95) translateY(0)',
                    transformOrigin: 'top center',
                    borderColor: isActive ? 'rgb(37 99 235)' : 'rgb(23 23 23)',
                    backgroundColor: isActive ? 'rgb(10 10 10)' : 'rgb(9 9 9)',
                    boxShadow: isActive
                      ? '0 1px 12px 0 rgb(37 99 235 / 0.15)'
                      : 'none',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-9 h-9 rounded-md bg-neutral-900 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-blue-400">
                        {job.company.charAt(0)}
                      </span>
                    </div>
                    {job.type && (
                      <span className="text-xs text-neutral-400 border border-neutral-700 rounded px-2 py-0.5 shrink-0">
                        {typeBadge[job.type]}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-sm font-semibold text-white leading-snug">
                      {job.role}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {job.company} · {job.location}
                    </p>
                    <p className="text-xs text-neutral-400">{job.period}</p>
                  </div>

                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {job.description}
                  </p>

                  {job.tools && job.tools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                      {job.tools.map(tool => (
                        <span
                          key={tool}
                          className="text-xs text-neutral-400 bg-neutral-900 rounded px-2 py-0.5"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;

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

const CARD_HEIGHT = 300;
const PEEK = 32;

// ── Modal ────────────────────────────────────────────────────────────────────

interface ModalProps {
  job: WorkExperience;
  onClose: () => void;
}

const Modal = ({ job, onClose }: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-5"
    >
      <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl overflow-y-auto max-h-[90dvh] shadow-[0_8px_48px_0_rgb(0,0,0/0.7)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-start gap-4 pr-8">
            <div className="w-10 h-10 rounded-md bg-neutral-900 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-blue-400">
                {job.company.charAt(0)}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-base font-semibold text-white leading-snug">
                {job.role}
              </h3>
              <p className="text-sm text-neutral-400">
                {job.company} · {job.location}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-neutral-500">{job.period}</span>
                {job.type && (
                  <span className="text-xs text-neutral-400 border border-neutral-700 rounded px-2 py-0.5">
                    {typeBadge[job.type]}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-400 leading-relaxed">
            {job.description}
          </p>

          {/* Tools */}
          {job.tools && job.tools.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                Tools
              </p>
              <div className="flex flex-wrap gap-1.5">
                {job.tools.map(tool => (
                  <span
                    key={tool}
                    className="text-xs text-neutral-400 bg-neutral-900 rounded px-2 py-0.5"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const Experience = ({ experience }: ExperienceProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalJob, setModalJob] = useState<WorkExperience | null>(null);
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

    if ((scrollingDown && atBottom) || (scrollingUp && atTop)) return;

    e.preventDefault();
    container.scrollBy({ top: e.deltaY, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const scrollToCard = (index: number) => {
    const container = scrollRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;
    container.scrollTo({ top: card.offsetTop, behavior: 'smooth' });
  };

  return (
    <section className="py-16 border-b border-neutral-800">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-8 text-center">
        Experience
      </h2>

      {/* ── Mobile layout (< sm) ── */}
      <div className="sm:hidden flex flex-col gap-4">
        {/* Horizontal dot timeline */}
        <div className="flex flex-col gap-3">
          {/* Dot row with track */}
          <div className="relative flex items-center justify-between px-2">
            {/* track — runs only through the dot row */}
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-px bg-blue-900" />
            {experience.map((_job, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="relative flex items-center justify-center group"
                  style={{ minWidth: '1rem' }}
                >
                  <div
                    className={`rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? 'w-4 h-4 bg-blue-500 border-blue-500'
                        : 'w-2.5 h-2.5 bg-neutral-900 border-blue-800 group-hover:border-blue-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>
          {/* Label row — sits below the track with clear separation */}
          <div className="flex items-start justify-between px-2">
            {experience.map((job, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="flex items-center justify-center group"
                  style={{ minWidth: '1rem' }}
                >
                  <span
                    className={`text-[9px] leading-tight transition-all duration-300 max-w-[56px] text-center ${
                      isActive
                        ? 'font-semibold text-blue-400'
                        : 'text-neutral-500 group-hover:text-blue-400'
                    }`}
                  >
                    {job.period}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active card — tappable to open modal */}
        {experience[activeIndex] && (() => {
          const job = experience[activeIndex];
          return (
            <button
              onClick={() => setModalJob(job)}
              className="text-left w-full border border-blue-600 rounded-lg p-4 flex flex-col gap-3 bg-neutral-950"
              style={{ boxShadow: '0 1px 12px 0 rgb(37 99 235 / 0.15)' }}
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
              <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
                {job.description}
              </p>
              <span className="text-xs text-blue-400 mt-auto">
                Tap to read more →
              </span>
            </button>
          );
        })()}
      </div>

      {/* ── Desktop layout (sm+) ── */}
      <div className="hidden sm:flex gap-8" style={{ height: CARD_HEIGHT + PEEK }}>
        {/* Timeline */}
        <div className="relative flex flex-col w-28 shrink-0 py-1">
          <div className="absolute left-[9px] top-3 bottom-3 w-px bg-blue-900" />
          {experience.map((job, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                className="relative flex items-start gap-2.5 flex-1 text-left group"
              >
                <div
                  className={`mt-0.5 shrink-0 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'w-4 h-4 bg-blue-500 border-blue-500'
                      : 'w-2.5 h-2.5 bg-neutral-900 border-blue-800 mt-[3px] group-hover:border-blue-500'
                  }`}
                />
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

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="relative flex-1 overflow-y-scroll"
          style={{ scrollbarWidth: 'none', scrollSnapType: 'y mandatory' }}
        >
          {experience.map((job, i) => {
            const isActive = i === activeIndex;
            const isNext = i === activeIndex + 1;

            return (
              <div
                key={`${job.company}-${job.period}`}
                ref={el => { cardRefs.current[i] = el; }}
                style={{
                  height: CARD_HEIGHT,
                  scrollSnapAlign: 'start',
                  scrollSnapStop: 'always',
                }}
              >
                <button
                  onClick={() => isActive && setModalJob(job)}
                  className="h-full w-full border rounded-lg p-5 flex flex-col gap-3 overflow-hidden text-left transition-all duration-400 cursor-pointer"
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
                    boxShadow: isActive ? '0 1px 12px 0 rgb(37 99 235 / 0.15)' : 'none',
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

                  <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
                    {job.description}
                  </p>

                  {isActive && (
                    <span className="text-xs text-blue-400 mt-auto">
                      Click to read more →
                    </span>
                  )}

                  <div className="hidden sm:flex flex-wrap gap-1.5 mt-auto pt-1">
                    {job.tools?.map(tool => (
                      <span
                        key={tool}
                        className="text-xs text-neutral-400 bg-neutral-900 rounded px-2 py-0.5"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Modal ── */}
      {modalJob && (
        <Modal job={modalJob} onClose={() => setModalJob(null)} />
      )}
    </section>
  );
};

export default Experience;

import type { FocusArea } from '../../types';
import backgroundImage from '../../assets/background-01.jpeg';

interface WhatIDoProps {
  focusAreas: FocusArea[];
}

const WhatIDo = ({ focusAreas }: WhatIDoProps) => {
  return (
    <section
      className="w-full border-b border-neutral-800 flex flex-col justify-center relative"
      style={{
        minHeight: 'calc(100dvh - 64px)',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1280px] py-16">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-8 text-center">
          What I Do
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {focusAreas.map(area => (
            <div
              key={area.title}
              className="border border-neutral-800 rounded-lg p-5 flex flex-col gap-3 hover:border-blue-600 transition-colors"
            >
              <div className="w-9 h-9 rounded-md bg-neutral-900 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-blue-400">
                  {area.title.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-semibold text-white">
                  {area.title}
                </h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;

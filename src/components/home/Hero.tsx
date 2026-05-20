import { Link } from 'react-router-dom';
import type { PersonalInfo } from '../../types';
import { ROUTES } from '../../router/routes';

interface HeroProps {
  personal: PersonalInfo;
}

const Hero = ({ personal }: HeroProps) => {
  return (
    <section
      className="w-full border-b border-neutral-800 flex items-center"
      style={{ height: 'calc(100dvh - 64px)' }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1280px]">
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              {personal.name}
            </h1>
            <p className="text-lg md:text-xl text-blue-400 font-medium">
              {personal.tagline}
            </p>
          </div>

          <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
            {personal.bio}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to={ROUTES.CONTACT}
              className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Get in touch
            </Link>
            <Link
              to={ROUTES.RESUME}
              className="px-5 py-2.5 bg-transparent text-white text-sm font-medium rounded-md border border-neutral-600 hover:border-neutral-400 hover:bg-neutral-800 transition-colors"
            >
              View Resume
            </Link>
          </div>

          <div className="flex items-center gap-4 pt-1">
            {personal.social.map(link => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="text-xs text-neutral-500 hover:text-white transition-colors underline underline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

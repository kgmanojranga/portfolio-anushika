import { Link } from 'react-router-dom';
import type { PersonalInfo } from '../../types';
import { ROUTES } from '../../router/routes';
import centeredHero from '../../assets/hero-images/centered-hero.jpeg';
import rightHero from '../../assets/hero-images/right-hero.jpeg';

interface HeroProps {
  personal: PersonalInfo;
}

const Hero = ({ personal }: HeroProps) => {
  return (
    <section
      className="relative w-full border-b border-neutral-800 flex items-center overflow-hidden"
      style={{ height: 'calc(100dvh - 64px)' }}
    >
      {/* Mobile/tablet: centered background image */}
      <div
        className="lg:hidden absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${centeredHero})` }}
      />
      {/* Desktop: right-aligned background image */}
      <div
        className="hidden lg:block absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${rightHero})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 lg:bg-black/30" />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1280px]">
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="flex flex-col gap-3">
            <h1 className="animate-fade-up text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              {personal.name}
            </h1>
            <p className="animate-fade-up animation-delay-150 text-lg md:text-xl text-blue-400 font-medium">
              {personal.tagline}
            </p>
          </div>

          <p className="animate-fade-up animation-delay-300 text-sm text-neutral-400 leading-relaxed max-w-xl">
            {personal.bio}
          </p>

          <div className="animate-fade-up animation-delay-450 flex flex-wrap gap-3 pt-2">
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

          <div className="animate-fade-up animation-delay-600 flex items-center gap-4 pt-1">
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

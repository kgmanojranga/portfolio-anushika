import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { PersonalInfo } from '../../types';
import { ROUTES } from '../../router/routes';
import centeredHero from '../../assets/hero-images/centered-hero.jpeg';
import rightHero from '../../assets/hero-images/right-hero.jpeg';

interface HeroProps {
  personal: PersonalInfo;
}

const item = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.65 } },
});

const Hero = ({ personal }: HeroProps) => {
  return (
    <section
      className="relative w-full border-b border-neutral-800 flex items-center overflow-hidden"
      style={{ height: 'calc(100dvh - 64px)' }}
    >
      {/* Mobile/tablet: centered background image */}
      <img
        src={centeredHero}
        alt={personal.name}
        className="lg:hidden absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Desktop: right-aligned background image */}
      <img
        src={rightHero}
        alt={personal.name}
        className="hidden lg:block absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 lg:bg-black/30" />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1280px]">
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="flex flex-col gap-3">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
              {...item(0)}
            >
              {personal.name}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-blue-400 font-medium"
              {...item(0.15)}
            >
              {personal.tagline}
            </motion.p>
          </div>

          <motion.p
            className="text-sm text-neutral-400 leading-relaxed max-w-xl"
            {...item(0.3)}
          >
            {personal.bio}
          </motion.p>

          <motion.div className="flex flex-wrap gap-3 pt-2" {...item(0.45)}>
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
          </motion.div>

          <motion.div className="flex items-center gap-4 pt-1" {...item(0.6)}>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
